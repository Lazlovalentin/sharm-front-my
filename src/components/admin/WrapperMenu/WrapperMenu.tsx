"use client";
import React, {FC, useState} from 'react';
import "./WrapperMenu.scss"
import TreeList from "@/components/admin/TreeList/TreeList";
import MyModal from "@/components/UI/MyModal/MyModal";
import CreateUser from "@/components/admin/users/CreateUser/CreateUser";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import CreateMenu from "@/components/admin/CreateMenu/CreateMenu";
import MenuItem from "@/components/admin/MenuItem/MenuItem";

interface WrapperCategoryProps {
    menu: any
}

const WrapperMenu: FC<WrapperCategoryProps> = ({menu}) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedMenu, setSelectedMenu] = useState<any>(null)
    const handleMenuClick = (menu: any) => setSelectedMenu(menu);
    const openCreateCategoryHandler = () => setOpenModal(!openModal);

    console.log(menu)

    return (
        <div className="container-wrapper-menu">
            <MyBtn text={"create menu"} color={"primary"} click={openCreateCategoryHandler}/>
            {menu.length === 0 ? <h3>no menu</h3> : null}
            <div className="wrapper-menu">
                <div className="trea-list">
                    {menu.map((menu: any) => (
                        <TreeList
                            key={menu.id}
                            data={menu}
                            onFolderClick={handleMenuClick}
                        />
                    ))}
                </div>
                {selectedMenu ? <MenuItem menu={selectedMenu}/> : null}
            </div>
            <MyModal visible={openModal} setVisible={setOpenModal}>
                <CreateMenu parentId={menu[0].id} setVisible={setOpenModal}/>
            </MyModal>
        </div>
    );
}

export default WrapperMenu;