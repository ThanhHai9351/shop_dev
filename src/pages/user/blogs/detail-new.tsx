import { pathOr } from "ramda"
import { useEffect, useState } from "react"
import SectionBlogBody from "@//components/blog/SectionBlogBody"
import SectionBlogHero from "@/components/blog/SectionBlogHero"
import BlogCard from "@/components/BlogCard"
import Breadcrumbs from "@/components/Breadcrumbs"
import { blogs } from "@/data/content"
import ButtonLink from "@/shared/Button/ButtonLink"
import ButtonSecondary from "@/shared/Button/ButtonSecondary"
import { useLocation } from "react-router-dom"
import { BlogType } from "@/data/types"

const DetailNewPage = () => {
  const [news, setNews] = useState<BlogType>(null)
  const location = useLocation()
  const path = location.pathname
  const slug = path.split("/")[3]

  useEffect(() => {
    const getBlogData = blogs.find((item) => item.slug === slug)

    setNews((getBlogData as BlogType) || {})
  }, [slug])

  if (!news) {
    return <div>Loading...</div>
  }
  console.log(news)

  const breadcrumbItems = [{ title: <ButtonLink href='/'>Home</ButtonLink> }, { title: news.title }]
  return (
    <div className='container p-5'>
      <Breadcrumbs Items={breadcrumbItems} />
      <div className='pt-2'>
        <SectionBlogHero coverImage={news.coverImage} title={news.title} tag={news.tag} date={news.date} />
      </div>

      <div className='pb-24 pt-20'>
        <SectionBlogBody blogData={news.blogData} />
      </div>
      <div className='border-t border-neutral-300 pb-36 pt-8 dark:border-neutral-600'>
        <h3 className='mb-4 text-sm text-neutral-500'>YOU MAY BE INTERESTED</h3>
        <ul className='grid grid-cols-12 gap-x-2  gap-y-8'>
          {blogs?.slice(0, 6).map((blog) => (
            <li key={blog.slug} className='col-span-12 md:col-span-4 xl:col-span-2'>
              <BlogCard coverImage={blog.coverImage} title={blog.title} slug={blog.slug} />
            </li>
          ))}
        </ul>
        <div className='text-center'>
          <ButtonSecondary className='w-full'>Read All</ButtonSecondary>
        </div>
      </div>
    </div>
  )
}

export default DetailNewPage
