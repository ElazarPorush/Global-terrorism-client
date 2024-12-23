import React, { useEffect, useState } from 'react'
import { TopGroup } from '../../../types/topGroups';
import { getAttacksTypesByYear } from '../../../fetchs/getAttacksTypesByYear';
import { Bar } from 'react-chartjs-2';

export default function AttackTypesByYear() {
    const [data, setYearsData] = useState<TopGroup[]>([]);
    const [from, setFrom] = useState<number>(1970);
    const [to, setTo] = useState<number>(1996);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const fetchData = async () => {
        try {
            const response: TopGroup[] = await getAttacksTypesByYear({ from: from, to: to });
            setYearsData(response);
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

    const setOption = (num: number) => {
        if (num === 10) {
            setFrom(1986);
            setTo(1996);
            setIsOpen(false);
            fetchData();
        } else if (num === 5) {
            setFrom(1991);
            setTo(1996);
            setIsOpen(false);
            fetchData();
        } else if (num === 0) {
            setIsOpen(true);
        }
    
    }

    return (
        <div className='graph-types'>
            <div>
                <select defaultValue={'default'} onChange={(e) => setOption(+e.target.value)}>
                    <option value={'default'} disabled>Select a period of time</option>
                    <option value={10}>10 last years</option>
                    <option value={5}>5 last years</option>
                    <option value={0}>Write your own</option>
                </select>
            </div>
            <div style={{ display: isOpen ? 'flex' : 'none' }}>
                <input type="number" min={1970} max={1995} value={from} onChange={(e) => setFrom(+e.target.value)} placeholder="since" /> - <input type="number" min={1971} max={1996} value={to} onChange={(e) => setTo(+e.target.value)} placeholder="until" />
                <button onClick={fetchData}>Search</button>
            </div>
            <h1>סוגי התקפה לפי שנה</h1>
            <Bar style={{ width: '100%', height: '400px' }} options={{ responsive: true }} data={graphTypes} />
        </div>

    )
}
