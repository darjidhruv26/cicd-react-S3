import { Fragment, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import "./ExceptionFaultsTab.scss"

const ExceptionFaultsTab = () => {
  let selectedFaultRecords = useSelector(
    (state) => state.exceptionDetailsReducer.selectedFaultRecords
  );
  let isLoadingfault = useSelector(
    (state) => state.exceptionDetailsReducer.isLoadingfault
  );

  const [eventNames, setEventNames] = useState([]);
  const [eventLevels, setEventLevels] = useState([]);
  const [eventSources, setEventSources] = useState([]);
  const [tableContent, setTableContent] = useState([]);
  const [sortArrow, setSortArrow] = useState({
    sourceArrow: 0,
    timeStampArrow: 0,
    fmiArrow: 0,
    eventLevelArrow: 0,
    eventNameArrow: 0,
    eventTypeArrow: 0,
    eventSeverityArrow: 0,
    eventStatusArrow: 0,
    occurenceCountArrow: 0,
    durationArrow: 0,
  });
  const [inputValue, setInputValue] = useState({
    source: "",
    timeStamp: "",
    fmi: "",
    eventLevel: "",
    eventName: "",
    eventType: "",
    eventSeverity: "",
    eventStatus: "",
    occurenceCount: "",
    duration: "",
  });

  useEffect(() => {
    if (selectedFaultRecords.length > 0) {
      setTableContent(selectedFaultRecords);
      let eventmapper = []
      _.map(_.uniq(_.map(selectedFaultRecords, 'EventName')), ((eventName) => eventmapper.push({'key': eventName, 'value': eventName})))
      setEventNames(eventmapper)
      
      let eventLevelMapper = []
      _.map(_.uniq(_.map(selectedFaultRecords, 'EventLevel (Add)')), ((eventLevel) => eventLevelMapper.push({'key': eventLevel, 'value': eventLevel})))
      setEventLevels(eventLevelMapper)
      
      let eventSourceMapper = []
      _.map(_.uniq(_.map(selectedFaultRecords, 'Source')), ((eventSource) => eventSourceMapper.push({'key': eventSource, 'value': eventSource})))
      setEventSources(eventSourceMapper)
      
    } else {
      setTableContent([]);
    }
  }, [selectedFaultRecords]);

  function sortData(selectedFaultRecords, sortby, fieldname) {
    if (sortby === 0) {
      selectedFaultRecords.sort((a, b) => {
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
      return selectedFaultRecords;
    } else {
      selectedFaultRecords.sort((a, b) => {
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
      return selectedFaultRecords;
    }
  }

  const handleInputChange = useCallback(
    (input) => {
      let tableItem = _.cloneDeep(selectedFaultRecords);
      for (const [key, value] of Object.entries(input)) {
        const dataKey =
          key === "source"
            ? "Source"
            : key === "timeStamp"
            ? "Timestamp"
            : key === "fmi"
            ? "FMI"
            : key === "eventLevel"
            ? "EventLevel (Add)"
            : key === "eventName"
            ? "EventName"
            : key === "eventType"
            ? "EventType"
            : key === "eventSeverity"
            ? "EventSeverity"
            : key === "eventStatus"
            ? "EventStatus"
            : key === "occurenceCount"
            ? "OccurenceCount"
            : key === "duration"
            ? "Duration (sec)"
            : "";
        if (value.length > 0 && dataKey && value !== 'All') {
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
    [selectedFaultRecords]
  );

  const renderTableData = (tableData) => {
    
    return  tableData.map((fault, index) => {
      return (
        <tr key={index}>
          <td title={fault.Timestamp}>
            <div className="textHide">{fault.Timestamp}</div>
          </td>
          <td>{fault.FMI}</td>
          <td>{fault.EventName}</td>
          <td>{fault["EventLevel (Add)"]}</td>
          <td title={fault.Source}>{fault.Source}</td>
          <td>{fault.OccurenceCount}</td>
          <td>{fault["Duration (sec)"]}</td>
        </tr>
      );
    });
    
  };

  return (
    <Fragment>
      <div className="tab-main-content fault-tab">
         <div className="responsive-table custom-scroll">
          <table id="machine-events-table" className="table table-fixed table-bordered dataTable no-footer con-mon-table">
            <thead>
              <tr>
                <th>
                  Timestamp <br />
                  <input
                    type="text"
                    name="name"
                    className="textbox"
                    value={inputValue.timeStamp}
                    onChange={(e) => {
                      const retData = handleInputChange({
                        ...inputValue,
                        timeStamp: e.target.value,
                      });
                      setInputValue({
                        ...inputValue,
                        timeStamp: e.target.value,
                      });
                      setTableContent(retData);
                    }}
                  />
                  <span
                    className={`sorting ${
                      sortArrow.timeStampArrow === 0 ? "up" : "down"
                    }`}
                    onClick={() => {
                      if (sortArrow.timeStampArrow === 0) {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.timeStampArrow,
                            "Timestamp"
                          )
                        );
                        setSortArrow({ ...sortArrow, timeStampArrow: 1 });
                      } else {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.timeStampArrow,
                            "Timestamp"
                          )
                        );
                        setSortArrow({ ...sortArrow, timeStampArrow: 0 });
                      }
                    }}
                  ></span>
                </th>
                <th>
                  FMI
                  <br />
                  <input
                    type="text"
                    name="name"
                    className="textbox"
                    value={inputValue.fmi}
                    onChange={(e) => {
                      const retData = handleInputChange({
                        ...inputValue,
                        fmi: e.target.value,
                      });
                      setInputValue({
                        ...inputValue,
                        fmi: e.target.value,
                      });
                      setTableContent(retData);
                    }}
                  />
                  <span
                    className={`sorting ${
                      sortArrow.fmiArrow === 0 ? "up" : "down"
                    }`}
                    onClick={() => {
                      if (sortArrow.fmiArrow === 0) {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.fmiArrow,
                            "FMI"
                          )
                        );
                        setSortArrow({ ...sortArrow, fmiArrow: 1 });
                      } else {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.fmiArrow,
                            "FMI"
                          )
                        );
                        setSortArrow({ ...sortArrow, fmiArrow: 0 });
                      }
                    }}
                  ></span>
                </th>
                <th style={{minWidth: '168px'}}>
                  EventName <br />
                  <div className="fault-tab-custom-select">
                    <select
                      value={inputValue.eventName}
                      onChange={(e) => {
                        const retData = handleInputChange({
                          ...inputValue,
                          eventName: e.target.value,
                        });
                        setInputValue({
                          ...inputValue,
                          eventName: e.target.value,
                        });
                        setTableContent(retData);
                      }}
                    >
                      <option>All</option>
                      {eventNames?.map(eventName => <option value={eventName.value} key={eventName.value}>{eventName.value}</option>)}
                    </select>
                  </div>
                  <span
                    className={`sorting ${
                      sortArrow.eventNameArrow === 0 ? "up" : "down"
                    }`}
                    onClick={() => {
                      if (sortArrow.eventNameArrow === 0) {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.eventNameArrow,
                            "EventName"
                          )
                        );
                        setSortArrow({ ...sortArrow, eventNameArrow: 1 });
                      } else {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.eventNameArrow,
                            "EventName"
                          )
                        );
                        setSortArrow({ ...sortArrow, eventNameArrow: 0 });
                      }
                    }}
                  ></span>
                </th>
                <th>
                  EventLevel (Add) <br />
                  <div className="fault-tab-custom-select" style={{position: 'absolute !important', height: '26px !important'}}>
                    <select
                      value={inputValue.eventLevel}
                      onChange={(e) => {
                        const retData = handleInputChange({
                          ...inputValue,
                          eventLevel: e.target.value,
                        });
                        setInputValue({
                          ...inputValue,
                          eventLevel: e.target.value,
                        });
                        setTableContent(retData);
                      }}
                    >
                      <option>All</option>
                      {eventLevels?.map(eventLevel => <option value={eventLevel.value} key={eventLevel.value}>{eventLevel.value}</option>)}
                    </select>
                  </div>
                  <span
                    className={`sorting ${
                      sortArrow.eventLevelArrow === 0 ? "up" : "down"
                    }`}
                    onClick={() => {
                      if (sortArrow.eventLevelArrow === 0) {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.eventLevelArrow,
                            "EventLevel (Add)"
                          )
                        );
                        setSortArrow({ ...sortArrow, eventLevelArrow: 1 });
                      } else {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.eventLevelArrow,
                            "EventLevel (Add)"
                          )
                        );
                        setSortArrow({ ...sortArrow, eventLevelArrow: 0 });
                      }
                    }}
                  ></span>
                </th>
                <th style={{minWidth: '167px'}}>
                  Source
                  <br />
                  <div className="fault-tab-custom-select">
                    <select
                      value={inputValue.source}
                      onChange={(e) => {
                        const retData = handleInputChange({
                          ...inputValue,
                          source: e.target.value,
                        });
                        setInputValue({
                          ...inputValue,
                          source: e.target.value,
                        });
                        setTableContent(retData);
                      }}
                    >
                      <option>All</option>
                      {eventSources?.map(source => <option value={source.value} key={source.value}>{source.value}</option>)}
                    </select>
                  </div>
                  <span
                    className={`sorting ${
                      sortArrow.sourceArrow === 0 ? "up" : "down"
                    }`}
                    onClick={() => {
                      if (sortArrow.sourceArrow === 0) {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.sourceArrow,
                            "Source"
                          )
                        );
                        setSortArrow({ ...sortArrow, sourceArrow: 1 });
                      } else {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.sourceArrow,
                            "Source"
                          )
                        );
                        setSortArrow({ ...sortArrow, sourceArrow: 0 });
                      }
                    }}
                  ></span>
                </th>
                <th>
                  OccurenceCount <br />
                  <input
                    type="text"
                    name="name"
                    className="textbox"
                    value={inputValue.occurenceCount}
                    onChange={(e) => {
                      const retData = handleInputChange({
                        ...inputValue,
                        occurenceCount: e.target.value,
                      });
                      setInputValue({
                        ...inputValue,
                        occurenceCount: e.target.value,
                      });
                      setTableContent(retData);
                    }}
                  />
                  <span
                    className={`sorting ${
                      sortArrow.occurenceCountArrow === 0 ? "up" : "down"
                    }`}
                    onClick={() => {
                      if (sortArrow.occurenceCountArrow === 0) {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.occurenceCountArrow,
                            "OccurenceCount"
                          )
                        );
                        setSortArrow({ ...sortArrow, occurenceCountArrow: 1 });
                      } else {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.occurenceCountArrow,
                            "OccurenceCount"
                          )
                        );
                        setSortArrow({ ...sortArrow, occurenceCountArrow: 0 });
                      }
                    }}
                  ></span>
                </th>
                <th>
                  Duration (sec) <br />
                  <input
                    type="text"
                    name="name"
                    className="textbox"
                    value={inputValue.duration}
                    onChange={(e) => {
                      const retData = handleInputChange({
                        ...inputValue,
                        duration: e.target.value,
                      });
                      setInputValue({
                        ...inputValue,
                        duration: e.target.value,
                      });
                      setTableContent(retData);
                    }}
                  />
                  <span
                    className={`sorting ${
                      sortArrow.durationArrow === 0 ? "up" : "down"
                    }`}
                    onClick={() => {
                      if (sortArrow.durationArrow === 0) {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.durationArrow,
                            "Duration (sec)"
                          )
                        );
                        setSortArrow({ ...sortArrow, durationArrow: 1 });
                      } else {
                        setTableContent(
                          sortData(
                            _.cloneDeep(selectedFaultRecords),
                            sortArrow.durationArrow,
                            "Duration (sec)"
                          )
                        );
                        setSortArrow({ ...sortArrow, durationArrow: 0 });
                      }
                    }}
                  ></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoadingfault && tableContent.length > 0 ? (
                renderTableData(tableContent)
              ) : (
                <tr>
                  <td colSpan="100%">No Fault Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default ExceptionFaultsTab;
