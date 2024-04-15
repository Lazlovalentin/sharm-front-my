import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";

import useHttp from "@/actions/useHttp";
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import { Line } from "@/components/UI/Line/Line";
import { InputField } from "../CreateCategory/CreateCategory";
import MyModal from "@/components/UI/MyModal/MyModal";
import SpinnerFullScreen2 from "@/components/UI/Spinner/SpinnerFullScreen2";

import "./CreateMenu.scss";

interface CreateMenuProps {
  parent: any;
  setVisible: (visible: boolean) => void;
}

type FormData = {
  [key: string]: string;
};

export const inputFields: InputField[] = [
  {
    name: "name",
    placeholder: { ua: "назва", ru: "название", en: "name" },
    languages: ["ua", "ru", "en"],
  },
  {
    name: "url",
    placeholder: { ua: "посилання", ru: "ссылка", en: "link" },
    languages: ["ua", "ru", "en"],
  },
];

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const CreateMenu: FC<CreateMenuProps> = ({ parent, setVisible }) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Menu");
  
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

  const {request, loading, error, clearError} = useHttp();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const translations = [];
    for (const lang of ["ua", "ru", "en"]) {
      translations.push({
        name: data[`name_${lang}`],
        url: data[`url_${lang}`],
        lang: lang,
      });
    }
    const requestData = {
      parentId: parent.id,
      icons: "1",
      translations: translations,
    };

    const requestURL = `${baseURL}/api/menu`;
     
    request({
      url: requestURL, 
      method: "POST", 
      body: JSON.stringify(requestData), 
    })
    .then(() => {
      setVisible(false);
      router.refresh();
    })
    .catch((e) => {
      setConfirmationModalVisible(true);
    });
  };

  const handleError = () => {
    if (isValid) {
      handleSubmit(onSubmit)();
    }
    return;
  };

  const handleCloseConfirmation = (res: boolean = false ) => {
    clearError();
    setConfirmationModalVisible(res);
  };

  useEffect(() => {
    reset();
  }, [parent]);

  const watchedInputsArray: string[] = [];
  for (const field of inputFields) {
    for (const lang of field.languages) {
      watchedInputsArray.push(`${field.name}_${lang}`);
    }
  }
  const watchedInputs = watch(watchedInputsArray);
  const isInputValueRepeated = (_: keyof FormData, inputValue: string) => {
    return Object.values(watchedInputs).filter((value) => value === inputValue).length > 1;
  };
  const title = parent && parent.translations ? (parent.translations[0]?.name ? `"${parent.translations[0]?.name.charAt(0).toUpperCase() + parent.translations[0]?.name.slice(1)}"` : "***This value was erased due to a bug on the backend***") : '';
  return (
    <>
      <div className="container-create-menu">
        <h2>
          {parent && parent.translations ? t("create_menu") : t("create_menu_btn")}{' '}
          {title}
        </h2>
        <form onSubmit={handleSubmit(handleError)}>
          {inputFields.map((field, index) => (
            <div key={index}>
              <div className="create-menu-fields-label">{`${field.placeholder[locale as keyof InputField["placeholder"]]
                }`}</div>
              {field.languages.map((lang) => (
                <React.Fragment key={field.name + "_" + lang}>
                  <MyInput
                    {...register(`${field.name}_${lang}`, {
                      required: t("required_field_error"),
                      validate: (value) =>
                        !isInputValueRepeated(`${field.name}_${lang}`, value) ||
                        t("input_value_repeat_error"),
                    })}
                    type="text"
                    placeholder={`${field.placeholder[lang as keyof InputField["placeholder"]]
                      } (${lang})`}
                  />
                  {errors[`${field.name}_${lang}`] && (
                    <p className="error-message">
                      {errors[`${field.name}_${lang}`]?.message}
                    </p>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
          <Line isAbsolute={false} />
          <div className="create-menu-actions">
            <MyBtn type="submit" text={t("create")} color="primary" />
            <MyBtn
              text={t("close")}
              color="primary"
              type="button"
              click={() => setVisible(false)}
            />
          </div>
        </form>
      </div>
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
      {loading && <SpinnerFullScreen2 />}
    </>
  );
};

export default CreateMenu;
