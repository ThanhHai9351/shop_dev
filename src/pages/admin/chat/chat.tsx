import { DataTable } from "@/components/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import PageTitle from "@/components/PageTitle"
import DialogChatDetail from "@/pages/admin/chat/dialog-chat-detail"
import { useEffect, useState } from "react"
import { IChat, IUser } from "@/lib/types"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"



const columns: ColumnDef<IChat>[] = [
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const chat = row.original as IChat
      const avatar = chat.items[0].content;
      return (
        <div className='flex gap-2 items-center'>
          <img
            className='h-10 w-10 rounded-full'
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${avatar}`}
            alt='user-image'
          />
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const chat = row.original as IChat
      let name  = ""
      if(chat.items[0].user)
      {
        name = "Staff"
      }else{
        const customer = chat.items[0].customer;
        name = customer.firstName+" "+customer.lastName
      }
      
      return (
        <div className='flex gap-2 items-center'>
         {name}
        </div>
      )
    },
  },
  {
    accessorKey: "lastMessage",
    header: "content",
    cell: ({ row }) => {
      const chat = row.original as IChat
      const content = chat.items[0].content;
      return (
        <div className='flex gap-2 items-center'>
          {content}
        </div>
      )
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const chat = row.original as IChat
      return (
        <div className='flex gap-2'>
          <DialogChatDetail customer={chat.items[0].customer} />
        </div>
      )
    },
  },
]




export default function Chat() {
  const [chats, setChats] = useState<IChat[]>([])
  useEffect(() => {
    const getChats = async () => {
      try {
        const chatsResponse = await authorizedAxiosInstance.get(`${configs.host}/conversations/all-chats?pageSize=100`)
        setChats(chatsResponse.data.data.items)
      } catch (err) {}
    }
    getChats()
  }, [])

  return (
    <div className='flex flex-col gap-5  w-full p-5'>
      <PageTitle title='Chat' />
       <DataTable columns={columns} data={chats} /> 
    </div>
  )
}
