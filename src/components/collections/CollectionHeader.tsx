import type { FC } from "react"
import ButtonLink from "@/shared/Button/ButtonLink"

import Breadcrumbs from "../Breadcrumbs"

const CollectionHeader: FC<{
  title: string
  bannerImg: string
  description: string
}> = ({ title, bannerImg, description }) => {
  const breadcrumbItems = [
    {
      title: (
        <ButtonLink href='/' className='dark:text-neutral-700'>
          Home
        </ButtonLink>
      ),
    },
    { title },
  ]

  return (
    <div className='container pb-9'>
      <div className='relative overflow-hidden rounded-md p-6 lg:px-20 lg:py-10'>
        <div className=''>
          <Breadcrumbs Items={breadcrumbItems} />
          <h1 className='mb-4 text-4xl font-semibold capitalize dark:text-neutral-900'>{title}</h1>
          <p className='text-neutral-500 dark:text-neutral-700 lg:w-1/3'>{description}</p>
        </div>
        <div className='absolute left-0 top-0 -z-10 size-full'>
          <img src={bannerImg} alt='banner image h-full' className='object-cover' />
        </div>
      </div>
    </div>
  )
}

export default CollectionHeader
