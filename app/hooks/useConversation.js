import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () =>{
    const params = useParams();

    //conversationId is retrieved from URL and cached
    //useMemo will cache value to prevent unnecessary rerender
    const conversationId = useMemo(()=>{
        if(!params?.conversationId){
            return '';
        }
        return params.conversationId;
    },[params?.conversationId])

    //use of double !! to convert to boolean
    const isOpen = useMemo(() => !!conversationId, [conversationId])

    return useMemo(() =>({
        isOpen,
        conversationId,
    }), [isOpen, conversationId])
}

export default useConversation;