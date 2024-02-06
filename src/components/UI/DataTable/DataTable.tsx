import React, {FC} from 'react';
import "./DataTable.scss";

interface DataTableProps {
    data: any[];
    columns: any[];
}

const DataTable: FC<DataTableProps> = () => {
    return (
        <div>
            DataTable
        </div>
    );
};

export default DataTable;