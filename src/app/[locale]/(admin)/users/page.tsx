import React from "react";
import "./users.scss"
import UsersList from "@/components/admin/users/UsersList/UsersList";
import DataTable from "@/components/UI/DataTable/DataTable";
import PaginationControl from "@/components/UI/PaginationControl/PaginationControl";
import {getAllUsers} from "@/actions/getAllUsers";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import UsersWrapper from "@/components/admin/users/UsersWrapper/UsersWrapper";
import {cookies} from 'next/headers'
import {redirect} from "next/navigation";

export default async function Home({
                                       searchParams
                                   }
                                       :
                                       {
                                           searchParams: { [key: string]: string | string[] | undefined }
                                       }
) {

    const role = cookies().get('role')

    const page = searchParams["page"] ?? "1"
    const allUsers = await getAllUsers("users", page.toString(), "1000")

    const countObj = allUsers.total
    const currentPage = allUsers.currentPage
    const totalPages = allUsers.totalPages

    if (role?.value !== "admin") {
        redirect("/admin");
    }
    return (
        <div className="container-settings-admin">
            <UsersWrapper data={allUsers}/>
            <PaginationControl
                totalPages={totalPages}
            />
        </div>
    );
}
