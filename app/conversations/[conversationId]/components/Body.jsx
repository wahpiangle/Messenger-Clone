'use client'

import useConversation from "@/app/hooks/useConversation";
import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox";
import axios from "axios";

const Body = ({initialMessages}) => {

  const [messages, useMessages] = useState(initialMessages);
  const bottomRef = useRef(null);

  const { conversationId } = useConversation();

  useEffect(()=>{ //seen message
    axios.post(`/api/conversation/${conversationId}/seen`)
  },[conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) =>(
        <MessageBox isLast={index === messages.length-1} key={message.id} data={message}/>
      ))}
      <div ref={bottomRef} className="pt-24"/>
    </div>
  )
}

export default Body