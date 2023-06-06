import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request){
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { message, image, conversationId } = body;

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const newMessage = await prisma.message.create({
            data:{
                body:message,
                image: image,
                conversation:{
                    connect:{
                        id: conversationId
                    }
                },
                sender:{
                    connect:{
                        id: currentUser.id
                    }
                },
                seen:{
                    connect:{
                        id:currentUser.id
                    }
                }
            },
            include:{
                seen: true,
                sender: true,
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where:{
                id: conversationId
            },
            data:{
                lastMessageAt: new Date(),
                messages:{
                    connect:{
                        id: newMessage.id
                    }
                }
            },
            include:{
                users:true,
                messages:{
                    include:{
                        seen:true
                    }
                }
            }
        });

        //sends a trigger from the server containing newMessage to the client
        await pusherServer.trigger(conversationId, 'message:new', newMessage);

        const lastMessage = updatedConversation.messages[updatedConversation.messages.length-1]; //to get the last message

        //sends a trigger from the server containing lastMessage to the client
        updatedConversation.users.map((user) =>{
            pusherServer.trigger(user.email, 'conversation:update',{
                id: conversationId,
                messages: [lastMessage]
            })
        })

        return NextResponse.json(newMessage);

    } catch (error) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}