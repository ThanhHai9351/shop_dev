import { DataTable } from "@/components/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import PageTitle from "@/components/PageTitle"
import { ICategory } from "@/lib/types"
import { useEffect, useState } from "react"
import { getAllCategorires } from "@/services/category-service"
import { Input } from "@/components/ui/input"
import DialogEditCategory from "@/pages/admin/category/dialog-edit-category"
import DialogDeleteCategory from "@/pages/admin/category/dialog-delete-category"
import DialogCreateCategory from "@/pages/admin/category/dialog_create_category"

type Props = {}

export default function CategoryAdmin({}: Props) {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [searchText, setSearchText] = useState<string>("")
  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original as ICategory
        return (
          <div className='flex gap-2'>
            <DialogEditCategory category={category} getCategories={getCategories} />
            <DialogDeleteCategory category={category} getCategories={getCategories} />
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    getCategories()
  }, [searchText])
  const getCategories = async () => {
    const data = await getAllCategorires(100, 0, searchText)
    setCategories(data)
  }
  return (
    <div className='flex flex-col gap-5  w-full p-5'>
      <PageTitle title='Categories' />
      <div className='flex justify-between items-center'>
        <div>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Find to category name...'
          />
        </div>

        <div>
          <DialogCreateCategory getCategories={getCategories} />
        </div>
      </div>
      <DataTable columns={columns} data={categories} />
    </div>
  )
}
