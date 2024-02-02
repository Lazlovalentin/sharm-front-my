"use client";
import "./CreateUser.scss";
import {useApi} from "@/hooks/useApi";
import HorizontalLoader from "@/components/UI/HorizontalLoader/HorizontalLoader";
import MyInput from "@/components/general/MyInput/MyInput";
import React from "react";
import MyBtn from "@/components/general/MyBtn/MyBtn";
import {useForm} from "react-hook-form";
import ErrorMessages from "@/components/admin/ErrorMessages/ErrorMessages";

const CreateUser = () => {
    const {sendRequest, loading, error} = useApi();
    const {register, handleSubmit, formState: {errors}} = useForm<any>();

    const onSubmit = (e: any) => {
        const formData = new FormData(e.target);
// isPhoneVerified, isEmailVerified
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        sendRequest('/users', 'POST', data)
            .then((response) => {
                if (response.data) {
                    const {id, role, token, email} = response.data;
                    console.log(response.data)
                }
            })
    }

    console.log("errors", errors)
    return (
        <div className="container-create-user-admin">
            {loading && <HorizontalLoader/>}
            {error ? <ErrorMessages text={`${error}`}/> : null}
            <div>Create User</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MyInput
                    type={"text"}
                    label={"name"}
                    placeholder={"name"}
                    isRequired={true}
                    {...register('name', {required: 'This field is required'})}
                    error={errors.name?.message}
                />
                <MyInput
                    type={"text"}
                    label={"surname"}
                    placeholder={"surname"}
                    isRequired={true}
                    {...register('surname', {required: 'This field is required'})}
                    error={errors.surname?.message}
                />
                <MyInput
                    type={"text"}
                    label={"phone"}
                    placeholder={"phone"}
                    isRequired={true}
                    isPhone={true}
                    {...register('phone', {required: 'This field is required'})}
                    error={errors.phone?.message}
                />
                <MyInput
                    type={"email"}
                    label={"email"}
                    placeholder={"email"}
                    isRequired={true}
                    {...register('email', {required: 'This field is required'})}
                    error={errors.email?.message}
                />
                <MyInput
                    type={"password"}
                    label={"password"}
                    placeholder={"password"}
                    isRequired={true}
                    {...register('password', {required: 'This field is required'})}
                    error={errors.password?.message}
                />
                <MyBtn
                    type={"submit"}
                    text={"Submit"}
                />
            </form>
        </div>
    );
};

export default CreateUser;