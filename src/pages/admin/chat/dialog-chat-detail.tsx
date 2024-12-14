import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageSquareMore } from "lucide-react"
import { IChat, IUser } from "@/lib/types";
import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { configs } from "@/lib/config";
import ChatFormAdmin from "@/pages/admin/chat/chat-form-admin";



export default function DialogChatDetail({customer}:{customer: IUser}) {
  const [chatDetails, setChatDetails] = useState<IChat[]>([]);
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    getChats();
  },[])
  const getChats = async() =>{
    try{
      const resChatDetail = await authorizedAxiosInstance.get(`${configs.host}/conversations/${customer.id}`)
      setChatDetails(resChatDetail.data.data.items.slice(0,10).reverse())
    }catch(err){}
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          <Button variant={'default'} onClick={() => setOpen(true)}>
            <MessageSquareMore />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="p-2 sm:max-w-[800px]">
      <div className="flex flex-col h-screen bg-gray-100 w-full">
      <div className="p-4 flex items-center bg-blue-500 text-white text-lg font-semibold">
      <img
            className='h-10 w-10 rounded-full '
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=sdfsf`}
            alt='user-image'
          />
        <p className="mx-2">{customer.firstName} {customer.lastName}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-h-[600px] space-y-4 w-full scroll-m-1">
        {chatDetails.length > 0 && chatDetails.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.user?.operationalRole ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-sm p-3 rounded-lg shadow ${
                msg.user?.operationalRole
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <ChatFormAdmin getChats={getChats} customerId={customer.id} />
    </div>
    </DialogContent>
    </Dialog>
  )
}
