"use server"
import React from 'react';
import "./UsersList.scss";
import UserItem from "@/components/admin/users/UserItem/UserItem";
import {getAction} from "@/actions/getAction";

export default async function UsersList() {
    const allUsers = await getAction("users", "1", "1")

    return (
        <div className="container-user-list">
            <div className="headers-user-list">
                <div className="id">id</div>
                <div className="date">date</div>
                <div className="date">date</div>
                <div className="date">date</div>
                <div className="boolean">isDelete</div>
                <div className="date">name</div>
                <div className="date">surname</div>
                <div className="email">email</div>
                <div className="boolean">isEmailVerified</div>
                <div className="date">phone</div>
                <div className="boolean">isPhoneVerified</div>
                <div className="date">role</div>
            </div>
            {allUsers.data.map((user: any) =>
                <UserItem key={user.id} user={user}/>
            )}
        </div>
    );
};

