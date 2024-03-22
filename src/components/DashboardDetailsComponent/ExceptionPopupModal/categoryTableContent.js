import { useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setShowDateModal } from "../../../redux/summary-table/summaryTableSlice";
import { useNavigate } from "react-router-dom";

let severity_logo = {
  Severe: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="27"
      viewBox="0 0 28 27"
    >
      <g id="red" transform="translate(0.329)">
        <g id="Group_11377" data-name="Group 11377">
          <g
            id="Rectangle_8798"
            data-name="Rectangle 8798"
            transform="translate(-0.329)"
            fill="#fff"
            stroke="#d9534f"
            strokeWidth="1"
          >
            <rect width="28" height="27" rx="13.5" stroke="none" />
            <rect x="0.5" y="0.5" width="27" height="26" rx="13" fill="none" />
          </g>
          <path
            id="Union_23"
            data-name="Union 23"
            d="M22745.908-6104.335a2.566,2.566,0,0,1-1.387-1.594h-3.934a2.588,2.588,0,0,1-1.391,1.592,2.52,2.52,0,0,1-2.094,0,2.574,2.574,0,0,1-1.381-1.592h-1.4a.783.783,0,0,1-.559-.236.818.818,0,0,1-.23-.572l.1-8.542a.824.824,0,0,1,.236-.572.784.784,0,0,1,.561-.236h8.205l.262-1.372a.818.818,0,0,1,.275-.464.789.789,0,0,1,.506-.184h1.494a.79.79,0,0,1,.477.161.817.817,0,0,1,.285.418h0l.426,1.441h1.158a.8.8,0,0,1,.646.329l2.494,3.5,1.617,1.474a.827.827,0,0,1,.26.606v3.442a.813.813,0,0,1-.234.572.79.79,0,0,1-.559.236h-2.357a2.563,2.563,0,0,1-1.385,1.594,2.5,2.5,0,0,1-1.049.228A2.487,2.487,0,0,1,22745.908-6104.335Zm.367-3.043a.993.993,0,0,0-.277.688,1,1,0,0,0,.277.688.964.964,0,0,0,.68.285.936.936,0,0,0,.676-.286.982.982,0,0,0,.283-.687.965.965,0,0,0-.283-.688.932.932,0,0,0-.676-.286A.961.961,0,0,0,22746.275-6107.378Zm-8.8,0a1,1,0,0,0-.279.688,1,1,0,0,0,.279.688.968.968,0,0,0,.68.285.957.957,0,0,0,.678-.286,1,1,0,0,0,.281-.687.979.979,0,0,0-.281-.688.953.953,0,0,0-.678-.286A.964.964,0,0,0,22737.475-6107.378Zm10.5-1.683a2.588,2.588,0,0,1,1.387,1.526h1.586l.006-2.285-1.193-1.089h-5.293a.791.791,0,0,1-.564-.237.816.816,0,0,1-.23-.571v-2.754h-8.453l-.082,6.935h.613a2.563,2.563,0,0,1,1.385-1.529,2.5,2.5,0,0,1,2.045,0,2.566,2.566,0,0,1,1.383,1.529h3.982a2.585,2.585,0,0,1,1.385-1.526,2.516,2.516,0,0,1,1.023-.217A2.527,2.527,0,0,1,22747.973-6109.062Zm-2.717-3.462h3.25l-1.391-1.947h-1.859Zm-1.006-3.563h.451l-.119-.4h-.254Zm-5.191,6.5v-1.247h-1.227v-1.615h1.227v-1.247h1.59v1.247h1.229v1.615h-1.229v1.247Z"
            transform="translate(-22728.865 6124.108)"
            fill="#b2292e"
          />
        </g>
      </g>
    </svg>
  ),
  Abnormal: (
    <svg
      id="orage"
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 27 27"
    >
      <g
        id="Rectangle_8798"
        data-name="Rectangle 8798"
        fill="#fff"
        stroke="#d86018"
        strokeWidth="1"
      >
        <rect width="27" height="27" rx="13.5" stroke="none" />
        <rect x="0.5" y="0.5" width="26" height="26" rx="13" fill="none" />
      </g>
      <g id="noun-warning-18974" transform="translate(6.577 6)">
        <path
          id="Path_106100"
          data-name="Path 106100"
          d="M132.289,73.619l-6.046,10.89c-.5.917-.289,1.794,1.07,1.794h11.511c1.363,0,1.573-.877,1.07-1.794l-6.171-10.861a.762.762,0,0,0-.692-.511.8.8,0,0,0-.742.482Zm-.016,3.486h1.415v4.952h-1.415Zm0,6.013h1.415v1.415h-1.415Z"
          transform="translate(-125.995 -73.136)"
          fill="#d86018"
        />
      </g>
    </svg>
  ),
  Moderate: (
    <svg
      id="yelllow"
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 27 27"
    >
      <g
        id="Rectangle_8798"
        data-name="Rectangle 8798"
        fill="#fff"
        stroke="#f1c400"
        strokeWidth="1"
      >
        <rect width="27" height="27" rx="13.5" stroke="none" />
        <rect x="0.5" y="0.5" width="26" height="26" rx="13" fill="none" />
      </g>
      <path
        id="Path_106101"
        data-name="Path 106101"
        d="M165.6,28a.4.4,0,0,0-.4.4V43.244a.4.4,0,0,0,.791,0V28.4A.4.4,0,0,0,165.6,28Zm11.114,1.582a8.784,8.784,0,0,0-3.4.822,7.5,7.5,0,0,1-6.923-.55V37a7.372,7.372,0,0,0,6.923.55c3.365-1.409,4.945-.544,4.945-.544V29.861A3.337,3.337,0,0,0,176.711,29.582Z"
        transform="translate(-157.802 -22.522)"
        fill="#f1c400"
      />
    </svg>
  ),
  Healthy: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="27"
      viewBox="0 0 28 27"
    >
      <g id="green_icon" transform="translate(0.252)">
        <g
          id="Rectangle_8798"
          data-name="Rectangle 8798"
          transform="translate(-0.252)"
          fill="#fff"
          stroke="#6abf4a"
          strokeWidth="1"
        >
          <rect width="28" height="27" rx="13.5" stroke="none" />
          <rect x="0.5" y="0.5" width="27" height="26" rx="13" fill="none" />
        </g>
        <path
          id="noun-low-battery-797382"
          d="M84.292,115.009H83.54v-2.257a.711.711,0,0,0-.752-.752H70.752a.711.711,0,0,0-.752.752v7.522a.711.711,0,0,0,.752.752H82.788a.711.711,0,0,0,.752-.752v-2.257h.752a.711.711,0,0,0,.752-.752v-1.5A.711.711,0,0,0,84.292,115.009Zm-10.531,4.212a.324.324,0,0,1-.3.3H71.805a.324.324,0,0,1-.3-.3v-5.416a.324.324,0,0,1,.3-.3H73.46a.324.324,0,0,1,.3.3Z"
          transform="translate(-63.775 -103)"
          fill="#6abf4a"
        />
      </g>
    </svg>
  ),
  not_measured: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 27 27"
    >
      <g id="gray_icon" transform="translate(-0.108)">
        <g
          id="Rectangle_8798"
          data-name="Rectangle 8798"
          transform="translate(0.108)"
          fill="#fff"
          stroke="#a2aaa4"
          strokeWidth="1"
        >
          <rect width="27" height="27" rx="13.5" stroke="none" />
          <rect x="0.5" y="0.5" width="26" height="26" rx="13" fill="none" />
        </g>
        <path
          id="Path_106102"
          data-name="Path 106102"
          d="M142.143,30.083a.259.259,0,0,0-.127-.2l-6.286-3.629a.259.259,0,0,0-.259,0l-6.286,3.629a.259.259,0,0,0-.13.226v7.258a.259.259,0,0,0,.13.226l6.286,3.629a.259.259,0,0,0,.259,0l6.286-3.629a.259.259,0,0,0,.13-.226V30.1s0,0,0-.021Zm-6.8,10.459-5.767-3.331V30.551l5.767,3.331Zm6.286-3.331-5.767,3.331V33.882l5.767-3.331Z"
          transform="translate(52.479 147.727) rotate(-120)"
          fill="#a2aaa4"
        />
      </g>
    </svg>
  ),
};

