import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom"
import { configs } from "@/lib/config"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { statusOrder } from "@/helpers/statusOrder"
import { toast } from "sonner"
import PageTitle from "@/components/PageTitle"
import Breadcrumbs from "@/components/Breadcrumbs"
import ButtonLink from "@/shared/Button/ButtonLink"

type Order = {
  id: number
  customerId: number
  orderDate: string
  status: string
  totalAmount: number
  orderItems: {
    id: number
    product: {
      name: string
      price: number
      imageUrl: string
    }
    quantity: number
    total: number
  }[]
}

const MyCartPage = () => {
  const navigate = useNavigate()
  const [ordersData, setOrdersData] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const breadcrumbItems = [
    { title: <ButtonLink href='/'>Home</ButtonLink> },
    {
      title: <ButtonLink href='/me/profile'>Me</ButtonLink>,
    },
    { title: "My Orders" },
  ]

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/account/login")
    }
  }, [])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await authorizedAxiosInstance.get(`${configs.host}/orders/current-customer`)
        setOrdersData(response.data.data.items)
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }

    fetchOrders()
  }, [])

  return (
    <Card className='w-full px-32'>
      <CardContent>
        <div className='my-4'>
          <Breadcrumbs Items={breadcrumbItems} />
        </div>
        <PageTitle title='My Orders' classname='mb-12' />
        <Table className='border'>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className='text-end'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersData.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{format(new Date(order.orderDate), "PP")}</TableCell>
                <TableCell>
                  <Badge variant={statusOrder(order.status).variant} className={statusOrder(order.status).className}>
                    {statusOrder(order.status).label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {order.orderItems.map((item) => (
                    <div key={item.id}>
                      {item.product.name} (x{item.quantity})
                    </div>
                  ))}
                </TableCell>
                <TableCell className='text-right'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant='outline' size='sm' onClick={() => setSelectedOrder(order)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    {selectedOrder && selectedOrder.id === order.id && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Order Details (ID: {order.id})</DialogTitle>
                        </DialogHeader>
                        <div>
                          <p>
                            <strong>Customer ID:</strong> {order.customerId}
                          </p>
                          <p>
                            <strong>Order Date:</strong> {format(new Date(order.orderDate), "PP")}
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            <Badge
                              variant={statusOrder(order.status).variant}
                              className={statusOrder(order.status).className}
                            >
                              {statusOrder(order.status).label}
                            </Badge>
                          </p>
                          <p>
                            <strong>Total Amount:</strong> ${order.totalAmount.toLocaleString()}
                          </p>
                          <p>
                            <strong>Items:</strong>
                          </p>
                          <ul className='pl-4 list-disc'>
                            {order.orderItems.map((item) => (
                              <li key={item.id}>
                                <div>
                                  <img src={item.product.imageUrl} alt={item.product.name} width={50} />
                                  <strong>{item.product.name}</strong> - Quantity: {item.quantity}, Price: $
                                  {item.product.price.toLocaleString()} each
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default MyCartPage
