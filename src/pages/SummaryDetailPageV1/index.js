import React, { useState, useEffect, useCallback } from "react";
import Header from "../../layouts/Header/Header";
import {
  OprationSection,
} from "../../components/DashboardDetailsComponent";
import { DashboardDetailSubheader } from "../../layouts/SubHeader";
import { AppMenuTrigger } from "../../layouts/AppMenuTrigger";
import { ChartView } from "../../components/DashboardChartsComponent";
// import tableData from "../../JSON/dummy.json";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSummaryTableDetails,
  fetchExceptionSummary,
  fetchSummaryFilters,
  fetchSummaryFilterPreferences,
  fetchFilterPreferenceAseets,
  fetchFilteredSummaryDetails,
} from "../../redux/summaryV1-table/summaryV1TableThunk";
import { fetchCustomFilterGroupList } from "../../redux/custom-filter/customFilterThunk";
import { fetchExceptionReasonValues, fetchExceptionStatusValues } from "../../redux/exception-details/exceptionDetailsThunks";
import { SummaryTabDataV1 } from "../../components/SummaryPageComponent/SummaryTabDataV1";
import { Filter } from "../../components/SummaryPageComponent/Filter";
import Popup from "reactjs-popup";

export const OperationRightTab = ({
  handleGraph,
  showGraph,
  setHeaderVisiblity,
  headerVisiblity,
  isAssetsShow,
  setIsAssetsShow,
}) => {
  return (
    <div className="oprations-tab oprations-tab-right" style={{ right: 10 }}>
      <ul>
        <li className="active"><a href="#">Critical</a></li>
        <li><a href="#">Major</a></li>
        <li><a href="#">No Data</a></li>
      </ul>
      <div className="filter-btn-switch">
        <a href="#">Last 24h</a>
        <a href="#" className="active">All</a>
      </div>
      <a href="#"
        className="filter-btn header"
        data-rel="summery-filters"
        style={{ alignSelf: 'center' }}
      >
        <img
          src={window.location.origin + "/images/download.svg"}
          alt="download"
        />
      </a>
      <a
        className="filter-btn header"
        data-rel="summery-filters"
        style={{ alignSelf: 'center' }}
        onClick={() => {
          handleGraph && handleGraph(!showGraph);
        }}
      >
        <img
          src={window.location.origin + "/images/share.svg"}
          alt="share"
        />
      </a>
      <a
        className="filter-btn header"
        data-rel="summery-filters"
        style={{ alignSelf: 'center' }}
        onClick={() => {
          setHeaderVisiblity && setHeaderVisiblity(!headerVisiblity);
        }}
      >
        <img
          src={
            headerVisiblity
              ? window.location.origin + "/images/srink-resize.svg"
              : window.location.origin + "/images/resize.svg"
          }
          alt="resize"
        />
      </a>
      <button href="#" className={`arrow-down-header ${isAssetsShow ? "active" : ""}`} onClick={() => setIsAssetsShow(!isAssetsShow)}><i className="icon-arrow-down"></i></button>
    </div>
  );
}

const SummaryDetailPageV1 = () => {
  const dispatch = useDispatch();

  let userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  );

  const exceptionSummaryData = useSelector(
    (state) => state.summaryTableReducerV1.exceptionSummary
  );

  const dateModalShowStatus = useSelector(
    (state) => state.summaryTableReducerV1.showDateModal
  );
  let summaryFilters = useSelector(state => state.summaryTableReducerV1.summaryFilters);
  let summaryFilterPreferences = useSelector(state => state.summaryTableReducerV1.summaryFilterPreferences);
  let filteredSummaryDetails = useSelector(state => state.summaryTableReducerV1.filteredSummaryDetails);

  const [visiblityStatus, setVisiblityStatus] = useState(false);
  const [headerVisiblity, setHeaderVisiblity] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [dummyData, setDummyData] = useState([]);
  const [showEquipmentSelect, setShowEquipmentSelect] = useState(false);
  const [activeFilter, setActiveFilter] = useState('asset_names');
  const [filters, setFilters] = useState(summaryFilters);
  const [filterData, setFilterData] = useState(summaryFilters);

  const [filterPreferences, setFilterPreferences] = useState(summaryFilterPreferences);
  const [filterActivePreferences, setFilterActivePreferences] = useState({ id: false, name: '', is_default: false, isselected: false });
  const [isAssetsShow, setIsAssetsShow] = useState(false);

  useEffect(() => {
    setFilters(summaryFilters);
    setFilterData(summaryFilters)
  }, [summaryFilters]);

  useEffect(() => {
    setFilterPreferences(summaryFilterPreferences)
  }, [summaryFilterPreferences]);

  useEffect(() => {
    if (filteredSummaryDetails && filteredSummaryDetails.length > 0) {
      setDummyData(filteredSummaryDetails);
    }
  }, [filteredSummaryDetails]);

  // const stableDispatch = useCallback(args => dispatch(args), [dispatch])
  useEffect(() => {
    dispatch(fetchExceptionSummary({
      selected_severity: userPreferences?.selected_severity
    }));
    dispatch(fetchExceptionStatusValues());
    dispatch(fetchExceptionReasonValues());
    dispatch(fetchSummaryFilters());
    dispatch(fetchFilteredSummaryDetails());
  }, [dispatch])

  useEffect(() => {
    if (Object.keys(userPreferences).length > 0) {
      dispatch(fetchSummaryTableDetails({ filterGroupId: userPreferences.selected_filter_group_id }))
      userPreferences?.user_id && dispatch(fetchCustomFilterGroupList({ userId: userPreferences?.user_id }));
      dispatch(fetchSummaryFilterPreferences({ user_id: userPreferences.user_id }));
      dispatch(fetchFilterPreferenceAseets({ user_id: userPreferences.user_id }));
    }
  }, [userPreferences, dispatch]);

  const handleManuClick = () => {
    setVisiblityStatus(!visiblityStatus);
  };

  const handleOverlay = () => {
    setShowEquipmentSelect(false);
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
              activeMenu="summary_v1"
              operationRightTab={
                <OperationRightTab
                  handleGraph={setShowGraph}
                  showGraph={showGraph}
                  setHeaderVisiblity={setHeaderVisiblity}
                  headerVisiblity={headerVisiblity}
                  isAssetsShow={isAssetsShow}
                  setIsAssetsShow={setIsAssetsShow}
                />
              }
              isVisibleautoRefresh={true}
            />
            <SummaryTabDataV1 data={dummyData} isAssetsShow={isAssetsShow} />
          </>
        ) : (
          <ChartView
            setShowGraph={setShowGraph}
            headerVisiblity={headerVisiblity}
            setHeaderVisiblity={setHeaderVisiblity}
          />
        )}
      </div>
      <Popup
        trigger={
          <a className="filter-btn" onClick={''}>
            <img src={window.location.origin + "/images/filter.svg"} alt="filter" />
          </a>
        }
        modal
        nested
      >
        {(close) => (
          <Filter
            close={close}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            filters={filters}
            setFilters={setFilters}
            filterData={filterData}

            filterPreferences={filterPreferences}
            setFilterPreferences={setFilterPreferences}
            filterActivePreferences={filterActivePreferences}
            setFilterActivePreferences={setFilterActivePreferences}
          />
        )}
      </Popup>
      {showEquipmentSelect ? (
        <div className="overlay fade show" onClick={handleOverlay}></div>
      ) : null}
      {dateModalShowStatus && Object.values(dateModalShowStatus).includes(true) ? (
        <div className="modal-backdrop fade show"></div>
      ) : null}
    </>
  );
};

export default SummaryDetailPageV1;
