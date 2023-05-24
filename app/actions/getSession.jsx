import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function getSession(){
    //use of getServerSession instead of useSession() as the data is fetched from server side
    return await getServerSession(authOptions);
}