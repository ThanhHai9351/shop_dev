import { useEffect, useState } from "react"
import { DataTable } from "@/components/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import PageTitle from "@/components/PageTitle"
import { getAllCustomers } from "@/services/user-service"
import { IUser } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/pages/admin/order/order"

type Props = {}

export default function CustomerAdmin({}: Props) {
  const [customers, setCustomers] = useState<IUser[]>([])
  const [searchText, setSearchText] = useState<string>("")
  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "fullName",
      header: "Full Name",
      cell: ({ row }) => {
        const firstName = row.original.firstName
        const lastName = row.original.lastName
        return (
          <div className='flex gap-2 items-center'>
            <img
              className='h-10 w-10 rounded-full'
              src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${`${firstName} ${lastName}`}`}
              alt='user-image'
            />
            <p>
              {firstName} {lastName}
            </p>
          </div>
        )
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "dob",
      header: "Date of Birth",
      cell: ({ row }) => {
        const customer = row.original as IUser
        return (
          <div className='flex gap-2'>
           {formatDate(customer.dob)}
          </div>
        )
      },
    },
    {
      accessorKey: "active",
      header: "Active",
      cell: ({ row }) => {
        const customer = row.original as IUser
        return (
          <div className='flex gap-2'>
            {customer.active ? (
              <h4 className='text-green-500 scroll-m-20 text-xs font-semibold tracking-tight'>Active</h4>
            ) : (
                <h4 className='text-red-500 scroll-m-20 text-xs font-semibold tracking-tight'>Not Active</h4>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const customer = row.original as IUser
        return (
          <div className='flex gap-2'>
            <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => handleDetail(customer)}>
              Detail
            </button>
          </div>
        )
      },
    },
    
  ]

  const handleDetail = (customer: IUser) => {
    console.log("Detail customer:", customer)
  }
  useEffect(() => {
    fetchCustomers()
  }, [searchText])

  const fetchCustomers = async () => {
    const customersData = await getAllCustomers(searchText)
    setCustomers(customersData)
  }

  return (
    <div className='flex flex-col gap-5 w-full p-5'>
      <PageTitle title='Customers' />
      <div className='flex justify-between items-center'>
        <div>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Find to customer name...'
          />
        </div>
      </div>
      <DataTable columns={columns} data={customers} />
    </div>
  )
}
