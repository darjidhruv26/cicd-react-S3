import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../ExceptionDetailsTabView/ExceptionDetailsTabView.css";
import "./OilAnalysisTab.css";
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";
import OilAnalysisCompartmentNameMapping from "./OilAnalysisCompartmentNameMapping";
import AccordionBox from "./AccordianBox";

const OilAnalysisTab = () => {
  let selectedOilAnalysisRecords = useSelector(
    (state) => state.exceptionDetailsReducer.selectedOilAnalysisRecords
  );

  let renderOilAnalysisTab = Object.keys(selectedOilAnalysisRecords).map(
    (key, index) => {
      return <Tab key={index}>{OilAnalysisCompartmentNameMapping[key] || key}</Tab>;
    }
  );

  let renderOilAnalysisTabPanel = Object.keys(selectedOilAnalysisRecords).map(
    (key, index) => {
      
      return (
        <TabPanel key={index}>
          <div className="tab-main-content">
            <div className="cols cols3">
              <div className="col">
                <p className="span-text dark">
                  {selectedOilAnalysisRecords[key][0]
                    ? selectedOilAnalysisRecords[key][0]['DATA'].lab_no
                    : "-"}
                </p>
                <p className="span-text dark">
                  <span>Equipment ID:</span>{selectedOilAnalysisRecords[key][0]
                    ? selectedOilAnalysisRecords[key][0]['DATA'].equipment_id
                    : "-"}
                </p>
                <p className="span-text dark">
                  <span>Sample Number:</span>
                  {selectedOilAnalysisRecords[key][0]
                    ? selectedOilAnalysisRecords[key][0]['DATA'].sample_number
                    : "-"}
                </p>
              </div>
              <div className="col">
                <p className="span-text dark">
                  <span>Sampled Date:</span>
                  {selectedOilAnalysisRecords[key][0]
                    ? selectedOilAnalysisRecords[key][0]['DATA'].sampled_date
                    : "-"}
                </p>
                <p className="span-text dark">
                  <span>INTERPRETATION_DATE:</span>{selectedOilAnalysisRecords[key][0]
                    ? selectedOilAnalysisRecords[key][0]['DATA'].interpretation_date
                    : "-"}
                </p>
              </div>
              {/* <div className="col">
                        <p className="span-text dark"><span>Created By:</span>Martin</p>
                        <p className="span-text dark"><span>Created By:</span>Martin</p>
                    </div> */}
            </div>
          </div>
          <div className="tab-main-content">
            <div className="cols cols2">
              <div className="col">
                <p className="span-text dark">
                  <span>Calculated Meter on Fluid:</span>{" "}
                  {selectedOilAnalysisRecords[key][0]
                    ? selectedOilAnalysisRecords[key][0]['DATA'].meter_on_fluid
                    : "-"}{" "}
                  HR
                </p>
                <p className="span-text dark">
                  <span>Fluid Changed:</span>
                  {selectedOilAnalysisRecords[key][0]
                    ? selectedOilAnalysisRecords[key][0]['DATA'].fluid_changed === "Y"
                      ? "Yes"
                      : "No"
                    : "-"}
                </p>
                <p className="span-text dark">
                  <span>Filter Changed:</span>
                  {selectedOilAnalysisRecords[key][0]
                    ? selectedOilAnalysisRecords[key][0]['DATA'].filter_changed === "Y"
                      ? "Yes"
                      : "No"
                    : "-"}
                </p>
                <p className="span-text dark">
                  <span>Meter on Fluid:</span>
                  {selectedOilAnalysisRecords[key][0]
                    ? selectedOilAnalysisRecords[key][0]['DATA'].meter_on_fluid
                    : "-"}{" "}
                  HR
                </p>
                <p className="span-text dark">
                  <span>Component Meter:</span>HR
                </p>
              </div>
              <div className="col">
                <p className="span-text dark">
                  <span>Meter Reading:</span>{selectedOilAnalysisRecords[key][0]
                    ? selectedOilAnalysisRecords[key][0]['DATA'].meter_reading
                    : "-"}{" "}
                </p>
                <p className="span-text dark">
                  <span>Fluid Brand / Fluid Type:</span>
                  {selectedOilAnalysisRecords[key][0]
                    ? selectedOilAnalysisRecords[key][0]['DATA'].fluid_brand
                    : "-"}
                  /
                  {selectedOilAnalysisRecords[key][0]
                    ? selectedOilAnalysisRecords[key][0]['DATA'].fluid_Type
                    : "-"}
                </p>
              </div>
            </div>
          </div>
          <AccordionBox
            data={selectedOilAnalysisRecords[key]}
            compartmentName={key}
          />
        </TabPanel>
      );
    }
  );
  return (
    <Fragment>
      {Object.keys(selectedOilAnalysisRecords).length > 0 ? (
        <Tabs className="mx-3 react-tabs-scrollbar">
          <TabList>{renderOilAnalysisTab}</TabList>

          {renderOilAnalysisTabPanel}
        </Tabs>
      ) : (
        <div className="tab-main-content">
          <div className="responsive-table custom-scroll">
            <Scrollbars>
              <table className="res-table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>No Oil Analysis Data</td>
                  </tr>
                </tbody>
              </table>
            </Scrollbars>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OilAnalysisTab;
