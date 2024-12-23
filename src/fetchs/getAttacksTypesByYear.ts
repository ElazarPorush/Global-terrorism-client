import { TopGroup } from "../types/topGroups";

export const getAttacksTypesByYear = async (year: {from: number, to: number}) => {
    const response = await fetch(`http://localhost:8263/api/analysis/incident-trends?from=${year.from}&to=${year.to}`);
    if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    const data: TopGroup[] = await response.json();
    return data;
};