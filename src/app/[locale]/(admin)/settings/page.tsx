import "./settings.scss"
import React from "react";
import UsersList from "@/components/admin/users/UsersList/UsersList";

const Home = () => {

    return (
        <div className="container-settings-admin">
            <UsersList/>
        </div>
    );
}

export default Home