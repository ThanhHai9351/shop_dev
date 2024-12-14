import { Button } from '@/components/ui/button';
import { configs } from '@/lib/config';
import authorizedAxiosInstance from '@/utils/authorizedAxios';
import { IoHeart } from 'react-icons/io5';
import { GiShatteredHeart } from "react-icons/gi";
import { toast } from 'sonner';

const ButtonAddWhistlist = ({productId,wishlisted,fetchDetails}:{productId: number,wishlisted:boolean | any,fetchDetails: ()=>void}) => {
    const handleAddWhistlist = async()=>{
        try{
            const res = await authorizedAxiosInstance.post(`${configs.host}/products/wishlist-current-customer`,productId);
            if(res.status === 200)
            {
                toast.success("Add to whistlist successfully!");
                fetchDetails();
            }
        }catch(error)
        {
            console.log(error);
            toast.error("Add to whistlist failed!");
        }
    }

    const handleRemoveWhistlist = async() =>{
        try{
            const res = await authorizedAxiosInstance.patch(`${configs.host}/products/wishlist-current-customer`,{
                wishlistProductIds : [productId]
            } );
            if(res.status === 200)
            {
                toast.success("Remove to whistlist successfully!");
            fetchDetails();
            }
        }catch(error)
        {
            console.log(error);
            toast.error("Remove to whistlist failed!");
        }
    }

    return (
        <>
            {wishlisted ?  <>
            <Button
            onClick={handleRemoveWhistlist}
              className='pt-6 pb-6 hover:bg-red-700 transition duration-300 flex items-center justify-center'
              variant={"outline"}
            >
              <IoHeart  />
            </Button>
        </> :  <>
            <Button
            onClick={handleAddWhistlist}
              className='pt-6 pb-6 hover:bg-red-700 transition duration-300 flex items-center justify-center'
              variant={"outline"}
            >
              <GiShatteredHeart  />
            </Button>
        </>}
        </>
    );
}

export default ButtonAddWhistlist;
