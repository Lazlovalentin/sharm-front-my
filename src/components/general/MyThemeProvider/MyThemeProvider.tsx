"use client"
import React, {FC, ReactNode} from 'react';
import {ThemeProvider} from "next-themes";

interface MyThemeProviderProps {
    children: ReactNode;
}

const MyThemeProvider: FC<MyThemeProviderProps> = ({children}) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
};

export default MyThemeProvider;