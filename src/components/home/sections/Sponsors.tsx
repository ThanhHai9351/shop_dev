import { sponsorsData } from "@/data/content"
import { Link } from "react-router-dom"

const SponsorsSection = () => {
  return (
    <section>
      <div className='container pb-8 xl:pb-24'>
        <div className='border-y border-neutral-300 py-5 dark:border-neutral-600 xl:py-16  h-full'>
          {/* <ul className="hiddenScrollbar flex flex-nowrap gap-4 overflow-x-scroll lg:gap-16 h-full"> */}
          <ul className='hiddenScrollbar flex flex-nowrap gap-4 lg:gap-16 h-full'>
            {sponsorsData.map((listItem) => (
              <li key={listItem.id} className='relative h-full min-w-[100px] shrink-0 xl:basis-auto'>
                <Link to='/collections/'>
                  <div className='dark:hidden'>
                    <img src={listItem.svg_white} alt='sponsor image' className='object-contain max-w-[120px]' />
                  </div>
                  <div className='hidden dark:inline-block'>
                    <img src={listItem.svg_dark} alt='sponsor image' className='object-contain max-w-[120px]' />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SponsorsSection
