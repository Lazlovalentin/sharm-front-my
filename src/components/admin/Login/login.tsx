import "./login.scss";
import {cookies} from 'next/headers'
import MyBtn from "@/components/UI/MyBtn/MyBtn";

function LoginPage() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    let error: null | string = null
    let loader: boolean = false

    async function createInvoice(formData: FormData) {
        'use server'

        const emailEntry = formData.get('email');
        const passwordEntry = formData.get('password');

        const email = typeof emailEntry === 'string' ? emailEntry.toLowerCase() : '';
        const password = typeof passwordEntry === 'string' ? passwordEntry : '';

        const rawFormData = {email, password};


        fetch(`${baseURL}/api/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rawFormData),
        })
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data) => {
                console.log("login", data.id)
                cookies().set('logIn', "true")
                cookies().set('id', data.id)
                cookies().set('email', data.email)
                cookies().set('role', data.role)
                cookies().set('token', data.token, {secure: true})
            })
            .catch((error) => {
                console.log("login", error)
            });
    }

    return (
        <>
            <div className="container-login-admin">
                {loader ? <div>loading...</div> : null}
                {error ? <div>{error}</div> : null}
                <div>
                    <div>admin account</div>
                    <div>name: preview@gmail.com</div>
                    <div>Pass: 1234567</div>
                </div>
                <form action={createInvoice}>
                    <input type="email" name="email"/>
                    <input type="password" name="password"/>
                    <MyBtn text={"Submit"} color={"primary"}/>
                </form>
            </div>
        </>
    )
}

export default LoginPage
