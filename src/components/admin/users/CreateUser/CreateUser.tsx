"use client";
import "./CreateUser.scss";
import {useApi} from "@/hooks/useApi";
import HorizontalLoader from "@/components/UI/HorizontalLoader/HorizontalLoader";
import MyInput from "@/components/general/MyInput/MyInput";
import React, {useState} from "react";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import {useForm, Controller} from 'react-hook-form';
import InformationMessages from "@/components/admin/InformationMessages/InformationMessages";

const CreateUser = () => {
    const {sendRequest, loading, error} = useApi();
    const {control, register, handleSubmit, formState: {errors}} = useForm<any>();
    const [isUserCreated, setIsUserCreated] = useState(false);

    const onSubmit = (e: any) => {
        const data = {
            name: e.name,
            surname: e.surname,
            email: e.email,
            // isEmailVerified: true,
            phone: e.phone,
            // isPhoneVerified: true,
            password: e.password,
        }

        sendRequest('users', 'POST', data)
            .then((response) => {
                if (response.data) {
                   // const {id, role, token, email} = response.data;
                    setIsUserCreated(true);
                }
            })
    }


    return (
        <div className="container-create-user-admin">
            {loading && <HorizontalLoader/>}
            {error ? <InformationMessages text={`${error}`} type={"error"}/> : null}
            {isUserCreated ? <InformationMessages text={`user created`} type={"success"}/> : null}
            <form onSubmit={handleSubmit(onSubmit)}>
                <MyInput
                    type={"text"}
                    label={"name"}
                    placeholder={"name"}
                    isRequired={true}
                    error={errors.name?.message}
                    register={register('name', {
                        required: 'This field is required',
                        minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Name cannot be more than 50 characters',
                        }
                    })}
                />
                <MyInput
                    type={"text"}
                    label={"surname"}
                    placeholder={"surname"}
                    isRequired={true}
                    error={errors.surname?.message}
                    register={register('surname', {
                        required: 'This field is required',
                        minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Name cannot be more than 50 characters',
                        }
                    })}
                />
                <Controller
                    control={control}
                    name="phone"
                    rules={{
                        required: 'This field is required',
                        minLength: {
                            value: 19,
                            message: 'Phone number must be at least',
                        },
                        maxLength: {
                            value: 19,
                            message: 'Phone number cannot be more than 13 digits',
                        }
                    }}
                    render={({field: {onChange, onBlur, value, ref}, fieldState: {error}}) => (
                        <MyInput
                            type="text"
                            label="phone"
                            placeholder="phone"
                            isRequired={true}
                            isPhone={true}
                            error={error ? error.message : null}
                            onChange={onChange}
                            value={value}
                            ref={ref}
                        />
                    )}
                />
                <MyInput
                    type={"email"}
                    label={"email"}
                    placeholder={"email"}
                    isRequired={true}
                    error={errors.email?.message}
                    register={register('email', {
                        required: 'This field is required',
                        minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Name cannot be more than 50 characters',
                        }
                    })}
                />
                <MyInput
                    type={"password"}
                    label={"password"}
                    placeholder={"password"}
                    isRequired={true}
                    {...register('password', {required: 'This field is required'})}
                    error={errors.password?.message}
                    register={register('password', {
                        required: 'This field is required',
                        minLength: {
                            value: 6,
                            message: 'Name must be at least 2 characters',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Name cannot be more than 50 characters',
                        }
                    })}
                />
                <MyBtn
                    text={"Submit"}
                    color={"primary"}
                />
            </form>
        </div>
    );
};

export default CreateUser;