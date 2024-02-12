"use client";
import React, {FC, useDeferredValue, useEffect, useState} from 'react';
import "./DataTable.scss";
import CustomSelect from "@/components/UI/CustomSelect/CustomSelect";
import {useApi} from "@/hooks/useApi";

interface DataTableProps {
    data: any[];
    columns: any[];
    initialSelectedOptions: any
}

const DataTable: FC<DataTableProps> = ({data, columns, initialSelectedOptions}) => {
    const {sendRequest, loading, error} = useApi();
    const [dataToShow, setDataToShow] = useState(data);
    const [choseColumnsOptions, setChoseColumnsOptions] = useState(initialSelectedOptions);
    const [searsHOptions, setSearsHOptions] = useState([initialSelectedOptions[0]]);
    const [searchTerm, setSearchTerm] = useState('');
    const deferredSearchTerm = useDeferredValue(searchTerm);

    useEffect(() => {
        if (deferredSearchTerm) {
            const searchUrl = `users/search?field=${encodeURIComponent(searsHOptions[0].id)}&value=${deferredSearchTerm}`;
            sendRequest(searchUrl, 'GET', null)
                .then((res) => {
                    if (res.data.length === 0) {
                        setDataToShow(data);
                    } else {
                        setDataToShow(res.data);
                    }
                });
        }
    }, [deferredSearchTerm, searsHOptions]);


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
                    <input
                        type="text"
                        placeholder="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                {dataToShow.map((item, index) => (
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