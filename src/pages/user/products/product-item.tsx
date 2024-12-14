import Breadcrumbs from "@/components/Breadcrumbs"
import GuideSection from "@/components/home/sections/Guide"
import RelatedProducts from "@/components/products/RelatedProducts"
import ButtonLink from "@/shared/Button/ButtonLink"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Loading from "@/components/bar/loading"
import { ICategory, IProduct } from "@/lib/types"
import { getproductDetail } from "@/services/product-service"
import { getCategoryDetail } from "@/services/category-service"
import SectionProduct from "@/components/products/SectionProductHeader"

const ProductItemPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const path = location.pathname;
  const id = path.split("/")[2];

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("Invalid product ID.");
      setLoading(false);
      return;
    }
    fetchDetails()
  }, [id])

  const fetchDetails = async () => {
    try {
      const dataProduct = await getproductDetail(Number(id))
      setProduct(dataProduct)

      const dataCategory = await getCategoryDetail(dataProduct.categoryId)
      setCategory(dataCategory)
    } catch (err) {
      console.error("Failed to fetch product details:", err)
      setError("Failed to load product details.")
    } finally {
      setLoading(false)
    }
  }



  // Show loading state
  if (loading) {
    return <Loading />;
  }

  // Show error message
  if (error) {
    return <div className="container p-5 text-center text-red-500">{error}</div>;
  }

  // Show "Product not found" message
  if (!product) {
    return <div className="container p-5 text-center text-gray-500">Product not found.</div>;
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { title: <ButtonLink href="/">Home</ButtonLink> },
    category && category.id
      ? { title: <ButtonLink href={`/collections/${category.id}`}>{category.name}</ButtonLink> }
      : null,
    { title: product.name },
  ].filter(Boolean); // Filter out `null` values

  return (
    <main>
      <div className="container p-5">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs Items={breadcrumbItems} />
        </div>

        <div className='mb-20'>
          <SectionProduct
          fetchDetails={fetchDetails}
            product={product}
          />
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts />

      {/* Guide Section */}
      <GuideSection />
    </main>
  );
};

export default ProductItemPage;
