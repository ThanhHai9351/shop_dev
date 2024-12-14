import { Controller, useForm, SubmitHandler } from "react-hook-form" // Import Controller
import { IProduct, EProductStatus, ICategory } from "@/lib/types"
import { getAllCategorires, getCategoryDetail } from "@/services/category-service"
import { useEffect, useState } from "react"
import { getDTOAttribute, initialDataDefaultAttribute } from "@/data/defaultData"
import authorizedAxiosInstance from "@/utils/authorizedAxios"
import { configs } from "@/lib/config"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const CreateProduct = () => {
  const { register, handleSubmit, control } = useForm<IProduct>()
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [category, setCategory] = useState<ICategory | null>(null)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryAttributes = async () => {
      const data = await getAllCategorires()
      setCategories(data)
    }
    fetchCategoryAttributes()
  }, [])

  useEffect(() => {
    const getCategoryData = async () => {
      if (selectedCategory) {
        const data = await getCategoryDetail(Number(selectedCategory))
        setCategory(data)
      }
    }
    getCategoryData()
  }, [selectedCategory])

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    try {  
      const formData = new FormData()
      formData.append("file", data.imageUrl[0]) 
      formData.append("directory", "") 
      
      const resCreate = await authorizedAxiosInstance.post(`${configs.host}/files/upload`, formData ,{
        headers : {
          "mediaType" : "file"
        }
      });

      const dto = getDTOAttribute(category.slug)

      const dataProduct = {
        name: data.name,
        categoryId: category?.id,
        price: data.price,
        status: data.status,
        imageUrl : resCreate.data.data.data,
        inventoryDTO :{
          stock: data.stock,
          location: data.location
        },
        [dto]: { ...data },
      }
      console.log(dataProduct)
      const res = await authorizedAxiosInstance.post(
        `${configs.host}/products/${category?.slug.toUpperCase()}`,
        dataProduct,
      )

      if(res.data.statusCode === 200)
        {
          toast.success("create product completely!");
          navigate("/admin/products");
        } 
    } catch (error) {
      console.error("Error creating product:", error)
    }
  }

  // Fix 2: Typing for the renderFormDynamic function
  const renderFormDynamic = (name: string) => {
    const data = initialDataDefaultAttribute(name)
    return (
      <>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className='form-group'>
            <label className='block text-sm font-medium text-gray-700'>{key}</label>
            {typeof value === "boolean" ? (
              <Controller
                name={key}
                control={control}
                render={({ field }) => (
                  <input
                    type='checkbox'
                    {...field}
                    className='rounded p-3 border-gray-300 shadow-sm focus:ring focus:ring-indigo-200'
                  />
                )}
              />
            ) : (
              <input
                {...register(key as keyof IProduct)}
                type={typeof value === "number" ? "number" : "text"}
                className='mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200'
              />
            )}
          </div>
        ))}
      </>
    )
  }

  return (
    <div className='flex flex-col gap-4 w-full mx-24 p-5 border rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-4'>Create New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <label className='flex flex-col gap-1'>
          <span>Product Name</span>
          <input
            type='text'
            {...register("name", { required: "Product name is required" })}
            placeholder='Enter product name'
            className='border px-3 py-2 rounded'
          />
        </label>

        {/* Category Select */}
        {categories?.length ? (
          <label className='flex flex-col gap-1'>
            <span>Category</span>
            <select
              {...register("categoryId", { required: "Category is required" })}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              className='border px-3 py-2 rounded'
            >
              <option value=''>Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          ""
        )}

        {/* Render dynamic fields based on selected category */}
        {category && renderFormDynamic(category?.slug)}

        {/* Price */}
        <label className='flex flex-col gap-1'>
          <span>Price</span>
          <input
            type='number'
            {...register("price", { required: "Price is required", valueAsNumber: true })}
            placeholder='Enter product price'
            className='border px-3 py-2 rounded'
          />
        </label>

        {/* Image URL */}
        <label className='flex flex-col gap-1'>
          <span>Image URL</span>
          <input
            type='file'
            {...register("imageUrl", { required: "Image URL is required" })}
            placeholder='Enter image URL'
            className='border px-3 py-2 rounded'
          />
        </label>

        <label className='flex flex-col gap-1'>
          <span>Stock</span>
          <input
            type='number'
            {...register("stock", { required: "Stock is required", valueAsNumber: true })}
            placeholder='Enter product quantity'
            className='border px-3 py-2 rounded'
          />
        </label>

        <label className='flex flex-col gap-1'>
          <span>Location</span>
          <input
          type="text"
            {...register("location", { required: "Location is required" })}
            placeholder='Enter location ...'
            className='border px-3 py-2 rounded'
          />
        </label>

        {/* Status */}
        <label className='flex flex-col gap-1'>
          <span>Status</span>
          <select {...register("status", { required: "Status is required" })} className='border px-3 py-2 rounded'>
            {Object.values(EProductStatus).map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </label>

        {/* Submit Button */}
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
          Create Product
        </button>
      </form>
    </div>
  )
}

export default CreateProduct
