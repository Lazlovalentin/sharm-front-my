export const deleteAction = async (url: string, id: string) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  return fetch(`${baseURL}/api/${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
