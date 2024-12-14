import Card from "@/components/card"
import { UsersRound } from "lucide-react";

const CardCustomer = ({quantityCustomers}:{quantityCustomers: number}) => {
   
    return (
        <>
             <Card amount={String(quantityCustomers)} discription={"All customers of store"} icon={UsersRound} label={"Total Customers"} />
        </>
    );
}

export default CardCustomer;
