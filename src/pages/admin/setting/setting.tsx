import { DataTable } from "@/components/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import React from "react"
import PageTitle from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

type Props = {}

interface Setting {
  category: string
  value: string | number | boolean
}

const columns: ColumnDef<Setting>[] = [
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
]
const data: Setting[] = [
  {
    category: "Account",
    value: true,
  },
  {
    category: "Notifications",
    value: false,
  },
  {
    category: "Language",
    value: "English",
  },
  {
    category: "Theme",
    value: "Dark",
  },
]

export default function SettingAdmin({}: Props) {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col gap-5  w-full p-5'>
      <PageTitle title='Settings' />
      <DataTable columns={columns} data={data} />
      <div className="flex items-end justify-end">
        <Button variant={'destructive'} onClick={()=>{
          localStorage.setItem("accessToken", "");
          navigate("/account/login");
        }}>Logout</Button>
      </div>
    </div>
  )
}
