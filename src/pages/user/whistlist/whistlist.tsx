import Loading from "@/components/bar/loading";
import Breadcrumbs from "@/components/Breadcrumbs";
import CollectionFilter from "@/components/collections/Filter";
import ProductListing from "@/components/collections/ProductListing";
import CollectionSorter from "@/components/collections/Sorter";
import BenefitsSection from "@/components/home/sections/Benefits";
import PopluarCategoriesSection from "@/components/home/sections/PopluarCategories";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/lib/types";
import { getAllProductsWhistlist } from "@/services/whistlist-service";
import ButtonLink from "@/shared/Button/ButtonLink";
import { useEffect, useState } from "react";

const WhistList = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rangePrices, setRangePrices] = useState([1, 2000000000]);
  const [text, setText] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortDir, setSortDir] = useState<string>("");

  const fetchProductsList = async () => {
    setLoading(true);
    setError(null);

    try {
      const productsResponse = await getAllProductsWhistlist(100, 0, text, rangePrices[0], rangePrices[1], sortBy, sortDir);
      let productsNew: IProduct[] = []; 
      productsResponse.forEach((item: any) => {
        productsNew.push(item.product);
      });
      setProducts(productsNew);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  console.log(products);

  useEffect(() => {
    fetchProductsList();
  }, [ sortBy, sortDir]);



  const breadcrumbItems = [{ title: <ButtonLink href='/me/profile'>Me</ButtonLink> }, { title: `WhistList` }];

  return (
    <main className='pb-24'>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <>
          <div className='p-5'>
            <Breadcrumbs Items={breadcrumbItems} />
          </div>
          <div className='flex flex-col h-full'>
            <CollectionSorter sortBy={sortBy} sortDir={sortDir} setSortDir={setSortDir} setSortBy={setSortBy} />
          </div>
          <div className='container pb-8 lg:pb-24'>
            <div className='grid grid-cols-12 gap-3'>
              <div className='hidden md:col-span-5 md:block lg:col-span-3'>
                <CollectionFilter
                  rangePrices={rangePrices}
                  setRangePrices={setRangePrices}
                  text={text}
                  setText={setText}
                />
                <div className="flex place-items-end justify-end pr-5">
                  <Button onClick={fetchProductsList}>Search</Button>
                </div>
              </div>
              <div className='col-span-12 md:col-span-7 lg:col-span-9'>
                {products && <ProductListing products={products} />}
              </div>
            </div>
          </div>
          <PopluarCategoriesSection />
          <BenefitsSection />
        </>
      )}
    </main>
  );
};

export default WhistList;
