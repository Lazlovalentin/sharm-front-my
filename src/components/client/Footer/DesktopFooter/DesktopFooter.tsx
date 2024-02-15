import Image from "next/image";
import "./DesktopFooter.scss";
import {Visa, Mastercard, Twitter, Insta, Facebook} from "../../../svg";
import {ActiveLink} from "@/components/UI/ActiveLink/ActivLink";
import {footerData, footerDescriptionMok} from "@/mokData/footerData";
import Link from "next/link";

export const DesktopFooter = () => {
    return (
        <div className="container-footer-client desktop-only">
            <div className="footer-navigation-menu">
                {footerData.map(({id, titleName, names}) => (
                    <ul key={id}>
                        <li className="footer-navigation-menu-title">
                            {titleName}
                        </li>
                        {names.map(({id, name, path}) => (
                            <li key={id} className="footer-navigation-menu-item">
                                <ActiveLink rout={path}>{name}</ActiveLink>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className="wrapper-footer-info">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={200} height={99}/>
                </Link>
                <span className="footer-info-title">Ми завжди на звʼязку!</span>
                <ul className="footer-social-list">
                    <li><a href="/" target="_blank"><Twitter/></a></li>
                    <li><a href="/" target="_blank"><Insta/></a></li>
                    <li><a href="/" target="_blank"><Facebook/></a></li>
                </ul>
                <p className="footer-info-text">
                    Ви можете написати нам лист
                    <br/>
                    або зателефонувати за номерами
                </p>
                <address>
                    <ul>
                        <li><a href="mailto:info@sharmbeauty.ua">info@sharmbeauty.ua</a></li>
                        <li><a href="tel:0800505113">0 (800) 50 51 13</a></li>
                        <li><a href="tel:0442993555">(044) 299 35 55</a></li>
                    </ul>
                </address>
                <p className="footer-working-hours">
                    Щоденно з 8:00 до 20:00
                </p>
                <Visa/>
                <Mastercard/>
            </div>
        </div>
    );
};
