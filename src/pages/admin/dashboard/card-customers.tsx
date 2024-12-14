import Loading from '@/components/bar/loading';
import { CardContent } from '@/components/card';
import SalesCard from '@/components/SalesCard';
import { IUser } from '@/lib/types';
import { getAllCustomers } from '@/services/user-service';
import { useEffect, useState } from 'react';

const CardCustomers = () => {
    const [customers, setCustomers] = useState<IUser[]>([]);

  useEffect(()=>{
    const getCustomers = async() =>{
      const res = await getAllCustomers("",6,0);
      setCustomers(res);
    }
    getCustomers();
  },[])
    return (
         <CardContent className='flex justify-between gap-4'>
          <section>
            <p>New customers</p>
            <p className='text-sm text-gray-400'>You made 265 sales this month.</p>
          </section>
          {customers.length > 0 ? customers.map((customer, index) => (
            <SalesCard key={index} customer={customer}/>
          )) : <Loading />}
        </CardContent> 
    );
}

export default CardCustomers;
