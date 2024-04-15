"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";

import useHttp from "@/actions/useHttp";
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import MyModal from "@/components/UI/MyModal/MyModal";
import { InputField, inputFields } from "../CreateCategory/CreateCategory";
import SpinnerFullScreen2 from "@/components/UI/Spinner/SpinnerFullScreen2";

import "./CategoryItem.scss";

interface CategoryItemProps {
  parentId: string;
  category: any;
  setVisible?: (visible: boolean) => void;
}

type FormData = {
  name_input: string;
  descr_input: string;
  mTitle_input: string;
  mKey_input: string;
  mDescr_input: string;
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const CategoryItem: FC<CategoryItemProps> = ({ parentId, category, setVisible }) => {
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

  const {request, loading, error, clearError} = useHttp();

  useEffect(() => {
    reset();
  }, [category, parentId]);

  if (!setVisible) {
    return null;
  }

  const deleteHandler = () => {
    request({
      url: `${baseURL}/api/categories/${category.id}`, 
      method: "DELETE", 
    })
    .then(()=> {
        setVisible(false);
    })
    .catch((e) => {
        setConfirmationModalVisible(true);
    })
    .finally(() => router.refresh());
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const updatedCategory = {
      metaImages: category.metaImages,
      parentId: parentId,
      translations: [
        {
          name: data.name_input,
          description: data.descr_input,
          metaTitle: data.mTitle_input,
          metaKeywords: data.mKey_input,
          metaDescription: data.mDescr_input,
        },
      ],
    };

    const requestURL =`${baseURL}/api/categories/${locale}/${category.id}`;
       
    request({
      url: requestURL, 
      method: "POST", 
      body: JSON.stringify(updatedCategory), 
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

  const handleCloseConfirmation = (res: boolean = false ) => {
    if(error) {
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

  const watchedInputs = watch([
    "name_input",
    "descr_input",
    "mTitle_input",
    "mKey_input",
    "mDescr_input",
  ]);

  const isInputValueRepeated = (inputValue: string, _: keyof FormData) => {
    return Object.values(watchedInputs).filter((value) => value === inputValue).length > 1;
  };

  return (
    <div className="container-category-item">
      <h2>
        {category && category.translations ? t("change_category") : t("change_category_btn")}{' '}
        {category && category.translations ? (<span>{category.translations[0]?.name ? `"${category.translations[0]?.name }"` : "Bug!!!!!!"}</span>) : ''}
      </h2>
      <form onSubmit={handleSubmit(handleError)}>
        <MyInput
          type="text"
          defaultValue={category? category.translations[0]?.name : "Bug!!!!!!!"}
          placeholder={
            inputFields[0].placeholder[locale as keyof InputField["placeholder"]]
          }
          label={`${inputFields[0].placeholder[locale as keyof InputField["placeholder"]]} (${locale})`}
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
          defaultValue={category ? category.translations[0]?.description : "Bug!!!!!!!"}
          placeholder={
            inputFields[1].placeholder[locale as keyof InputField["placeholder"]]
          }
          label={`${inputFields[1].placeholder[locale as keyof InputField["placeholder"]]
            } (${locale})`}
          {...register("descr_input", {
            required: t("required_field_error"),
            validate: (value) =>
              !isInputValueRepeated(value, "descr_input") ||
              t("input_value_repeat_error"),
          })}
        />
        {errors.descr_input && (
          <p className="error-message">{errors.descr_input.message}</p>
        )}
        <MyInput
          type="text"
          defaultValue={category ? category.translations[0]?.metaTitle : "Bug!!!!!!!"}
          placeholder={
            inputFields[2].placeholder[locale as keyof InputField["placeholder"]]
          }
          label={`${inputFields[2].placeholder[locale as keyof InputField["placeholder"]]
            } (${locale})`}
          {...register("mTitle_input", {
            required: t("required_field_error"),
            validate: (value) =>
              !isInputValueRepeated(value, "mTitle_input") ||
              t("input_value_repeat_error"),
          })}
        />
        {errors.mTitle_input && (
          <p className="error-message">{errors.mTitle_input.message}</p>
        )}
        <MyInput
          type="text"
          defaultValue={category ? category.translations[0]?.metaKeywords : "Bug!!!!!!!"}
          placeholder={
            inputFields[3].placeholder[locale as keyof InputField["placeholder"]]
          }
          label={`${inputFields[3].placeholder[locale as keyof InputField["placeholder"]]
            } (${locale})`}
          {...register("mDescr_input", {
            required: t("required_field_error"),
            validate: (value) =>
              !isInputValueRepeated(value, "mDescr_input") ||
              t("input_value_repeat_error"),
          })}
        />
        {errors.mDescr_input && (
          <p className="error-message">{errors.mDescr_input.message}</p>
        )}
        <MyInput
          type="text"
          defaultValue={category ? category.translations[0]?.metaDescription : "Bug!!!!!!!"}
          placeholder={
            inputFields[4].placeholder[locale as keyof InputField["placeholder"]]
          }
          label={`${inputFields[4].placeholder[locale as keyof InputField["placeholder"]]
            } (${locale})`}
          {...register("mKey_input", {
            required: t("required_field_error"),
            validate: (value) =>
              !isInputValueRepeated(value, "mKey_input") ||
              t("input_value_repeat_error"),
          })}
        />
        {errors.mKey_input && <p className="error-message">{errors.mKey_input.message}</p>}
        <div className="category-item-actions">
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
        setVisible={setConfirmationModalVisible}
        positionStyle={{ justifyContent: "center", alignItems: "center" }}
      >
        <div className="category-item-confirmation">
          <p>{error || t("confirmation_message")}</p>{" "}
          <div className="category-item-actions">
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

export default CategoryItem;
