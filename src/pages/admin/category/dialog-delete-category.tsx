import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ICategory } from "@/lib/types"
import { toast } from "sonner"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"

export default function DialogDeleteCategory({ category,getCategories }: { category: ICategory,getCategories:()=>{} }) {
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    try {
        const resCreate = await authorizedAxiosInstance.delete(`${configs.host}/categories`, category.id as any);
        console.log(resCreate.data.data)
        getCategories();
      toast.success("Delete category successfully!")
    } catch (error) {
      toast.error("Delete category failed!Try again!")
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      <Button className='bg-red-500 text-white' onClick={() => setOpen(true)}>
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className='bg-red-500 text-white' onClick={handleDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
