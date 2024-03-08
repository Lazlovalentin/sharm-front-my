export const patchAction = async (
  url: string,
  data: Record<string, any>,
  id?: string,
  move?: boolean
) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  let endpoint = `${baseURL}/api/${url}`;

  if (id) {
    endpoint += `/${id}`;
  } else if (move) {
    endpoint += "/move";
  }

  return fetch(endpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => responseData)
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
