import React, {FC} from 'react';
import "./MenuItem.scss"
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";

interface MenuItemProps {
    menu: any
}

const MenuItem: FC<MenuItemProps> = ({menu}) => {

    return (
        <div className="container-menu-item">
            <MyInput type={"text"} placeholder={`${menu.translations[0].name}`}/>
            <MyInput type={"text"} placeholder={`${menu.translations[0].url}`}/>
            <MyBtn text={"submit"} color={"primary"}/>
            <MyBtn text={"delete"} color={"attention"}/>
        </div>
    );
};

export default MenuItem;