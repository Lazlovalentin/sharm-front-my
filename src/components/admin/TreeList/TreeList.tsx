"use client";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import "./TreeList.scss";
import { useDrag, useDragDropManager, useDrop } from "react-dnd";

type TreeListProps = {
  data: any;
  isRootElement?: boolean;
  onEditClick: (item: any) => void;
  onAddClick: (item: any) => void;
  onMoveItem: (dragId: string, hoverId: string) => void;
  type: string;
};
type TreeNode = {
  id: string;
  children: TreeNode[];
}
function getChildrenId(tree: TreeNode[], acc: string[]) {
  return tree.reduce((accu, child) => {
    accu.push(child.id);
    child.children.length && getChildrenId(child.children, accu);
    return accu
  }, acc);
}

// eslint-disable-next-line react/display-name
const TreeList: FC<TreeListProps> = ({ data, onEditClick, onAddClick, onMoveItem, type, isRootElement = false }) => {
  
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenedAfterHovering, setIsOpenedAfterHovering] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const handleEdit = () => onEditClick(data);
  const handleAdd = () => onAddClick(data);
  
  const ItemType = "TREE_ITEM";

  const childrenIds = useMemo(() => getChildrenId(data.children, []), [data]);
  const globalIsDragging = Boolean(useDragDropManager().getMonitor().isDragging());

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: data.id,  children: childrenIds },
    canDrag: !isRootElement,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), 
    [data]
  );

  const [{ isOver, canDrop}, drop] = useDrop(
    {
      accept: ItemType,
      hover(item: { id: string; children: string[]}, monitor) {
        
        //hover effect only for current targeted item if it not the source item + has children + was not opened before hover + and can be a target item
        if (monitor.isOver({ shallow: true }) && item.id !== data.id && data.children.length && !isOpen && monitor.canDrop()) {
          setIsOpenedAfterHovering(true);
          setIsOpen(true);
        }
      },

      drop(item: { id: string; children: string[]}, monitor) {
        if (!monitor.didDrop() && item.id !== data.id ) {
          onMoveItem(item.id, data.id);
          setIsOpen(true);
        }
      },

      canDrop(item: { id: string; children: string[]}, monitor) {
        return item.id === data.id || item.children.some((item:string) => item === data.id) ? false : true
      },
      
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    },
    [data, isOpenedAfterHovering, isOpen],
  );
  
  useEffect(() => {
    //close all items that was opened when hovering
    if(!globalIsDragging && isOpenedAfterHovering) {
      setIsOpen(!isOpenedAfterHovering);
      setIsOpenedAfterHovering(false);
    };
  }, [globalIsDragging, isOpenedAfterHovering])

  drag(drop(ref));

  return (
    <>
      <div
        ref={ref}
        className={`wrapper-tree-list${isOver && canDrop? " hovered" : ""}${isRootElement ? ' hovered-root' : ''}${isOpen && data.children.length > 0 ? " expanded" : ""
          }${isDragging ? " dragged" : ""}${data.children.length > 0 ? "" : " empty"}`}
      >
        <div className="wrapper-result-tree-list">
          <div className={`open-tree`} onClick={toggle}>
            &rsaquo;
          </div>
          <div className={`name-tree`} onClick={toggle}>
            {data.translations &&
              data.translations.length > 0 &&
              data.translations[0].name || '***This value was erased due to a bug on the backend***'}
          </div>
          <div className="edit-block">
            <button className="add-children-btn" onClick={handleEdit}>
              Edit
            </button>
            |
            <button className="add-children-btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
        {isOpen && data.children && (
          <div className="tree-children">
            {data.children.map((child: any) => (
              <TreeList
                key={child.id}
                data={child}
                onEditClick={onEditClick}
                onAddClick={onAddClick}
                onMoveItem={onMoveItem}
                type={type}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TreeList;
