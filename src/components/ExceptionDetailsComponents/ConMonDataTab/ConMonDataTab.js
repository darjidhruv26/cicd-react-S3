import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { ConMonRecordTable } from "./ConMonRecordTable";

const ConMonDataTab = () => {
  let selectedConMonDataRecords = useSelector(
    (state) => state.exceptionDetailsReducer.selectedConMonDataRecords
  );

  return (
    <Fragment>
      <div className="tab-main-content">
        {selectedConMonDataRecords.length > 0 ? (
          selectedConMonDataRecords.map((item, index) => {
            return (
              <div className="responsive-table custom-scroll con-mon-tab" key={index}>
                <ConMonRecordTable tableData={item} />
              </div>
            );
          })
        ) : (
          <div>No ConMon Data</div>
        )}
      </div>
    </Fragment>
  );
};

export default ConMonDataTab;
