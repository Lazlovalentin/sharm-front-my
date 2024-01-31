"use client"
import React, {ReactNode, useLayoutEffect, useState} from 'react';
import {useUser} from "@/store/admin/user";
import LoginPage from "@/components/admin/Login/login";
import {redirect} from "next/navigation";

interface IsLoginProps {
    children: ReactNode;
}

const IsLogin: React.FC<IsLoginProps> = ({ children }) => {
    const {role} = useUser()
    const [isLogin, setIslogin] = useState<boolean>(false)

    const item = window.localStorage.getItem("user-store");
    const item2 = item ? JSON.parse(item) : null;

    useLayoutEffect(() => {
        if (item2.state.role !== null) {
            setIslogin(true)
        } else {
         //   redirect("/admin")
        }
    }, [item2]);



    return (
        <div>
            {!isLogin ?
                <LoginPage/>
                :
                <>
                    {children}
                </>
            }
        </div>
    );
};

export default IsLogin;