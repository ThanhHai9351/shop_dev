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
import { IOrder, IOrderItem } from "@/lib/types"
import { formatCurrencyVND, formatDate } from "@/pages/admin/order/order"
import { cn } from "@/lib/utils"

const OrderItemsTable = (orderItems :IOrderItem[]) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Quantity
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default function DialogDetailOrder({ order }: { order: IOrder }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button className='bg-blue-500 text-white' onClick={() => setOpen(true)}>
        Detail
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px]">    
          <DialogHeader>
            <DialogTitle>Order: #{order.id}</DialogTitle>
            <DialogDescription>
              <div className='grid grid-cols-2 border p-3 mt-2 rounded-sm'>
                <p className='p-1'>Customer:</p>
                <p className='p-1 font-bold text-black'>{order.customerId}</p>
                <p className='p-1'>Date Order:</p>
                <p className='p-1 font-bold text-black'>{formatDate(order.orderDate as any)}</p>
                <p className='p-1'>Total Amount:</p>
                <p className='p-1 font-bold text-black'>{formatCurrencyVND(order.totalAmount)}</p>
                <p className='p-1'>Status:</p>
                <div
                  className={cn("font-medium w-fit px-4 py-2 rounded-lg text-black", {
                    "bg-red-200": order.status === "pending",
                    "bg-orange-200": order.status === "processing",
                    "bg-green-200": order.status === "pay_success",
                  })}
                >
                  {order.status}
                </div>
              </div>
              <div className='mt-2'>
                <h3 className='scroll-m-20 text-lg text-black font-semibold tracking-tight'>Order Items</h3>
                <div className="scroll-m-1">
                  {OrderItemsTable(order.orderItems || [])}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
