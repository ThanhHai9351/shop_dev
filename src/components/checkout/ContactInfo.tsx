import React, { useEffect, useState } from "react"

import Checkbox from "@/shared/Checkbox/Checkbox"
import FormItem from "@/shared/FormItem"
import Input from "@/shared/Input/Input"
import { Link } from "react-router-dom"
import { getMe } from "./../../services/user-service"
import { IUser } from "@/lib/types"

const ContactInfo = () => {
  const [user, setUser] = useState<IUser>(null)

  const info = async () => {
    const me = await getMe()
    setUser(me)
  }

  useEffect(() => {
    info()
  }, [])

  return (
    <div className='z-0 '>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-semibold'>Contact</h3>
          <span>
            <Link to='/me/profile' className='text-sm text-primary underline'>
              Profile
            </Link>
          </span>
        </div>
        <div className=''>
          <FormItem>
            <Input
              rounded='rounded'
              sizeClass='h-12 px-4 py-3'
              placeholder='Email Address'
              className='border border-neutral-100 bg-transparent placeholder:text-neutral-500 focus:border border-primary dark:border dark:border-neutral-600'
              type='email'
              value={user && user.email}
            />
          </FormItem>
        </div>
        {/* <div className=''>
          <Checkbox className='!text-sm' name='uudai' label='Email me news and offers' defaultChecked />
        </div> */}
      </div>
    </div>
  )
}

export default ContactInfo
