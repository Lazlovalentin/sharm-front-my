"use client";
import React, { FC, useEffect, useState } from "react";
import "./MenuItem.scss";
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import { deleteAction } from "@/actions/deleteAction";
import { useRouter } from "next/navigation";
import { postAction } from "@/actions/postAction";
import MyModal from "@/components/UI/MyModal/MyModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";

interface MenuItemProps {
  parentId: string;
  menu: any;
  setVisible?: (visible: boolean) => void;
}

type FormData = {
  name_input: string;
  url_input: string;
};

const MenuItem: FC<MenuItemProps> = ({ parentId, menu, setVisible }) => {
  const router = useRouter();
  const locale = useLocale();
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [operationType, setOperationType] = useState<"delete" | "submit">(
    "submit"
  );
  const t = useTranslations("Menu");
  if (!setVisible) {
    return null;
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>();

  const deleteHandler = () => {
    deleteAction("menu", menu.id).then((_) => router.refresh());
    setVisible(false);
    router.refresh();
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const updatedMenu = {
      icons: menu.icons,
      parentId: parentId,
      translations: [
        {
          name: data.name_input,
          url: data.url_input,
        },
      ],
    };
    postAction("menu", updatedMenu, locale, menu.id)
      .then(() => {
        router.refresh();
      })
      .catch((error) => {
        console.error("Error updating menu:", error);
      });
    setVisible(false);
    router.refresh();
  };

  const handleConfirmation = () => {
    if (operationType === "delete") {
      deleteHandler();
    } else if (operationType === "submit") {
      handleSubmit(onSubmit)();
    }
    setConfirmationModalVisible(false);
  };

  const handleCloseConfirmation = () => {
    setConfirmationModalVisible(false);
  };

  const handleError = () => {
    if (isValid) {
      setOperationType("submit");
      setConfirmationModalVisible(true);
    }
  };
  const watchedInputs = watch(["name_input", "url_input"]);

  const isInputValueRepeated = (inputValue: string, _: keyof FormData) => {
    return (
      Object.values(watchedInputs).filter((value) => value === inputValue)
        .length > 1
    );
  };

  return (
    <div className="container-menu-item">
      <form onSubmit={handleSubmit(handleError)}>
        <MyInput
          type="text"
          placeholder={menu?.translations[0].name}
          {...register("name_input", {
            required: t("required_field_error"),
            validate: (value) =>
              !isInputValueRepeated(value, "name_input") ||
              t("input_value_repeat_error"),
          })}
        />
        {errors.name_input && (
          <p className="error-message">{errors.name_input.message}</p>
        )}
        <MyInput
          type="text"
          placeholder={menu?.translations[0].url}
          {...register("url_input", {
            required: t("required_field_error"),
            validate: (value) =>
              !isInputValueRepeated(value, "url_input") ||
              t("input_value_repeat_error"),
          })}
        />
        {errors.url_input && (
          <p className="error-message">{errors.url_input.message}</p>
        )}
        <MyBtn text="submit" color="primary" type="submit" />
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
          <p>{t("confirmation_message")}</p>{" "}
          <MyBtn text="Yes" color="primary" click={handleConfirmation} />
          <MyBtn text="No" color="attention" click={handleCloseConfirmation} />
        </div>
      </MyModal>
    </div>
  );
};

export default MenuItem;
