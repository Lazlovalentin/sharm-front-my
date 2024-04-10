import React from "react";
import ProductsWrapper from "@/components/admin/products/ProductsWrapper/ProductsWrapper";
import { productsMock } from '@/mokData/productData'
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

    const products: Product[] = productsMock;

    return (
        <>
            <ProductsWrapper products={products}/> 
        </>
    );
};
