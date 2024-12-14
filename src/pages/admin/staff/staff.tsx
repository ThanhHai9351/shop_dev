import { useEffect, useState } from "react"
import { DataTable } from "@/components/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import PageTitle from "@/components/PageTitle"
import { IUser } from "@/lib/types"
import { getAllStaffs } from "@/services/user-service"
import DialogCreateStaff from "@/pages/admin/staff/dialog-create-staff"
import { Input } from "@/components/ui/input"
import DialogEditStaff from "@/pages/admin/staff/dialog-edit-staff"
import DialogDeleteStaff from "@/pages/admin/staff/dialog-delete-staff"
import { formatDate } from "@/pages/admin/order/order"

type Props = {}

export default function StaffAdmin({}: Props) {
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
        const staff = row.original as IUser
        return (
          <div className='flex gap-2'>
           {formatDate(staff.dob)}
          </div>
        )
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const staff = row.original as IUser
        return (
          <div className='flex gap-2'>
            <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => handleDetail(staff)}>
              Detail
            </button>
            <DialogEditStaff fetchStaffs={fetchStaffs}  staff={staff} />
            <DialogDeleteStaff fetchStaffs={fetchStaffs}  staff={staff}  />
          </div>
        )
      },
    },
  ]
  const [staffs, setStaffs] = useState<IUser[]>([])
  const [searchText, setSearchText] = useState<string>("")

  const handleDetail = (staff: IUser) => {
    console.log("Detail staff:", staff)
  }
  

  useEffect(() => {
    fetchStaffs()
  }, [searchText])

  const fetchStaffs = async () => {
    const staffsData = await getAllStaffs(100, 0, searchText)
    setStaffs(staffsData)
  }
  return (
    <div className='flex flex-col gap-5 w-full p-5'>
      <PageTitle title='Staffs' />
      <div className='flex justify-between items-center'>
        <div>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Find to staff name...'
          />
        </div>

        <div>
          <DialogCreateStaff fetchStaffs={fetchStaffs} />
        </div>
      </div>
      <DataTable columns={columns} data={staffs} />
    </div>
  )
}
