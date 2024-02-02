"use client";
import React from 'react';
import {useUser} from "@/store/admin/user";

const LogOut = () => {
    const {resetUser} = useUser()

    return (
        <button onClick={() => resetUser()}>
            LogOut
        </button>
    );
};

export default LogOut;