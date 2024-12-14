import Card from "@/components/card"
import { formatCurrencyVND } from "@/pages/admin/order/order";
import { DollarSign } from "lucide-react";

const CardRevene = ({revenue}:{revenue:number}) => {
    const money = formatCurrencyVND(revenue)
    return (
        <>
             <Card amount={String(money)} discription={"Total revenue of the year"} icon={DollarSign} label={"Total Revenue"} />
        </>
    );
}

export default CardRevene;
