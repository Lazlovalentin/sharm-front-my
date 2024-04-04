import FAQ from "@/components/client/FAQ/FAQ";
import { Footer } from "@/components/client/Footer/Footer";
import PopularCategories from "@/components/client/PopularCategories/PopularCategories";
import { mockCategories } from "@/mokData/mockPopularCategories";
import Banner from "@/components/client/Banner/Banner";
import { bannerData } from "@/mokData/bannerData";
import Testimonials from "@/components/client/Testimonials/Testimonials";
import { testimonialsData } from "@/mokData/testimonialsData";

export default function Home() {
  return (
    <main className="main-container">
      <Banner data={bannerData} />
      <PopularCategories categories={mockCategories} />
      <FAQ />
      <Testimonials data={testimonialsData} />
      <Footer />
    </main>
  );
}
