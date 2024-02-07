import React, {ReactNode} from 'react';
import LoginPage from "@/components/admin/Login/login";
import {redirect} from "next/navigation";
import {cookies} from 'next/headers'

interface IsLoginProps {
    children: ReactNode;
}

const IsLogin: React.FC<IsLoginProps> = ({children}) => {
    const cookieStore = cookies()
    let role = cookieStore.get("logIn")

    return (
        <div>
            {role?.value === "true" ?
                <>
                    {children}
                </>
                :
                <>
                    <LoginPage/>
                </>
            }
        </div>
    );
};

export default IsLogin;
