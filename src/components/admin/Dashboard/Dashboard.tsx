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
import {cookies} from "next/headers";

const Dashboard = () => {
    const role = cookies().get('role')
    return (
        <div className="container-dashboard-admin">
            <Link href={"admin"}>
                <Image src={profile} alt={"profile"}/>
            </Link>
            <Link href={"users"}>
                <Image src={statistic} alt={"statistic"}/>
            </Link>
            <Link href={"users"}>
                <Image src={orders} alt={"orders"}/>
            </Link>
            <Link href={"menu"}>
                <Image src={menu} alt={"menu"}/>
            </Link>
            <Link href={"categories"}>
                <Image src={categories} alt={"categories"}/>
            </Link>
            <Link href={"products"}>
                <Image src={products} alt={"products"}/>
            </Link>
            <Link href={"pages"}>
                <Image src={pages} alt={"pages"}/>
            </Link>
            {role?.value === "admin" ?
                <Link href={"users"}>
                    <Image src={users} alt={"users"}/>
                </Link>
                : null}
            <Link href={"reviews"}>
                <Image src={reviews} alt={"reviews"}/>
            </Link>
            <Link href={"settings"}>
                <Image src={settings} alt={"logo"}/>
            </Link>
            <LogOut/>
        </div>
    );
};

export default Dashboard;