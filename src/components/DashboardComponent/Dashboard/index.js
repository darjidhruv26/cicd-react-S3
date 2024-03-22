import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../layouts/Header/Header";
import { DashboardDetailSubheader } from "../../../layouts/SubHeader";
import { AppMenuTrigger } from "../../../layouts/AppMenuTrigger";
import { OprationSection } from "../../DashboardDetailsComponent";
import { ChartView } from "../../DashboardChartsComponent";
import { OperationRightTab } from "../../../pages/DashboardDetails/DashboardDetails";
import ExceptionDetailsHistoryTable from "../DashboardTable";
import Graph from "../DashboardChart";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { fetchExceptionDetailsHistory } from "../../../redux/exception-details-history/exceptionDetailsHistoryThunks";

const Dashboard_chart_table = () => {
  const dispatch = useDispatch();
  const [intialLoad, setInitialLoad] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [visiblityStatus, setVisiblityStatus] = useState(false);
  const [headerVisiblity, setHeaderVisiblity] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [siteData, setSiteData] = useState();
  const [chartdata, setChartData] = useState([]);
  const [dayFilter, setDayFilter] = useState("");
  const chartdataall = useSelector((state) => state.exceptionDetailsHistoryReducer.exceptionDetailsHistory.data);
  const exceptionSummaryData = useSelector((state) => state.summaryTableReducer.exceptionSummary);
  const date = formatDate(new Date());
  const startdate = formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const [dateRange, setDateRange] = useState({
    per_page: 100000,
    search_params: {
      date_range_start_date: startdate,
      date_range_end_date: date,
    },
  });

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (intialLoad) {
      const getDayFilter = JSON.parse(localStorage.getItem("dashboard_day_filter"));
      if (getDayFilter) {
        dayWiseData(null, getDayFilter);
      }
      setInitialLoad(false);
    }
  }, [intialLoad]);

  useEffect(() => {
    setChartData(siteData || chartdataall);
  }, [siteData, chartdataall]);

  useEffect(() => {
    dispatch(fetchExceptionDetailsHistory(dateRange));
  }, [dateRange, dispatch]);

  const dayWiseData = (event = null, dayValue = null) => {
    let btnvalue = event ? event.target.value : dayValue;
    setDayFilter(btnvalue);
    localStorage.setItem("dashboard_day_filter", JSON.stringify(btnvalue));
    setSiteData();
    const dateOffsets = { "1D": 24, "2D": 48, "1W": 168 };
    if (dateOffsets[btnvalue]) {
      const startDate = new Date(Date.now() - dateOffsets[btnvalue] * 60 * 60 * 1000);
      setDateRange((prevState) => ({
        ...prevState,
        search_params: {
          ...prevState.search_params,
          date_range_start_date: formatDate(startDate),
        },
      }));
    }
  };

  const handleClear = () => {
    setDayFilter("");
    localStorage.removeItem("dashboard_day_filter");
    setDateRange({
      per_page: 100000,
      search_params: {
        date_range_start_date: formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000)),
        date_range_end_date: date,
      },
    });
  };

  const handleManuClick = () => {
    setVisiblityStatus(!visiblityStatus);
  };

  const renderExceptionHistoryDetailsTable = () => (
    <>
      {chartdataall.length > 0 && (
        <div className="graph-box">
          <div
            style={{
              marginBottom: "30px",
              width: "100%",
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            {["1D", "2D", "1W"].map((btnValue) => (
              <Button
                key={btnValue}
                onClick={(e) => dayWiseData(e, btnValue)}
                value={btnValue}
                variant="contained"
                style={{
                  marginRight: "5px",
                  backgroundColor: dayFilter === btnValue ? "#418fde" : "#2f76bd",
                }}
              >
                {dayFilter === btnValue && <CheckIcon />}
                {btnValue}
              </Button>
            ))}
            <Button
              onClick={handleClear}
              value={"1W"}
              variant="contained"
              disabled={!dayFilter}
              style={{
                marginRight: "5px",
                backgroundColor: dayFilter ? "#B2292E" : "	#D3D3D3",
                color: "white",
              }}
            >
              Clear
            </Button>
          </div>
          <Graph
            StackedData={chartdataall}
            setSiteData={setSiteData}
            setDateRange={setDateRange}
            chartdataall={chartdataall}
          />
        </div>
      )}
      {chartdata && (
        <div className="dashboard-table">
          <ExceptionDetailsHistoryTable chartdata={chartdata} />
        </div>
      )}
    </>
  );

  return (
    <>
      <Header
        handleManuClick={handleManuClick}
        menuVisiblityStatus={visiblityStatus}
        headerVisiblity={headerVisiblity}
        headerIcon={`${window.location.origin}/images/graph.svg`}
        heading="Dashboard"
      />
      <div id="main" className={`${visiblityStatus ? "app-btn-active" : ""}`}>
        {visiblityStatus ? (
          <AppMenuTrigger className={`${visiblityStatus ? "fadeIn" : "fadeOut"}`} />
        ) : !showGraph ? (
          <>
            <OprationSection
              operationRightTab={
                <OperationRightTab
                  handleGraph={setShowGraph}
                  showGraph={showGraph}
                  setHeaderVisiblity={setHeaderVisiblity}
                  headerVisiblity={headerVisiblity}
                />
              }
              activeTab="AllData"
              isVisibleautoRefresh={false}
              autoRefresh={autoRefresh}
            />
            <div className="recommendation-section">
              {renderExceptionHistoryDetailsTable(exceptionSummaryData)}
            </div>
          </>
        ) : (
          <ChartView
            setShowGraph={setShowGraph}
            headerVisiblity={headerVisiblity}
            setHeaderVisiblity={setHeaderVisiblity}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard_chart_table;
