import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

//request handler for creating conversation
export async function POST(request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json()

        //to handle case of groups
        const { userId, isGroup, members, name } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid Data', { status: 400 })
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: { //used to also fetch the data of the users
                    users: true
                }
            })
            return NextResponse.json(newConversation)
        }

        //prevent extra conversations from being created when it exists
        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    { userIds: { equals: [currentUser.id, userId] } },
                    { userIds: { equals: [userId, currentUser.id] } }
                ]
            }
        })

        const singleConversation = existingConversations[0];

        if (singleConversation) {
            return NextResponse.json(singleConversation)
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [{ id: currentUser.id }, { id: userId }]
                }
            },
            include: {
                users: true
            }
        })

        return NextResponse.json(newConversation)
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}