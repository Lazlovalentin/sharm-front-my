"use client"
import "./settings.scss"
import CreateUser from "@/components/admin/users/CreateUser/CreateUser";
import UsersList from "@/components/admin/users/UsersList/UsersList";
import ChangeRole from "@/components/admin/users/ChangeRole/ChangeRole";

export default function Home() {


    return (
        <div className="container-settings-admin">
            <CreateUser/>

            <UsersList/>

            <ChangeRole/>

        </div>
    );
}
