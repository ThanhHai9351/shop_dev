import type { FC } from "react"
import React from "react"
import { NavLink } from "react-router-dom"

interface BlogCardProps {
  title: string
  brief: string
  date: string
  coverImage: string
  tag: "Style" | "Fitting" | "General"
  slug: string
}
const BlogPostCard: FC<BlogCardProps> = ({ title, coverImage, date, tag, brief, slug }) => {
  return (
    <NavLink to={`/blogs/news/${slug}`}>
      <div className='flex h-full flex-col overflow-hidden rounded-md bg-white dark:bg-neutral-900 md:flex-row'>
        <div className='relative aspect-[4/3] h-full basis-1/2 overflow-hidden bg-neutral-300'>
          <img
            src={coverImage}
            alt='blog post graphic'
            className='scale-105 object-cover transition-all duration-300 group-hover:scale-100 h-full'
            sizes='100%'
          />
        </div>
        <div className='basis-1/2 p-6 lg:group-first:px-14 lg:group-first:py-10'>
          <div className='flex h-full flex-col justify-between'>
            <div>
              <span className='inline-block rounded-sm bg-neutral-200 px-2 py-1 text-xs group-first:mb-12 dark:bg-neutral-950'>
                {tag}
              </span>
            </div>
            <div>
              <h3 className='mb-2 font-semibold group-hover:text-primary dark:group-hover:text-neutral-400 lg:group-first:text-[40px]'>
                {title}
              </h3>
              <p className='line-clamp-4 text-ellipsis text-neutral-500 group-first:block lg:hidden lg:group-first:text-lg'>
                {brief}
              </p>
              <div className='mt-3'>
                <p className='flex flex-wrap text-sm'>
                  <span className='pr-2'>by Devsphere labs</span>
                  <span>{date}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default BlogPostCard
