'use client';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from "next/navigation";
import MyInput from '@/components/general/MyInput/MyInput';
import MyBtn from '@/components/UI/MyBtn/MyBtn';
import { useApi } from '@/hooks/useApi';

import styles from './CreateProductComponent.module.scss';

interface ProductState {
  isLux: boolean;
  img: string;
  url: string;
  items: Item[];
  translations: Translation[];
}

interface Item {
  name: string;
  sku: string;
  prise: string;
  oldPrise: string;
  count: string;
  color: string;
  img: string;
}

interface Translation {
  lang: string;
  title: string;
  subTitle: string;
  description: string;
  shortDescription: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
}

const Translation = { lang: 'en', title: '', subTitle: '', description: '', shortDescription: '', metaTitle: '', metaKeywords: '', metaDescription: '' };

const Item = { name: '', sku: '', prise: '', oldPrise: '', count: '', color: '', img: '' };

const CreateProductComponent: React.FC = () => {
  const router = useRouter();
  const { sendRequest } = useApi();
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm<ProductState>({
    defaultValues: {
      isLux: false,
      img: '',
      url: '',
      items: [],
      translations: [],
    }
  });

  const { fields: itemFields, append: appendItem } = useFieldArray<any>({
    control,
    name: "items"
  });

  const { fields: translationFields, append: appendTranslation } = useFieldArray<any>({
    control,
    name: "translations"
  });

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
    sendRequest('products', 'POST', data)
      .then(response => {
        if (response.data) {
          router.push('products');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <section className={styles.section}>
        <h3 className={styles.title}>Main fields</h3>
        <MyInput type="checkbox" label="Luxury" {...register('isLux')} />
        <MyInput type="text" label="Image" {...register('img')} />
        <MyInput type="text" label="URL" {...register('url')} />
      </section>

      <section className={styles.section}>
        <h3 className={styles.title}>Translations</h3>
        {translationFields.map((field, index) => (
          <div className={styles.formTranslations} key={field.id}>
            <select className={styles.selectTranslation} {...register(`translations.${index}.lang`)}>
              <option value="en">EN</option>
              <option value="ua">UA</option>
              <option value="ru">RU</option>
            </select>
            <MyInput type="text" label="Title" {...register(`translations.${index}.title`)} />
            <MyInput type="text" label="Subtitle" {...register(`translations.${index}.subTitle`)} />
            <MyInput type="text" label="Description" {...register(`translations.${index}.description`)} />
            <MyInput type="text" label="Short description" {...register(`translations.${index}.shortDescription`)} />
            <MyInput type="text" label="Meta Title" {...register(`translations.${index}.metaTitle`)} />
            <MyInput type="text" label="Meta Keywords" {...register(`translations.${index}.metaKeywords`)} />
            <MyInput type="text" label="Meta Description" {...register(`translations.${index}.metaDescription`)} />
          </div>
        ))}
        <MyBtn text="Add translation" color="primary" click={() => appendTranslation(Translation)} type="button" />
      </section>

      <section className={styles.section}>
        <h3 className={styles.title}>Products</h3>
        {itemFields.map((item, index) => (
          <div className={styles.formItems} key={item.id}>
            <MyInput type="text" label="Name" {...register(`items.${index}.name`)} />
            <MyInput type="text" label="SKU" {...register(`items.${index}.sku`)} />
            <MyInput type="number" label="Price" {...register(`items.${index}.prise`)} />
            <MyInput type="number" label="Old price" {...register(`items.${index}.oldPrise`)} />
            <MyInput type="number" label="Count" {...register(`items.${index}.count`)} />
            <MyInput type="text" label="Color" {...register(`items.${index}.color`)} />
            <MyInput type="text" label="Image" {...register(`items.${index}.img`)} />
          </div>
        ))}
        <MyBtn text="Add product" color="primary" click={() => appendItem(Item)} type="button" />
      </section>

      <MyBtn text="Create product" color="primary" type="submit" />
    </form>
  );
};

export default CreateProductComponent;
