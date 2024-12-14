import { Button } from "@/components/ui/button"
import { configs } from "@/lib/config"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import React, { useState } from "react"

const FormChat = ({getMessages}:{getMessages: ()=>void}) => {
    const [newMessage, setNewMessage] = useState<string>("")

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return
    try {
      const res = await authorizedAxiosInstance.post(`${configs.host}/conversations/current-customer`, {
        content: newMessage,
      })
      getMessages()
      setNewMessage("")
    } catch (err) {
      console.error("Error sending message:", err)
    }
  }
  return (
    <>
      <input
        type='text'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder='Nhập tin nhắn...'
        className='flex-1 p-2 border rounded-lg focus:outline-none'
      />
      <Button size='icon' variant='secondary' onClick={handleSendMessage}>
        Gửi
      </Button>
    </>
  )
}

export default FormChat
