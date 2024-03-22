import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    BarElement,
    TimeSeriesScale,
    Title,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-moment";
import ChartDataLabels from 'chartjs-plugin-datalabels';

// };

export const AccordionLineChart = (props) => {
    const date = new Date();

    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        TimeScale,
        TimeSeriesScale,
        BarElement,
        Title,
        ChartDataLabels
    );

    const colorArray = ["#6abf4a", "#6abf4a", "#d86018"];

    const data = {
        datasets: [{
            data: [
                { x: new Date(props.LastPM).toISOString(), y: 5 },
                { x: new Date().toISOString(), y: 10 },
                { x: new Date(props.NextPM).toISOString(), y: 5 },
            ],
            backgroundColor: colorArray,
            barThickness: .5,
            datalabels: {
                align: "end",
                anchor: "end",
                backgroundColor: colorArray, 
                offset: 5,
                formatter: function (value, context) {
                    const myDate = new Date(value.x);
                    return myDate.toLocaleString('default', { day: 'numeric' })  + 'th ' + myDate.toLocaleString('default', { month: 'short' }) + ' ' + myDate.getFullYear();
                },
                color: 'white',
                font: {
                    size: 9,
                }
            },
        }]
    };


    const options = {
        scales: {
            x: {
                type: 'timeseries',
                ticks: {
                    display: false //this will remove only the label
                },
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                display: false,
                grace: '2%',
                ticks: {
                    min: 0, // minimum value
                    max: 30 // maximum value
                },
            },
        },
        showAllTooltips: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
                xAlign: "center",
                yAlign: "top"
            },
        },
    };

    return <Bar options={options} data={data}  style={{height: 80}}/>;
};
