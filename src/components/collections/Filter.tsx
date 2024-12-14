import "rc-slider/assets/index.css"

import { pathOr } from "ramda"
import Slider from "rc-slider"
import { FC, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SideBarProps {
  rangePrices: number[];
  setRangePrices: (prices: number[]) => void;
  text: string;
  setText: (value: string) => void;
}
const PRICE_RANGE = [1, 5000000000]
const SidebarFilters:FC<SideBarProps> = ({rangePrices,setRangePrices,text,setText}) => {
  
  const renderTabsPriceRage = (rangePrices: Number[],setRangePrices: ()=>{}) => {
    const [activeTab, setActiveTab] = useState(true)

    return (
      <div className='relative flex flex-col space-y-5 p-5'>
        <div className='space-y-5'>
          <div className='flex justify-between'>
            <button type='button' className='font-medium uppercase' onClick={() => setActiveTab((prev) => !prev)}>
              Price
            </button>
            <span>
              <Button variant={'outline'}  className='text-neutral-500 underline dark:text-neutral-300'>Reset</Button>
            </span>
          </div>
          <div className={`space-y-2 overflow-hidden ${activeTab ? "h-auto pt-4" : "h-0"}`}>
            <Slider
              className=''
              range
              min={PRICE_RANGE[0]}
              max={PRICE_RANGE[1]}
              step={1}
              defaultValue={[pathOr(0, [0], rangePrices), pathOr(0, [1], rangePrices)]}
              allowCross={false}
              onChange={(_input: number | number[]) => setRangePrices(_input as number[])}
            />
            <span className='mt-2 text-sm text-neutral-500'>
              Price : {rangePrices[0]} - {rangePrices[1]}{" "}
            </span>
            <div className='flex justify-between space-x-5'>
              <div>
                <div className='relative mt-1 rounded-md'>
                  <span className='pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-500 sm:text-sm'>
                    vnd
                  </span>
                  <input
                    type='text'
                    name='minPrice'
                    disabled
                    id='minPrice'
                    className='block w-full rounded-md border-neutral-300 bg-transparent p-3 sm:text-sm'
                    value={rangePrices[0]}
                  />
                </div>
              </div>
              <div>
                <div className='relative mt-1 rounded-md'>
                  <input
                    type='text'
                    disabled
                    name='maxPrice'
                    id='maxPrice'
                    className='block w-full rounded-md border-neutral-300 bg-transparent p-3 sm:text-sm'
                    value={rangePrices[1]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  const renderTextFilters = (text:string,setText:()=>{}) => {
    const [activeTab, setActiveTab] = useState(true)

    return (
      <div className='relative flex flex-col space-y-5 p-5'>
        <div className='space-y-5'>
          <div className='flex justify-between'>
            <button type='button' className='font-medium uppercase' onClick={() => setActiveTab((prev) => !prev)}>
              Name
            </button>
            <span>
              <Button variant={'outline'} className='text-neutral-500 underline dark:text-neutral-300'>Reset</Button>
            </span>
          </div>
          <div className={`space-y-2 overflow-hidden ${activeTab ? "h-auto pt-4" : "h-0"}`}>
          <Label className="text-sm font-medium">Search to name</Label>
           <Input value={text} onChange={e => setText(e.target.value)} type="text" className="border rounded p-2 w-full" placeholder="Enter the name ...." />
          </div>
        </div>
      </div>
    ) 
  }

  return (
    <div className='rounded-md bg-white dark:bg-neutral-900'>
      <div className='divide-y divide-neutral-300 dark:divide-neutral-600'>
      {renderTextFilters(text,setText)}
        {renderTabsPriceRage(rangePrices,setRangePrices)}
      </div>
    </div>
  )
}

export default SidebarFilters
