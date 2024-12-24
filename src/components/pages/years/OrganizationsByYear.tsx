import { useState } from 'react'
import { TopGroup } from '../../../types/topGroups';
import { Pie } from 'react-chartjs-2';
import { getAllData } from '../../../fetchs/getAllData';

export default function OrganizationsByYear() {
    const [data, setYearsData] = useState<TopGroup[]>([]);
    const [year, setYear] = useState<number>(1982);

    const fetchData = async () => {
        try {
            const response: TopGroup[] = await getAllData(`api/relationships/groups-by-year/${year}`);
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
                label: "Attack type ranking according to casualties",
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
            <h1>Organizations by year</h1>
            <div>
                <label htmlFor="year"></label>
                <input type="number" id="year" min={1970} max={2017} value={year} onChange={(e) => setYear(+e.target.value)}/>
                <button onClick={fetchData}>Search</button>
            </div>
            <Pie style={{ width: '100%', height: '400px' }} options={{ responsive: true }} data={graphTypes} />
        </div>
    )
}