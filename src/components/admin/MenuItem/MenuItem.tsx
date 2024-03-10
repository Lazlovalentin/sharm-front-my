import React, { FC, useState } from "react";
import "./MenuItem.scss";
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import { deleteAction } from "@/actions/deleteAction";
import { useRouter } from "next/navigation";
import { postAction } from "@/actions/postAction";
import { useLocale } from "next-intl";
import MyModal from "@/components/UI/MyModal/MyModal";
interface MenuItemProps {
  parentId: string;
  menu: any;
  setVisible: (visible: boolean) => void;
}

const MenuItem: FC<MenuItemProps> = ({ parentId, menu, setVisible }) => {
  console.log("Current Menu:", menu);
  const router = useRouter();
  const locale = useLocale();
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [operationType, setOperationType] = useState<"delete" | "submit">(
    "submit"
  );
  const deleteHandler = () => {
    deleteAction("menu", menu.id).then((_) => router.refresh());
    setVisible(false);
  };

  const submitHandler = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const form = e?.target as HTMLFormElement;
    const formData = new FormData(form);
    const updatedMenu = {
      icons: menu.icons,
      parentId: parentId,
      translations: [
        {
          name: formData.get("name"),
          url: formData.get("url"),
        },
      ],
    };
    postAction("menu", updatedMenu, locale, menu.id)
      .then((response) => {
        console.log("Menu updated successfully:", response);
        router.refresh();
      })
      .catch((error) => {
        console.error("Error updating menu:", error);
      });
    setVisible(false);
  };

  const handleConfirmation = () => {
    if (operationType === "delete") {
      deleteHandler();
    } else if (operationType === "submit") {
      submitHandler();
    }
    setConfirmationModalVisible(false);
  };
  const handleCloseConfirmation = () => {
    setConfirmationModalVisible(false);
  };

  return (
    <div className="container-menu-item">
      <form onSubmit={submitHandler}>
        <MyInput
          type={"text"}
          name={"name"}
          placeholder={menu.translations[0].name}
        />
        <MyInput
          type={"text"}
          name={"url"}
          placeholder={menu.translations[0].url}
        />
        <MyBtn
          text="submit"
          color="primary"
          type="submit"
          click={() => {
            setOperationType("submit");
            setConfirmationModalVisible(true);
          }}
        />
        <MyBtn
          text="delete"
          color="attention"
          type="button"
          click={() => {
            setOperationType("delete");
            setConfirmationModalVisible(true);
          }}
        />
        <MyBtn
          text="close"
          color="primary"
          type="button"
          click={() => setVisible(false)}
        />
      </form>
      <MyModal
        visible={confirmationModalVisible}
        setVisible={setConfirmationModalVisible}
        positionStyle={{ justifyContent: "center", alignItems: "center" }}>
        <div>
          <p>Ви впевнені?</p>
          <MyBtn text="Yes" color="primary" click={handleConfirmation} />
          <MyBtn text="No" color="attention" click={handleCloseConfirmation} />
        </div>
      </MyModal>
    </div>
  );
};

export default MenuItem;
