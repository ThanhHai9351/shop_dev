import FormChat from "@/components/chat/form-chat"
import { configs } from "@/lib/config"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { useEffect, useState } from "react"

export interface IMessage {
  id: number
  content: string
  customer?: any 
  user?: any 
}

const ChatMain = () => {
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    
    getMessages()
  }, [])
  const getMessages = async () => {
    try {
      const res = await authorizedAxiosInstance.get(`${configs.host}/conversations/current-customer`)
      setMessages(res.data.data.items.slice(0,10).reverse())
    } catch (err) {
      console.error("Error fetching messages:", err)
    }
  }
 

  return (
    <>
      <div className="flex flex-col space-y-4 max-h-96 overflow-y-auto p-2 scroll-m-1">
        <div className="self-start bg-gray-200 rounded-lg p-2">
          Xin chào! Tôi có thể giúp gì cho bạn?
        </div>
        {messages.length > 0 ?
          messages.map((message) => (
            <div
              key={message.id}
              className={
                message.user
                ? "self-start bg-gray-200 rounded-lg p-2"
                  : "self-end bg-blue-500 text-white rounded-lg p-2"
              }
            >
              {message.content}
            </div>
          )) : "Loading ..."}
      </div>
      <div className="flex items-center border-t pt-2 mt-4 space-x-2">
       <FormChat getMessages={getMessages} />
      </div>
    </>
  )
}

export default ChatMain
