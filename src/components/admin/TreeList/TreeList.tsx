"use client"
import React, {FC, useState} from 'react';
import "./TreeList.scss"


type CategoryProps = {
    data: any;
    onFolderClick: (item: any) => void;
};

const TreeList: FC<CategoryProps> = ({data, onFolderClick}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const handleClick = () => onFolderClick(data);


    return (
        <div className="container-tree-list">
            <div className="wrapper-resuly-tree-list">
                <div onClick={toggle}>
                    {isOpen ? '[-]' : '[+]'}{' '}
                </div>
                <div onClick={handleClick}>
                    {data.translations[0].name}
                </div>
            </div>
            {isOpen && data.children && (
                <div style={{paddingLeft: '20px'}}>
                    {data.children.map((child: any) => (
                        <TreeList key={child.id} data={child} onFolderClick={onFolderClick}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeList;


