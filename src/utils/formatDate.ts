export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString().slice(-2);

    return `${day}.${month}.${year}`;
};
