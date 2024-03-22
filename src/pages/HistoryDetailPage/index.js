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
import { useDispatch, useSelector } from "react-redux";
import { fetchClosedEventExceptionHistory } from "../../redux/history-table/historyTableThunk";
import { fetchCustomFilterGroupList } from "../../redux/custom-filter/customFilterThunk";
import {
  fetchExceptionReasonValues,
  fetchExceptionStatusValues,
} from "../../redux/exception-details/exceptionDetailsThunks";
import { OperationRightTab } from "../DashboardDetails/DashboardDetails";
import { useNavigate } from "react-router-dom";

const perPage = 25;

const HistoryDetailPage = () => {
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
  const closeEventExceptionHistoryData = useSelector((state) => {
    return state.historyTableReducer.closedEventExceptionHistory;
  });
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [visiblityStatus, setVisiblityStatus] = useState(false);
  const [headerVisiblity, setHeaderVisiblity] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [showEquipmentSelect, setShowEquipmentSelect] = useState(false);

  const [historySearchParams, setHistorySearchParams] = useState({
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

  useEffect(() => {
    if (Object.keys(userPreferences).length > 0) {
      userPreferences?.user_id && dispatch(fetchCustomFilterGroupList({ userId: userPreferences?.user_id }));
    }
  }, [userPreferences, dispatch]);

  useEffect(() => {
    if (Object.keys(userPreferences).length > 0) {
      dispatch(
        fetchClosedEventExceptionHistory({
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
      fetchClosedEventExceptionHistory({
        selected_severity: userPreferences?.selected_severity,
        page: closeEventExceptionHistoryData.lastPage + 1,
        selected_filter_group: userPreferences?.selected_filter_group_id,
        perPage: perPage,
        search_params: searchParams,
      })
    );
  };
  const handleExceptionClick = (exception) => {
    navigate(`/exception-details/${exception.id}`, {
      state: { redirect_to: "/history" },
    });
  };
  useEffect(() => {
    let getHistoryAutoRefresh = localStorage.getItem("is_history_auto_refresh");
    let getIntervalData = JSON.parse(localStorage.getItem("history_interval"));
    clearInterval(getIntervalData?.history_tab_value);
    if (getHistoryAutoRefresh) {
      handleAutoRefresh(true);
    }
  });
  const handleAutoRefresh = (is_auto_referesh) => {
    if (is_auto_referesh) {
      const intervalId = setInterval(() => {
        dispatch(
          fetchClosedEventExceptionHistory({
            selected_severity: userPreferences?.selected_severity,
            page: closeEventExceptionHistoryData.lastPage,
            selected_filter_group: userPreferences?.selected_filter_group_id,
            perPage: perPage,
            search_params: historySearchParams,
          })
        );
      }, 120 * 1000);
      localStorage.setItem(
        "history_interval",
        JSON.stringify({
          history_tab_value: intervalId,
        })
      );
      localStorage.setItem("is_history_auto_refresh", true);
      setAutoRefresh(true);
    } else {
      let getIntervalData = JSON.parse(
        localStorage.getItem("history_interval")
      );
      if (getIntervalData) {
        if (getIntervalData.history_tab_value) {
          clearInterval(getIntervalData.history_tab_value);
        }
        localStorage.removeItem("history_interval");
      }
      localStorage.removeItem("is_history_auto_refresh");
      setAutoRefresh(false);
    }
  };
  const handleFilterParams = (e) => {
    let getIntervalData = JSON.parse(localStorage.getItem("history_interval"));
    setHistorySearchParams(e);
    if (getIntervalData) {
      clearInterval(getIntervalData.history_tab_value);
    }
    handleAutoRefresh(true);
  };
  let renderCategoryWiseTable = () => {
    return (
      <>
        <CategorywiseTables
          logoImage="bell"
          heading={"Close Event"}
          data={closeEventExceptionHistoryData?.data}
          handleExceptionClick={handleExceptionClick}
          type="pi-exception-table"
          fullScreen
          hideTillDate
          hideActions
          hideREMSEvent
          hideEventStatus
          hideIsTaco
          hideAnalyticStatus
          className="categorywise-tables show-scroller"
          statusCodes={["S4", "S5"]}
          hasMore={closeEventExceptionHistoryData?.hasMore}
          lastPage={closeEventExceptionHistoryData?.lastPage || 0}
          next={fetchMoreData}
          dataLength={closeEventExceptionHistoryData?.data?.length || 0}
          cat_id={"close_event_pi_exception"}
          infiniteScroll
          setSearchParams={(e) => {
            setHistorySearchParams(e);
            handleFilterParams(e);
          }}
          searchParams={historySearchParams}
        />
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
              activeTab="history"
              autoRefresh={autoRefresh}
              handleAutoRefresh={handleAutoRefresh}
              isVisibleautoRefresh={true}
            />
            <div className="recommendation-section">
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

export default HistoryDetailPage;
