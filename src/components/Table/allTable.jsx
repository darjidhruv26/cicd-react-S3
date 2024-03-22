import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClosedEventExceptionHistory } from "../../redux/history-table/historyTableThunk";
import Header from "../../layouts/Header/Header";
import { DashboardDetailSubheader } from "../../layouts/SubHeader";
import { AppMenuTrigger } from "../../layouts/AppMenuTrigger";
import { OprationSection } from "../DashboardDetailsComponent";
import { ChartView } from "../DashboardChartsComponent";
import { OperationRightTab } from "../../pages/DashboardDetails/DashboardDetails";
import ExceptionDetailsHistoryTable from "./ExceptionDetailsHistoryTable";
import { fetchExceptionDetailsHistory } from "../../redux/exception-details-history/exceptionDetailsHistoryThunks";
import Graph from "./Graph_column";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const AllTable = () => {
  const dispatch = useDispatch();
  const [intialLoad, setInitialLoad] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [visiblityStatus, setVisiblityStatus] = useState(false);
  const [headerVisiblity, setHeaderVisiblity] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [siteData, setSiteData] = useState();
  const [chartdata, setChartData] = useState([]);
  const [dayFilter, setDayFilter] = useState("");

  let chartdataall = useSelector(
    (state) => state.exceptionDetailsHistoryReducer.exceptionDetailsHistory.data
  );
  let userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  );

  const exceptionSummaryData = useSelector(
    (state) => state.summaryTableReducer.exceptionSummary
  );

  const closeEventExceptionHistoryData = useSelector((state) => {
    return state.historyTableReducer.closedEventExceptionHistory;
  });

  let date = formatDate(new Date());
  let startdate = formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
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
      let getDayFilter = JSON.parse(
        localStorage.getItem("dashboard_day_filter")
      );
      if (getDayFilter) {
        dayWiseData(null, getDayFilter);
      }
      setInitialLoad(false);
    }
  }, [intialLoad]);

  useEffect(() => {
    if (siteData) {
      setChartData(siteData);
    } else {
      setChartData(chartdataall);
    }
  }, [siteData, chartdataall]);

  useEffect(() => {
    dispatch(fetchExceptionDetailsHistory(dateRange));
  }, [dateRange, dispatch]);

  const dayWiseData = (event = null, dayValue = null) => {
    let btnvalue = "";
    if (event) {
      btnvalue = event.target.value;
    } else if (dayValue) {
      btnvalue = dayValue;
    }
    setDayFilter(btnvalue);
    localStorage.setItem("dashboard_day_filter", JSON.stringify(btnvalue));
    setSiteData();
    if (btnvalue === "1D") {
      console.log("daterange filter ", btnvalue);
      const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
      setDateRange((prevState) => ({
        ...prevState,
        search_params: {
          ...prevState.search_params,
          date_range_start_date: formatDate(startDate),
        },
      }));
    } else if (btnvalue === "2D") {
      console.log("daterange filter ", btnvalue);
      const startDate = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours ago
      setDateRange((prevState) => ({
        ...prevState,
        search_params: {
          ...prevState.search_params,
          date_range_start_date: formatDate(startDate),
        },
      }));
    } else if (btnvalue === "1W") {
      console.log("daterange filter ", btnvalue);
      const startDate = new Date(Date.now() - 168 * 60 * 60 * 1000); // 168 hours ago (1 week)
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
  const btnclick = () => {
    setSiteData();
  };

  let renderExceptionHistoryDetailsTable = () => {
    return (
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
              <Button
                onClick={(e) => dayWiseData(e)}
                value={"1D"}
                variant="contained"
            style={{ marginRight: "5px", backgroundColor:"#418fde" }}
              >
                {" "}
                {dayFilter === "1D" && <CheckIcon></CheckIcon>}1D
              </Button>
              <Button
                onClick={(e) => dayWiseData(e)}
                value={"2D"}
                variant="contained"
            style={{ marginRight: "5px", backgroundColor:"#418fde" }}
              >
                {" "}
                {dayFilter === "2D" && <CheckIcon></CheckIcon>}2D
              </Button>
              <Button
                onClick={(e) => dayWiseData(e)}
                value={"1W"}
                variant="contained"
            style={{ marginRight: "5px", backgroundColor:"#418fde" }}
              >
                {" "}
                {dayFilter === "1W" && <CheckIcon></CheckIcon>}1W
              </Button>
              <Button
                onClick={(e) => handleClear()}
                value={"1W"}
                variant="contained"
                disabled={dayFilter ? false : true}
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
  };
  return (
    <>
      <Header
        // subHeader={<DashboardDetailSubheader />}
        handleManuClick={handleManuClick}
        menuVisiblityStatus={visiblityStatus}
        headerVisiblity={headerVisiblity}
        headerIcon={window.location.origin + "/images/graph.svg"}
        heading="Dashboard"
      />
      <div id="main" className={`${visiblityStatus ? "app-btn-active" : ""}`}>
        {visiblityStatus ? (
          <AppMenuTrigger
            className={`${visiblityStatus ? "fadeIn" : "fadeOut"}`}
          />
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
      {/* <SideFilterTab
          setShowEquipmentSelect={setShowEquipmentSelect}
          showEquipmentSelect={showEquipmentSelect}
        /> */}
      {/* {showEquipmentSelect ? (
          <div className="overlay fade show" onClick={handleOverlay}></div>
        ) : null}
        {dateModalShowStatus &&
        Object.values(dateModalShowStatus).includes(true) ? (
          <div className="modal-backdrop fade show"></div>
        ) : null} */}
    </>
  );
};

export default AllTable;
