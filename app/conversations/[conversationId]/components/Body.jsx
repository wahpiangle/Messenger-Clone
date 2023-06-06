'use client'

import useConversation from "@/app/hooks/useConversation";
import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

//initialMessages is obtained from getMessages action
const Body = ({initialMessages}) => {

  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef(null);

  const { conversationId } = useConversation();

  useEffect(()=>{ //seen message
    axios.post(`/api/conversation/${conversationId}/seen`)
  },[conversationId]);

  useEffect(()=>{
    pusherClient.subscribe(conversationId) //listens to the conversationId set in server
    bottomRef?.current?.scrollIntoView({behavior: 'smooth'});

    const messageHandler = (message) =>{
      axios.post(`/api/conversation/${conversationId}/seen`)
      setMessages((current) => {
        if(find(current, {id: message.id})) {
          return current; //to prevent duplicate messages by checking if id exists
        }

        return [...current, message];
      })
    }


    const updateMessageHandler = (newMessage) =>{
      setMessages((current) => current.map((currentMessage) => {
        if(currentMessage.id === newMessage.id){
          return newMessage
        }

        return currentMessage
      }))
    }

    //when messages:new event triggers
    pusherClient.bind('message:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)

    //clean up when component unmounts
    return () =>{
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('message:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  },[conversationId])

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