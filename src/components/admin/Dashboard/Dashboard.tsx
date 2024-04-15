import React from "react";
import "./Dashboard.scss";
import Link from "next/link";
import LogOut from "@/components/admin/LogOut/LogOut";
import Image from "next/image";
import profile from "./img/profile.svg";
import statistic from "./img/statistic.svg";
import categories from "./img/categories.svg";
import reviews from "./img/reviews.svg";
import menu from "./img/menu.svg";
import orders from "./img/orders.svg";
import pages from "./img/pages.svg";
import settings from "./img/settings.svg";
import users from "./img/users.svg";
import products from "./img/products.svg";
import { cookies } from "next/headers";
import { DashboardItem } from "./DashboardItem";

const Dashboard = () => {
    const role = cookies().get("role");
    return (
        <div className="container-dashboard-admin">
            <DashboardItem href={"admin"} src={profile} alt={"profile"} />
            <DashboardItem href={"users"} src={statistic} alt={"statistic"} />
            <DashboardItem href={"users"} src={orders} alt={"orders"} />
            <DashboardItem href={"menu"} src={menu} alt={"menu"} />
            <DashboardItem href={"categories"} src={categories} alt={"categories"} />
            <DashboardItem href={"products"} src={products} alt={"products"} />
            <DashboardItem href={"pages"} src={pages} alt={"pages"} />
            {role?.value === "admin" ? (
                <DashboardItem href={"users"} src={users} alt={"users"} />
            ) : null}
            <DashboardItem href={"reviews"} src={reviews} alt={"reviews"} />
            <DashboardItem href={"settings"} src={settings} alt={"logo"} />
            <LogOut />
        </div>
    );
};

export default Dashboard;
