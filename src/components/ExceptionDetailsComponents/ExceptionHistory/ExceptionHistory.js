import React, {useState, useEffect, useCallback, Fragment} from "react";
import _ from "lodash";
import "./ExceptionHistory.scss"
import { useSelector } from "react-redux";
// import { CategorywiseTables } from "../../SummaryPageComponent/CategorywiseTablesV1";
import { CategorywiseTables } from "../../SummaryPageComponent";


const ExceptionHistory = () => {
    let history = useSelector(state => state.exceptionDetailsReducer.history);
    return (
        <Fragment>
            <div className="tab-main-content history-tab">
                {history && <CategorywiseTables
                    data={history}
                    type="deepu custom"
                    hideEquipmentType
                    hideModel
                    hideEquipmentId
                    hideSeverity
                    hideActions
                    hideREMSEvent
                    hideIsTaco
                    hideAnalyticStatus
                />}
            </div>
        </Fragment>
    );
}

export default ExceptionHistory;