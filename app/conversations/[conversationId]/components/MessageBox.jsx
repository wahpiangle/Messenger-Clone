'use client'

import { useSession } from "next-auth/react"

const MessageBox = ({data, isLast}) =>{
    const session = useSession();

    const isOwn = session?.data?.user?.email === data?.sender?.email;


    return(
        <div>

        </div>
    )
}

export default MessageBox