"use client"
import React, {FC, ReactNode} from 'react';
import {ThemeProvider} from "next-themes";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

interface MyThemeProviderProps {
    children: ReactNode;
}

const MyThemeProvider: FC<MyThemeProviderProps> = ({children}) => {
    gsap.registerPlugin(ScrollTrigger);
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
};

export default MyThemeProvider;