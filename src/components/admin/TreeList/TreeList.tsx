"use client";
import React, { FC, useRef, useState } from "react";
import "./TreeList.scss";
import { useDrag, useDrop } from "react-dnd";
import MyModal from "@/components/UI/MyModal/MyModal";
import CreateMenu from "../CreateMenu/CreateMenu";
import MenuItem from "../MenuItem/MenuItem";

type CategoryProps = {
  data: any;
  onFolderClick: (item: any) => void;
  onMoveItem: (dragId: string, hoverId: string) => void;
  
};

const TreeList: FC<CategoryProps> = ({ data, onFolderClick, onMoveItem }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const handleClick = () => {
    onFolderClick(data);
  };

  const ItemType = "TREE_ITEM";
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemType,
    item: { id: data.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(
    {
      accept: ItemType,
      drop(item: { id: string }, monitor) {
        if (!monitor.didDrop() && item.id !== data.id) {
          onMoveItem(item.id, data.id);
        }
      },
    },
    [data.id]
  );

  drag(drop(ref));

  const handleAddChildrenClick = (data: string) => {
    setOpenModal(true);
  };

  return (
    <div>
      <div ref={ref} className="wrapper-tree-list">
        <div className="wrapper-resuly-tree-list">
          {data.children.length > 0 ? (
            <div className="open-tree" onClick={toggle}>
              {isOpen ? "[-]" : "[+]"}
            </div>
          ) : null}
          <div className="name-tree" onClick={handleClick}>
            {data.translations &&
              data.translations.length > 0 &&
              data.translations[0].name}
          </div>
          <button
            className="add-children-btn"
            onClick={() => handleAddChildrenClick(data.id)}>
            Add
          </button>
        </div>
        {isOpen && data.children && (
          <div style={{ paddingLeft: "10px" }}>
            {data.children.map((child: any) => (
              <TreeList
                key={child.id}
                data={child}
                onFolderClick={onFolderClick}
                onMoveItem={onMoveItem}
              />
            ))}
          </div>
        )}
      </div>
      <MyModal visible={openModal} setVisible={setOpenModal}>
        <CreateMenu parentId={data.id} setVisible={setOpenModal} />
      </MyModal>
    </div>
  );
};

export default TreeList;
