import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import moment from "moment";

export const WorkOrderTable = ({ data, tableTitle }) => {
  const [tableContent, setTableContent] = useState([]);
  const [sortArrow, setSortArrow] = useState({
    workOrderArrow: 0,
    equipmentArrow: 0,
    WoDescriptionArrow: 0,
    statusArrow: 0,
  });
  const [inputValue, setInputValue] = useState({
    workOrder: "",
    equipment: "",
    WoDescription: "",
    status: "",
    tecoDate: "",
    basicStartDate: "",
  });

  useEffect(() => {
    setTableContent(data);
  }, [data]);

  function sortData(data, sortby, fieldname) {
    if (
      ["WorkOrder", "Equipment", "WorkOrder Description", "Status"].includes(
        fieldname
      )
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
        const dataKey =
          key === "workOrder"
            ? "WorkOrder"
            : key === "workOrder"
              ? ""
              : key === "equipment"
                ? "Equipment"
                : key === "WoDescription"
                  ? "WorkOrder Description"
                  : key === "status"
                    ? "Status"
                    : key === "tecoDate"
                      ? "TECO Date"
                      : key === "basicStartDate"
                        ? "Basic Start Date"
                        : "";
        if (value.length > 0) {
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
    [data]
  );

  const renderTableData = (tableData) => {
    return tableData.map((workOrder, index) => {
      return (
        <tr key={index}>
          <td title={workOrder.WorkOrder}>{workOrder.WorkOrder}</td>
          <td title={workOrder.Equipment}>{workOrder.Equipment}</td>
          <td title={workOrder["WorkOrder Description"]}>
            <div className="textHide" style={{width: '290px'}}>{workOrder["WorkOrder Description"]}</div>
          </td>
          <td>{workOrder.Status}</td>
          <td>
            {workOrder["Basic Start Date"]
              ? moment(workOrder["Basic Start Date"]).format("YYYY-MM-DD")
              : "-"}
          </td>
          <td>{workOrder["TECO Date"]}</td>
        </tr>
      );
    });
  };

  return (
    <div className="responsive-table data-table-div">
      <h6>{tableTitle ? tableTitle : ""}</h6>
      <table
        id="work-order-table"
        className="table table-fixed table-bordered dataTable no-footer res-table"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>
              WorkOrder
              <br />
              <input
                type="text"
                name="name"
                className="textbox"
                value={inputValue.workOrder}
                onChange={(e) => {
                  const retData = handleInputChange({
                    ...inputValue,
                    workOrder: e.target.value,
                  });
                  setInputValue({
                    ...inputValue,
                    workOrder: e.target.value,
                  });
                  setTableContent(retData);
                }}
              />
              <span
                className={`sorting ${sortArrow.workOrderArrow === 0 ? "up" : "down"
                  }`}
                onClick={() => {
                  if (sortArrow.workOrderArrow === 0) {
                    setTableContent(
                      sortData(
                        _.cloneDeep(data),
                        sortArrow.workOrderArrow,
                        "WorkOrder"
                      )
                    );
                    setSortArrow({ ...sortArrow, workOrderArrow: 1 });
                  } else {
                    setTableContent(
                      sortData(
                        _.cloneDeep(data),
                        sortArrow.workOrderArrow,
                        "WorkOrder"
                      )
                    );
                    setSortArrow({ ...sortArrow, workOrderArrow: 0 });
                  }
                }}
              ></span>
            </th>
            <th>
              Equipment <br />
              <input
                type="text"
                name="name"
                className="textbox"
                value={inputValue.equipment}
                onChange={(e) => {
                  const retData = handleInputChange({
                    ...inputValue,
                    equipment: e.target.value,
                  });
                  setInputValue({
                    ...inputValue,
                    equipment: e.target.value,
                  });
                  setTableContent(retData);
                }}
              />
              <span
                className={`sorting ${sortArrow.equipmentArrow === 0 ? "up" : "down"
                  }`}
                onClick={() => {
                  if (sortArrow.equipmentArrow === 0) {
                    setTableContent(
                      sortData(
                        _.cloneDeep(data),
                        sortArrow.equipmentArrow,
                        "Equipment"
                      )
                    );
                    setSortArrow({ ...sortArrow, equipmentArrow: 1 });
                  } else {
                    setTableContent(
                      sortData(
                        _.cloneDeep(data),
                        sortArrow.equipmentArrow,
                        "Equipment"
                      )
                    );
                    setSortArrow({ ...sortArrow, equipmentArrow: 0 });
                  }
                }}
              ></span>
            </th>
            <th style={{minWidth: '300px'}}>
              WO Description <br />
              <input
                type="text"
                name="name"
                className="textbox"
                value={inputValue.WoDescription}
                onChange={(e) => {
                  const retData = handleInputChange({
                    ...inputValue,
                    WoDescription: e.target.value,
                  });
                  setInputValue({
                    ...inputValue,
                    WoDescription: e.target.value,
                  });
                  setTableContent(retData);
                }}
              />
              <span
                className={`sorting ${sortArrow.WoDescriptionArrow === 0 ? "up" : "down"
                  }`}
                onClick={() => {
                  if (sortArrow.WoDescriptionArrow === 0) {
                    setTableContent(
                      sortData(
                        _.cloneDeep(data),
                        sortArrow.WoDescriptionArrow,
                        "WorkOrder Description"
                      )
                    );
                    setSortArrow({ ...sortArrow, WoDescriptionArrow: 1 });
                  } else {
                    setTableContent(
                      sortData(
                        _.cloneDeep(data),
                        sortArrow.WoDescriptionArrow,
                        "WorkOrder Description"
                      )
                    );
                    setSortArrow({ ...sortArrow, WoDescriptionArrow: 0 });
                  }
                }}
              ></span>
            </th>
            <th>
              Status
              <br />
              <input
                type="text"
                name="name"
                className="textbox"
                value={inputValue.status}
                onChange={(e) => {
                  const retData = handleInputChange({
                    ...inputValue,
                    status: e.target.value,
                  });
                  setInputValue({
                    ...inputValue,
                    status: e.target.value,
                  });
                  setTableContent(retData);
                }}
              />
              <span
                className={`sorting ${sortArrow.statusArrow === 0 ? "up" : "down"
                  }`}
                onClick={() => {
                  if (sortArrow.statusArrow === 0) {
                    setTableContent(
                      sortData(
                        _.cloneDeep(data),
                        sortArrow.statusArrow,
                        "Status"
                      )
                    );
                    setSortArrow({ ...sortArrow, statusArrow: 1 });
                  } else {
                    setTableContent(
                      sortData(
                        _.cloneDeep(data),
                        sortArrow.statusArrow,
                        "Status"
                      )
                    );
                    setSortArrow({ ...sortArrow, statusArrow: 0 });
                  }
                }}
              ></span>
            </th>
            <th>
              Basic Start Date <br />
              <input
                type="text"
                name="name"
                className="textbox"
                value={inputValue.basicStartDate}
                onChange={(e) => {
                  const retData = handleInputChange({
                    ...inputValue,
                    basicStartDate: e.target.value,
                  });
                  setInputValue({
                    ...inputValue,
                    basicStartDate: e.target.value,
                  });
                  setTableContent(retData);
                }}
              />
            </th>
            <th>
              TECO Date <br />
              <input
                type="text"
                name="name"
                className="textbox"
                value={inputValue.tecoDate}
                onChange={(e) => {
                  const retData = handleInputChange({
                    ...inputValue,
                    tecoDate: e.target.value,
                  });
                  setInputValue({
                    ...inputValue,
                    tecoDate: e.target.value,
                  });
                  setTableContent(retData);
                }}
              />
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
  );
};
