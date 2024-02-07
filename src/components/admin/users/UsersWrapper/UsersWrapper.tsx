"use client";
import React, {FC, useState} from 'react';
import DataTable from "@/components/UI/DataTable/DataTable";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import MyModal from "@/components/UI/MyModal/MyModal";

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

    const [openCreateUser, setOpenCreateUser] = useState(false);

    const openCreateUserHandler = () => {
        setOpenCreateUser(!openCreateUser);
    }

    return (
        <>
            <MyBtn text={"create user"} color={"primary"} click={openCreateUserHandler}/>
            <DataTable
                initialSelectedOptions={columns}
                columns={columns}
                data={data.data}
            />
            <MyModal visible={openCreateUser} setVisible={setOpenCreateUser}>
                <div>
                    <h1>Create user</h1>
                </div>
            </MyModal>
        </>
    );
};

export default UsersWrapper;