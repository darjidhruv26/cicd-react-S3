import React from "react";
import Chart from "react-apexcharts";

export const StackedLineAreaChart = () => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "area",
      stacked: true,
      sparkline: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "10px",
      },
      items: {
        display: "inline-flex",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
      lineCap: "butt",
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      }
    },
    yaxis: {
      show: false,
    },
    fill: {
      colors: ["#90bfde", "#b9e172"],
    },
    markers: {
      colors: ["#2c8bc1", "#bee56b"],
    },
    colors: ["#2c8bc1", "#bee56b"],
  };

  const series = [
    {
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  return <Chart options={options} series={series} type="area" />;
};
