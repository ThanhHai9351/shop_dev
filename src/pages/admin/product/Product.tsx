import { DataTable } from "@/components/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import PageTitle from "@/components/PageTitle"
import { IProduct } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllProducts } from "@/services/product-service"
import { Input } from "@/components/ui/input"
import DialogDeleteProduct from "@/pages/admin/product/dialog-delete-product"
import { formatCurrencyVND } from "@/pages/admin/order/order"
import DialogEditProduct from "@/pages/admin/product/dialog-edit-product"




export default function Product({}) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [searchText, setSearchText] = useState<string>("")
  const navigate = useNavigate()

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "id",
      header: "#",
    },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "image",
      header: "Product Image",
      cell: ({ row }) => {
        const product = row.original as IProduct
        return (
         <img src={product.imageUrl} alt="" width={100}/>
        )
      },
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      cell: ({ row }) => {
        const categoryName = row.original.categoryDTO?.name
        return (
          <div className='flex gap-2'>
           {categoryName}
          </div>
        )
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.original.price
        return (
          <div className='flex gap-2'>
           {formatCurrencyVND(price)}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const product = row.original as IProduct
        return (
          <div className='flex gap-2'>
          {product.inventoryDTO?.location}
          </div>
        )
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const product = row.original as IProduct
        return (
          <div className='flex gap-2'>
          {product.inventoryDTO?.stock}
          </div>
        )
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original as IProduct
        return (
          <div className='flex gap-2'>
            {/* <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => handleDetail(product)}>
              Detail
            </button> */}
            <DialogEditProduct product={product} getProducts={getProducts} />
            <DialogDeleteProduct product={product} />
          </div>
        )
      },
    },
  ]
  
  const handleDetail = (id: IProduct) => {
    console.log(id)
  }

  useEffect(() => {
    
    getProducts()
  }, [searchText])

  const getProducts = async () => {
    const data = await getAllProducts(100, 0, searchText)
    setProducts(data)
  }

  return (
    <div className='flex flex-col gap-5  w-full p-5'>
      <PageTitle title='Products' />
      <div className='flex justify-between items-center'>
        <div>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Find to product name...'
          />
        </div>

        <div>
          <Button className='bg-blue-500 text-white' variant='link' onClick={() => navigate("/admin/product/create")}>
            Create Product
            <Plus />
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={products} />
    </div>
  )
}
