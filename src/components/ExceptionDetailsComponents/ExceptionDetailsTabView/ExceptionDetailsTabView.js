import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExceptionConMonRecords,
  fetchOilAnalysisRecords,
  fetchFaultRecords,
} from "../../../redux/exception-details/exceptionDetailsThunks";
import ManagementTab from "../ManagementTab/ManagementTab";
import ExceptionDetailsWorkOrderTab from "../ExceptionDetailsWorkOrderTab/ExceptionDetailsWorkOrderTab";
import ConMonDataTab from "../ConMonDataTab/ConMonDataTab";
import OilAnalysisTab from "../OilAnalysisTab/OilAnalysisTab";
import ExceptionFaultsTab from "../ExceptionFaultsTab/ExceptionFaultsTab";
import RemsWatchlistTab from "../RemsWatchlistTab/RemsWatchlistTab";
import "./ExceptionDetailsTabView.css";
import ExceptionHistory from "../ExceptionHistory/ExceptionHistory";
import ExceptionDetailsIFrame from "../ExceptionDetailsIFrame/ExceptionDetailsIFrame";
import PIVisionTab from "../PiVisionTab/PiVisionTab";
import { resetExceptionDetails } from "../../../redux/exception-details/exceptionDetailsSlice";

const ExceptionDetailsTabView = () => {
  let selectedEquipment = useSelector(
    (state) => state.exceptionDetailsReducer.selectedEquipment
  );
  selectedEquipment = selectedEquipment?.length > 0 ? selectedEquipment[0] : {};

  let selectedException = useSelector(
    (state) => state.exceptionDetailsReducer.selectedException
  );
  selectedException = selectedException?.length > 0 ? selectedException[0] : {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedEquipment.asset_name && selectedException.event_start_time) {
      dispatch(
        fetchExceptionConMonRecords({
          equipmentID: selectedEquipment.asset_name,
          startdate: selectedException.event_start_time,
          enddate: selectedException.event_end_time,
        })
      );
    }
    if (selectedEquipment.serial_number && selectedException.event_start_time) {
      dispatch(
        fetchOilAnalysisRecords({
          serialNumber: selectedEquipment.serial_number,
          startdate: selectedException.event_start_time,
          endDate: selectedException.event_end_time,
        })
      );
    }
  }, [dispatch, selectedEquipment, selectedException]);

  useEffect(() => {
    if (selectedEquipment.equipment_id && selectedException.event_start_time) {
      dispatch(
        fetchFaultRecords({
          equipmentID: selectedEquipment.equipment_id,
          startdate: selectedException.event_start_time,
          endDate: selectedException.event_end_time,
        })
      );
    }
  }, [dispatch, selectedEquipment, selectedException]);

  // useEffect(() => {
  //       return () => {
  //     dispatch(resetExceptionDetails());
  //   };
  // }, [dispatch]);

  return (
    <Tabs>
      <TabList id="main-list">
        <Tab>PIVision</Tab>
        <Tab>Management</Tab>
        <Tab>REMS Watchlist</Tab>
        <Tab>Exception History</Tab>
        {/* <Tab>Management History</Tab> */}
        <Tab>Work Orders</Tab>
        <Tab>Machine Events</Tab>
        <Tab>Oil Analysis Results</Tab>
        <Tab>Manual Con-Mon Data</Tab>
        {/* <Tab>Compartments</Tab> */}
      </TabList>

      <TabPanel>
        {/* <ManagementTab /> */}
        <PIVisionTab />
      </TabPanel>
      <TabPanel>
        <ManagementTab />
      </TabPanel>
      <TabPanel>
        <RemsWatchlistTab />
      </TabPanel>
      <TabPanel>
        <ExceptionHistory />
      </TabPanel>
      {/* <TabPanel>
        <ManagementExceptionHistory />
      </TabPanel> */}
      <TabPanel>
        <ExceptionDetailsWorkOrderTab />
      </TabPanel>
      <TabPanel>
        <ExceptionFaultsTab />
      </TabPanel>
      <TabPanel className="oil-analysis-section">
        <OilAnalysisTab />
      </TabPanel>
      <TabPanel>
        <ConMonDataTab />
      </TabPanel>
      {/* <TabPanel>
        <div className="tab-main-content">
          <div className="cols cols2">
            <div className="col">
              <div className="compartment-box">
                <div className="compartment-detail">
                  <figure>
                    <img
                      src={
                        window.location.origin +
                        "/images/air-induction-exhaust.svg"
                      }
                      alt="air-induction-exhaust"
                    ></img>
                  </figure>
                  <div className="compartment-info">
                    <p>Air Induction & Exhaust</p>
                    <h6>20,530 / 24,000 Hrs</h6>
                  </div>
                </div>
                <div className="process-box">
                  <div className="progress">
                    <div className="progress-done" data-done="86"></div>
                  </div>
                  <p>86%</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="compartment-box">
                <div className="compartment-detail">
                  <figure>
                    <img
                      src={
                        window.location.origin + "/images/breaking_system.svg"
                      }
                      alt="breaking_system"
                    ></img>
                  </figure>
                  <div className="compartment-info">
                    <p>Braking System</p>
                    <h6>20,530 / 24,000 Hrs</h6>
                  </div>
                </div>
                <div className="process-box">
                  <div className="progress">
                    <div className="progress-done" data-done="86"></div>
                  </div>
                  <p>86%</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="compartment-box">
                <div className="compartment-detail">
                  <figure>
                    <img
                      src={
                        window.location.origin +
                        "/images/lubrication_system.svg"
                      }
                      alt="lubrication_system"
                    ></img>
                  </figure>
                  <div className="compartment-info">
                    <p>Lubrication System</p>
                    <h6>20,530 / 24,000 Hrs</h6>
                  </div>
                </div>
                <div className="process-box">
                  <div className="progress">
                    <div className="progress-done" data-done="50"></div>
                  </div>
                  <p>86%</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="compartment-box">
                <div className="compartment-detail">
                  <figure>
                    <img
                      src={window.location.origin + "/images/machine.svg"}
                      alt="machine"
                    ></img>
                  </figure>
                  <div className="compartment-info">
                    <p>Machine</p>
                    <h6>20,530 / 24,000 Hrs</h6>
                  </div>
                </div>
                <div className="process-box">
                  <div className="progress">
                    <div className="progress-done" data-done="86"></div>
                  </div>
                  <p>86%</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="compartment-box">
                <div className="compartment-detail">
                  <figure>
                    <img
                      src={
                        window.location.origin + "/images/cooling-system.svg"
                      }
                      alt="cooling-system"
                    ></img>
                  </figure>
                  <div className="compartment-info">
                    <p>Cooling System</p>
                    <h6>20,530 / 24,000 Hrs</h6>
                  </div>
                </div>
                <div className="process-box">
                  <div className="progress">
                    <div className="progress-done" data-done="86"></div>
                  </div>
                  <p>86%</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="compartment-box">
                <div className="compartment-detail">
                  <figure>
                    <img
                      src={
                        window.location.origin +
                        "/images/tramission_drive_line.svg"
                      }
                      alt="tramission_drive_line"
                    ></img>
                  </figure>
                  <div className="compartment-info">
                    <p>Transmission & Drive Line </p>
                    <h6>20,530 / 24,000 Hrs</h6>
                  </div>
                </div>
                <div className="process-box">
                  <div className="progress">
                    <div className="progress-done" data-done="86"></div>
                  </div>
                  <p>86%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel> */}
    </Tabs>
  );
};

export default ExceptionDetailsTabView;
