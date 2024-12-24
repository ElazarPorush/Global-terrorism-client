import React, { useEffect, useState } from 'react'
import { getAllData } from '../../../fetchs/getAllData';
import { Pie } from 'react-chartjs-2';
import { TopGroup } from '../../../types/topGroups';

export default function TopGroups() {
    const [data, setData] = useState<TopGroup[]>([]);
    const [city, setCity] = useState<string>('');

    const fetchData = async () => {
        try {
            if (city === '') {
                return;
            }
            const response = await getAllData(`api/relationships/top-groups/${city}`);
            setData(response);
        } catch (err) {
            console.log(err);
        }
    }

    const labels = data.map((item) => item.name);
    const graphTypes = {
        labels: labels,
        datasets: [
            {
                label: "דירוג סוג התקפה לפי נפגעים",
                backgroundColor: [
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(14, 200, 160, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(218, 7, 7, 0.8)",
                    "rgb(40, 240, 4)"
                ],
                borderColor: "rgb(24, 35, 30)",
                data: data.map((item) => item.count),
            },
        ],
    };

    return (
        <div className='graph-types'>
            <h1>Top Groups</h1>
            <div>
                <label htmlFor="city">Search By City</label>
                <input onChange={(e) => setCity(e.target.value)} id="city" type="text" />
                <input type="submit" value={"Search"} onClick={() => fetchData()} />
            </div>
            {data.length > 0 && <Pie style={{ width: '20%', height: '200px' }} options={{ responsive: true }} data={graphTypes} />}
        </div>

    )
}
