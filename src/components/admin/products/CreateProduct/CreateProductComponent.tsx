'use client';
import React, {FC, useState} from "react";
import {useApi} from "@/hooks/useApi";

import './CreateProductComponent.scss'
import { useRouter } from "next/navigation";


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

    const fakeProduct = {
      "isLux": true,
      "img": "summer-dress-blue.jpg",
      "url": "summer-dress-blue",
      "items": [
        {
          "name": "Elegant Summer Dress - Size M",
          "sku": "ESD123M",
          "prise": 49.99,
          "oldPrise": 59.99,
          "count": 100,
          "color": "Blue",
          "img": "summer-dress-blue.jpg"
        }
      ],
      "translations": [
        {
          "title": "EN Elegant Summer Dress",
          "subTitle": "EN Light and airy for hot summer days",
          "description": "EN This elegant summer dress is perfect for those hot days when you want to feel cool and look great. Made with 100% organic cotton.",
          "shortDescription": "EN Elegant and comfortable summer dress",
          "metaTitle": "Elegant Summer Dress - Summer Collection",
          "metaKeywords": "summer, dress, elegant, cotton, organic",
          "metaDescription": "An elegant summer dress made of organic cotton to keep you cool during the hot days.",
          "lang": "en"
        },
        {
          "title": "UA Elegant Summer Dress",
          "subTitle": "UA Light and airy for hot summer days",
          "description": "UA This elegant summer dress is perfect for those hot days when you want to feel cool and look great. Made with 100% organic cotton.",
          "shortDescription": "UA Elegant and comfortable summer dress",
          "metaTitle": "Elegant Summer Dress - Summer Collection",
          "metaKeywords": "summer, dress, elegant, cotton, organic",
          "metaDescription": "An elegant summer dress made of organic cotton to keep you cool during the hot days.",
          "lang": "ua"
        },
        {
          "title": "RU Elegant Summer Dress",
          "subTitle": "RU Light and airy for hot summer days",
          "description": "RU This elegant summer dress is perfect for those hot days when you want to feel cool and look great. Made with 100% organic cotton.",
          "shortDescription": "RU Elegant and comfortable summer dress",
          "metaTitle": "Elegant Summer Dress - Summer Collection",
          "metaKeywords": "summer, dress, elegant, cotton, organic",
          "metaDescription": "An elegant summer dress made of organic cotton to keep you cool during the hot days.",
          "lang": "ru"
        }
      ]
    }
    
    console.log('fakeProduct', fakeProduct);

    sendRequest('products', 'POST', product)
    .then((response) => {
      if (response.data) {
        router.push('products');
      }
    })
};

  return (
    <form onSubmit={handleSubmit} className="form">      
      <section className="form-section-fields">
      <h3>Form fields</h3>
      {formFields.map((formField, index) => (
        <div className="form-fields" key={index}>
          <label htmlFor={`formField-${index}`}>{formField.label}</label>
          {formField.type === 'checkbox' ? (
            <>
              <input
                id={`formField-${index}`}
                type="checkbox"
                name={formField.name}
                checked={!!product[formField.name]}
                onChange={(e) => handleChange(e, index, 'formFields')}
              />
              
            </>
          ) : (
            <>
              <input
                id={`formField-${index}`}
                type={formField.type}
                name={formField.name}
                value={product[formField.name] as string}
                onChange={(e) => handleChange(e, index, 'formFields')}
                placeholder={formField.name}
              />
            </>
          )}
        </div>
      ))}
      </section>
     
      <section className="form-section-translations">
        <h3>Translations</h3>
        {product.translations.map((translation: any, index) => (
          <div className="form-translations" key={index}>
            <label className="label-translation">Language</label>
            <select
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
              <label className="label-translation" htmlFor={el.label}>{el.label}</label>
                <input
                  key={indexEl}
                  type={el.type}
                  name={el.name}
                  value={translation[el.name]}
                  onChange={(e) => handleChange(e, index, 'translations')}
                  placeholder={el.name}
                />
                </React.Fragment>
            ))}

          </div>
        ))}
        <button className="translation-btn" type="button" onClick={addTranslation}>Add Translation</button>
      </section>

      <section className="form-section-items">
        <h3>Items</h3>
        {product.items.map((item: any, index) => (
          <div className="form-items" key={index}>
            {itemFields.map((el: any, indexEl: any) => (
              <React.Fragment key={indexEl}>
                <label className="label-item" htmlFor={el.label}>{el.label}</label>
                <input
                  id={el.name}
                  key={indexEl}
                  type={el.type}
                  name={el.name}
                  value={item[el.name]}
                  onChange={(e) => handleChange(e, index, 'items')}
                  placeholder={el.name}
                />
              </React.Fragment>
            ))}
          </div>
        ))}
        <button className="item-btn" type="button" onClick={addItem}>Add Item</button>
      </section>

      <button className="submit-btn" type="submit">Submit Product</button>
    </form>
  );
};

export default CreateProductComponent;
