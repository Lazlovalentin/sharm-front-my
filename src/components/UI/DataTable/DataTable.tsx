"use client";
import React, {FC, useState} from 'react';
import "./DataTable.scss";
import CustomSelect from "@/components/UI/CustomSelect/CustomSelect";

interface DataTableProps {
    data: any[];
    columns: any[];
    initialSelectedOptions: any
}

const DataTable: FC<DataTableProps> = ({data, columns, initialSelectedOptions}) => {
    const [choseColumnsOptions, setChoseColumnsOptions] = useState(initialSelectedOptions);

    const [searsHOptions, setSearsHOptions] = useState([initialSelectedOptions[0]]);

    return (
        <div className="container-data-table">
            <div className="wrapper-management">
                <CustomSelect
                    options={columns}
                    selectedOptions={choseColumnsOptions}
                    setSelectedOptions={setChoseColumnsOptions}
                    text={"Choose columns"}
                />
                <div>
                    <CustomSelect
                        options={columns}
                        selectedOptions={searsHOptions}
                        setSelectedOptions={setSearsHOptions}
                        text={"Search columns"}
                        isSingleSelect={true}
                    />
                    <input type={"text"} placeholder={"search"}/>
                </div>
            </div>
            <div className="wrapper-header-table">
                {choseColumnsOptions.map((column: any) => (
                    <div
                        key={column.id}
                        style={{width: column.width ? `${column.width}px` : 'auto'}}
                        className="datatable-header-cell"
                    >
                        {column.headerName}
                    </div>
                ))}
            </div>

            <div className="datatable-body">
                {data.map((item, index) => (
                    <div key={index} className="datatable-row">
                        {choseColumnsOptions.map((column: any) => (
                            <div
                                key={column.id}
                                style={{width: column.width ? `${column.width}px` : 'auto'}}
                                className="datatable-cell"
                            >
                                {column.render ?
                                    <>{column.render(item)}</> : <div className="wrapper-item">{item[column.id]}</div>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataTable;