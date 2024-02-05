"use server";
import React from 'react';
import {useApi} from "@/hooks/useApi";
import {gerAllUsers} from "@/actions/getAllUsers";



export default async function UsersList() {

    const allUsers = await gerAllUsers();

    console.log("allUsers", allUsers)

    return (
        <div>
            {allUsers.data.map((user: any) =>
                <div key={user.id}>{user.email}</div>
            )}
        </div>
    );
};

