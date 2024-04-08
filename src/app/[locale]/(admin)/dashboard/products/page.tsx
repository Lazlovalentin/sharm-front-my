import React from "react";
import ProductsWrapper from "@/components/admin/products/ProductsWrapper/ProductsWrapper";
import {getAction} from "@/actions/getAction";

interface Product {
    id: number;
    image: string;
    name: string;
    price: string;
}

export default async function Products(
    { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }
) {
    const page = searchParams["page"] ?? "1"

    const allProducts = await getAction("products", page.toString(), "1000")

    const products: Product[] = [
        { id: 1, image: 'https://ksuu-store.fra1.digitaloceanspaces.com/ksuu-store/media/blog/2023/09/03/3.webp', name: 'Продукт 1', price: '100' },
        { id: 2, image: 'https://ksuu-store.fra1.digitaloceanspaces.com/ksuu-store/media/blog/2023/09/03/1.webp', name: 'Продукт 2', price: '200' },
        { id: 3, image: 'https://ksuu-store.fra1.digitaloceanspaces.com/ksuu-store/media/blog/2023/09/03/2_pV8MWOJ.webp', name: 'Продукт 3', price: '300' },
    ];

    return (
        <>
            <ProductsWrapper products={products}/> 
        </>
    );
};
