"use client"
import React, {FC, useState} from 'react';
import "./TreeList.scss"

type Category = {
    id: number;
    title: string;
    url: string;
    children?: Category[];
};

type CategoryProps = {
    data: Category;
    onCategoryClick: (category: Category) => void;
};

const TreeList: FC<CategoryProps> = ({data, onCategoryClick}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const handleClick = () => onCategoryClick(data);

    return (
        <div className="container-tree-list">
            <div className="">
                <span onClick={toggle}>
                    {isOpen ? '[-]' : '[+]'}{' '}
                </span>
                <span onClick={handleClick}>
                    {data.title}
                </span>
            </div>
            {isOpen && data.children && (
                <div style={{paddingLeft: '20px'}}>
                    {data.children.map((child) => (
                        <TreeList key={child.id} data={child} onCategoryClick={onCategoryClick}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeList;


