"use client";
import React, { FC, useState } from "react";
import "./WrapperCategory.scss";
import TreeList from "@/components/admin/TreeList/TreeList";
import MyModal from "@/components/UI/MyModal/MyModal";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import { patchAction } from "@/actions/patchAction";
import { useRouter } from "next/navigation";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import CreateCategory from "../CreateCategory/CreateCategory";
import CategoryItem from "../CategoryItem/CategoryItem";

interface WrapperCategoryProps {
  categories: any;
}

const WrapperCategory: FC<WrapperCategoryProps> = ({ categories }) => {
  console.log("categories", categories);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const handleCategoryClick = (categories: any) =>
    setSelectedCategory(categories);
  const openCreateCategoryHandler = () => setOpenModal(!openModal);
  const moveItem = (dragId: string, hoverId: string) => {
    if (dragId === hoverId || dragId === categories[0]?.id) {
      return;
    }
    const moveData = {
      nodeId: dragId,
      parentId: hoverId,
    };
    patchAction("categories", moveData, { move: true })
      .then((response) => {
        router.refresh();
      })
      .catch((error) => {
        console.error("Error moving item:", error);
      });
  };
  return (
    <>
      {" "}
      <div className="container-wrapper-category">
        <MyBtn
          text={"create category"}
          color={"primary"}
          click={openCreateCategoryHandler}
        />
        {categories.length === 0 ? <h3>no categories</h3> : null}
        <div className="category-wrapper ">
          <div className="container-tree-list">
            <DndProvider backend={HTML5Backend}>
              {categories.map((category: any) => (
                <TreeList
                  key={category.id}
                  data={category}
                  onFolderClick={handleCategoryClick}
                  onMoveItem={moveItem}
                  modalType={"Category"}
                />
              ))}
            </DndProvider>
          </div>
          <div>
            {selectedCategory ? (
              <CategoryItem
                parentId={categories[0].id}
                category={selectedCategory}
                setVisible={setSelectedCategory}
              />
            ) : null}
          </div>
        </div>
        <MyModal visible={openModal} setVisible={setOpenModal}>
          <CreateCategory
            parentId={categories[0]?.id || null}
            setVisible={setOpenModal}
          />
        </MyModal>
      </div>
    </>
  );
};

export default WrapperCategory;
