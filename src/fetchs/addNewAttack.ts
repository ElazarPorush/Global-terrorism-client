import { AddAttack } from "../types/addAttack";

export const addNewAttack = async (url: string, data: AddAttack) => {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

};