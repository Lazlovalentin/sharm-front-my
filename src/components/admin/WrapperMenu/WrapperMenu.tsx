"use client";
import React, { FC, useState } from "react";
import "./WrapperMenu.scss";
import TreeList from "@/components/admin/TreeList/TreeList";
import MyModal from "@/components/UI/MyModal/MyModal";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import CreateMenu from "@/components/admin/CreateMenu/CreateMenu";
import MenuItem from "@/components/admin/MenuItem/MenuItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { patchAction } from "@/actions/patchAction";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface WrapperMenuProps {
  menu: any;
}

const WrapperMenu: FC<WrapperMenuProps> = ({ menu }) => {
  const router = useRouter();
  const t = useTranslations("Menu");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>(null);

  const handleMenuClick = (menu: any) => setSelectedMenu(menu);
  const openCreateCategoryHandler = () => setOpenModal(!openModal);

  const moveItem = (dragId: string, hoverId: string) => {
    if (dragId === hoverId || dragId === menu[0]?.id) {
      return;
    }
    const moveData = {
      nodeId: dragId,
      parentId: hoverId,
    };
    patchAction("menu", moveData, { move: true })
      .then((response) => {
        router.refresh();
      })
      .catch((error) => {
        console.error("Error moving item:", error);
      });
  };

  return (
    <div className="container-wrapper-menu">
      <MyBtn
        text={t("create_menu")}
        color={"primary"}
        click={openCreateCategoryHandler}
      />
      {menu.length === 0 ? <h3>no menu</h3> : null}
      <div className="wrapper-menu">
        <div className="container-tree-list">
          <DndProvider backend={HTML5Backend}>
            {menu.map((menuItem: any) => (
              <TreeList
                key={menuItem.id}
                data={menuItem}
                onFolderClick={handleMenuClick}
                onMoveItem={moveItem}
                modalType={"Menu"}
              />
            ))}
          </DndProvider>
        </div>
        {selectedMenu ? (
          <MenuItem
            parentId={menu[0].id}
            menu={selectedMenu}
            setVisible={setSelectedMenu}
          />
        ) : null}
      </div>
      <MyModal visible={openModal} setVisible={setOpenModal}>
        <CreateMenu parentId={menu[0]?.id || null} setVisible={setOpenModal} />
      </MyModal>
    </div>
  );
};

export default WrapperMenu;
