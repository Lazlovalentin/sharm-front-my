'use client'
import React, {FC, ReactNode} from 'react';
import "./ActiveLink.scss"
import Link from "next/link";
import {usePathname} from 'next/navigation'

interface ActiveLinkType {
    children: ReactNode;
    rout: string
}

export const ActiveLink: FC<ActiveLinkType> = ({children, rout}) => {
    const pathname = usePathname()

    return (
        <Link className="active-link" href={rout}
              style={{color: pathname === `${rout}` ? '#E56466' : ''}}
        >
            {children}
        </Link>
    );
};
