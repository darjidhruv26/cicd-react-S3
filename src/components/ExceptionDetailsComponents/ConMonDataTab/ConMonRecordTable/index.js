import { useCallback } from "react";
import Moment from "react-moment";
import "./ConMonRecordTable.scss"

export const ConMonRecordTable = ({ tableData }) => {
  const renderConMonDataRecords = useCallback((data) => {
    const TableContent = JSON.parse(data);
    return TableContent.map((item, itemIndex) => {
      return item[Object.keys(item)[0]].map((element, elementIndex) => {
        if (elementIndex === 0) {
          return (
            <tr key={elementIndex}>
              <td rowSpan={item[Object.keys(item)[0]].length}>
                {Object.keys(item)[0]}
              </td>
              <td className="measurement-field">
                <span style={{ backgroundColor: element.Color }}></span>
                {element.Measurement}
              </td>
              <td>{element.Units}</td>
              <td>
                <Moment format="DD MMM YYYY">{element["Date Measured"]}</Moment>
              </td>
              <td>{element.SMH}</td>
              {/* <td>{element["Site Measured"]}</td> */}
            </tr>
          );
        } else {
          return (
            <tr key={elementIndex}>
              <td className="measurement-field">
                <span style={{ backgroundColor: element.Color }}></span>
                {element.Measurement}
              </td>
              <td>{element.Units}</td>
              <td>
                <Moment format="DD MMM YYYY">{element["Date Measured"]}</Moment>
              </td>
              <td>{element.SMH}</td>
              {/* <td>{element["Site Measured"]}</td> */}
            </tr>
          );
        }
      });
    });
  }, []);

  return (
    <>
      <h6>{tableData && tableData.CONMON_TYPE ? tableData.CONMON_TYPE : ""}</h6>
      <div className="responsive-table con-mon-table-div">
        <table className="table con-mon-table">
          <thead>
            <tr>
              <th>Measurement Point</th>
              <th>Measurement</th>
              <th>Units</th>
              <th>Date Measured</th>
              <th>SMH</th>
              {/* <th>Site Measured</th> */}
            </tr>
          </thead>
          <tbody>
            {tableData &&
              tableData.COMBINE_DATA &&
              tableData.COMBINE_DATA.length > 0 ? (
              renderConMonDataRecords(tableData.COMBINE_DATA)
            ) : (
              <tr>
                <td colSpan="7">No ConMon Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
