import React from 'react';
import "./Dashboard.scss"
import Link from "next/link";
import LogOut from "@/components/admin/LogOut/LogOut";

const Dashboard = () => {
    return (
        <div className="container-dashboard-admin">
            <Link href={"admin"}>
                profile
            </Link>
            <Link href={"/admin/users"}>
                statistic
            </Link>
            <Link href={"/admin/users"}>
                orders
            </Link>
            <Link href={"/admin/users"}>
                menu
            </Link>
            <Link href={"/admin/users"}>
                categories
            </Link>
            <Link href={"/admin/users"}>
                products
            </Link>
            <Link href={"/admin/users"}>
                pages
            </Link>
            <Link href={"/admin/users"}>
                users
            </Link>
            <Link href={"/admin/users"}>
                reviews
            </Link>
            <Link href={"settings"}>
                settings
            </Link>
            <LogOut/>
        </div>
    );
};

export default Dashboard;