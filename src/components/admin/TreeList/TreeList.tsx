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
  const firstRef = useRef(null);
  const [{ isOver, canDrop }, drop] = useDrop(
    {
      accept: ItemType,
      hover(item: { id: string }, monitor) {
        // monitor.isOver({ shallow: true });
        // if (!firstRef.current) {
        //   return;
        // }
        // if (!monitor.isOver() && item.id !== data.id) {
        //   return;
        // }
        if (!monitor.isOver()) {
          return;
        }
        if (item.id !== data.id) {
          setIsOpen(true); 
        }
      },
      drop(item: { id: string }, monitor) {
        setIsOpen(false);
        if (!monitor.didDrop() && item.id !== data.id) {
          onMoveItem(item.id, data.id);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    },
    [data.id]
  );

  drag(drop(ref));

  const handleAddChildrenClick = (data: string) => {
    setOpenModal(true);
  };

  return (
    <div>
      <div ref={ref} className={`wrapper-tree-list ${isOver ? "hovered" : ""}`}>
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
