import Card from "@/components/card"
import { Shirt } from "lucide-react";

const CardProduct = ({quantityProducts}:{quantityProducts:number}) => {
   
    return (
        <>
             <Card amount={String(quantityProducts)} discription={"All products of selling"} icon={Shirt} label={"Total Selling Products"} />
        </>
    );
}

export default CardProduct;
