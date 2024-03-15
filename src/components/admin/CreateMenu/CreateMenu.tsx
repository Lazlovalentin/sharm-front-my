import React, { FC } from "react";
import "./CreateMenu.scss";
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import { Line } from "@/components/UI/Line/Line";
import { postAction } from "@/actions/postAction";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface CreateMenuProps {
  parentId: string | undefined;
  setVisible: (visible: boolean) => void;
}
interface TranslationData {
  name: string;
  url: string;
  lang: string;
}
type FormData = {
  name_ua: string;
  name_ru: string;
  name_en: string;
  url_ua: string;
  url_ru: string;
  url_en: string;
};
const CreateMenu: FC<CreateMenuProps> = ({ parentId, setVisible }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { name_ua, name_ru, name_en, url_ua, url_ru, url_en } = data;
    const requestData = {
      parentId: parentId,
      icons: "1",
      translations: [
        { name: name_ua, url: url_ua, lang: "ua" },
        { name: name_ru, url: url_ru, lang: "ru" },
        { name: name_en, url: url_en, lang: "en" },
      ],
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
  return (
    <div className="container-create-menu">
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyInput
          {...register("name_ua", {
            required: "Поле обов'язкове до заповнення",
          })}
          type="text"
          placeholder="назва"
        />
        {errors.name_ua && (
          <p className="error-message">{errors.name_ua.message}</p>
        )}{" "}
        <MyInput
          {...register("name_ru", {
            required: "Поле обязательно для заполнения",
          })}
          type="text"
          placeholder="название"
        />
        {errors.name_ru && (
          <p className="error-message">{errors.name_ru.message}</p>
        )}
        <MyInput
          {...register("name_en", {
            required: "Field is required",
          })}
          type="text"
          placeholder="name"
        />
        {errors.name_en && (
          <p className="error-message">{errors.name_en.message}</p>
        )}
        <Line isAbsolute={false} />
        <MyInput
          {...register("url_ua", {
            required: "Поле обов'язкове до заповнення",
          })}
          type="text"
          placeholder="посилання"
        />
        {errors.url_ua && (
          <p className="error-message">{errors.url_ua.message}</p>
        )}
        <MyInput
          {...register("url_ru", {
            required: "Поле обязательно для заполнения",
          })}
          type="text"
          placeholder="ссылка"
        />
        {errors.url_ru && (
          <p className="error-message">{errors.url_ru.message}</p>
        )}
        <MyInput
          {...register("url_en", {
            required: "Field is required",
          })}
          type="text"
          placeholder="url"
        />
        {errors.url_en && (
          <p className="error-message">{errors.url_en.message}</p>
        )}
        <Line isAbsolute={false} />
        <MyBtn type="submit" text="submit" color="primary" />
      </form>
    </div>
  );
};

export default CreateMenu;
