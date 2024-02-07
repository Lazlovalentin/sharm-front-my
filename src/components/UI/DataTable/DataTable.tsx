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
    const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);

    return (
        <div className="container-data-table">
            <h1>users list</h1>
            <CustomSelect
                options={columns}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
            />
            <div className="wrapper-header-table">
                {selectedOptions.map((column) => (
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
                        {selectedOptions.map((column) => (
                            <div
                                key={column.id}
                                style={{width: column.width ? `${column.width}px` : 'auto'}}
                                className="datatable-cell"
                            >
                                {column.render ? column.render(item) : item[column.id]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataTable;