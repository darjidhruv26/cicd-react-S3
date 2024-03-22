import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { fetchExceptionSummaryByEquipment } from "../../../redux/summary-table/summaryTableThunk";

export const SummaryTabData = ({ data }) => {
  const dispatch = useDispatch();
  const [tableContent, setTableContent] = useState([]);
  const [sortArrow, setSortArrow] = useState({
    siteArrow: 0,
    fleetArrow: 0,
    modelArrow: 0,
    serialArrow: 0,
    equipmentArrow: 0,
    smuArrow: 0,
    smuDateArrow: 0,
    dataStatusArrow: 0,
    upcomingPmArrow: 0,
    ExceptionArrow: 0,
    faultCodeArrow: 0,
    oilAnalysisArrow: 0,
  });
  const [inputValue, setInputValue] = useState({
    fleet_type: "",
    model: "",
    serial_number: "",
    equipment_id: "",
    smh: "",
    last_communication: "",
    upcoming_pm: "",
  });

  const [selectedRow, setSelectedRow] = useState("");

  useEffect(() => {
    if (data && data.length > 0) {
      setTableContent(data);
    }
  }, [data]);

  function sortData(data, sortby, fieldname) {
    if (
      [
        "site_name_current",
        "fleet_type",
        "model",
        "serial_number",
        "equipment_id",
        "smh",
      ].includes(fieldname)
    ) {
      if (sortby === 0) {
        data.sort((a, b) => {
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
        return data;
      } else {
        data.sort((a, b) => {
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
        return data;
      }
    }
    return data;
  }

  const handleInputChange = useCallback(
    (input) => {
      let tableItem = _.cloneDeep(data);
      for (const [key, value] of Object.entries(input)) {
        if (value.length > 0) {
          tableItem = tableItem.filter((item) => {
            return (
              item[key] &&
              item[key]
                .toString()
                .toLowerCase()
                .includes(value.toString().toLowerCase())
            );
          });
        }
      }
      return tableItem;
    },
    [data]
  );

  const onClickFilter = (item, index) => {
    const filterView = document.getElementById("pIexception");
    var headerOffset = 105;
    var elementPosition = filterView.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    setSelectedRow(index);
    dispatch(
      fetchExceptionSummaryByEquipment({
        equipment_id: item.asset_name,
      })
    );
  };

  const renderTableData = (tableData) => {
    return tableData.map((item, index) => {
      return (
        <tr key={index} className={selectedRow === index ? "active" : ""}>
          <td>
            <span
              className="d-flex align-items-center justify-content-center table-filter"
              onClick={() => onClickFilter(item, index)}
            >
              <img
                src={window.location.origin + "/images/filter-black.svg"}
                alt="filter-black"
              />
              <span></span>
            </span>
          </td>
          <td>{item.site_name_current}</td>
          <td>{item.fleet_type}</td>
          <td>{item.model}</td>
          <td>{item.serial_number}</td>
          <td>{item.asset_name}</td>
          <td>{item.smh}</td>
          {/* <td>{item.last_communication}</td> */}
          <td>
            <p>
              <i className="icon-network"></i>
              {item.last_communication}
            </p>
          </td>
          {/* <td>25th Jan 2022</td> */}
          <td className="p-0">
            <span className="exceptions-box d-flex">
              <span className="red">{item.pi_exceptions_critical}</span>
              <span className="orange">{item.pi_exceptions_major}</span>
              <span className="yellow">{item.pi_exceptions_minor}</span>
            </span>
          </td>
          <td className="p-0">
            <span className="exceptions-box d-flex">
              <span className="red">{item.event_analyzer_critical}</span>
              <span className="orange">{item.event_analyzer_major}</span>
              <span className="yellow">{item.event_analyzer_minor}</span>
            </span>
          </td>
          <td className="p-0">
            <span className="exceptions-box d-flex">
              <span className="red">{item.conmon_critical}</span>
              <span className="orange">{item.conmon_major}</span>
              <span className="yellow">{item.conmon_minor}</span>
            </span>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="summary-tab-data">
      <h6 className="mb-2">ASSET VIEW ({data.length})</h6>
      <div className="responsive-table data-table-div summary-table">
        <table
          id="summary-table"
          className="table table-fixed table-bordered dataTable no-footer"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th colSpan="2">
                Site
                <span
                  className={`sorting ${
                    sortArrow.siteArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    if (sortArrow.siteArrow === 0) {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.siteArrow,
                          "site_name_current"
                        )
                      );
                      setSortArrow({ ...sortArrow, siteArrow: 1 });
                    } else {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.siteArrow,
                          "site_name_current"
                        )
                      );
                      setSortArrow({ ...sortArrow, siteArrow: 0 });
                    }
                  }}
                ></span>
              </th>
              <th>
                Equipment
                <br />
                Type <br />
                <input
                  type="text"
                  name="name"
                  className="textbox"
                  value={inputValue.fleet_type}
                  onChange={(e) => {
                    const retData = handleInputChange({
                      ...inputValue,
                      fleet_type: e.target.value,
                    });
                    setInputValue({
                      ...inputValue,
                      fleet_type: e.target.value,
                    });
                    setTableContent(retData);
                  }}
                />
                <span
                  className={`sorting ${
                    sortArrow.fleetArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    if (sortArrow.fleetArrow === 0) {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.fleetArrow,
                          "fleet_type"
                        )
                      );
                      setSortArrow({ ...sortArrow, fleetArrow: 1 });
                    } else {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.fleetArrow,
                          "fleet_type"
                        )
                      );
                      setSortArrow({ ...sortArrow, fleetArrow: 0 });
                    }
                  }}
                ></span>
              </th>
              <th>
                Model <br />
                <input
                  type="text"
                  name="name"
                  className="textbox"
                  value={inputValue.model}
                  onChange={(e) => {
                    const retData = handleInputChange({
                      ...inputValue,
                      model: e.target.value,
                    });
                    setInputValue({
                      ...inputValue,
                      model: e.target.value,
                    });
                    setTableContent(retData);
                  }}
                />
                <span
                  className={`sorting ${
                    sortArrow.modelArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    if (sortArrow.modelArrow === 0) {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.modelArrow,
                          "model"
                        )
                      );
                      setSortArrow({ ...sortArrow, modelArrow: 1 });
                    } else {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.modelArrow,
                          "model"
                        )
                      );
                      setSortArrow({ ...sortArrow, modelArrow: 0 });
                    }
                  }}
                ></span>
              </th>
              <th>
                Serial
                <br /> No. <br />
                <input
                  type="text"
                  name="name"
                  className="textbox"
                  value={inputValue.serial_number}
                  onChange={(e) => {
                    const retData = handleInputChange({
                      ...inputValue,
                      serial_number: e.target.value,
                    });
                    setInputValue({
                      ...inputValue,
                      serial_number: e.target.value,
                    });
                    setTableContent(retData);
                  }}
                />
                <span
                  className={`sorting ${
                    sortArrow.serialArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    if (sortArrow.serialArrow === 0) {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.serialArrow,
                          "serial_number"
                        )
                      );
                      setSortArrow({ ...sortArrow, serialArrow: 1 });
                    } else {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.serialArrow,
                          "serial_number"
                        )
                      );
                      setSortArrow({ ...sortArrow, serialArrow: 0 });
                    }
                  }}
                ></span>
              </th>
              <th>
                Equipment
                <br />
                Id <br />{" "}
                <input
                  type="text"
                  name="name"
                  className="textbox"
                  value={inputValue.equipment_id}
                  onChange={(e) => {
                    const retData = handleInputChange({
                      ...inputValue,
                      equipment_id: e.target.value,
                    });
                    setInputValue({
                      ...inputValue,
                      equipment_id: e.target.value,
                    });
                    setTableContent(retData);
                  }}
                />
                <span
                  className={`sorting ${
                    sortArrow.equipmentArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    if (sortArrow.equipmentArrow === 0) {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.equipmentArrow,
                          "equipment_id"
                        )
                      );
                      setSortArrow({ ...sortArrow, equipmentArrow: 1 });
                    } else {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.equipmentArrow,
                          "equipment_id"
                        )
                      );
                      setSortArrow({ ...sortArrow, equipmentArrow: 0 });
                    }
                  }}
                ></span>
              </th>
              <th>
                SMU <br />
                <input
                  type="text"
                  name="name"
                  className="textbox"
                  value={inputValue.smh}
                  onChange={(e) => {
                    const retData = handleInputChange({
                      ...inputValue,
                      smh: e.target.value,
                    });
                    setInputValue({
                      ...inputValue,
                      smh: e.target.value,
                    });
                    setTableContent(retData);
                  }}
                />
                <span
                  className={`sorting ${
                    sortArrow.smuArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    if (sortArrow.smuArrow === 0) {
                      setTableContent(
                        sortData(_.cloneDeep(data), sortArrow.smuArrow, "smh")
                      );
                      setSortArrow({ ...sortArrow, smuArrow: 1 });
                    } else {
                      setTableContent(
                        sortData(_.cloneDeep(data), sortArrow.smuArrow, "smh")
                      );
                      setSortArrow({ ...sortArrow, smuArrow: 0 });
                    }
                  }}
                ></span>
              </th>
              {/* <th>
                SMU <br />
                Date
                <span
                  className={`sorting ${
                    sortArrow.smuDateArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    if (sortArrow.smuDateArrow === 0) {
                      setTableContent(
                        sortData(_.cloneDeep(data), sortArrow.smuDateArrow, "")
                      );
                      setSortArrow({ ...sortArrow, smuDateArrow: 1 });
                    } else {
                      setTableContent(
                        sortData(_.cloneDeep(data), sortArrow.smuDateArrow, "")
                      );
                      setSortArrow({ ...sortArrow, smuDateArrow: 0 });
                    }
                  }}
                ></span>
              </th> */}
              <th>
                Data <br />
                Status <br />
                <input
                  type="text"
                  name="name"
                  className="textbox"
                  value={inputValue.last_communication}
                  onChange={(e) => {
                    const retData = handleInputChange({
                      ...inputValue,
                      last_communication: e.target.value,
                    });
                    setInputValue({
                      ...inputValue,
                      last_communication: e.target.value,
                    });
                    setTableContent(retData);
                  }}
                />
                {/* <span
                  className={`sorting ${
                    sortArrow.dataStatusArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    if (sortArrow.dataStatusArrow === 0) {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.dataStatusArrow,
                          ""
                        )
                      );
                      setSortArrow({ ...sortArrow, dataStatusArrow: 1 });
                    } else {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.dataStatusArrow,
                          ""
                        )
                      );
                      setSortArrow({ ...sortArrow, dataStatusArrow: 0 });
                    }
                  }}
                ></span> */}
              </th>
              {/* <th>
                Upcoming
                <br />
                PM <br />{" "}
                <input
                  type="text"
                  name="name"
                  className="textbox"
                  value={inputValue.upcoming_pm}
                  onChange={(e) => {
                    const retData = handleInputChange({
                      ...inputValue,
                      upcoming_pm: e.target.value,
                    });
                    setInputValue({
                      ...inputValue,
                      upcoming_pm: e.target.value,
                    });
                    setTableContent(retData);
                  }}
                />
                <span
                  className={`sorting ${
                    sortArrow.upcomingPmArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    if (sortArrow.upcomingPmArrow === 0) {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.upcomingPmArrow,
                          ""
                        )
                      );
                      setSortArrow({ ...sortArrow, upcomingPmArrow: 1 });
                    } else {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.upcomingPmArrow,
                          ""
                        )
                      );
                      setSortArrow({ ...sortArrow, upcomingPmArrow: 0 });
                    }
                  }}
                ></span>
              </th> */}
              <th>
                No of
                <br />
                Exceptions
                {/* <span
                  className={`sorting ${
                    sortArrow.ExceptionArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    if (sortArrow.ExceptionArrow === 0) {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.ExceptionArrow,
                          ""
                        )
                      );
                      setSortArrow({ ...sortArrow, ExceptionArrow: 1 });
                    } else {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.ExceptionArrow,
                          ""
                        )
                      );
                      setSortArrow({ ...sortArrow, ExceptionArrow: 1 });
                    }
                  }}
                ></span> */}
              </th>
              <th>
                No of
                <br />
                Fault Codes
                {/* <span
                  className={`sorting ${
                    sortArrow.faultCodeArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    if (sortArrow.faultCodeArrow === 0) {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.faultCodeArrow,
                          ""
                        )
                      );
                      setSortArrow({ ...sortArrow, faultCodeArrow: 1 });
                    } else {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.faultCodeArrow,
                          ""
                        )
                      );
                      setSortArrow({ ...sortArrow, faultCodeArrow: 0 });
                    }
                  }}
                ></span> */}
              </th>
              <th>
                No of
                <br />
                Oil Analysis
                {/* <span
                  className={`sorting ${
                    sortArrow.oilAnalysisArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    if (sortArrow.oilAnalysisArrow === 0) {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.oilAnalysisArrow,
                          ""
                        )
                      );
                      setSortArrow({ ...sortArrow, oilAnalysisArrow: 0 });
                    } else {
                      setTableContent(
                        sortData(
                          _.cloneDeep(data),
                          sortArrow.oilAnalysisArrow,
                          ""
                        )
                      );
                      setSortArrow({ ...sortArrow, oilAnalysisArrow: 0 });
                    }
                  }}
                ></span> */}
              </th>
            </tr>
          </thead>
          <tbody>
            {tableContent && tableContent.length > 0 ? (
              renderTableData(tableContent)
            ) : (
              <tr>
                <td colSpan="11" style={{ textAlign: "center" }}>
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
