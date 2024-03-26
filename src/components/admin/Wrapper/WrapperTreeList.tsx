"use client";
import React, { FC, useState } from "react";
import "./WrapperTreeList.scss";
import TreeList from "@/components/admin/TreeList/TreeList";
import MyModal from "@/components/UI/MyModal/MyModal";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import CreateMenu from "@/components/admin/CreateMenu/CreateMenu";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { patchAction } from "@/actions/patchAction";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CreateCategory from "../CreateCategory/CreateCategory";

interface WrapperProps {
  data: any;
  type: string;
  children: React.ReactNode;
}
export type ModalComponents = {
  [key: string]: React.ReactNode;
};
const Wrapper: FC<WrapperProps> = ({ data, type, children }) => {
  const router = useRouter();
  const t = useTranslations("Menu");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const handleItemClick = (item: any) => setSelectedItem(item);
  const openCreateHandler = () => setOpenModal(!openModal);

  const modalComponents: ModalComponents = {
    menu: (
      <CreateMenu parentId={data[0]?.id || null} setVisible={setOpenModal} />
    ),
    category: (
      <CreateCategory
        parentId={data[0]?.id || null}
        setVisible={setOpenModal}
      />
    ),
  };

  const modalComponent = modalComponents[type] || null;

  const moveItem = (dragId: string, hoverId: string) => {
    if (dragId === hoverId || dragId === data[0]?.id) {
      return;
    }
    const moveData = {
      nodeId: dragId,
      parentId: hoverId,
    };
    const endpoint = type === "category" ? "categories" : type;
    patchAction(endpoint, moveData, { move: true })
      .then((_) => {
        router.refresh();
      })
      .catch((error) => {
        console.error("Error moving item:", error);
      });
  };

  return (
    <div className="container-wrapper">
      <MyBtn
        text={`${t(`create_${type}`)}`}
        color={"primary"}
        click={openCreateHandler}
      />
      {data.length === 0 ? <h3>{t("nothing_here")}</h3> : null}
      <div className="wrapper-tree">
        <div className="container-tree-list">
          <DndProvider backend={HTML5Backend}>
            {data.map((item: any) => (
              <TreeList
                key={item.id}
                data={item}
                onFolderClick={handleItemClick}
                onMoveItem={moveItem}
                type={type}
              />
            ))}
          </DndProvider>
        </div>
        {selectedItem &&
          React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                parentId: data[0].id,
                [type]: selectedItem,
                setVisible: setSelectedItem,
              } as any);
            }
            return null;
          })}
      </div>
      <MyModal visible={openModal} setVisible={setOpenModal}>
        {modalComponent}
      </MyModal>
    </div>
  );
};

export default Wrapper;
