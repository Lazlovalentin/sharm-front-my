"use client";
import React, {FC} from 'react';
import DataTable from "@/components/UI/DataTable/DataTable";

interface UsersWrapperProps {
    data: any;

}

const UsersWrapper: FC<UsersWrapperProps> = ({data}) => {

    const columns = [
        {
            id: 'id',
            headerName: 'ID',
            width: 25
        },
        {
            id: 'name',
            headerName: 'name',
            width: 85
        },
        {
            id: 'surname',
            headerName: 'surname',
            width: 85
        },
        {
            id: 'email',
            headerName: 'Email',
            width: 120
        },
        {
            id: 'isEmailVerified',
            headerName: 'isEmailVerified',
            width: 120,
            render: (item) => <div>{item.isEmailVerified ? "true" : "false"}</div>,
        },
        {
            id: 'Phone',
            headerName: 'Phone',
            width: 120
        },
        {
            id: 'isPhoneVerified',
            headerName: 'isPhoneVerified',
            width: 120,
            render: (item) => <div>{item.isPhoneVerified ? "true" : "false"}</div>,
        },
        {
            id: 'role',
            headerName: 'Role',
            width: 50,
            render: (item) => <div>{item.role}</div>,
        },
        {
            id: 'delete',
            headerName: 'delete',
            width: 50,
            render: (item) => <button onClick={() => alert(`Editing ${item.id}`)}>delete</button>,
        }
    ]

    return (
        <div>
            <DataTable
                initialSelectedOptions={columns}
                columns={columns}
                data={data.data}
            />
        </div>
    );
};

export default UsersWrapper;