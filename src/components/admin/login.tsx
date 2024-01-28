"use client"
import {FormEvent} from 'react'
import axios from "axios";

export default function Page() {

    const url = process.env.NEXT_PUBLIC_API_URL

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        console.log("formData", formData.get('email'), formData.get('password'))

        axios.post(url + '/api/auth/login', {
            email: formData.get('email'),
            password: formData.get('password')
        })
            .then((response) => {
                console.log("response", response);
            })
            .catch((error) => {
                console.log("error", error);
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="email" name="email"/>
            <input type="password" name="password"/>
            <button type="submit">Submit</button>
        </form>
    )
}