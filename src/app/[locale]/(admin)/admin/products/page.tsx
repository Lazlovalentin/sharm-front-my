import React from "react";
import ProductsWrapper from "@/components/admin/products/ProductsWrapper/ProductsWrapper";
import PaginationControl from "@/components/UI/PaginationControl/PaginationControl";
import { productsMock } from '@/mokData/productData'
import {getAction} from "@/actions/getAction";
import { useLocale } from "next-intl";

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
    const locale = useLocale();
    const limit = "10";
    const isLux = true;
    const sort = "desc";
    const sortOrder = "createdAt";
    const additionalParams = `isLux=${isLux}&sort=${sort}&sortOrder=${sortOrder}`;

    const allProducts = await getAction(`products/${locale}`, page.toString(), limit, additionalParams)
    const totalPages = allProducts.totalPages
    console.log(allProducts)

    const products: Product[] = allProducts;

    return (
        <>
            <ProductsWrapper products={products}/> 
            <PaginationControl
                totalPages={totalPages}
            />
        </>
    );
};
