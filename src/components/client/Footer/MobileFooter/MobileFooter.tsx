import {Fragment} from "react";
import "./MobileFooter.scss";
import {Twitter, Facebook, Insta, Phone} from "../../../svg";
import {ActiveLink} from "@/components/UI/ActiveLink/ActivLink";
import {Line} from "@/components/UI/Line/Line";
import {footerData} from "@/mokData/footerData";
import Accordion from "@/components/UI/Accordion/Accordion";

export const MobileFooter = () => {
    return (
        <div className="mobile-only footer-mobile-container mobile-only">
            <div className="footer-mobile-information">
                {footerData.slice(0, 2).map(({id, titleName, names}) => (
                    <Fragment key={id}>
                        <Accordion title={titleName}>
                            {names.map(({id, name, path}) => (
                                <li
                                    key={id}
                                    className="footer-navigation-menu-item"
                                >
                                    <ActiveLink rout={path}>{name}</ActiveLink>
                                </li>
                            ))}
                        </Accordion>
                    </Fragment>
                ))}
                <a href="tel:0800505113" className="footer-pnohe active-link">
                    <Phone/>
                    <span>[0800 50 51 13]</span>
                </a>
                <Line isAbsolute/>
                <ul className="footer-social-list">
                    <li className="footer-social-item">
                        <a
                            className="footer-social-link"
                            href="/"
                            target="_blank"
                        >
                            <Twitter/>
                        </a>
                    </li>
                    <li className="footer-social-item">
                        <a
                            className="footer-social-link"
                            href="/"
                            target="_blank"
                        >
                            <Insta/>
                        </a>
                    </li>
                    <li className="footer-social-item">
                        <a
                            className="footer-social-link"
                            href="/"
                            target="_blank"
                        >
                            <Facebook/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
