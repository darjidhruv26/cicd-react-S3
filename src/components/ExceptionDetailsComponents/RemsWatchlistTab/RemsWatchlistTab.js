import React, {useState, useEffect, useCallback, Fragment} from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import "./RemsWatchlistTab.scss"
import moment from "moment";

const bgHighlightedStyle = {
    backgroundColor: "#ffeeba",
}

const NotificationURL = "https://fiori.fmgl.com.au/sap/bc/ui5_ui5/ui2/ushell/shells/abap/Fiorilaunchpad.html#MaintenanceNotification-displayFactSheet&/C_ObjPgMaintNotification";
const RemsWatchlistTab = ({isStriped}) => {
    let selectedFaultRecords = useSelector(
        (state) => state.exceptionDetailsReducer.selectedFaultRecords
    );
    let remsWatchlistRecords = useSelector(
        (state) => state.exceptionDetailsReducer.remsConmonWatchlistRecord
    );

    let selectedException = useSelector(
        (state) => state.exceptionDetailsReducer.selectedException
    );
    selectedException = selectedException?.length > 0 ? selectedException[0] : {};

    const [tableContent, setTableContent] = useState([]);
    const [sortArrow, setSortArrow] = useState({
        urgencyNameArrow: 0,
        createdDateArrow: 0,
        statusNameArrow: 0,
        notificationArrow: 0,
        commentsArrow: 0,
        workShopFindingArrow: 0,
        recommendationArrow: 0,
        eventStatusArrow: 0,
        occurenceCountArrow: 0,
        durationArrow: 0,
    });
    const [inputValue, setInputValue] = useState({
        urgencyName: "",
        createdDate: "",
        statusName: "",
        notification: "",
        comments: "",
        workShopFinding: "",
        recommendation: "",
        eventStatus: "",
        occurenceCount: "",
        duration: "",
    });

    useEffect(() => {
        if (remsWatchlistRecords.length > 0) {
            setTableContent(remsWatchlistRecords);
        } else {
            setTableContent([]);
        }
    }, [remsWatchlistRecords]);

    function sortData(remsWatchlistRecords, sortby, fieldname) {
        if (sortby === 0) {
            remsWatchlistRecords.sort((a, b) => {
                a =
                    a[fieldname] &&
                        a &&
                        b &&
                        (Number.isNaN(a[fieldname]) || Number.isNaN(b[fieldname]))
                        ? a[fieldname].toString().toLowerCase()
                        : a[fieldname];
                b =
                    b[fieldname] &&
                        a &&
                        b &&
                        (Number.isNaN(a[fieldname]) || Number.isNaN(b[fieldname]))
                        ? b[fieldname].toString().toLowerCase()
                        : b[fieldname];
                return a === b ? 0 : a > b ? 1 : -1;
            });
            return remsWatchlistRecords;
        } else {
            remsWatchlistRecords.sort((a, b) => {
                a =
                    a[fieldname] &&
                        a &&
                        b &&
                        (Number.isNaN(a[fieldname]) || Number.isNaN(b[fieldname]))
                        ? a[fieldname].toString().toLowerCase()
                        : a[fieldname];
                b =
                    b[fieldname] &&
                        a &&
                        b &&
                        (Number.isNaN(a[fieldname]) || Number.isNaN(b[fieldname]))
                        ? b[fieldname].toString().toLowerCase()
                        : b[fieldname];
                return b === a ? 0 : b > a ? 1 : -1;
            });
            return remsWatchlistRecords;
        }
    }

    const handleInputChange = useCallback(
        (input) => {
            console.log(input)
            let tableItem = _.cloneDeep(remsWatchlistRecords);
            for (const [key, value] of Object.entries(input)) {
                const dataKey =
                    key === "urgencyName"
                        ? "urgencyName"
                        : key === "createdDate"
                            ? "createdDate"
                            : key === "statusName"
                                ? "statusName"
                                : key === "notification"
                                    ? "notification"
                                    : key === "comments"
                                        ? "comments"
                                        : key === "workShopFinding"
                                            ? "workShopFinding"
                                            : key === "recommendation"
                                                ? "recommendation"
                                                : key === "eventStatus"
                                                    ? "EventStatus"
                                                    : key === "occurenceCount"
                                                        ? "OccurenceCount"
                                                        : key === "duration"
                                                            ? "Duration (sec)"
                                                            : "";
                if (value.length > 0 && dataKey) {
                    tableItem = tableItem.filter((item) => {
                        return (
                            item[dataKey] &&
                            item[dataKey]
                                .toString()
                                .toLowerCase()
                                .includes(value.toString().toLowerCase())
                        );
                    });
                }
            }
            return tableItem;
        },
        [remsWatchlistRecords]
    );

    const renderTableData = (tableData) => {
        return tableData.map((remsItem, index) => {
            let bgHighlighted = selectedException.rems_event_id === remsItem.eventId
            return (
                <tr key={index} className={bgHighlighted? "border-warning" : null} style={bgHighlighted? bgHighlightedStyle : {}}>
                    <td style={{minWidth: '150px'}} title={remsItem.comments}>{remsItem.comments}</td>
                    <td title={remsItem.urgencyName}>
                        <div className="textHide">{remsItem.urgencyName}</div>
                    </td>
                    <td>{moment(remsItem.createdDate).format('YYYY-MM-DD')}</td>
                    <td>{remsItem.statusName}</td>
                    <td>
                        <a href= {`${NotificationURL}('${remsItem.notification}')`} target="_blank" style={{color: '#418FDE'}}>{remsItem.notification}</a>
                    </td>
                    <td>{remsItem.workShopFinding}</td>
                </tr>
            );
        });
    };

    return (
        <Fragment>
            <div className="tab-main-content">
                <div className="responsive-table custom-scroll">
                    <table id="rems-conmon-table" className={`table table-fixed table-bordered dataTable no-footer con-mon-table ${isStriped ? "table-striped" : ""}`}>
                        <thead>
                            <tr>
                                <th style={{minWidth: '150px'}}>
                                    Event Title
                                    <br />
                                    <input
                                        type="text"
                                        name="name"
                                        className="textbox"
                                        value={inputValue.comments}
                                        onChange={(e) => {
                                            const retData = handleInputChange({
                                                ...inputValue,
                                                comments: e.target.value,
                                            });
                                            setInputValue({
                                                ...inputValue,
                                                comments: e.target.value,
                                            });
                                            setTableContent(retData);
                                        }}
                                    />
                                    <span
                                        className={`sorting ${sortArrow.commentsArrow === 0 ? "up" : "down"
                                            }`}
                                        onClick={() => {
                                            if (sortArrow.commentsArrow === 0) {
                                                setTableContent(
                                                    sortData(
                                                        _.cloneDeep(remsWatchlistRecords),
                                                        sortArrow.commentsArrow,
                                                        "urgencyName"
                                                    )
                                                );
                                                setSortArrow({ ...sortArrow, commentsArrow: 1 });
                                            } else {
                                                setTableContent(
                                                    sortData(
                                                        _.cloneDeep(remsWatchlistRecords),
                                                        sortArrow.commentsArrow,
                                                        "urgencyName"
                                                    )
                                                );
                                                setSortArrow({ ...sortArrow, commentsArrow: 0 });
                                            }
                                        }}
                                    ></span>
                                </th>
                                <th>
                                    Urgency <br />
                                    <input
                                        type="text"
                                        name="name"
                                        className="textbox"
                                        value={inputValue.urgencyName}
                                        onChange={(e) => {
                                            const retData = handleInputChange({
                                                ...inputValue,
                                                urgencyName: e.target.value,
                                            });
                                            setInputValue({
                                                ...inputValue,
                                                urgencyName: e.target.value,
                                            });
                                            setTableContent(retData);
                                        }}
                                    />
                                    <span
                                        className={`sorting ${sortArrow.urgencyNameArrow === 0 ? "up" : "down"
                                            }`}
                                        onClick={() => {
                                            if (sortArrow.urgencyNameArrow === 0) {
                                                setTableContent(
                                                    sortData(
                                                        _.cloneDeep(remsWatchlistRecords),
                                                        sortArrow.urgencyNameArrow,
                                                        "createdDate"
                                                    )
                                                );
                                                setSortArrow({ ...sortArrow, urgencyNameArrow: 1 });
                                            } else {
                                                setTableContent(
                                                    sortData(
                                                        _.cloneDeep(remsWatchlistRecords),
                                                        sortArrow.urgencyNameArrow,
                                                        "createdDate"
                                                    )
                                                );
                                                setSortArrow({ ...sortArrow, urgencyNameArrow: 0 });
                                            }
                                        }}
                                    ></span>
                                </th>
                                <th>
                                    Created Date
                                    <br />
                                    <input
                                        type="text"
                                        name="name"
                                        className="textbox"
                                        value={inputValue.createdDate}
                                        onChange={(e) => {
                                            const retData = handleInputChange({
                                                ...inputValue,
                                                createdDate: e.target.value,
                                            });
                                            setInputValue({
                                                ...inputValue,
                                                createdDate: e.target.value,
                                            });
                                            setTableContent(retData);
                                        }}
                                    />
                                    <span
                                        className={`sorting ${sortArrow.createdDateArrow === 0 ? "up" : "down"
                                            }`}
                                        onClick={() => {
                                            if (sortArrow.createdDateArrow === 0) {
                                                setTableContent(
                                                    sortData(
                                                        _.cloneDeep(remsWatchlistRecords),
                                                        sortArrow.createdDateArrow,
                                                        "statusName"
                                                    )
                                                );
                                                setSortArrow({ ...sortArrow, createdDateArrow: 1 });
                                            } else {
                                                setTableContent(
                                                    sortData(
                                                        _.cloneDeep(remsWatchlistRecords),
                                                        sortArrow.createdDateArrow,
                                                        "statusName"
                                                    )
                                                );
                                                setSortArrow({ ...sortArrow, createdDateArrow: 0 });
                                            }
                                        }}
                                    ></span>
                                </th>
                                <th>
                                    Status <br />
                                    <input
                                        type="text"
                                        name="name"
                                        className="textbox"
                                        value={inputValue.statusName}
                                        onChange={(e) => {
                                            const retData = handleInputChange({
                                                ...inputValue,
                                                statusName: e.target.value,
                                            });
                                            setInputValue({
                                                ...inputValue,
                                                statusName: e.target.value,
                                            });
                                            setTableContent(retData);
                                        }}
                                    />
                                    <span
                                        className={`sorting ${sortArrow.statusNameArrow === 0 ? "up" : "down"
                                            }`}
                                        onClick={() => {
                                            if (sortArrow.statusNameArrow === 0) {
                                                setTableContent(
                                                    sortData(
                                                        _.cloneDeep(remsWatchlistRecords),
                                                        sortArrow.statusNameArrow,
                                                        "comments"
                                                    )
                                                );
                                                setSortArrow({ ...sortArrow, statusNameArrow: 1 });
                                            } else {
                                                setTableContent(
                                                    sortData(
                                                        _.cloneDeep(remsWatchlistRecords),
                                                        sortArrow.statusNameArrow,
                                                        "comments"
                                                    )
                                                );
                                                setSortArrow({ ...sortArrow, statusNameArrow: 0 });
                                            }
                                        }}
                                    ></span>
                                </th>
                                <th>
                                    Notification <br />
                                    <input
                                        type="text"
                                        name="name"
                                        className="textbox"
                                        value={inputValue.notification}
                                        onChange={(e) => {
                                            const retData = handleInputChange({
                                                ...inputValue,
                                                notification: e.target.value,
                                            });
                                            setInputValue({
                                                ...inputValue,
                                                notification: e.target.value,
                                            });
                                            setTableContent(retData);
                                        }}
                                    />
                                    <span
                                        className={`sorting ${sortArrow.notificationArrow === 0 ? "up" : "down"
                                            }`}
                                        onClick={() => {
                                            if (sortArrow.notificationArrow === 0) {
                                                setTableContent(
                                                    sortData(
                                                        _.cloneDeep(remsWatchlistRecords),
                                                        sortArrow.notificationArrow,
                                                        "notification (Add)"
                                                    )
                                                );
                                                setSortArrow({ ...sortArrow, notificationArrow: 1 });
                                            } else {
                                                setTableContent(
                                                    sortData(
                                                        _.cloneDeep(remsWatchlistRecords),
                                                        sortArrow.notificationArrow,
                                                        "notification (Add)"
                                                    )
                                                );
                                                setSortArrow({ ...sortArrow, notificationArrow: 0 });
                                            }
                                        }}
                                    ></span>
                                </th>
                                <th>
                                    Workshop Finding <br />
                                    <input
                                        type="text"
                                        name="name"
                                        className="textbox"
                                        value={inputValue.workShopFinding}
                                        onChange={(e) => {
                                            const retData = handleInputChange({
                                                ...inputValue,
                                                workShopFinding: e.target.value,
                                            });
                                            setInputValue({
                                                ...inputValue,
                                                workShopFinding: e.target.value,
                                            });
                                            setTableContent(retData);
                                        }}
                                    />
                                    <span
                                        className={`sorting ${sortArrow.workShopFindingArrow === 0 ? "up" : "down"
                                            }`}
                                        onClick={() => {
                                            if (sortArrow.workShopFindingArrow === 0) {
                                                setTableContent(
                                                    sortData(
                                                        _.cloneDeep(remsWatchlistRecords),
                                                        sortArrow.workShopFindingArrow,
                                                        "OccurenceCount"
                                                    )
                                                );
                                                setSortArrow({ ...sortArrow, workShopFindingArrow: 1 });
                                            } else {
                                                setTableContent(
                                                    sortData(
                                                        _.cloneDeep(remsWatchlistRecords),
                                                        sortArrow.workShopFindingArrow,
                                                        "OccurenceCount"
                                                    )
                                                );
                                                setSortArrow({ ...sortArrow, workShopFindingArrow: 0 });
                                            }
                                        }}
                                    ></span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent.length > 0 ? (
                                renderTableData(tableContent)
                            ) : (
                                <tr>
                                    <td colSpan="100%">No Rems Data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}

export default RemsWatchlistTab;