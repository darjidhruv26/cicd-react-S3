import React, { useRef } from "react";

import {
  Bar,
  getDatasetAtEvent,
  getElementAtEvent,
} from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@mui/base";
import CancelIcon from "@mui/icons-material/Cancel";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ StackedData, setSiteData }) => {
  const chartRef = useRef(null);
  let allchartdata = useSelector(
    (state) => state.exceptionDetailsHistoryReducer.exceptionDetailsHistory.data
  );
  const [intialLoad, setInitialLoad] = useState(true);
  const [clicksite, setclicksite] = useState({
    site_name: "",
  });
  const [clickseverity, setclickseverity] = useState({
    exception_severity: "",
  });

  useEffect(() => {
    if (intialLoad) {
      let getSiteFilter = JSON.parse(
        localStorage.getItem("dashboard_site_filter")
      );
      let getSeverityFilter = JSON.parse(
        localStorage.getItem("dashboard_severity_filter")
      );
      if (getSiteFilter && getSeverityFilter) {
        setclicksite(getSiteFilter);
        setclickseverity(getSeverityFilter);
      }
      setInitialLoad(false);
    }
  }, [intialLoad]);
  useEffect(() => {
    if (clicksite.site_name && clickseverity.exception_severity) {
      let siteclick = clicksite.site_name;
      let exceptionSeverity = clickseverity.exception_severity;

      if (exceptionSeverity.startsWith("PMP")) {
        let fil = exceptionSeverity.split(" ")[1];
        const filteredData = StackedData.filter(
          (item) =>
            item.site_name === siteclick &&
            item.exception_severity === fil &&
            item.send_to_pmp === true &&
            item.pivision_url !== "No pivison url"
        );
        setSiteData(filteredData);
      } else if (exceptionSeverity.startsWith("fetch")) {
        let fil = exceptionSeverity.split(" ")[1];
        const filteredData = StackedData.filter(
          (item) =>
            item.site_name === siteclick &&
            item.exception_severity === fil &&
            item.is_pmp_fetched === true
        );
        setSiteData(filteredData);
      } else {
        const filteredDataout = StackedData.filter(
          (item) =>
            item.site_name === siteclick &&
            item.exception_severity === clickseverity.exception_severity
        );
        setSiteData(filteredDataout);
      }
    }
  }, [clicksite, clickseverity]);

  const printElementAtEvent = (element) => {
    if (element.length) {
      const { datasetIndex, index } = element[0];
      setclicksite({
        ...clicksite,
        site_name: data.labels[index],
      });
      localStorage.setItem(
        "dashboard_site_filter",
        JSON.stringify({
          site_name: data.labels[index],
        })
      );
    }
  };
  const printDatasetAtEvent = (dataset) => {
    if (dataset.length) {
      const datasetIndex = dataset[0].datasetIndex;
      setclickseverity({
        ...clickseverity,
        exception_severity: data.datasets[datasetIndex].label,
      });
      localStorage.setItem(
        "dashboard_severity_filter",
        JSON.stringify({
          exception_severity: data.datasets[datasetIndex].label,
        })
      );
    }
  };

  const handleClick = (event) => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
  };

  const options = {
    plugins: {
      title: {
        display: false,
        text: " Sites Exceptions Severity",
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          drawOnChartArea: false, // Remove vertical background grid lines
        },
        // display: false,
      },
      y: {
        stacked: true,
        grid: {
          drawOnChartArea: false, // Remove vertical background grid lines
        },
        // display: false,
      },
    },
  };
  const aggregatedData = StackedData.reduce((acc, entry) => {
    const siteName = entry.site_name;

    const severity = entry.exception_severity;

    const sendToPMP = entry.send_to_pmp;

    const pivisionUrl = entry.pivision_url;

    const ispmpfetched = entry.is_pmp_fetched;

    if (!acc[siteName]) {
      acc[siteName] = {
        stack0: { Critical: 0, Major: 0, Minor: 0 },
        stack1: { Critical: 0, Major: 0, Minor: 0 },
        stack2: { Critical: 0, Major: 0, Minor: 0 },
      };
    }

    if (sendToPMP === true && pivisionUrl !== "No pivison url") {
      acc[siteName].stack1[severity] += 1;
    }

    if (ispmpfetched === true) {
      acc[siteName].stack2[severity] += 1;
    }
    acc[siteName].stack0[severity] += 1;

    return acc;
  }, {});

  const labels = Object.keys(aggregatedData);

  // const criticalValues = labels.map(
  //   (site) => aggregatedData[site].stack0.Critical
  // );
  // const majorValues = labels.map((site) => aggregatedData[site].stack0.Major);
  // const minorValues = labels.map((site) => aggregatedData[site].stack0.Minor);

  const pmpcriticalValues = labels.map(
    (site) => aggregatedData[site].stack1.Critical
  );
  const pmpmajorValues = labels.map(
    (site) => aggregatedData[site].stack1.Major
  );
  const pmpminorValues = labels.map(
    (site) => aggregatedData[site].stack1.Minor
  );
  const fetchcriticalValues = labels.map(
    (site) => aggregatedData[site].stack2.Critical
  );
  const fetchmajorValues = labels.map(
    (site) => aggregatedData[site].stack2.Major
  );
  const fetchminorValues = labels.map(
    (site) => aggregatedData[site].stack2.Minor
  );
  const data = {
    labels,
    datasets: [
      {
        label: "PMP Critical",
        data: pmpcriticalValues,
        backgroundColor: "#FA9A50	",
        stack: "Stack 1",
      },
      {
        label: "PMP Major",
        data: pmpmajorValues,
        backgroundColor: "#FBB782	",
        stack: "Stack 1",
      },
      {
        label: "PMP Minor",
        data: pmpminorValues,
        backgroundColor: "#FDD4B4	",
        stack: "Stack 1",
      },
      {
        label: "fetch Critical",
        data: fetchcriticalValues,
        backgroundColor: "#FA9A50	",
        stack: "Stack 2",
      },
      {
        label: "fetch Major",
        data: fetchmajorValues,
        backgroundColor: "#FBB782	",
        stack: "Stack 2",
      },
      {
        label: "fetch Minor",
        data: fetchminorValues,
        backgroundColor: "#FDD4B4	",
        stack: "Stack 2",
      },
    ],
  };

  const handleSeverityFilter = () => {
    setSiteData(allchartdata);
    setclicksite({
      site_name: "",
    });
    setclickseverity({
      exception_severity: "",
    });
    localStorage.removeItem("dashboard_site_filter");
    localStorage.removeItem("dashboard_severity_filter");
  };

  return (
    <>
      <div style={{ width: "70%" }}>
        <Bar
          ref={chartRef}
          options={options}
          data={data}
          onClick={handleClick}
          height={100}
        />
      </div>
      {(clicksite.site_name || clickseverity.exception_severity) && (
        <div
          className="m-3"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <Button variant="contained" style={{ margin: "0 5px -27px 0"}}>
            Site: {clicksite.site_name} || Severity:{" "}
            {clickseverity.exception_severity}
            <CancelIcon
              className="ml-2 pb-1"
              style={{ color: "#495057" }}
              onClick={handleSeverityFilter}
            ></CancelIcon>
          </Button>
        </div>
      )}
    </>
  );
};

export default Graph;
