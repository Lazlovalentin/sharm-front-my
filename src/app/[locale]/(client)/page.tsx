import FAQ from "@/components/client/FAQ/FAQ";
import {Footer} from "@/components/client/Footer/Footer";
import PopularCategories from "@/components/client/PopularCategories/PopularCategories";
import {mockCategories} from "@/mokData/mockPopularCategories";
import Banner from "@/components/client/Banner/Banner";
import {bannerData} from "@/mokData/bannerData";

export default function Home() {
    return (
        <main className="main-container">
            <Banner data={bannerData}/>
            <PopularCategories categories={mockCategories}/>
            <FAQ/>
            <Footer/>
        </main>
    );
}
