"use client";
import React, {FC, useState} from 'react';
import DataTable from "@/components/UI/DataTable/DataTable";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import MyModal from "@/components/UI/MyModal/MyModal";
import CreateUser from "@/components/admin/users/CreateUser/CreateUser";
import {useApi} from "@/hooks/useApi";
import {useRouter} from "next/navigation";
import CustomSelect from "@/components/UI/CustomSelect/CustomSelect";
import ChangeRole from "@/components/admin/users/ChangeRole/ChangeRole";

interface UsersWrapperProps {
    data: any;

}

const UsersWrapper: FC<UsersWrapperProps> = ({data}) => {
    const router = useRouter();
    const {sendRequest, loading, error} = useApi();

    const deleteUsers = (id: number) => {

        sendRequest(`users/${id}`, 'DELETE', null)
            .then((res) => {
                console.log("res", res)
                router.refresh();
            })
    }


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
            id: 'Change Role',
            headerName: 'Change Role',
            width: 120,
            render: (item) => <div>
                <ChangeRole id={item.id} role={item.role}/>
            </div>,
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
            render: (item) => <button onClick={() => deleteUsers(item.id)}>delete</button>,
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
                <CreateUser setOpenCreateUser={setOpenCreateUser}/>
            </MyModal>
        </>
    );
};

export default UsersWrapper;