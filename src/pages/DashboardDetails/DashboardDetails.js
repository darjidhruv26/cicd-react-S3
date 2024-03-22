import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../layouts/Header/Header";
import { AppMenuTrigger } from "../../layouts/AppMenuTrigger";
import { fetchDashboardAssets } from "../../redux/dashboard/dashboardThunks";
import { CreateOwnLinkModal } from "../../components/UserProfileComponent/CreateOwnLinkModal";
import { ChartView } from "../../components/DashboardChartsComponent";
import { setShowEquipmentSelect } from "../../redux/dashboard/dashboardSlice";
import { fetchExceptionSummaryByEquipment } from "../../redux/summary-table/summaryTableThunk";
import { fetchCustomFilterGroupList } from "../../redux/custom-filter/customFilterThunk";
import { fetchExceptionReasonValues, fetchExceptionStatusValues } from "../../redux/exception-details/exceptionDetailsThunks";

import {
  OprationSection,
  RecommendationSection,
  ExceptionPopupModal,
  SideFilterTab,
} from "../../components/DashboardDetailsComponent/";
import { DashboardDetailSubheader } from "../../layouts/SubHeader";

export const OperationRightTab = ({handleGraph, showGraph, setHeaderVisiblity, headerVisiblity}) => {
  return (
    <div className="resize-box">
      {/* <a href="#">
        <img
          src={window.location.origin + "/images/download.svg"}
          alt="download"
        />
      </a> */}
      {/* <a
        onClick={() => {
          handleGraph && handleGraph(!showGraph);
        }}
      >
        <img
          src={window.location.origin + "/images/share.svg"}
          alt="share"
        />
      </a> */}
      <a
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
    </div>
  );
}

const DashboardDetails = () => {
  //   const { exceptionId } = useParams();
  const dispatch = useDispatch();
  const [visiblityStatus, setVisiblityStatus] = useState(false);
  const [PopupModal, setPopupModal] = useState(false);
  const [headerVisiblity, setHeaderVisiblity] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  )

  const showEquipmentSelect = useSelector(
    (store) => store.dashboardAssetsReducer.showEquipmentSelect
  );
  const dateModalShowStatus = useSelector(
    (state) => state.summaryTableReducer.showDateModal
  );

  const customFilterGroupList = useSelector(
    (store) => store.customFilterReducer.filterGroupList
  );

  useEffect(() => {
    if (userPreferences && Object.keys(userPreferences).length > 0) {
      dispatch(fetchDashboardAssets({filterGroupId: userPreferences.selected_filter_group_id}));
      userPreferences?.user_id && dispatch(fetchCustomFilterGroupList({userId: userPreferences?.user_id}));
    }
  }, [dispatch, userPreferences]);

  useEffect(() => {
    dispatch(fetchExceptionStatusValues());
    dispatch(fetchExceptionReasonValues());
  }, [])

  const getSelectedFilterGroup = useCallback((data) => {
    const selectedGroup = data.filter((item) => item.is_seleted);
    if (selectedGroup && selectedGroup.length > 0) {
      return selectedGroup[0];
    } else {
      return null;
    }
  }, []);

  const handleManuClick = () => {
    setVisiblityStatus(!visiblityStatus);
  };

  const handleOverlay = () => {
    dispatch(setShowEquipmentSelect(false));
  };

  const handleShowEquipmentSelect = (status) => {
    dispatch(setShowEquipmentSelect(status));
  };

  const handleModalClick = (status, assetName) => {
    setPopupModal(status);
    dispatch(
      fetchExceptionSummaryByEquipment({
        equipment_id: assetName,
      })
    );
  };

  return (
    <React.Fragment>
      <Header
        subHeader={
          <DashboardDetailSubheader
            selectedFilterGroup={
              customFilterGroupList.length > 0
                ? getSelectedFilterGroup(customFilterGroupList)
                : {group_id : 1}
            }
          />
        }
        handleManuClick={handleManuClick}
        headerVisiblity={headerVisiblity}
        headerIcon={window.location.origin + "/images/graph.svg"}
        heading="Dashboard"
        setShowLinkModal={setShowLinkModal}
        menuVisiblityStatus={visiblityStatus}
      />
      <div id="main" className={`${visiblityStatus ? "app-btn-active" : ""}`}>
        {visiblityStatus ? (
          <AppMenuTrigger
            className={`${visiblityStatus ? "fadeIn" : "fadeOut"}`}
          />
        ) : !showGraph ? (
          <>
            <OprationSection
              activeMenu="summary"
              operationRightTab = {
                <OperationRightTab 
                  handleGraph= {setShowGraph}
                  showGraph={showGraph}
                  setHeaderVisiblity={setHeaderVisiblity}
                  headerVisiblity={headerVisiblity}
                />
              }
              isVisibleautoRefresh={true}
            />
            <RecommendationSection setPopupModal={handleModalClick} />
          </>
        ) : (
          <ChartView
            setShowGraph={setShowGraph}
            headerVisiblity={headerVisiblity}
            setHeaderVisiblity={setHeaderVisiblity}
          />
        )}
      </div>
      <CreateOwnLinkModal
        showModalStatus={showLinkModal}
        setShowModal={setShowLinkModal}
      />
      <ExceptionPopupModal
        setPopupModal={setPopupModal}
        PopupModal={PopupModal}
      />
      <SideFilterTab
        setShowEquipmentSelect={handleShowEquipmentSelect}
        showEquipmentSelect={showEquipmentSelect}
      />
      {showEquipmentSelect ? (
        <div className="overlay fade show" onClick={handleOverlay}></div>
      ) : null}
      {PopupModal ||
      showLinkModal ||
      (dateModalShowStatus &&
        Object.values(dateModalShowStatus).includes(true)) ? (
        <div className="modal-backdrop fade show"></div>
      ) : null}
      {dateModalShowStatus &&
      Object.values(dateModalShowStatus).includes(true) ? (
        <div className="second-overlay fade show"></div>
      ) : null}
    </React.Fragment>
  );
};

export default DashboardDetails;
