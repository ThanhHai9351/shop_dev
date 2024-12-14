import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { configs } from "@/lib/config";
import { getNameCustomerFromId } from "@/services/user-service";
import { IOrder } from "@/lib/types";
import DialogDetailOrder from "@/pages/admin/order/dialog-detail-order";

type Props = {};




export function formatCurrencyVND(amount: number): string {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const padZero = (num: number) => num.toString().padStart(2, "0");

  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
}

const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "id",
    header: "Order Id",
  },
  {
    accessorKey: "customerId",
    header: "customer Id",
    // cell: ({ row }) => {
    //   return (
    //     <div>
    //       {row.getValue("customerId") || "Loading..."}
    //     </div>
    //   );
    // },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-200": row.getValue("status") === "pending",
            "bg-orange-200": row.getValue("status") === "processing",
            "bg-green-200": row.getValue("status") === "pay_success",
          })}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "orderDate",
    header: "Date Order",
    cell: ({ row }) => {
      return <div>{formatDate(row.getValue("orderDate"))}</div>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      return <div>{formatCurrencyVND(row.getValue("totalAmount"))}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original as IOrder
      return (
        <div className='flex gap-2'>
          <DialogDetailOrder order={order} />
        </div>
      )
    },
  },
];

export default function OrderAdmin({}: Props) {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const resOrder = await authorizedAxiosInstance.get(`${configs.host}/orders?pageSize=50`);
        if (resOrder.data.statusCode === 200) {

          setOrders(resOrder.data.data.items);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    getOrders();
  }, []);

  console.log(orders);

  return (
    <div className="flex flex-col gap-5 w-full p-5">
      <PageTitle title="Orders" />
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
