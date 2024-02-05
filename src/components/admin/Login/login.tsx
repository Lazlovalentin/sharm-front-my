"use client"
import axios from "axios";
import {useUser} from "@/store/admin/user";
import {useState} from "react";
import HorizontalLoader from "@/components/UI/HorizontalLoader/HorizontalLoader";
import {useApi} from "@/hooks/useApi";

function LoginPage() {
    const {setUserProperty} = useUser()
    const {sendRequest, loading, error} = useApi();

    const onSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target);

        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        sendRequest('auth/login', 'POST', data)
            .then((response) => {
                if (response.data) {
                    const {id, role, token, email} = response.data;
                    setUserProperty('id', id);
                    setUserProperty('role', role);
                    setUserProperty('email', email);
                    setUserProperty('token', token);
                }
            })
    }

    return (
        <>
            {loading && <HorizontalLoader/>}
            <form onSubmit={onSubmit}>
                <input type="email" name="email"/>
                <input type="password" name="password"/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default LoginPage