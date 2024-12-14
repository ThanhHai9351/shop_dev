import SectionBlogs from "@/components/blog/SectionBlogs"
import Breadcrumbs from "@/components/Breadcrumbs"
import ButtonLink from "@/shared/Button/ButtonLink"

const NewsPage = () => {
  const breadcrumbitems = [{ title: <ButtonLink href='/'>Home</ButtonLink> }, { title: "Journal" }]
  return (
    <main className='p-5'>
      <div className='container '>
        <div className='mb-1'>
          <Breadcrumbs Items={breadcrumbitems} />
        </div>
        <div>
          <h1 className='text-4xl font-semibold mb-5'>Journal</h1>
        </div>
      </div>
      <SectionBlogs />
    </main>
  )
}

export default NewsPage
