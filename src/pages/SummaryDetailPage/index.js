import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header/Header";
import {
  OprationSection,
  SideFilterTab,
} from "../../components/DashboardDetailsComponent";
import { DashboardDetailSubheader } from "../../layouts/SubHeader";
import { CategorywiseTables } from "../../components/SummaryPageComponent";
import { AppMenuTrigger } from "../../layouts/AppMenuTrigger";
import { ChartView } from "../../components/DashboardChartsComponent";
// import tableData from "../../JSON/dummy.json";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPiExceptionSummary,
  fetchPiExceptionHistorySummary,
  fetchClosedPiExceptionHistorySummary,
} from "../../redux/summary-table/summaryTableThunk";
import { fetchCustomFilterGroupList } from "../../redux/custom-filter/customFilterThunk";
import {
  fetchExceptionReasonValues,
  fetchExceptionStatusValues,
} from "../../redux/exception-details/exceptionDetailsThunks";
import { OperationRightTab } from "../DashboardDetails/DashboardDetails";
import { useNavigate } from "react-router-dom";

const perPage = 10;

const SummaryDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  );

  const exceptionSummaryData = useSelector(
    (state) => state.summaryTableReducer.exceptionSummary
  );

  const dateModalShowStatus = useSelector(
    (state) => state.summaryTableReducer.showDateModal
  );
  const piExceptionSummaryData = useSelector((state) => {
    return state.summaryTableReducer.piExceptionSummary;
  });
  const piExceptionHistorySummary = useSelector(
    (state) => state.summaryTableReducer.piExceptionHistorySummary
  );

  const closedPiExceptionHistorySummary = useSelector(
    (state) => state.summaryTableReducer.closedPiExceptionHistorySummary
  );
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [visiblityStatus, setVisiblityStatus] = useState(false);
  const [headerVisiblity, setHeaderVisiblity] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [showEquipmentSelect, setShowEquipmentSelect] = useState(false);

  const [summarySearchParams, setSummarySearchParams] = useState({
    site_name_current: { operator: "ILIKE", value: "", is_date: false },
    // is_taco: {'operator': '=', 'value': 'false'},
    fleet_type: { operator: "ILIKE", value: "", is_date: false },
    equipmentId: { operator: "ILIKE", value: "", is_date: false },
    event_name: { operator: "ILIKE", value: "", is_date: false },
    event_severity: { operator: "IN", value: "", is_date: false },
    event_start_time: { operator: "ILIKE", value: "", is_date: true },
    date_range_start_date: { operator: "ILIKE", value: "", is_date: true },
    date_range_end_date: { operator: "ILIKE", value: "", is_date: true },
    event_total_count: { operator: "=", value: "", is_date: false },
    exception_status_reason_code: { operator: "IN", value: "", is_date: false },
    exception_status: { operator: "IN", value: "", is_date: false },
    model: { operator: "ILIKE", value: "", is_date: false },
  });
  const [closeSearchParams, setCloseSearchParams] = useState({
    site_name_current: { operator: "ILIKE", value: "", is_date: false },
    // is_taco: {'operator': false, 'value': "", 'is_date': false},
    fleet_type: { operator: "ILIKE", value: "", is_date: false },
    equipmentId: { operator: "ILIKE", value: "", is_date: false },
    event_name: { operator: "ILIKE", value: "", is_date: false },
    event_severity: { operator: "IN", value: "", is_date: false },
    event_start_time: { operator: "ILIKE", value: "", is_date: true },
    date_range_start_date: { operator: "ILIKE", value: "", is_date: true },
    date_range_end_date: { operator: "ILIKE", value: "", is_date: true },
    event_total_count: { operator: "=", value: "", is_date: false },
    exception_status_reason_code: { operator: "IN", value: "", is_date: false },
    exception_status: { operator: "IN", value: "", is_date: false },
    model: { operator: "ILIKE", value: "", is_date: false },
  });

  const [historySearchParams, setHistorySearchParams] = useState({
    site_name_current: { operator: "ILIKE", value: "" },
    // is_taco: {'operator': '=', 'value': '', 'is_date': false},
    fleet_type: { operator: "ILIKE", value: "", is_date: false },
    equipmentId: { operator: "ILIKE", value: "", is_date: false },
    event_name: { operator: "ILIKE", value: "", is_date: false },
    event_severity: { operator: "IN", value: "", is_date: false },
    event_start_time: { operator: "ILIKE", value: "", is_date: true },
    date_range_start_date: { operator: "ILIKE", value: "", is_date: true },
    date_range_end_date: { operator: "ILIKE", value: "", is_date: true },
    event_total_count: { operator: "=", value: "", is_date: false },
    exception_status_reason_code: { operator: "IN", value: "", is_date: false },
    exception_status: { operator: "IN", value: "", is_date: false },
    model: { operator: "ILIKE", value: "", is_date: false },
  });

  useEffect(() => {
    if (Object.keys(userPreferences).length > 0) {
      // dispatch(fetchSummaryTableDetails({filterGroupId: userPreferences.selected_filter_group_id}));
      userPreferences?.user_id && dispatch(fetchCustomFilterGroupList({ userId: userPreferences?.user_id }));
      // dispatch(fetchExceptionSummary({
      //   selected_severity: userPreferences?.selected_severity
      // }));
    }
  }, [userPreferences, dispatch]);

  useEffect(() => {
    if (Object.keys(userPreferences).length > 0) {
      userPreferences?.selected_severity?.length && dispatch(
        fetchPiExceptionSummary({
          selected_severity: userPreferences?.selected_severity,
          selected_filter_group: userPreferences?.selected_filter_group_id,
          page: 0,
          perPage: perPage,
          search_params: summarySearchParams,
        })
      );
    }
  }, [userPreferences, dispatch, summarySearchParams]);

  useEffect(() => {
    if (Object.keys(userPreferences).length > 0) {
      userPreferences?.selected_severity.length && dispatch(
        fetchPiExceptionHistorySummary({
          selected_severity: userPreferences?.selected_severity,
          selected_filter_group: userPreferences?.selected_filter_group_id,
          page: 0,
          perPage: perPage,
          search_params: historySearchParams,
        })
      );
    }
  }, [userPreferences, dispatch, historySearchParams]);

  useEffect(() => {
    if (Object.keys(userPreferences).length > 0) {
      userPreferences?.selected_severity.length && dispatch(
        fetchClosedPiExceptionHistorySummary({
          selected_severity: userPreferences?.selected_severity,
          selected_filter_group: userPreferences?.selected_filter_group_id,
          page: 0,
          perPage: perPage,
          search_params: closeSearchParams,
        })
      );
    }
  }, [userPreferences, dispatch, closeSearchParams]);

  useEffect(() => {
    // dispatch(fetchHistoryExceptionSummary({
    //   selected_severity: userPreferences?.selected_severity
    // }));
    dispatch(fetchExceptionStatusValues());
    dispatch(fetchExceptionReasonValues());
  }, [dispatch]);

  const handleManuClick = () => {
    setVisiblityStatus(!visiblityStatus);
  };

  const handleOverlay = () => {
    setShowEquipmentSelect(false);
  };
  const fetchMoreData = (searchParams) => {
    dispatch(
      fetchPiExceptionSummary({
        selected_severity: userPreferences?.selected_severity,
        page: piExceptionSummaryData.lastPage + 1,
        selected_filter_group: userPreferences?.selected_filter_group_id,
        perPage: perPage,
        search_params: searchParams,
      })
    );
  };

  const fetchMoreClosedPIData = (searchParams) => {
    dispatch(
      fetchClosedPiExceptionHistorySummary({
        selected_severity: userPreferences?.selected_severity,
        page: closedPiExceptionHistorySummary.lastPage + 1,
        selected_filter_group: userPreferences?.selected_filter_group_id,
        perPage: perPage,
        search_params: searchParams,
      })
    );
  };

  const fetchMorPiExceptionHistoryeData = (searchParams) => {
    dispatch(
      fetchPiExceptionHistorySummary({
        selected_severity: userPreferences?.selected_severity,
        page: piExceptionHistorySummary.lastPage + 1,
        selected_filter_group: userPreferences?.selected_filter_group_id,
        perPage: perPage,
        search_params: searchParams,
      })
    );
  };
  const handleExceptionClick = (exception) => {
    navigate(`/exception-details/${exception.id}`, {
      state: { redirect_to: "/summary" },
    });
  };

  useEffect(() => {
    let getSummeryAutoRefresh = localStorage.getItem("is_summary_auto_refresh");
    let getIntervalData = JSON.parse(localStorage.getItem("summary_interval"));
    clearInterval(getIntervalData?.summary_tab_value);
    if (getSummeryAutoRefresh) {
      handleAutoRefresh(true);
    }
  });
  const handleAutoRefresh = (is_auto_referesh) => {
    if (is_auto_referesh) {
      const intervalId = setInterval(() => {
        // Auto Refresh pi exception summary  Data
        dispatch(
          fetchPiExceptionSummary({
            selected_severity: userPreferences?.selected_severity,
            page: piExceptionHistorySummary.lastPage,
            selected_filter_group: userPreferences?.selected_filter_group_id,
            perPage: perPage,
            search_params: summarySearchParams,
          })
        );
        // Auto Refresh Pi Exception Closed history Data
        if (Object.keys(userPreferences).length > 0) {
          dispatch(
            fetchClosedPiExceptionHistorySummary({
              selected_severity: userPreferences?.selected_severity,
              selected_filter_group: userPreferences?.selected_filter_group_id,
              page: closedPiExceptionHistorySummary.lastPage,
              perPage: perPage,
              search_params: closeSearchParams,
            })
          );
        }
        // Auto Refresh Snooze Data
        dispatch(
          fetchPiExceptionHistorySummary({
            selected_severity: userPreferences?.selected_severity,
            page: piExceptionHistorySummary.lastPage,
            selected_filter_group: userPreferences?.selected_filter_group_id,
            perPage: perPage,
            search_params: historySearchParams,
          })
        );
      }, 120 * 1000);
      localStorage.setItem(
        "summary_interval",
        JSON.stringify({
          summary_tab_value: intervalId,
        })
      );
      localStorage.setItem("is_summary_auto_refresh", true);
      setAutoRefresh(true);
    } else {
      let getIntervalData = JSON.parse(
        localStorage.getItem("summary_interval")
      );
      if (getIntervalData) {
        if (getIntervalData.summary_tab_value) {
          clearInterval(getIntervalData.summary_tab_value);
        }
        localStorage.removeItem("summary_interval");
      }
      localStorage.removeItem("is_summary_auto_refresh");
      setAutoRefresh(false);
    }
  };
  const handleFilterParams = (e, filterType) => {
    let getIntervalData = JSON.parse(localStorage.getItem("summary_interval"));
    // summary Tab
    if (filterType === "active_event_pi_exception") {
      setSummarySearchParams(e);
    } else if (filterType === "pi_exception_closed_history_summary") {
      setCloseSearchParams(e);
    } else if (filterType === "pi_exception_history_summary") {
      setHistorySearchParams(e);
    }
    if (getIntervalData) {
      clearInterval(getIntervalData.summary_tab_value);
    }
    handleAutoRefresh(true);
  };
  let renderCategoryWiseTable = () => {
    return (
      <>
        <CategorywiseTables
          logoImage="bell"
          heading={"Active Event"}
          data={piExceptionSummaryData?.data}
          handleExceptionClick={handleExceptionClick}
          type="pi-exception-table"
          hideTillDate
          hideActions
          hideREMSEvent
          hideEventStatus
          hideIsTaco
          hideAnalyticStatus
          className="categorywise-tables show-scroller"
          statusCodes={["S4", "S5"]}
          hasMore={piExceptionSummaryData?.hasMore}
          lastPage={piExceptionSummaryData?.lastPage || 0}
          next={fetchMoreData}
          dataLength={piExceptionSummaryData?.data?.length || 0}
          cat_id={"active_event_pi_exception"}
          infiniteScroll
          setSearchParams={(e) => {
            setSummarySearchParams(e);
            handleFilterParams(e, "active_event_pi_exception");
          }}
          searchParams={summarySearchParams}
        />
        <CategorywiseTables
          logoImage="bell"
          heading="Pi Exceptions - Action Taken"
          data={closedPiExceptionHistorySummary?.data}
          hideOpen
          hideSnooze
          hideTillDate
          hideREMSEvent
          hideEventStatus
          statusCodes={["S5"]}
          handleExceptionClick={handleExceptionClick}
          type="pi-exception-table-actioned"
          className="categorywise-tables show-scroller"
          hasMore={closedPiExceptionHistorySummary?.hasMore}
          lastPage={closedPiExceptionHistorySummary?.lastPage || 0}
          next={fetchMoreClosedPIData}
          dataLength={closedPiExceptionHistorySummary?.data?.length || 0}
          cat_id={"pi_exception_closed_history_summary"}
          infiniteScroll
          setSearchParams={(e) => {
            setCloseSearchParams(e);
            handleFilterParams(e, "pi_exception_closed_history_summary");
          }}
          searchParams={closeSearchParams}
        />
        <CategorywiseTables
          logoImage="bell"
          heading="Open/Snoozed Event"
          data={piExceptionHistorySummary?.data}
          handleExceptionClick={handleExceptionClick}
          type="pi-exception-table-actioned-till-date-sorted-with-reason"
          hideEventStatus
          hideIsTaco
          hideAnalyticStatus
          hideCompleted
          statusCodes={["S1", "S2"]}
          className="categorywise-tables show-scroller"
          hasMore={piExceptionHistorySummary?.hasMore}
          lastPage={piExceptionHistorySummary?.lastPage || 0}
          next={fetchMorPiExceptionHistoryeData}
          dataLength={piExceptionHistorySummary?.data?.length || 0}
          cat_id={"pi_exception_history_summary"}
          infiniteScroll
          hideClose
          setSearchParams={(e) => {
            setHistorySearchParams(e);
            handleFilterParams(e, "pi_exception_history_summary");
          }}
          searchParams={historySearchParams}
        />
        {/* <CategorywiseTables
            logoImage="calendar"
            heading="Event Analyzer 1"
            data={
              exceptionSummaryData.EVENT_ANALYZER
                ? exceptionSummaryData.EVENT_ANALYZER.filter(exception => exception.exception_status)
                : []
            }
            type="event-analyzer-table-till-date-sorted"
          /> */}
        {/* <CategorywiseTables
            logoImage="file-check"
            heading="Conmon Inspections Details"
            data={
              exceptionSummaryData.CONMON_INSPECTIONS ? exceptionSummaryData.CONMON_INSPECTIONS : []
            }
            type="conman-inspections-details-table"
          /> */}
      </>
    );
  };
  return (
    <>
      <Header
        subHeader={<DashboardDetailSubheader />}
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
              activeTab="summary"
              autoRefresh={autoRefresh}
              handleAutoRefresh={handleAutoRefresh}
              isVisibleautoRefresh={true}
            />
            <div className="recommendation-section">
              {/* <SummaryTabData data={dummyData} /> */}
              {renderCategoryWiseTable(exceptionSummaryData)}
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
      <SideFilterTab
        setShowEquipmentSelect={setShowEquipmentSelect}
        showEquipmentSelect={showEquipmentSelect}
      />
      {showEquipmentSelect ? (
        <div className="overlay fade show" onClick={handleOverlay}></div>
      ) : null}
      {dateModalShowStatus &&
      Object.values(dateModalShowStatus).includes(true) ? (
        <div className="modal-backdrop fade show"></div>
      ) : null}
    </>
  );
};

export default SummaryDetailPage;
