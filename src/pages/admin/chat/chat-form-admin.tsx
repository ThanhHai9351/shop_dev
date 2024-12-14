import { configs } from '@/lib/config';
import authorizedAxiosInstance from '@/utils/authorizedAxios';
import { useState } from 'react';

const ChatFormAdmin = ({getChats, customerId}:{getChats : ()=>void, customerId: number}) => {
    const [text,setText] = useState<string>("");

    const handleSendMessage = async() =>{
        if(text.trim() === "")
        {
            return;
        }
        const resMess = await authorizedAxiosInstance.post(`${configs.host}/conversations/reply-message/${customerId}`, {content: text})
        console.log((resMess.data));
        setText("")
        getChats();
    }
    return (
        <>
            <div className="p-4 bg-white border-t">
        <div className="flex items-center">
          <input
          value={text}
            type="text"
            onChange={e => setText(e.target.value)}
            className="flex-1 border rounded-lg p-2 text-gray-700"
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage} className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </div>
      </div>
        </>
    );
}

export default ChatFormAdmin;
