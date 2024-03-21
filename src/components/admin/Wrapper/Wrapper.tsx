"use client";
import React, { FC, useState } from "react";
import "./Wrapper.scss";
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
import CategoryItem from "../CategoryItem/CategoryItem";
import CreateCategory from "../CreateCategory/CreateCategory";

interface WrapperProps {
  data: any;
  type: "categories" | "menu";
}

const Wrapper: FC<WrapperProps> = ({ data, type }) => {
  const router = useRouter();
  const t = useTranslations("Menu");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const handleItemClick = (item: any) => setSelectedItem(item);
  const openCreateHandler = () => setOpenModal(!openModal);

  const moveItem = (dragId: string, hoverId: string) => {
    if (dragId === hoverId || dragId === data[0]?.id) {
      return;
    }
    const moveData = {
      nodeId: dragId,
      parentId: hoverId,
    };
    const endpoint = type === "menu" ? "menu" : "categories";
    patchAction(endpoint, moveData, { move: true })
      .then((response) => {
        router.refresh();
      })
      .catch((error) => {
        console.error("Error moving item:", error);
      });
  };

  return (
    <div className="container-wrapper">
      <MyBtn
        text={`create ${type === "categories" ? "category" : "menu"}`}
        color={"primary"}
        click={openCreateHandler}
      />
      {data.length === 0 ? <h3>no {type}</h3> : null}
      <div className="wrapper-menu">
        <div className="container-tree-list">
          <DndProvider backend={HTML5Backend}>
            {data.map((item: any) => (
              <TreeList
                key={item.id}
                data={item}
                onFolderClick={handleItemClick}
                onMoveItem={moveItem}
                modalType={type === "menu" ? "Menu" : "Category"}
              />
            ))}
          </DndProvider>
        </div>
        {selectedItem && type === "menu" ? (
          <MenuItem
            parentId={data[0].id}
            menu={selectedItem}
            setVisible={setSelectedItem}
          />
        ) : selectedItem && type === "categories" ? (
          <CategoryItem
            parentId={data[0].id}
            category={selectedItem}
            setVisible={setSelectedItem}
          />
        ) : null}
      </div>
      <MyModal visible={openModal} setVisible={setOpenModal}>
        {type === "menu" ? (
          <CreateMenu
            parentId={data[0]?.id || null}
            setVisible={setOpenModal}
          />
        ) : (
          <CreateCategory
            parentId={data[0]?.id || null}
            setVisible={setOpenModal}
          />
        )}
      </MyModal>
    </div>
  );
};

export default Wrapper;
