import React from 'react';
import "./Dashboard.scss"
import Link from "next/link";
import LogOut from "@/components/admin/LogOut/LogOut";
import Image from "next/image";
import profile from "./img/profile.svg"
import statistic from "./img/statistic.svg"
import categories from "./img/categories.svg"
import reviews from "./img/reviews.svg"
import menu from "./img/menu.svg"
import orders from "./img/orders.svg"
import pages from "./img/pages.svg"
import settings from "./img/settings.svg"
import users from "./img/users.svg"
import products from "./img/products.svg"

const Dashboard = () => {
    return (
        <div className="container-dashboard-admin">
            <Link href={"admin"}>
                <Image src={profile} alt={"logo"}/>
            </Link>
            <Link href={"users"}>
                <Image src={statistic} alt={"logo"}/>
            </Link>
            <Link href={"users"}>
                <Image src={orders} alt={"logo"}/>
            </Link>
            <Link href={"users"}>
                <Image src={menu} alt={"logo"}/>
            </Link>
            <Link href={"users"}>
                <Image src={categories} alt={"logo"}/>
            </Link>
            <Link href={"users"}>
                <Image src={products} alt={"logo"}/>
            </Link>
            <Link href={"users"}>
                <Image src={pages} alt={"logo"}/>
            </Link>
            <Link href={"users"}>
                <Image src={users} alt={"logo"}/>
            </Link>
            <Link href={"users"}>
                <Image src={reviews} alt={"logo"}/>
            </Link>
            <Link href={"settings"}>
                <Image src={settings} alt={"logo"}/>
            </Link>
            <LogOut/>
        </div>
    );
};

export default Dashboard;