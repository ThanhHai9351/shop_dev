import type { FC } from "react"

interface ImageShowCaseProps {
  shots: any
}

const ImageShowCase: FC<ImageShowCaseProps> = ({ shots }) => {

  return (
    <div className='grid grid-cols-6 gap-3 border-neutral-300 p-2 xl:gap-8'>
      <div className='order-2 col-span-6 w-full items-center lg:order-1 lg:col-span-1 lg:flex'>
        <div className='grid grid-cols-6 gap-3'>
          <div
            key={shots}
            className='relative col-span-2 aspect-square overflow-hidden rounded-lg md:col-span-2 lg:col-span-6 lg:h-[100px] xl:h-auto xl:w-full'
          >
            <img src={shots} alt='shoe image' className='size-full object-contain object-center' />
          </div>
        </div>
      </div>
      <div className='order-1 col-span-6 lg:order-2 lg:col-span-5'>
        <div className='relative overflow-hidden rounded-2xl lg:h-[520px] xl:h-auto xl:w-full'>
          <img src={shots} alt='shoe image' className='size-full object-contain object-center' />
        </div>
      </div>
    </div>
  )
}

export default ImageShowCase