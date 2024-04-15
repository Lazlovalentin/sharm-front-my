"use client";
import React, { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import useHttp from "@/actions/useHttp";
import TreeList from "@/components/admin/TreeList/TreeList";
import MyModal from "@/components/UI/MyModal/MyModal";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import CreateMenu from "@/components/admin/CreateMenu/CreateMenu";
import CreateCategory from "../CreateCategory/CreateCategory";

import "./WrapperTreeList.scss";

interface WrapperProps {
  data: any;
  type: string;
  children: React.ReactNode;
}
export type ModalComponents = {
  [key: string]: React.ReactNode;
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// eslint-disable-next-line react/display-name
const WrapperTreeList: FC<WrapperProps> = ({ data, type, children }) => {
  const router = useRouter();
  const t = useTranslations("Menu");
  const {request, error, clearError} = useHttp();

  const [selectedToEditItem, setSelectedToEditItem] = useState<any>(null);
  const [selectedToAddItem, setSelectedToAddItem] = useState<any>(null);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

  const handleEditClick = useCallback(
    (item: any) => {
      setSelectedToAddItem(false);
      setSelectedToEditItem(item);
    },
    [setSelectedToAddItem, setSelectedToEditItem],
  );

  const handleAddClick = useCallback(
    (item: any) => {
      setSelectedToEditItem(false);
      setSelectedToAddItem(item);
    },
    [setSelectedToAddItem, setSelectedToEditItem],
  );

  const moveItem = useCallback(
    (dragId: string, hoverId: string) => {
      if (dragId === hoverId || dragId === data[0]?.id) {
        return;
      }
      const moveData = {
        nodeId: dragId,
        parentId: hoverId,
      };

      const endpoint = type === "category" ? "categories" : type;
      const requestURL = `${baseURL}/api/${endpoint}/move`;
      
      request({
        url: requestURL, 
        method: "PATCH", 
        body: JSON.stringify(moveData), 
      })
      .then(() => router.refresh())
      .catch((e) => {
          setConfirmationModalVisible(true);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const handleCloseConfirmation = (res: boolean = false ) => {
    clearError();
    setConfirmationModalVisible(res);
  };

  const modalComponents: ModalComponents = {
    menu: <CreateMenu parent={selectedToAddItem || null} setVisible={setSelectedToAddItem} />,
    category: (
      <CreateCategory parent={selectedToAddItem || null} setVisible={setSelectedToAddItem} />
    ),
  };

  const modalComponent = modalComponents[type] || null;
  
  return (
    <div className="container-wrapper">
      <div>
        <MyBtn
          text={`${t(`create_${type}_btn`)}`}
          color={"primary"}
          click={() => {
            !!selectedToEditItem ? setSelectedToEditItem(false) : null;
            setSelectedToAddItem(data.length ? data[0] : "0");
          }}
        />
      </div>
      {data.length === 0 ? <h3>{t("nothing_here")}</h3> : null}
      
      <div className="wrapper-tree">
        <div className="container-tree-list">
          <DndProvider backend={HTML5Backend}>
            {data.map((item: any) => (
              <TreeList
                key={item.id}
                data={item}
                isRootElement={true}
                onEditClick={handleEditClick}
                onAddClick={handleAddClick}
                onMoveItem={moveItem}
                type={type}
              />
            ))}
          </DndProvider>
        </div>

        {selectedToEditItem &&
          React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                parentId: data[0].id,
                [type]: selectedToEditItem,
                setVisible: setSelectedToEditItem,
              } as any);
            }
            return null;
          })}

        {selectedToAddItem && modalComponent}

        {confirmationModalVisible && <MyModal
            visible={confirmationModalVisible}
            setVisible={handleCloseConfirmation}
            positionStyle={{ justifyContent: "center", alignItems: "center" }}
          >
          <div className="menu-item-confirmation">
              <p>{error}</p>
              <div className="menu-item-actions">
                <MyBtn
                  text={t("close")}
                  color="attention"
                  click={() => handleCloseConfirmation()}
                />
              </div>
          </div>
        </MyModal>}

      </div>
    </div>
  );
};

export default WrapperTreeList;
