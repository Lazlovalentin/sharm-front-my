"use client";
import React, { FC, useState } from "react";
import "./WrapperCategory.scss";
import TreeList from "@/components/admin/TreeList/TreeList";
import MyModal from "@/components/UI/MyModal/MyModal";
import CreateUser from "@/components/admin/users/CreateUser/CreateUser";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import { patchAction } from "@/actions/patchAction";
import { useRouter } from "next/navigation";
import CreateMenu from "@/components/admin/CreateMenu/CreateMenu";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import MenuItem from "../MenuItem/MenuItem";
import CreateCategory from "../CreateCategory/CreateCategory";

interface WrapperCategoryProps {
  categories: any;
}

const WrapperCategory: FC<WrapperCategoryProps> = ({ categories }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const handleCategoryClick = (category: any) => setCategory(category);
  const openCreateCategoryHandler = () => setOpenModal(!openModal);
  const moveItem = (dragId: string, hoverId: string) => {
    if (dragId === hoverId) {
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
    <>
      <MyBtn
        text={"create category"}
        color={"primary"}
        click={openCreateCategoryHandler}
      />
      {categories.length === 0 ? <h3>no categories</h3> : null}
      <div className="container-wrapper-category">
        <div className="container-tree-list">
          <DndProvider backend={HTML5Backend}>
            {categories.map((category: any) => (
              <TreeList
                key={category.id}
                data={category}
                onFolderClick={handleCategoryClick}
                onMoveItem={moveItem}
              />
            ))}
          </DndProvider>
        </div>
        <div className="container-category-choose">
          {selectedCategory ? (
            <MenuItem
              parentId={category[0].id}
              menu={selectedCategory}
              setVisible={setSelectedCategory}
            />
          ) : null}
        </div>
      </div>
      <MyModal visible={openModal} setVisible={setOpenModal}>
        <CreateCategory
          // parentId={category[0]?.id || null}
          parentId="1"
          setVisible={setOpenModal}
        />
      </MyModal>
    </>
  );
};

export default WrapperCategory;
