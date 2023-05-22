import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request){
    try{
        const body = await request.json(); //fetch request body
        const { email, name, password } = body; //destructure body

        if( !email || !name || !password){
            return new NextResponse('Missing info', {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data:{
                email,
                name,
                hashedPassword,
            }
        })

        //new keyword is not required here as .json() is used
        return NextResponse.json(user); //return user data in form of json

    }catch(error){
        console.log(error, 'Registration error');
        return new NextResponse('Internal Server Error', {status: 500});
    }

}