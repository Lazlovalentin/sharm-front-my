import FAQ from "@/components/client/FAQ/FAQ";
import {Footer} from "@/components/client/Footer/Footer";
import PopularCategories from "@/components/client/PopularCategories/PopularCategories";
import {mockCategories} from "@/mokData/mockPopularCategories";

export default function Home() {
    return (
        <main>
            <PopularCategories categories={mockCategories}/>
            <FAQ/>
            <Footer/>
        </main>
    );
}
