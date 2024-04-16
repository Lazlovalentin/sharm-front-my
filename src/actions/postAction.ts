import Cookies from "js-cookie";

export const postAction = async (
  url: string,
  data: any,
  lang?: string,
  id?: string
) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get("token");

  const requestURL = id
    ? `${baseURL}/api/${url}/${lang}/${id}`
    : `${baseURL}/api/${url}`;
  try {
    const response = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      if (response.status >= 400) {
        const error = await response.json();
        throw new Error(
          `Couldn't fetch data, response status: ${response.status}, reason: ${error.message}`
        );
      }
    }
    return await response.json();
  } catch (e) {
    throw e;
  }
};
