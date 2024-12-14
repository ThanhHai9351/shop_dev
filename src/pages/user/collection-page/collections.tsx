import Breadcrumbs from "@/components/Breadcrumbs"
import CategoriesSection from "@/pages/user/collection-page/collection-session"
import ButtonLink from "@/shared/Button/ButtonLink"

const CollectionsPage = () => {
  const breadcrumbItems = [{ title: <ButtonLink href='/'>Home</ButtonLink> }, { title: "Collections" }]
  return (
    <main className='pb-24  p-5'>
      <div className='container mb-6'>
        <Breadcrumbs Items={breadcrumbItems} />
      </div>
      <CategoriesSection />
    </main>
  )
}

export default CollectionsPage
