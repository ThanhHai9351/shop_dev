import BenefitsSection from "@/components/home/sections/Benefits"
import BestSellersSection from "@/components/home/sections/BestSellers"
import FAQsSection from "@/components/home/sections/FAQs"
import GuideSection from "@/components/home/sections/Guide"
import HeaderSection from "@/components/home/sections/Header"
import LatestBlogPostsSection from "@/components/home/sections/LatestBlogPosts"
import NewArrivals from "@/components/home/sections/NewArrival"
import PopluarCategoriesSection from "@/components/home/sections/PopluarCategories"
import RecommendedSection from "@/components/home/sections/Recommend"
import SponsorsSection from "@/components/home/sections/Sponsors"
import StylesSection from "@/components/home/sections/StylesSection"
const HomePage = () => {
  return (
    <main className='p-5'>
      <HeaderSection />
      <BestSellersSection />
      <StylesSection />
      <BenefitsSection />
      <RecommendedSection />
      <NewArrivals />
      <PopluarCategoriesSection />
      <SponsorsSection />
      <GuideSection />
      <LatestBlogPostsSection />
      <FAQsSection />
    </main>
  )
}

export default HomePage
