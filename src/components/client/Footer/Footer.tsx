import "./Footer.scss";
import {DesktopFooter} from "./DesktopFooter";
import {MobileFooter} from "./MobileFooter";
import {Line} from "@/components/UI/Line/Line";
import {footerDescriptionMok} from "@/mokData/footerData";

export const Footer = () => {
    return (
        <footer>
            <Line isAbsolute/>
            <DesktopFooter/>
            <MobileFooter/>
            <Line isAbsolute/>
            <div
                className="footer-desktop-about"
                dangerouslySetInnerHTML={{
                    __html: footerDescriptionMok.siteDescription,
                }}
            />
            <div className="footer-copyright-container">
                <p className="footer-copyright-text">
                    Інтернет-магазин преміальної декоративної косметики Sharm Beauty
                    <br/>
                    {`Copyright Ⓒ 2019-${new Date().getFullYear()}`}
                </p>
            </div>
        </footer>
    );
};
