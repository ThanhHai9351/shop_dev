import { IUser } from "@/lib/types";
import { FC } from "react";

interface props{
  customer : IUser
}

const  SalesCard:FC<props> = ({customer}) =>{
  return (
    <div className='flex flex-wrap justify-between gap-3'>
      <section className='flex justify-between gap-3'>
        <div className='h-12 w-12 rounded-full bg-gray-100 p-1'>
          <img
            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${customer.firstName}`}
            alt='avatar'
            width={200}
            height={200}
          />
        </div>
        <div className='text-sm'>
          <p>{customer.firstName} {customer.lastName}</p>
          <div className='text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400'>
            {customer.email}
          </div>
        </div>
      </section>
      <p>{customer.phoneNumber}</p>
    </div>
  )
}

export default SalesCard;
