import React from 'react';
import Image from "next/image";
import logOut from "./logOut.svg"
import {cookies} from "next/headers";

const LogOut = () => {

    async function createInvoice() {
        'use server'
        cookies().delete('logIn')
        cookies().delete('id')
        cookies().delete('email')
        cookies().delete('role')
        cookies().delete('token')
    }

    return (
        <form action={createInvoice}>
            <button>
                <Image src={logOut} alt={"logo"}/>
            </button>
        </form>
    );
};

export default LogOut;