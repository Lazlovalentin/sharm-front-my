"use client";
import React, { useState } from "react";
import DataTable from "@/components/UI/DataTable/DataTable";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import Link from 'next/link';

import "./ProductsWrapper.scss";

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
}

interface ProductsWrapperProps {
  products: Product[];
}

const ProductsWrapper: React.FC<ProductsWrapperProps> = ({ products }) => {
  const router = useRouter();
  const {sendRequest, loading, error} = useApi();

  const deleteProduct = (id: number) => {
    sendRequest(`products/${id}`, 'DELETE', null)
      .then((res) => router.refresh())
  }

  if (products.length === 0) {
    return <p>Немає продуктів для відображення.</p>;
  }

  const columns = [
    {
      id: 'id',
      headerName: 'ID',
      width: 45
    },
    {
      id: 'image',
      headerName: 'Image',
      width: 100
    },
    {
      id: 'name',
      headerName: 'Назва',
      width: 120
    },
    {
      id: 'price',
      headerName: 'Ціна',
      width: 85
    },
    {
      id: 'view',
      headerName: 'View',
      width: 120,
      render: () => <button className="delete-product-btn" type="button">View</button>,
    },
    {
      id: 'delete',
      headerName: 'Delete',
      width: 120,
      render: (item: any) => <MyBtn text={"Delete"} color={"attention"} click={() => deleteProduct(item.id)}/>,
    },
  ]

  return (
    <>
      <div className="products-container">
        <div className="products-title">
          <div className="product-create">
            <Link href={"create-product"}>
              <button className="create-product-btn" type="button">Create product</button>    
            </Link>
          </div>
        </div>

        <div className="products-wrapper"> 
          <DataTable
            initialSelectedOptions={columns}
            columns={columns}
            data={products}
          />
        </div>
      </div>
    </>

  );
};
        
export default ProductsWrapper;