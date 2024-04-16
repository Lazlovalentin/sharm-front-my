"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";

import useHttp from "@/actions/useHttp";
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import MyModal from "@/components/UI/MyModal/MyModal";
import { inputFields } from "../CreateMenu/CreateMenu";
import { InputField } from "../CreateCategory/CreateCategory";
import SpinnerFullScreen2 from "@/components/UI/Spinner/SpinnerFullScreen2";

import "./MenuItem.scss";

interface MenuItemProps {
  parentId: string;
  menu: any;
  setVisible?: (visible: boolean) => void;
}

type FormData = {
  name_input: string;
  url_input: string;
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const MenuItem: FC<MenuItemProps> = ({ parentId, menu, setVisible }) => {
  const router = useRouter();
  const locale = useLocale();
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [operationType, setOperationType] = useState<"delete" | "submit">("submit");
  const t = useTranslations("Menu");

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<FormData>();

  const { request, loading, error, clearError } = useHttp();

  useEffect(() => {
    reset();
  }, [menu, parentId]);

  if (!setVisible) {
    return null;
  }

  const deleteHandler = () => {
    request({
      url: `${baseURL}/api/menu/${menu.id}`,
      method: "DELETE",
    })
      .then(() => {
        setVisible(false);
      })
      .catch((e) => {
        setConfirmationModalVisible(true);
      })
      .finally(() => router.refresh());
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

    const requestURL = `${baseURL}/api/menu/${locale}/${menu.id}`;

    request({
      url: requestURL,
      method: "POST",
      body: JSON.stringify(updatedMenu),
    })
      .then((data) => {
        setVisible({...data, translations: data.translations.filter((item: any) => item.lang === locale)});
      })
      .then(() => router.refresh())
      .catch((e) => {
        setConfirmationModalVisible(true);
      });
  };

  const handleConfirmation = () => {
    if (operationType === "delete") {
      deleteHandler();
    } else if (operationType === "submit") {
      handleSubmit(onSubmit)();
    }
    setConfirmationModalVisible(false);
  };

  const handleCloseConfirmation = (res: boolean = false) => {
    if (error) {
      clearError();
      setConfirmationModalVisible(res);
      reset();
    } else {
      setConfirmationModalVisible(res);
    }
  };

  const handleError = () => {
    if (isValid) {
      setOperationType("submit");
      setConfirmationModalVisible(true);
    }
  };

  const watchedInputs = watch(["name_input", "url_input"]);

  const isInputValueRepeated = (inputValue: string, _: keyof FormData) => {
    return Object.values(watchedInputs).filter((value) => value === inputValue).length > 1;
  };
  const title = menu && menu.translations ? (menu.translations[0]?.name ? `"${menu.translations[0]?.name.charAt(0).toUpperCase() + menu.translations[0]?.name.slice(1)}"` : "***This value was erased due to a bug on the backend***") : '';
  return (
    <div className="container-menu-item">
      <h2>
        {menu && menu.translations ? t("change_menu") : t("change_menu_btn")}{' '}
        {title}
      </h2>
      <form onSubmit={handleSubmit(handleError)}>
        <MyInput
          type="text"
          defaultValue={menu ? menu.translations[0]?.name : "***This value was erased due to a bug on the backend***"}
          label={`${inputFields[0].placeholder[locale as keyof InputField["placeholder"]]
            } (${locale})`}
          placeholder={
            inputFields[0].placeholder[locale as keyof InputField["placeholder"]]
          }
          {...register("name_input", {
            required: t("required_field_error"),
            validate: (value) =>
              !isInputValueRepeated(value, "name_input") ||
              t("input_value_repeat_error"),
          })}
        />
        {errors.name_input && <p className="error-message">{errors.name_input.message}</p>}
        <MyInput
          type="text"
          defaultValue={menu ? menu.translations[0]?.url : "***This value was erased due to a bug on the backend***"}
          placeholder={
            inputFields[1].placeholder[locale as keyof InputField["placeholder"]]
          }
          label={`${inputFields[1].placeholder[locale as keyof InputField["placeholder"]]
            } (${locale})`}
          {...register("url_input", {
            required: t("required_field_error"),
            validate: (value) =>
              !isInputValueRepeated(value, "url_input") ||
              t("input_value_repeat_error"),
          })}
        />
        {errors.url_input && <p className="error-message">{errors.url_input.message}</p>}
        <div className="menu-item-actions">
          <MyBtn text={t("change")} color="primary" type="submit" />
          <MyBtn
            text={t("delete")}
            color="attention"
            type="button"
            click={() => {
              setOperationType("delete");
              setConfirmationModalVisible(true);
            }}
          />
          <MyBtn
            text={t("close")}
            color="primary"
            type="button"
            click={() => setVisible(false)}
          />
        </div>
      </form>
      {confirmationModalVisible && <MyModal
        visible={confirmationModalVisible}
        setVisible={handleCloseConfirmation}
        positionStyle={{ justifyContent: "center", alignItems: "center" }}
      >
        <div className="menu-item-confirmation">
          <p>{error || t("confirmation_message")}</p>
          <div className="menu-item-actions">
            {error ? (<MyBtn
              text={t("close")}
              color="attention"
              click={() => handleCloseConfirmation()}
            />) : (<>
              <MyBtn text={t("yes")} color="primary" click={handleConfirmation} />
              <MyBtn
                text={t("close")}
                color="attention"
                click={() => handleCloseConfirmation()}
              />
            </>)}
          </div>
        </div>
      </MyModal>}
      {loading && <SpinnerFullScreen2 />}
    </div>
  );
};

export default MenuItem;
