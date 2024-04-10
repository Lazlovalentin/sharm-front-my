'use client';
import React, {FC, useState} from "react";
import {useApi} from "@/hooks/useApi";

import { useRouter } from "next/navigation";
import { productMock } from "@/mokData/productData";
import MyInput from "@/components/general/MyInput/MyInput";
import MyBtn from "@/components/UI/MyBtn/MyBtn";

import styles from './CreateProductComponent.module.scss';

interface FormField {
  name: keyof ProductState;
  type: string;
  label: string;
}

interface Translation {
  lang: string;
}

interface ProductState {
  isLux: boolean;
  img: string;
  url: string;
  items: any[]; 
  translations: Translation[];
}

const CreateProductComponent = () => {
  const router = useRouter();
  const {sendRequest, loading, error} = useApi();
  const [product, setProduct] = useState<ProductState>({
    isLux: false,
    img: '',
    url: '',
    items: [],
    translations: []
  });

  const formFields: FormField[]= [
    {name: 'isLux', type: 'checkbox', label: 'Luxury'},
    {name: 'img', type: 'text', label: 'Image'},
    {name: 'url', type: 'text', label: 'URL'}
  ]

  const translationFields: any = [
    {name: 'title', type: 'text', label: 'Title'},
    {name: 'subTitle', type: 'text', label: 'Sub Title'},
    {name: 'description', type: 'text', label: 'Description'},
    {name: 'shortDescription', type: 'text', label: 'Short Description' },
    {name: 'metaTitle', type: 'text', label: 'Meta Title'},
    {name: 'metaKeywords', type: 'text', label: 'Meta Keywords'},
    {name: 'metaDescription', type: 'text', label:'Meta Description'}
  ]

  const addTranslation = () => {
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      translations: [...prevProduct.translations, {
        title: '', subTitle: '', description: '', shortDescription: '',
        metaTitle: '', metaKeywords: '', metaDescription: '', lang: 'en'
      }]
    }));
  };

  const itemFields: any = [
    {name: 'name', type: 'text', label:'Name'},
    {name: 'sku', type: 'text', label:'SKU'},
    {name: 'prise', type: 'number', label: 'Price'},
    {name: 'oldPrise', type: 'number', label:'Old Price'},
    {name: 'count', type: 'number', label:'Count'},
    {name: 'color', type: 'text', label: 'Color'},
    {name: 'img', type: 'text', label: 'Image'}
  ]

  const addItem = () => {
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      items: [...prevProduct.items, { name: '', sku: '', prise: 0, oldPrise: 0, count: 0, color: '', img: '' }]
    }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newLanguage = e.target.value;
    console.log(newLanguage)
    setProduct(prevProduct => {
    const updatedTranslations: Translation[] = [...prevProduct.translations];
    
    updatedTranslations[index] = {
      ...updatedTranslations[index],
      lang: newLanguage, 
    };
    console.log({...prevProduct,
      translations: updatedTranslations,})
    return {
      ...prevProduct,
      translations: updatedTranslations,
    };
  });
  };

  const handleChange = (e: any, index: any, arrayType: any) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setProduct((prevProduct: any) => {
      if (['items', 'translations'].includes(arrayType)) {
        const updatedArray = prevProduct[arrayType].map((item: any, i: any) => {
          if (i === index) {
            return { ...item, [name]: value };
          }
          return item;
        });
        return { ...prevProduct, [arrayType]: updatedArray };
      } else {
        return { ...prevProduct, [name]: value };
      }
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    console.log('product', product);

    // console.log('fakeProduct', productMock);

    sendRequest('products', 'POST', product)
    .then((response) => {
      if (response.data) {
        router.push('products');
      }
    })
};

  return (
    <form onSubmit={handleSubmit} className={styles.form}>      
      <section className={styles.section}>
      <h3 className={styles.title}>Form fields</h3>
      {formFields.map((formField, index) => (
        <div className={styles.formFields} key={index}>
          {formField.type === 'checkbox' ? (
            <>
              <label className={styles.labelItem} htmlFor={`formField-${index}`}>{formField.label}</label>
              <input
                className={styles.checkboxField}
                id={`formField-${index}`}
                type={formField.type}
                name={formField.name}
                checked={!!product[formField.name]}
                onChange={(e) => handleChange(e, index, 'formFields')}
              />
            </>
          ) : (
            <>
              <MyInput
                id={`formField-${index}`}
                type={formField.type}
                label={formField.label}
                placeholder={formField.name}
                value={product[formField.name] as string}
                onChange={(e) => handleChange(e, index, 'formFields')}
              />
            </>
          )}
        </div>
      ))}
      </section>
     
      <section className={styles.section}>
        <h3 className={styles.title}>Translations</h3>
        {product.translations.map((translation: any, index) => (
          <div className={styles.formTranslations} key={index}>
            <label className={styles.labelTranslation}>Language</label>
            <select
              className={styles.selectTranslation}
              name="select-language"
              value={translation.language}
              onChange={(e) => handleLanguageChange(e, index)}
              id={`select-lang-${index}`}
             >
              <option value="en">en</option>
              <option value="ua">ua</option>
              <option value="ru">ru</option>
            </select>
            
            {translationFields.map((el: any, indexEl: any) => (
              <React.Fragment key={indexEl}>
                <MyInput
                  id={el.name}
                  key={indexEl}
                  type={el.type}
                  name={el.name}
                  label={el.label}
                  placeholder={el.name}
                  value={translation[el.name]}
                  onChange={(e) => handleChange(e, index, 'translations')}
                />
                </React.Fragment>
            ))}

          </div>
        ))}
        <MyBtn text={"Add Translation"} color={"primary"} click={addTranslation} type={"button"} />
      </section>

      <section className={styles.section}>
        <h3 className={styles.title}>Items</h3>
        {product.items.map((item: any, index) => (
          <div className={styles.formItems} key={index}>
            {itemFields.map((el: any, indexEl: any) => (
              <React.Fragment key={indexEl}>
                <MyInput
                  id={el.name}
                  key={indexEl}
                  type={el.type}
                  label={el.label}
                  placeholder={el.name}
                  value={item[el.name]}
                  onChange={(e) => handleChange(e, index, 'items')}
                />
              </React.Fragment>
            ))}
          </div>
        ))}
        <MyBtn text={"Add Item"} color={"primary"} click={addItem} type={"button"} />
      </section>

      <MyBtn text={"Submit Product"} color={"primary"} />
    </form>
  );
};

export default CreateProductComponent;
