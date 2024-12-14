import BarChart from "@/components/BarChart";
import PageTitle from "@/components/PageTitle";
import Card, { CardContent } from "@/components/card";
import { configs } from "@/lib/config";
import CardCustomer from "@/pages/admin/dashboard/card-customer";
import CardCustomers from "@/pages/admin/dashboard/card-customers";
import CardOrder from "@/pages/admin/dashboard/card-order";
import CardProduct from "@/pages/admin/dashboard/card-product";
import CardRevene from "@/pages/admin/dashboard/card-revenue";
import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { useEffect, useState } from "react";

interface IDataDashboard {
  totalOrders: number;
  totalProductsSold: number;
  totalCustomers: number;
  totalRevenue: number;
  monthlyRevenue: Record<string, number>;
}

const DashboardAdmin = () => {
  const [data, setData] = useState<IDataDashboard | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await authorizedAxiosInstance.get(
          `${configs.host}/dashboard/get-reports`
        );
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full p-5">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {data && (
          <>
            <CardRevene revenue={data?.totalRevenue} />
            <CardProduct quantityProducts={data?.totalProductsSold} />
            <CardOrder quantityOrders={data?.totalOrders} />
            <CardCustomer quantityCustomers={data?.totalCustomers} />
          </>
        )}
      </section>

      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          {data && <BarChart monthlyRevenue={data.monthlyRevenue} />}
        </CardContent>
        <CardCustomers />
      </section>
    </div>
  );
};

export default DashboardAdmin;
