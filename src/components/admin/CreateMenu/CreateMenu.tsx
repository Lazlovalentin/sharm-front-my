import React, { FC } from "react";
import "./CreateMenu.scss";
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import { Line } from "@/components/UI/Line/Line";
import { postAction } from "@/actions/postAction";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { InputField } from "../CreateCategory/CreateCategory";

interface CreateMenuProps {
  parentId: string | null;
  setVisible: (visible: boolean) => void;
}

type FormData = {
  [key: string]: string;
};
const CreateMenu: FC<CreateMenuProps> = ({ parentId, setVisible }) => {
  const router = useRouter();
  const t = useTranslations("Menu");
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>();

  const inputFields: InputField[] = [
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
      parentId: parentId,
      icons: "1",
      translations: translations,
    };
    postAction("menu", requestData)
      .then(() => {
        router.refresh();
        setVisible(false);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };
  const watchedInputsArrey: string[] = [];
  for (const field of inputFields) {
    for (const lang of field.languages) {
      watchedInputsArrey.push(`${field.name}_${lang}`);
    }
  }
  const watchedInputs = watch(watchedInputsArrey);
  const isInputValueRepeated = (_: keyof FormData, inputValue: string) => {
    return (
      Object.values(watchedInputs).filter((value) => value === inputValue)
        .length > 1
    );
  };
  const handleError = () => {
    if (isValid) {
      handleSubmit(onSubmit)();
    }
    return;
  };
  return (
    <div className="container-create-menu">
      <form onSubmit={handleSubmit(handleError)}>
        {inputFields.map((field, index) => (
          <div key={index}>
            {field.languages.map((lang) => (
              <div key={field.name + "_" + lang}>
                <MyInput
                  {...register(`${field.name}_${lang}`, {
                    required: t("required_field_error"),
                    validate: (value) =>
                      !isInputValueRepeated(`${field.name}_${lang}`, value) ||
                      t("input_value_repeat_error"),
                  })}
                  type="text"
                  placeholder={`${(field.placeholder as any)[lang]} (${lang})`}
                />
                {errors[`${field.name}_${lang}`] && (
                  <p className="error-message">
                    {errors[`${field.name}_${lang}`]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
        <Line isAbsolute={false} />
        <MyBtn type="submit" text="submit" color="primary" />
      </form>
    </div>
  );
};

export default CreateMenu;
