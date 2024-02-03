"use client";
import React from 'react';
import {useUser} from "@/store/admin/user";
import Image from "next/image";
import logOut from "./logOut.svg"

const LogOut = () => {
    const {resetUser} = useUser()

    return (
        <button onClick={() => resetUser()}>
            <Image src={logOut} alt={"logo"}/>
        </button>
    );
};

export default LogOut;