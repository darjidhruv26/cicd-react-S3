import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { DatePickerModal } from "../DatePickerModal";
import { useDispatch, useSelector } from "react-redux";
import { setShowDateModal } from "../../../redux/summary-table/summaryTableSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API from "../../../API/API";
import { fetchExceptionSummary } from "../../../redux/summaryV1-table/summaryV1TableThunk";
import Popup from "reactjs-popup";
import { fetchExceptionDetails, fetchRemsConmonWatchlistValues } from "../../../redux/exception-details/exceptionDetailsThunks";
import moment from "moment";

const StatusMapper = {
  'S1': 'Open',
  'S2': 'Snooze / Monitor',
  'S3': 'Close',
  'S4': 'Active',
  'S5': 'Complete',
}

const disabledStatus = ['S4', 'S5'];

const rowMapper = {
  'severe': 'danger',
  'abnormal': 'warning',
  'moderate': 'secondary',
  'other': 'success',
}
const MySwal = withReactContent(Swal);

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

const statusCode = {
  S1: "Accepted",
  S2: "Snooze",
  S3: "Monitor",
  S4: "Rejected",
};
const SeverityMapper = [{'key': 'Critical', 'value': 'Severe'}, {'key': 'Major', 'value': 'Abnormal'}, {'key': 'Minor', 'value': 'Moderate'}]

