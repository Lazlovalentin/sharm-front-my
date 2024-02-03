"use client"
import "./settings.scss"
import CreateUser from "@/components/admin/users/CreateUser/CreateUser";
import UsersList from "@/components/admin/users/UsersList/UsersList";
import {useState} from "react";

export default function Home() {
    const [tabs, setTabs] = useState(2)
    
    return (
        <div className="container-settings-admin">
            <div>
                <button onClick={() => setTabs(1)}>create user</button>
                <button onClick={() => setTabs(2)}>User List</button>
            </div>
            {tabs === 1 && <CreateUser/>}
            {tabs === 2 && <UsersList/>}
        </div>
    );
}
