import { useState } from "react";
import Cookies from "js-cookie";
interface IRequestOptions {
    url: string;
    method?: "GET" | "POST" | "DELETE" | "PATCH";
    body?: any;
    headers?: HeadersInit;
}
const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean | string>('');
    const request = async ({ url, method = "POST", body = null, headers }: IRequestOptions) => {
        setLoading(true);
        const token = Cookies.get("token");
        try {
            const res = await fetch(url, { method, body, headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...headers
              }, });
            if (res.status >= 400) {
                const error = await res.json();
                throw new Error(
                    `Couldn't fetch data, response status: ${res.status}, reason: ${error.message}`
                );
            }
            setLoading(false);
            return res.json();
        } catch (e) {
            setError((e as Error).message);
            setLoading(false);
            throw e;
        }
    };
    const clearError = () => {
        setError(false);
    };
    return { request, loading, error, clearError };
};
export default useHttp;