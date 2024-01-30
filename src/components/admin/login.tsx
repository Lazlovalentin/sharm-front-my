import axios from "axios";

export default async function Page() {
  //  const bears = await useUser((state: any) => state.id)
  //  console.log("bears", bears);


    const url = process.env.NEXT_PUBLIC_API_URL

    async function onSubmit(formData: FormData) {
        'use server'
        const rawFormData = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        axios.post(url + '/api/auth/login', {
            email: formData.get('email'),
            password: formData.get('password')
        }, {withCredentials: true})
            .then((response: any) => {
                console.log("response", response.data);
            })
            .catch((error) => {
                console.log("error", error);
            })

        console.log("rawFormData", rawFormData);

        // mutate data
        // revalidate cache
    }

    return (
        <form action={onSubmit}>
            <input type="email" name="email"/>
            <input type="password" name="password"/>
            <button type="submit">Submit</button>
        </form>
    )
}

/*
async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        axios.post(url + '/api/auth/login', {
            email: formData.get('email'),
            password: formData.get('password')
        }, { withCredentials: true })
            .then((response) => {
                console.log("response", response);

            })
            .catch((error) => {
                console.log("error", error);
            })
    }
 */