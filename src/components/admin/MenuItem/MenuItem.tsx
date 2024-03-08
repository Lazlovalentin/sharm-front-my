import React, { FC, useState } from "react";
import "./MenuItem.scss";
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import { deleteAction } from "@/actions/deleteAction";
import { useRouter } from "next/navigation";
import { postAction } from "@/actions/postAction";
import { useLocale } from "next-intl";
interface MenuItemProps {
  parentId: string;
  menu: any;
  setVisible: (visible: boolean) => void;
}

const MenuItem: FC<MenuItemProps> = ({ parentId, menu, setVisible }) => {
  const router = useRouter();
  const locale = useLocale();
  const deleteHandler = () => {
    deleteAction("menu", menu.id).then((_) => router.refresh());
    setVisible(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.preventDefault();
    const form = e.target as HTMLFormElement;
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
        <MyBtn text="submit" color="primary" />
        <MyBtn
          text="delete"
          color="attention"
          type="button"
          click={deleteHandler}
        />
      </form>
    </div>
  );
};

export default MenuItem;
