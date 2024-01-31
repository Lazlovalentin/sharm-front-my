import React from 'react';
import "./Dashboard.scss"
import Link from "next/link";

const Dashboard = () => {
    return (
        <div className="container-dashboard-admin">
            <Link href={"/admin/users"}>
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
            <Link href={"/admin/users"}>
                seting
            </Link>
            <div>
                log out
            </div>
        </div>
    );
};

export default Dashboard;