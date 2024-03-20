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
  return fetch(requestURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
