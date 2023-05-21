//this file is used to interact with the database
import { PrismaClient } from "@prisma/client";

const client = globalThis.prisma || new PrismaClient(); //if prisma is already defined, use it, otherwise create a new instance

if(process.env.NODE_ENV === 'production')globalThis.prisma = client; //if in production, save the instance in the globalThis object

export default client;
