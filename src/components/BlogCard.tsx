import type { FC } from "react"
import React from "react"
import { Link } from "react-router-dom"

interface BlogCardProps {
  title: string
  // brief: string;
  // date: string;
  coverImage: string
  // tag: 'Style' | 'Fitting' | 'General';
  slug: string
}

const BlogCard: FC<BlogCardProps> = ({ title, coverImage, slug }) => {
  return (
    <div className='relative overflow-hidden rounded-md '>
      <Link to={`/blogs/news/${slug}`}>
        <div className='aspect-[4/3] w-full overflow-hidden rounded-md'>
          <img
            src={coverImage}
            alt='blog cover'
            className='size-full object-cover object-center'
            width={1000}
            height={1000}
          />
        </div>
      </Link>

      <div className='p-4'>
        <h3 className='card-title mb-1 line-clamp-2 text-ellipsis font-semibold'>{title}</h3>
        <p className='diivde-x text-xs'>
          <span>by Devsphere labs</span>
          <br />
          <span>February 23, 2023</span>
        </p>
      </div>
    </div>
  )
}

export default BlogCard
