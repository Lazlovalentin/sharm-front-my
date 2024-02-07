import axios from "axios";
import "./login.scss";
import {cookies} from 'next/headers'
import MyBtn from "@/components/UI/MyBtn/MyBtn";

function LoginPage() {
    async function createInvoice(formData: FormData) {
        'use server'
        const rawFormData = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        await axios.post('http://localhost:3000/api/auth/login', rawFormData)
            .then((response) => {
                cookies().set('logIn', "true")
                cookies().set('id', response.data.id)
                cookies().set('email', response.data.email)
                cookies().set('role', response.data.role)
                cookies().set('token', response.data.token, {secure: true})
            })
            .catch((error) => {
                console.log("login", error.response.data.message)
            })
    }

    return (
        <div className="container-login-admin">
            <form action={createInvoice}>
                <input type="email" name="email"/>
                <input type="password" name="password"/>
                <MyBtn text={"Submit"} color={"primary"}/>
            </form>
        </div>
    )
}

export default LoginPage

/*
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
 */