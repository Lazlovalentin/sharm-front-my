import React from 'react';
import NavBar from "@/components/client/NavBar/NavBar";
import "./Header.scss"

const Header = () => {
    return (
        <header>
            <div>top bar</div>
            <div>main bar</div>
            <NavBar/>
        </header>
    );
};

export default Header;