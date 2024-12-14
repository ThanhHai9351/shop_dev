import Card from "@/components/card"
import { ShoppingCart } from "lucide-react";


const CardOrder = ({quantityOrders}:{quantityOrders: number}) => {
    
    return (
        <>
             <Card amount={String(quantityOrders)} discription={"All orders of store"} icon={ShoppingCart} label={"Total Orders"} />
        </>
    );
}

export default CardOrder;
