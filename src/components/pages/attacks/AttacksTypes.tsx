import React, { useEffect, useState } from 'react'
import AttackType from '../../../types/attackType';
// import { fetchTop } from '../../Fetches/fetchTop';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import Chart from  'chart.js/auto'
import { getAllData } from '../../../fetchs/getAllData';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
export default function AttacksTypes() {
    const [data, setData] = useState<AttackType[] >([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllData("api/analysis/deadliest-attack-types/");
                setData(response); 
            } catch (err) {
                console.log(err);   
            }
        }
        fetchData();  
    }, [])

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
        data: data.map((item) => item.casualties),
        },
        ],
    };

  return (
    <div className='graph-types'>
        <h1>Attack type statistics by casualty</h1>
        <Bar style={{ width: '100%', height: '400px' }} options={{ responsive: true }} data={graphTypes}  />
    </div>

  )
}