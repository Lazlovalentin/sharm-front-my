import axios from "axios";
import {useUser} from "@/store/admin/user";
import {useState} from "react";
import HorizontalLoader from "@/components/UI/HorizontalLoader/HorizontalLoader";

function LoginPage() {
    const {role, setUserProperty} = useUser()

    const [error, serError] = useState<null | string>(null)

    const [loading, setLoading] = useState<boolean>(false)

    console.log("role", role);


    const url = process.env.NEXT_PUBLIC_API_URL

    const onSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target);

        const date = {
            email: formData.get('email'),
            password: formData.get('password'),
        }
        setLoading(true)
        axios.post(url + '/api/auth/login', date,
            {withCredentials: true})
            .then((response: any) => {
                const {id, name, role, token, email} = response.data;
                setUserProperty('id', id);
                setUserProperty('role', role);
                setUserProperty('email', email);
                setUserProperty('token', token);
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                serError(error.response.data.message);
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