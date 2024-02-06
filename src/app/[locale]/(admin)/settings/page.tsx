import "./settings.scss"
import React from "react";
import UsersList from "@/components/admin/users/UsersList/UsersList";
import DataTable from "@/components/UI/DataTable/DataTable";
import PaginationControl from "@/components/UI/PaginationControl/PaginationControl";
import {getAllUsers} from "@/actions/getAllUsers";

const columns = [{
    id: 'id',
    headerName: 'ID',
    width: 90
}]
export default async function Home({
                                       searchParams
                                   }
                                       :
                                       {
                                           searchParams: { [key: string]: string | string[] | undefined }
                                       }
) {

    const page = searchParams["page"] ?? "1"
    const allUsers = await getAllUsers("users", page.toString(), "1")

    const countObj = allUsers.total
    const currentPage = allUsers.currentPage
    const totalPages = allUsers.totalPages

    return (
        <div className="container-settings-admin">
            <DataTable
                columns={columns}
                data={allUsers}
            />
            <PaginationControl
                totalPages={totalPages}
            />
        </div>
    );
}
