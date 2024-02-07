"use client";
import React, {FC} from 'react';
import "./DataTable.scss";

interface DataTableProps {
    data: any;
    columns: any[];
}

const DataTable: FC<DataTableProps> = ({data}) => {
    return (
        <div>
            <h1>users list124</h1>
            {data.data.map((item: any, index: any) =>
                <div key={index}>
                    <div>{item.id}</div>
                </div>
            )}
        </div>
    );
};

export default DataTable;