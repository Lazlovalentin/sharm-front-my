"use client"
import React, {ReactNode, useLayoutEffect, useState} from 'react';
import {useUser} from "@/store/admin/user";
import LoginPage from "@/components/admin/Login/login";
import {redirect} from "next/navigation";

interface IsLoginProps {
    children: ReactNode;
}

const IsLogin: React.FC<IsLoginProps> = ({children}) => {

    const {role} = useUser()
    const [isLogin, setIsLogin] = useState<boolean>(false)

    const item = typeof window !== 'undefined' ? window.localStorage.getItem("user-store") : null;
    const item2 = item ? JSON.parse(item) : null;

    useLayoutEffect(() => {
        if (item2.state.role !== null) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [role]);


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
/*
    let isLogin = false
    const item = typeof window !== 'undefined' ? window.localStorage.getItem("user-store") : null;
    const item2 = item ? JSON.parse(item) : null;

    if (item2?.state?.role !== null) {
        isLogin = true
    }

 */