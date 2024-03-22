import React, { useState, useEffect, useCallback, Fragment } from "react";
import _ from "lodash";
import "./ManagementExceptionHistory.scss"
import { useSelector } from "react-redux";
// import { CategorywiseTables } from "../../SummaryPageComponent/CategorywiseTablesV1";
import { CategorywiseTables } from "../../SummaryPageComponent";

const StatusMapper = {
    'S1': 'Open',
    'S2': 'Snooze / Monitor',
    'S3': 'Close',
    'S4': 'Active',
    'S5': 'Complete',
  }

const ManagementExceptionHistory = () => {
    let managementHistory = useSelector(state => state.exceptionDetailsReducer.managementHistory);

    const getRows = () => {
        return (
            managementHistory.map((history_rec) => (
                <tr class="row-highlight">
                    <td>{history_rec?.new_val?.event_name}</td>
                    <td>{history_rec?.new_val?.event_status}</td>
                    <td>{history_rec?.new_val?.event_template}</td>
                    <td>{history_rec?.operation}</td>
                    <td>{StatusMapper[history_rec?.new_val?.exception_status]}</td>
                    <td>{StatusMapper[history_rec?.old_val?.exception_status]}</td>
                </tr>
            ))
        )
    }

    return (
        <Fragment>
            <div className="tab-main-content history-tab">
                {/* {history && <CategorywiseTables
                    data={history}
                    type="deepu custom"
                    hideTillDate
                    hideActions
                    hideREMSEvent
                />} */}
                <div className="categorywise-tables show-scroller">

                    <div className="responsive-table data-table-div" >
                        <table className="table table-fixed table-bordered no-footer">
                            <thead>
                                <tr>
                                    <th style={{paddingBottom: '8px'}}>Event Name</th>
                                    <th style={{paddingBottom: '8px'}}>Event Status</th>
                                    <th style={{paddingBottom: '8px'}}>Event Template</th>
                                    <th style={{paddingBottom: '8px'}}>Event Operation</th>
                                    <th style={{paddingBottom: '8px'}}>New Status</th>
                                    <th style={{paddingBottom: '8px'}}>Old Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getRows()}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </Fragment>
    );
}

export default ManagementExceptionHistory;