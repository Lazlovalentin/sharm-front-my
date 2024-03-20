import React, { FC, useState } from "react";
import "./CategoryItem.scss";
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import { deleteAction } from "@/actions/deleteAction";
import { useRouter } from "next/navigation";
import { postAction } from "@/actions/postAction";
import MyModal from "@/components/UI/MyModal/MyModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";

interface CategoryItemProps {
  parentId: string;
  category: any;
  setVisible: (visible: boolean) => void;
}

type FormData = {
  name_input: string;
  descr_input: string;
  mTitle_input: string;
  mKey_input: string;
  mDescr_input: string;
};

const CategoryItem: FC<CategoryItemProps> = ({
  parentId,
  category,
  setVisible,
}) => {
  const router = useRouter();
  const locale = useLocale();
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [operationType, setOperationType] = useState<"delete" | "submit">(
    "submit"
  );
  const t = useTranslations("Menu");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const deleteHandler = () => {
    console.log("category.id", category.id);
    deleteAction("categories", category.id).then((_) => router.refresh());
    setVisible(false);
    router.refresh();
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
    postAction("categories", updatedCategory, locale, category.id)
      .then((response) => {
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
    setOperationType("submit");
    setConfirmationModalVisible(true);
  };
  return (
    <div className="container-category-item">
      <form onSubmit={handleSubmit(handleError)}>
        <MyInput
          type="text"
          placeholder={category.translations[0].name}
          {...register("name_input", {
            required: t("required_field_error"),
          })}
        />
        {errors.name_input && (
          <p className="error-message">{errors.name_input.message}</p>
        )}
        <MyInput
          type="text"
          placeholder={category.translations[0].description}
          {...register("descr_input", {
            required: t("required_field_error"),
          })}
        />
        {errors.descr_input && (
          <p className="error-message">{errors.descr_input.message}</p>
        )}
        <MyInput
          type="text"
          placeholder={category.translations[0].metaTitle}
          {...register("mTitle_input", {
            required: t("required_field_error"),
          })}
        />
        {errors.mTitle_input && (
          <p className="error-message">{errors.mTitle_input.message}</p>
        )}
        <MyInput
          type="text"
          placeholder={category.translations[0].metaKeywords}
          {...register("mDescr_input", {
            required: t("required_field_error"),
          })}
        />
        {errors.mDescr_input && (
          <p className="error-message">{errors.mDescr_input.message}</p>
        )}
        <MyInput
          type="text"
          placeholder={category.translations[0].metaDescription}
          {...register("mKey_input", {
            required: t("required_field_error"),
          })}
        />
        {errors.mKey_input && (
          <p className="error-message">{errors.mKey_input.message}</p>
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

export default CategoryItem;
