"use client";
import React, {FC, useState} from 'react';
import "./WrapperCategory.scss"
import TreeList from "@/components/admin/TreeList/TreeList";
import MyModal from "@/components/UI/MyModal/MyModal";
import CreateUser from "@/components/admin/users/CreateUser/CreateUser";
import MyBtn from "@/components/UI/MyBtn/MyBtn";

interface WrapperCategoryProps {
    categories: any

}

const WrapperCategory: FC<WrapperCategoryProps> = ({categories}) => {
    const [openCreateCategory, setOpenCreateCategory] = useState<boolean>(false)
    const [category, setCategory] = useState<any>(null)
    const handleCategoryClick = (category: any) => setCategory(category);
    const openCreateCategoryHandler = () => setOpenCreateCategory(!openCreateCategory);


    return (
        <>
            <MyBtn text={"create category"} color={"primary"} click={openCreateCategoryHandler}/>
            <div className="container-wrapper-category">
                <div>
                    {categories.map((category: any) => (
                        <TreeList key={category.id} data={category} onCategoryClick={handleCategoryClick}/>
                    ))}
                </div>
                <div className="container-category-choose">
                    {category ?
                        <>
                            <h3>{category.title}</h3>
                        </>
                        : null
                    }
                </div>

            </div>
            <MyModal visible={openCreateCategory} setVisible={setOpenCreateCategory}>
                <div>
                    create user
                </div>
            </MyModal>
        </>
    );
}

export default WrapperCategory;