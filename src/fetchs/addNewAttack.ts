import { AddAttack } from "../types/addAttack";

const apiUrl = import.meta.env.VITE_API_URL;

export const addNewAttack = async (url: string, data: AddAttack) => {
    await fetch(apiUrl + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

};