export const CategoryTableContent = ({
  logoImage,
  heading,
  data,
  type,
  onChangeSelectedIds,
  handleCategoryClick,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableContent, setTableContent] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    let retData = [];
    if (data && data.length > 0) {
      retData = data.map((item) => {
        return { ...item, isChecked: false };
      });
    }
    setTableContent(retData);
  }, [data]);

  const handleCheckboxClick = (index) => {
    tableContent[index].isChecked = !tableContent[index].isChecked;
    const selectedItem = tableContent
      .filter((element) => element.isChecked)
      .map((elem) => elem.id);
    setSelectedIds(_.cloneDeep(selectedItem));
    setTableContent(_.cloneDeep(tableContent));
  };

  const handleSelectAllCheck = (event) => {
    const selectedItem = data
      .map((item) => {
        return { ...item, isChecked: event.target.checked };
      })
      .filter((element) => element.isChecked)
      .map((elem) => elem.id);
    setSelectedIds(_.cloneDeep(selectedItem));
    setTableContent(
      data.map((item) => {
        return { ...item, isChecked: event.target.checked };
      })
    );
  };

  const handleHeaderButtonClick = () => {
    const selectedItem = tableContent
      .filter((element) => element.isChecked)
      .map((elem) => elem.id);
    setSelectedIds(_.cloneDeep(selectedItem));
    return selectedItem;
  };

  const renderTableContent = (tableData) => {
    return tableData.map((item, index) => {
      return (
        <tr
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/exception-details/${item.id}`);
          }}
          className="pointer"
        >
          <td>
            <div className="checkbox">
              <label htmlFor="default-checkbox">
                <input
                  type="checkbox"
                  id="default-checkbox"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckboxClick(index);
                  }}
                  checked={item.isChecked}
                />
                <em className="input-helper"></em>
              </label>
            </div>
          </td>
          <td title={item.event_template}>{item.event_template}</td>
          <td title={item.event_description}>{item.event_description}</td>
          <td className="shadowLine">
            <span className="severity">
              {severity_logo[item.event_sever]
                ? severity_logo[item.event_sever]
                : severity_logo.not_measured}
            </span>
          </td>
          <td>{item.event_start_time}</td>
          <td>{item.event_end_time}</td>
          <td>{item.event_total_count}</td>
          {/* <td>############</td> */}
        </tr>
      );
    });
  };
  return (
    <>
      <div
        className="exception-popup-box"
        id={heading === "Pi Exceptions" ? "pIexception" : ""}
      >
        <div className="exception-popup-heading d-flex justify-content-between">
          <h6 className="d-flex align-items-center">
            <img
              src={window.location.origin + `/images/${logoImage}.svg`}
              alt="calendar"
            />
            {heading}
          </h6>
          {data && data.length > 0 && (
            <ul className="icon-action d-flex align-items-center">
              <li>
                <a
                  href="#"
                  onClick={() => {
                    const isSeleced = handleHeaderButtonClick();
                    if (isSeleced.length > 0) {
                      onChangeSelectedIds(selectedIds);
                      dispatch(setShowDateModal({ type, status: true }));
                      handleCategoryClick("S1");
                    }
                  }}
                >
                  <img
                    src={window.location.origin + "/images/currect.svg"}
                    alt="equipment-detail"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    const isSeleced = handleHeaderButtonClick();
                    if (isSeleced.length > 0) {
                      onChangeSelectedIds(selectedIds);
                      dispatch(setShowDateModal({ type, status: true }));
                      handleCategoryClick("S2");
                    }
                  }}
                >
                  <img
                    src={window.location.origin + "/images/close.svg"}
                    alt="equipment-detail"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    const isSeleced = handleHeaderButtonClick();
                    if (isSeleced.length > 0) {
                      onChangeSelectedIds(selectedIds);
                      dispatch(setShowDateModal({ type, status: true }));
                      handleCategoryClick("S3");
                    }
                  }}
                >
                  <img
                    src={
                      window.location.origin + "/images/equipment-detail.svg"
                    }
                    alt="equipment-detail"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    const isSeleced = handleHeaderButtonClick();
                    if (isSeleced.length > 0) {
                      onChangeSelectedIds(selectedIds);
                      dispatch(setShowDateModal({ type, status: true }));
                      handleCategoryClick("S2");
                    }
                  }}
                >
                  <img
                    src={window.location.origin + "/images/snooze.svg"}
                    alt="equipment-detail"
                  />
                </a>
              </li>
            </ul>
          )}
        </div>
        {data && data.length > 0 ? (
          <div className="table-fixed-column-outter">
            <div className="table-fixed-column-inner">
              <table className="table-fixed-column table-fixed-column table table-bordered">
                <thead>
                  <tr>
                    <th>
                      <div className="checkbox">
                        <label htmlFor="default-checkbox">
                          <input
                            type="checkbox"
                            id="default-checkbox"
                            onChange={handleSelectAllCheck}
                          />
                          <em className="input-helper"></em>
                        </label>
                      </div>
                    </th>
                    <th>Compartment</th>
                    <th>Description</th>
                    <th className="shadowLine">Severity</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Count</th>
                    {/* <th>Recommendation</th> */}
                  </tr>
                </thead>
                <tbody>
                  {tableContent.length > 0 ? (
                    renderTableContent(tableContent)
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ width: "100%" }}>
                        No Data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="emptyText">no data</p>
        )}
      </div>
    </>
  );
};
