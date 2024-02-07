import React from "react";
import "./users.scss"
import UsersList from "@/components/admin/users/UsersList/UsersList";
import DataTable from "@/components/UI/DataTable/DataTable";
import PaginationControl from "@/components/UI/PaginationControl/PaginationControl";
import {getAllUsers} from "@/actions/getAllUsers";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import UsersWrapper from "@/components/admin/users/UsersWrapper/UsersWrapper";


export default async function Home({
                                       searchParams
                                   }
                                       :
                                       {
                                           searchParams: { [key: string]: string | string[] | undefined }
                                       }
) {

    const page = searchParams["page"] ?? "1"
    const allUsers = await getAllUsers("users", page.toString(), "5")

    console.log("allUsers", allUsers)

    const countObj = allUsers.total
    const currentPage = allUsers.currentPage
    const totalPages = allUsers.totalPages

    return (
        <div className="container-settings-admin">
            <UsersWrapper data={allUsers}/>
            <PaginationControl
                totalPages={totalPages}
            />
        </div>
    );
}
