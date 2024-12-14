import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"
import { IProduct } from "@/lib/types"

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string(),
  status: z.string(),
  stock: z.string(),// Corrected to number
  location: z.string(),
})

export default function DialogEditProduct({ product,getProducts }: { product: IProduct,getProducts: ()=>void }) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      price: product.price,
      status: product.status,
      stock: product.inventoryDTO.stock, // Ensures stock is treated as a number
      location: product.inventoryDTO.location
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const inventory = { stock: values.stock,  location: values.location }
      const productNew = {
        name: values.name,
        price: values.price,
        status: values.status, 
        inventoryDTO: inventory
      }
      
      const res = await authorizedAxiosInstance.patch(`${configs.host}/products/${product.id}`, productNew)
      console.log(res)

      if (res.data.statusCode === 200) {
        getProducts();
        setOpen(false)
        toast.success("Product updated successfully!")
      } else {
        toast.error("Failed to update product! Try again.")
      }
    } catch (error) {
      toast.error("Failed to update product! Try again.")
    } finally {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          <Button className="bg-yellow-500 text-white" onClick={() => setOpen(true)}>
            Edit
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>EDIT PRODUCT</DialogTitle>
          <DialogDescription>Make changes to the product here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter stock quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter product location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product status" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
