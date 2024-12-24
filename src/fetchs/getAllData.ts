const apiUrl = import.meta.env.VITE_API_URL;

export const getAllData = async (url: string) => {
    const response = await fetch(apiUrl + url);
    const data = await response.json();
    return data;
};