export const CategorywiseTables = ({ logoImage, heading, data, type, showColoredRow, handleExceptionClick, handleExceptionHover, hoverElement, activeExcption, hideTillDate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalShowStatus = useSelector(
    (state) => state.summaryTableReducer.showDateModal
  );

  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  );
  let exceptionStatusValues = useSelector(state => state.exceptionDetailsReducer.exceptionStatusValues);

  const showPiVision = type === "pi-exception-table" || type === "custom-table" ? true : false
  const [tableContent, setTableContent] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [localData, setLocalData] = useState([]);
  const [clickedCategogy, setClickedCategory] = useState("");
  const [sortArrow, setSortArrow] = useState({
    equipmentIdArrow: 0,
    descriptionArrow: 0,
    severityArrow: 0,
    startDateArrow: 0,
    piVisionArrow: 0,
    countArrow: 0,
    currentSite: 0,
    till_date: 0,
  });
  const [inputValue, setInputValue] = useState({
    equipmentId: "",
    event_name: "",
    event_severity: "",
    event_start_time: "",
    event_total_count: "",
    site_name_current: "",
    exceptiontype: "",
    exception_status: "",
  });

  useEffect(() => {
    let retData = [];
    if (data && data.length > 0) {
      retData = data.map((item) => {
        return { ...item, till_date:  item?.till_date ? moment(item.till_date).format("YYYY/MM/DD") : '-', event_start_time: moment.utc(item.event_start_time).local().format("YYYY/MM/DD hh:mm a") };
      });
    }
    setLocalData(retData);
  }, [data]);

  useEffect(() => {
    let retData = [];
    if (localData && localData.length > 0) {
      retData = localData.map((item) => {
        return { ...item, isChecked: false };
      });
    }
    setTableContent(retData);
  }, [localData]);


  function sortData(localData, sortby, fieldname) {
    if (
      [
        "equipmentId",
        "event_name",
        "event_severity",
        "event_start_time",
        "event_total_count",
        "pivision_url",
        "exceptiontype",
        "till_date"
      ].includes(fieldname)
    ) {
      if (sortby === 0) {
        localData.sort((a, b) => {
          a =
            fieldname !== "equipmentId"
              ? a[fieldname] &&
                a &&
                b &&
                (Number.isNaN(a[fieldname]) || Number.isNaN(b[fieldname]))
                ? a[fieldname].toString().toLowerCase()
                : a[fieldname]
              : a["serial_number"].toString().toLowerCase() +
              "-" +
              a["asset_name"].toString().toLowerCase();
          b =
            fieldname !== "equipmentId"
              ? b[fieldname] &&
                a &&
                b &&
                (Number.isNaN(a[fieldname]) || Number.isNaN(b[fieldname]))
                ? b[fieldname].toString().toLowerCase()
                : b[fieldname]
              : b["serial_number"].toString().toLowerCase() +
              "-" +
              b["asset_name"].toString().toLowerCase();
          return a === b ? 0 : a > b ? 1 : -1;
        });
        return localData;
      } else {
        localData.sort((a, b) => {
          a =
            fieldname !== "equipmentId"
              ? a[fieldname] &&
                a &&
                b &&
                (Number.isNaN(a[fieldname]) || Number.isNaN(b[fieldname]))
                ? a[fieldname].toString().toLowerCase()
                : a[fieldname]
              : a["serial_number"].toString().toLowerCase() +
              "-" +
              a["asset_name"].toString().toLowerCase();
          b =
            fieldname !== "equipmentId"
              ? b[fieldname] &&
                a &&
                b &&
                (Number.isNaN(a[fieldname]) || Number.isNaN(b[fieldname]))
                ? b[fieldname].toString().toLowerCase()
                : b[fieldname]
              : b["serial_number"].toString().toLowerCase() +
              "-" +
              b["asset_name"].toString().toLowerCase();
          return b === a ? 0 : b > a ? 1 : -1;
        });
        return localData;
      }
    }
    return localData;
  }

  const handleInputChange = useCallback(
    (input) => {
      let tableItem = _.cloneDeep(localData);
      for (const [key, value] of Object.entries(input)) {
        if (value.length > 0) {
          tableItem = tableItem.filter((item) => {
            if (key === "equipmentId") {
              return (
                item["serial_number"] &&
                item["asset_name"] &&
                (item["serial_number"] + "-" + item["asset_name"])
                  .toString()
                  .toLowerCase()
                  .includes(value.toString().toLowerCase())
              );
            } else {
              return (
                item[key] &&
                item[key]
                  .toString()
                  .toLowerCase()
                  .includes(value.toString().toLowerCase())
              );
            }
          });
        }
      }
      return tableItem;
    },
    [localData]
  );

  const handleCheckboxClick = (index) => {
    tableContent[index].isChecked = !tableContent[index].isChecked;
    setTableContent(_.cloneDeep(tableContent));
  };

  const handleSelectAllCheck = (event) => {
    setTableContent(
      localData.map((item) => {
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

  const handleModalClick = (status) => {
    dispatch(setShowDateModal({ type, status }));
  };

  const handleSubmitForm = (localData) => {
    dispatch(setShowDateModal({ type, status: false }));
    const body = {
      exception_ids:
        localData?.exceptionId ? [localData.exceptionId] : selectedIds,
      status: clickedCategogy,
      reason_code: localData?.reasonCode || '',
      custom_reason_code: localData?.otherReasonCode ? localData.otherReasonCode : null,
      till_date: localData?.selectedDate ? localData.selectedDate : null,
      user_id:
        userPreferences && userPreferences.user_id
          ? userPreferences.user_id
          : null,
    };

    body.exception_ids?.length && API.put(`/bulk-exception-status-change`, body)
    .then((res) => {
      MySwal.fire("success", res.data);
      dispatch(fetchExceptionSummary({
        selected_severity: userPreferences?.selected_severity
      }));
    })
    .catch((e) => {
      console.log(e);
    });
    localData?.rems_event_id && localData?.exceptionId >= 0 && 
      API.post("link-rems-event", {
        exception_id: localData.exceptionId,
        rems_event_id: localData.rems_event_id
      }).catch(error=> console.log(error));
      
  };

  const renderRow = (item, index) => {
    const rowColor = item.event_severity.toLowerCase();
    return (
      <Popup
        trigger={
          <tr
          key={index}
          onClick = {(e) => {
            e.stopPropagation();
            handleExceptionClick && handleExceptionClick(item);
          }}
          className={`${!showColoredRow && item.exception_status === null ? "row-highlight" : ""} ${showColoredRow && item?.id !== activeExcption?.id && "table-" + rowMapper[rowColor]} ${showColoredRow && item?.id === activeExcption?.id && "color-" + rowMapper[rowColor]} `}
        >
          <td style={{ textAlign: "left" }}>
            <div className="checkbox">
              <label htmlFor="default-checkbox">
                <input
                  type="checkbox"
                  id="default-checkbox"
                  onChange={() => {
                    handleCheckboxClick(index);
                  }}
                  checked={item.isChecked}
                />
                <em className="input-helper"></em>
              </label>
            </div>
          </td>
          <td>{item.fleet_type}</td>
          <td>{item.model}</td>
          {showPiVision ? <td>{item.site_name_current}</td> : null}
          <td>{item.asset_name + "-" + item.serial_number}</td>
          <td>
            <div style={{cursor: 'pointer'}}  onClick={() => navigate(`/exception-details/${item.id}`,{ state: {redirect_to: '/summary-v1'}})}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </div>
          </td>
          <td className="description-row" title={item.event_name}>
            {item.event_name}
          </td>
          <td className="status-tab" style={{textAlign: 'center'}}>
            <ul className="icon-action d-inline-flex align-items-center ml-0">
              <li className={item.exception_status === "S1" ? "active" : ""} style={{borderWidth: 0}}>
                <a
                  onClick={() => {
                    dispatch(fetchRemsConmonWatchlistValues({ assetId: item.asset_name, siteCode: item.site_id_current }));
                    dispatch(setShowDateModal({ type, status: true, exceptionId: item.id, category: "S1" }));
                    setClickedCategory("S1");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.243"
                    height="23.056"
                    viewBox="0 0 30.243 23.056"
                  >
                    <path
                      id="check"
                      d="M13.021,23.78,5.851,16.611,3.41,19.035l9.611,9.611L33.653,8.014,31.228,5.59Z"
                      transform="translate(-3.41 -5.59)"
                      fill={
                        item.exception_status === "S1" ? "#26b245" : "#418fde"
                      }
                    />
                  </svg>
                </a>
              </li>
              <li className={item.exception_status === "S2" ? "active" : ""} style={{marginRight: 0, borderWidth: 0}}>
                <a
                  onClick={() => {
                    dispatch(fetchRemsConmonWatchlistValues({ assetId: item.asset_name, siteCode: item.site_id_current }));
                    dispatch(setShowDateModal({ type, status: true, exceptionId: item.id, category: "S2"  }));
                    setClickedCategory("S2");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 29.973 30.182"
                  >
                    <path
                      id="snooze"
                      d="M10.812,4.153,8.894,1.86,2,7.63,3.933,9.923l6.879-5.77ZM31.973,7.645,25.079,1.86,23.146,4.153,30.04,9.938ZM16.987,5.067A13.488,13.488,0,1,0,30.474,18.555,13.489,13.489,0,0,0,16.987,5.067Zm0,23.978a10.49,10.49,0,1,1,10.491-10.49A10.483,10.483,0,0,1,16.987,29.045Zm-4.5-13.488h5.44l-5.44,6.294v2.7h8.992v-3h-5.44l5.44-6.294v-2.7H12.491Z"
                      transform="translate(-2 -1.86)"
                      fill="#d86018"
                    />
                  </svg>
                </a>
              </li>
              <li className={item.exception_status === "S3" ? "active" : ""} style={{marginRight: 0, maxHeight: 20, marginLeft: 12}}>
                <a
                  onClick={() => {
                    setClickedCategory("S3");
                    dispatch(setShowDateModal({ type, status: true, exceptionId: item.id, category: "S3"  }));
                  }}
                >
                  <i className="fa fa-power-off fa-lg" style={{color: item.exception_status === "S3" ? 'black' :'grey'}} aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </td>
          {!hideTillDate && <td style={{ textAlign: "center" }}>{item.till_date}</td>}
          <td style={{width: '125px'}}>
            <span className="severity">
              {severity_logo[item.event_severity]
                ? severity_logo[item.event_severity]
                : severity_logo.not_measured}
            </span>
          </td>
          <td>{item.event_start_time}</td>
          {item?.exceptiontype && <td>{item.exceptiontype}</td>}
          {showPiVision && <td style={{ textAlign: "center" }}>{item.pivision_url ? <i className="fa fa-check-circle text-success"></i> : <i className="fa fa-times-circle text-danger"></i>}</td>}
          <td style={{ textAlign: "center" }}>{item.has_rems_event ? <i className="fa fa-check-circle text-success"></i> : <i className="fa fa-times-circle text-danger"></i>}</td>
          <td style={{ textAlign: "center" }}>{item.event_total_count}</td>
        </tr>
          
        
        }
        on="hover"
        arrow={false}
        keepTooltipInside
        onOpen={() => handleExceptionHover(item)}
        offsetY={-10}
        contentStyle={{ width: '50%' }}
        key={index}
      >
        <div className="pop-contentbox" style={{ width: "auto" }}>
          {hoverElement}
        </div>
      </Popup>

    )
  };

  const renderTableContent = (tableData) => {
    return tableData.map((item, index) => {
      return renderRow(item, index)
    });
  };

  return (
    <>
      <div
        className="categorywise-tables show-scroller"
        id={heading === "Pi Exceptions" ? "pIexception" : ""}
      >
        <div className="exception-popup-heading d-flex">
          <h6 className="d-flex align-items-center">
            <img
              src={window.location.origin + `/images/${logoImage}.svg`}
              alt="calendar"
            />
            {heading}
          </h6>
          <ul className="icon-action d-flex align-items-center ml-4">
            <li>
              <a
                onClick={() => {
                  const isSeleced = handleHeaderButtonClick();
                  if (isSeleced.length > 0) {
                    dispatch(setShowDateModal({ type, status: true }));
                    setClickedCategory("S1");
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
                onClick={() => {
                  const isSeleced = handleHeaderButtonClick();
                  if (isSeleced.length > 0) {
                    dispatch(setShowDateModal({ type, status: true }));
                    setClickedCategory("S2");
                  }
                }}
              >
                <img
                  src={window.location.origin + "/images/close.svg"}
                  alt="equipment-detail"
                />
              </a>
            </li>
          </ul>
        </div>
        <div className="responsive-table data-table-div">
          <table className="table table-fixed table-bordered no-footer table-hover">
            <thead>
            <tr>
                <th style={{ textAlign: "left" }}>
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
                <th>Equipment Type</th>
                <th>Model</th>
                {showPiVision && <th>
                  Current Site
                  <br />
                  <input
                    type="text"
                    name="name"
                    className="textbox"
                    value={inputValue.site_name_current}
                    onChange={(e) => {
                      const retData = handleInputChange({
                        ...inputValue,
                        site_name_current: e.target.value,
                      });
                      setInputValue({
                        ...inputValue,
                        site_name_current: e.target.value,
                      });
                      setTableContent(retData);
                    }}
                  />
                  <span
                    className={`sorting ${sortArrow.currentSite === 0 ? "up" : "down"
                      }`}
                    onClick={() => {
                      setTableContent(
                        sortData(
                          _.cloneDeep(localData),
                          sortArrow.currentSite,
                          "pivision_url"
                        )
                      );
                      setSortArrow({ ...sortArrow, currentSite: sortArrow.currentSite === 0 ? 1 : 0 });
                    }}
                  ></span>
                </th>}
                <th>
                  Equipment Id
                  <br />
                  <input
                    type="text"
                    name="name"
                    className="textbox"
                    value={inputValue.equipmentId}
                    onChange={(e) => {
                      const retData = handleInputChange({
                        ...inputValue,
                        equipmentId: e.target.value,
                      });
                      setInputValue({
                        ...inputValue,
                        equipmentId: e.target.value,
                      });
                      setTableContent(retData);
                    }}
                  />
                  <span
                    className={`sorting ${sortArrow.equipmentIdArrow === 0 ? "up" : "down"
                      }`}
                    onClick={() => {
                      setTableContent(
                        sortData(
                          _.cloneDeep(localData),
                          sortArrow.equipmentIdArrow,
                          "equipmentId"
                        )
                      );
                      setSortArrow({ ...sortArrow, equipmentIdArrow: sortArrow.equipmentIdArrow === 0 ? 1 : 0 });
                    }}
                  ></span>
                </th>
                <th>Link</th>
                <th style={{minWidth: '200px'}}>
                  Description
                  <br />
                  <input
                    type="text"
                    name="name"
                    className="textbox"
                    value={inputValue.event_name}
                    onChange={(e) => {
                      const retData = handleInputChange({
                        ...inputValue,
                        event_name: e.target.value,
                      });
                      setInputValue({
                        ...inputValue,
                        event_name: e.target.value,
                      });
                      setTableContent(retData);
                    }}
                  />
                  <span
                    className={`sorting ${sortArrow.descriptionArrow === 0 ? "up" : "down"
                      }`}
                    onClick={() => {
                      setTableContent(
                        sortData(
                          _.cloneDeep(localData),
                          sortArrow.descriptionArrow,
                          "event_name"
                        )
                      );
                      setSortArrow({ ...sortArrow, descriptionArrow: sortArrow.descriptionArrow === 0 ? 1 :0 });
                    }}
                  ></span>
                </th>
                <th style={{ textAlign: "center" }}>Status
                  <br />
                  <div className="custom-select">
                    <select
                      value={inputValue.exception_status}
                      onChange={(e) => {
                        const retData = handleInputChange({
                          ...inputValue,
                          exception_status: e.target.value,
                        });
                        setInputValue({
                          ...inputValue,
                          exception_status: e.target.value,
                        });
                        setTableContent(retData);
                      }}
                    >
                      <option></option>
                      {exceptionStatusValues?.map(status => <option value={status.code} key={status.code} disabled={disabledStatus.includes(status?.code) ? true : false}>{StatusMapper[status.code]}</option>)}
                    </select>
                  </div>
                </th>
                {!hideTillDate && <th style={{ textAlign: "center", minWidth: '100px' }}>
                <span
                    className={`sorting ${sortArrow.till_date === 0 ? "up" : "down"
                      }`}
                    onClick={() => {
                      setTableContent(
                        sortData(
                          _.cloneDeep(localData),
                          sortArrow.till_date,
                          "till_date"
                        )
                      );
                      setSortArrow({ ...sortArrow, till_date: sortArrow.till_date === 0 ? 1 : 0 });
                    }}
                  ></span>
                  Snoozed Until</th>}
                <th style={{minWidth: '150px'}}>
                  Severity
                  <br />
                  <div className="custom-select">
                    <select
                      value={inputValue.event_severity}
                      onChange={(e) => {
                        const retData = handleInputChange({
                          ...inputValue,
                          event_severity: e.target.value,
                        });
                        setInputValue({
                          ...inputValue,
                          event_severity: e.target.value,
                        });
                        setTableContent(retData);
                      }}
                    >
                      <option></option>
                      {SeverityMapper?.map(severity => <option value={severity.value} key={severity.value}>{severity.value}</option>)}
                    </select>
                  </div>
                  <span
                    className={`sorting ${sortArrow.severityArrow === 0 ? "up" : "down"
                      }`}
                    onClick={() => {
                      setTableContent(
                        sortData(
                          _.cloneDeep(localData),
                          sortArrow.severityArrow,
                          "event_severity"
                        )
                      );
                      setSortArrow({ ...sortArrow, severityArrow: sortArrow.severityArrow === 0 ? 1 : 0 });
                    }}
                  ></span>
                </th>
                <th>
                  Start Date
                  <br />
                  <input
                    type="text"
                    name="name"
                    className="textbox"
                    value={inputValue.event_start_time}
                    onChange={(e) => {
                      const retData = handleInputChange({
                        ...inputValue,
                        event_start_time: e.target.value,
                      });
                      setInputValue({
                        ...inputValue,
                        event_start_time: e.target.value,
                      });
                      setTableContent(retData);
                    }}
                  />
                  <span
                    className={`sorting ${sortArrow.startDateArrow === 0 ? "up" : "down"
                      }`}
                    onClick={() => {
                      setTableContent(
                        sortData(
                          _.cloneDeep(localData),
                          sortArrow.startDateArrow,
                          "event_start_time"
                        )
                      );
                      setSortArrow({ ...sortArrow, startDateArrow: sortArrow.startDateArrow === 0 ? 1 : 0 });
                    }}
                  ></span>
                </th>
                <th>Exception Type
                  <br />
                  <input
                    type="text"
                    name="name"
                    className="textbox"
                    value={inputValue.exceptiontype}
                    onChange={(e) => {
                      const retData = handleInputChange({
                        ...inputValue,
                        exceptiontype: e.target.value,
                      });
                      setInputValue({
                        ...inputValue,
                        exceptiontype: e.target.value,
                      });
                      setTableContent(retData);
                    }}
                  />
                  <span
                    className={`sorting ${sortArrow.descriptionArrow === 0 ? "up" : "down"
                      }`}
                    onClick={() => {
                      setTableContent(
                        sortData(
                          _.cloneDeep(localData),
                          sortArrow.descriptionArrow,
                          "exceptiontype"
                        )
                      );
                      setSortArrow({ ...sortArrow, descriptionArrow: sortArrow.descriptionArrow === 0 ? 1 : 0 });
                    }}
                  ></span>
                </th>
                {showPiVision && <th style={{minWidth: '90px'}}>
                  Pi Vision
                  <br />
                  <span
                    className={`sorting ${sortArrow.piVisionArrow === 0 ? "up" : "down"
                      }`}
                    onClick={() => {
                      setTableContent(
                        sortData(
                          _.cloneDeep(localData),
                          sortArrow.piVisionArrow,
                          "pivision_url"
                        )
                      );
                      setSortArrow({ ...sortArrow, piVisionArrow: sortArrow.piVisionArrow === 0 ? 1 : 0 });
                    }}
                  ></span>
                </th>}
                <th style={{textAlign: 'center', minWidth: '80px'}}>
                  Rems Event
                  <br />
                </th>
                <th style={{minWidth: '80px'}}>
                  Count
                  <br />
                  <input
                    type="text"
                    name="name"
                    className="textbox"
                    value={inputValue.event_total_count}
                    onChange={(e) => {
                      const retData = handleInputChange({
                        ...inputValue,
                        event_total_count: e.target.value,
                      });
                      setInputValue({
                        ...inputValue,
                        event_total_count: e.target.value,
                      });
                      setTableContent(retData);
                    }}
                  />
                  <span
                    className={`sorting ${sortArrow.countArrow === 0 ? "up" : "down"
                      }`}
                    onClick={() => {
                      setTableContent(
                        sortData(
                          _.cloneDeep(localData),
                          sortArrow.countArrow,
                          "event_total_count"
                        )
                      );
                      setSortArrow({ ...sortArrow, countArrow: sortArrow.countArrow === 0 ? 1 : 0 });
                    }}
                  ></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableContent.length > 0 ? (
                renderTableContent(tableContent)
              ) : (
                <tr>
                  <td colSpan="13">No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DatePickerModal
        setShowModal={handleModalClick}
        showModal={modalShowStatus}
        onSubmit={handleSubmitForm}
        type={type}
      />
    </>
  );
};
