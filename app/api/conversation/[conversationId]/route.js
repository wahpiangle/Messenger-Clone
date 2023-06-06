import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function DELETE( request, { params } ) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if(!currentUser?.id){
            return new NextResponse('Unauthorized', {status: 401})
        }

        const existingConversation = await prisma.conversation.findUnique({
            where:{
                id: conversationId
            },
            include:{
                users:true
            }
        })

        if(!existingConversation){
            return new NextResponse('Conversation not found', {status: 400})
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where:{
                id:conversationId,
                //delete only if user is part of the conversation
                userIds:{
                    hasSome: [currentUser.id]
                }
            }
        })

        existingConversation.users.forEach((user) => {
            if(user.email){
                pusherServer.trigger(user.email, 'conversation:remove', existingConversation)
            }
        })

        return NextResponse.json(deletedConversation)
    } catch (error) {
        console.log(error, 'ERROR_CONVERSATION_DELETE')
        return new NextResponse('Internal Error', {status: 500})
    }
}