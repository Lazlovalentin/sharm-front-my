"use client"
import React, {FC, ReactNode, Suspense} from 'react';

interface BlaSuspenseProps {
    children: ReactNode;
}
const BlaSuspense: FC<BlaSuspenseProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};

export default BlaSuspense;