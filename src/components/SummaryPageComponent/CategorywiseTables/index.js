import { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import "./CategorywiseTables.scss";
import DatePicker from "react-datepicker";
import { DatePickerModal } from "../DatePickerModal";
import { useDispatch, useSelector } from "react-redux";
import { setShowDateModal } from "../../../redux/summary-table/summaryTableSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API from "../../../API/API";
import {
  fetchExceptionSummary,
  fetchHistoryExceptionSummary,
  fetchPiExceptionHistorySummary,
} from "../../../redux/summary-table/summaryTableThunk";
import { fetchRemsConmonWatchlistValues } from "../../../redux/exception-details/exceptionDetailsThunks";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
const SeverityMapper = [
  { key: "Critical", value: "Severe" },
  { key: "Major", value: "Abnormal" },
  // { key: "Minor", value: "Moderate" },
];

const serverityInversionMapper = {
  Severe: "Critical",
  Abnormal: "Major",
  Moderate: "Minor",
};

const categoryFilterIds = {
  active_event_pi_exception: "active_event_filter",
  pi_exception_closed_history_summary: "pi_exception_filter",
  pi_exception_history_summary: "snoozed_filter",
  close_event_pi_exception: "closed_event_filter",
};

const StatusMapper = {
  S1: "Open",
  S2: "Snooze / Mon...",
  S3: "Close",
  S4: "Active",
  S5: "Complete",
};

const rowMapper = {
  severe: "danger",
  abnormal: "warning",
  moderate: "grey",
  other: "success",
};
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

export const sortData = (localData, sortby, fieldname) => {
  if (
    [
      "equipmentId",
      "event_name",
      "event_severity",
      "event_start_time",
      "event_total_count",
      "pivision_url",
      "till_date",
      "exception_status_reason_code",
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
};

export const CategorywiseTables = ({
  logoImage,
  heading,
  data,
  type,
  fullScreen,
  showColoredRow,
  handleExceptionClick,
  hideTillDate,
  hideActions,
  hideREMSEvent,
  hideEventStatus,
  hideIsTaco,
  hideClose,
  hideEquipmentType,
  hideEquipmentId,
  hideModel,
  hideSeverity,
  hideAnalyticStatus,
  hideOpen,
  hideSnooze,
  hideCompleted,
  showPiVision,
  hasMore,
  lastPage,
  next,
  dataLength,
  cat_id,
  infiniteScroll,
  statusCodes,
  searchParams,
  setSearchParams,
}) => {
  const dispatch = useDispatch();
  const modalShowStatus = useSelector(
    (state) => state.summaryTableReducer.showDateModal
  );

  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  );
  let exceptionStatusValues = useSelector(
    (state) => state.exceptionDetailsReducer.exceptionStatusValues
  );
  let exceptionReasonValues = useSelector(
    (state) => state.exceptionDetailsReducer.exceptionReasonValues
  );
  const [tableContent, setTableContent] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [clickedCategogy, setClickedCategory] = useState("");
  const [localData, setLocalData] = useState([]);

  const [sortArrow, setSortArrow] = useState({
    equipmentIdArrow: 0,
    descriptionArrow: 0,
    severityArrow: 0,
    startDateArrow: 0,
    piVisionArrow: 0,
    countArrow: 0,
    currentSite: 0,
    till_date: 0,
    exception_status_reason_code: 0,
    model: 0,
    fleet_type: 0,
  });
  const [inputValue, setInputValue] = useState({
    equipmentId: "",
    event_name: "",
    event_severity: "",
    event_start_time: "",
    date_range_start_date: "",
    date_range_end_date: "",
    event_total_count: "",
    site_name_current: "",
    exception_status_reason_code: "",
    exception_status: "",
    model: "",
    fleet_type: "",
  });
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const convertIntoIstFormat = (format_date) => {
    const dateObj = new Date(format_date + "T00:00:00");
    return dateObj;
  };
  // Take data from localStorage and bind the initial values to filters
  useEffect(() => {
    if (initialLoad) {
      _.map(categoryFilterIds, (key, value) => {
        const getFilter = JSON.parse(localStorage.getItem(key));
        if ((value === cat_id) && getFilter){
            setStartDate(getFilter.date_range_start_date ? convertIntoIstFormat(getFilter.date_range_start_date): "");
            setEndDate(getFilter.date_range_end_date ? convertIntoIstFormat(getFilter.date_range_end_date): "");
            setInputValue(getFilter);
            handleInputChange(getFilter);
        }
      });
      setInitialLoad(false);
    }
  });

  useEffect(() => {
    let retData = [];
    if (data && data.length > 0) {
      retData = data.map((item) => {
        const reasonValues = exceptionReasonValues?.filter(
          (reason) => reason.code === item?.exception_status_reason_code
        );
        return {
          ...item,
          till_date: item?.till_date
            ? moment(item.till_date).format("YYYY/MM/DD")
            : "—",
          event_start_time: moment
            .utc(item.event_start_time)
            .local()
            .format("YYYY/MM/DD hh:mm a"),
          exception_status_reason_code:
            reasonValues.length > 0 ? reasonValues[0].name : "—",
        };
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

  const handleModalClick = (status) => {
    dispatch(setShowDateModal({ type, status }));
  };

  const handleSubmitForm = useCallback(
    (localData) => {
      dispatch(setShowDateModal({ type, status: false }));
      const body = {
        exception_ids: localData?.exceptionId
          ? [localData.exceptionId]
          : selectedIds,
        status: clickedCategogy,
        reason_code: localData?.reasonCode || "",
        custom_reason_code: localData?.otherReasonCode
          ? localData.otherReasonCode
          : null,
        till_date: localData?.selectedDate ? localData.selectedDate : null,
        user_id:
          userPreferences && userPreferences.user_id
            ? userPreferences.user_id
            : null,
      };
      body.exception_ids?.length &&
        API.put(`/bulk-exception-status-change`, body)
          .then((res) => {
            MySwal.fire("success", res.data);
            dispatch(
              fetchExceptionSummary({
                selected_severity: userPreferences?.selected_severity,
              })
            );
            dispatch(
              fetchHistoryExceptionSummary({
                selected_severity: userPreferences?.selected_severity,
              })
            );
            dispatch(
              fetchPiExceptionHistorySummary({
                selected_severity: userPreferences?.selected_severity,
                selected_filter_group:
                  userPreferences?.selected_filter_group_id,
                page: lastPage ? lastPage : 0,
                perPage: 10,
                search_params: searchParams,
              })
            );
          })
          .catch((e) => {
            console.log(e);
          });

      localData?.rems_event_id &&
        localData?.exceptionId >= 0 &&
        API.post("link-rems-event", {
          exception_id: localData.exceptionId,
          rems_event_id: localData.rems_event_id,
        }).catch((error) => console.log(error));
    },
    [localData, selectedIds, clickedCategogy]
  );

  const renderRow = (item, index) => {
    const rowColor = item.event_severity.toLowerCase();
    return (
      <tr
        key={index}
        onClick={(e) => {
          e.stopPropagation();
          handleExceptionClick && handleExceptionClick(item);
        }}
        className={`${
          !showColoredRow && item.exception_status === null
            ? "table-warning"
            : ""
        } ${showColoredRow && "table-" + rowMapper[rowColor]} ${
          new Date(item.till_date) <= new Date(moment().format("YYYY/MM/DD")) &&
          item.exception_status !== "S3" &&
          "table-warning"
        }`}
        style={{ backgroundColor: "red !important" }}
      >
        {!hideActions && (
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
        )}
        {!hideEquipmentType && <td>{item.fleet_type}</td>}
        {!hideModel && <td>{item.model}</td>}
        <td>{item.site_name_current}</td>

        {!hideEquipmentId && (
          <td>{item.asset_name + "-" + item.serial_number}</td>
        )}
        <td className="description-row" title={item.event_name}>
          {item.event_name}
        </td>
        {!hideActions && (
          <td className="status-tab" style={{ textAlign: "center" }}>
            <ul className="icon-action d-inline-flex align-items-center ml-0">
              {!hideOpen && (
                <li
                  className={item.exception_status === "S1" ? "active" : ""}
                  style={{ maxHeight: 20, borderWidth: 0 }}
                >
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        fetchRemsConmonWatchlistValues({
                          assetId: item.asset_name,
                          siteCode: item.site_id_current,
                        })
                      );
                      dispatch(
                        setShowDateModal({
                          type,
                          status: true,
                          exceptionId: item.id,
                          category: "S1",
                        })
                      );
                      setClickedCategory("S1");
                    }}
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Open"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 28 24"
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
              )}
              {!hideSnooze && (
                <li
                  className={item.exception_status === "S2" ? "active" : ""}
                  style={{ marginRight: 0, maxHeight: 20, borderWidth: 0 }}
                >
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        setShowDateModal({
                          type,
                          status: true,
                          exceptionId: item.id,
                          category: "S2",
                        })
                      );
                      setClickedCategory("S2");
                    }}
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Snooze / Monitor"
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
              )}
              {!hideClose && (
                <li style={{ marginRight: 0, maxHeight: 20, marginLeft: 12 }}>
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                      setClickedCategory("S3");
                      dispatch(
                        setShowDateModal({
                          type,
                          status: true,
                          exceptionId: item.id,
                          category: "S3",
                        })
                      );
                    }}
                    data-toggle="tooltip"
                    data-placement="left"
                    title="Closed"
                  >
                    <i
                      className="fa fa-power-off fa-lg"
                      style={{
                        color:
                          item.exception_status === "S3" ? "black" : "grey",
                      }}
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
              )}
              {!hideCompleted && (
                <li style={{ marginRight: 0, maxHeight: 20, marginLeft: 12 }}>
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                      // setClickedCategory("S5");
                      // dispatch(setShowDateModal({ type, status: true, exceptionId: item.id, category: "S5" }));
                    }}
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Completed"
                  >
                    <i
                      className="fa fa-calendar-check-o fa-lg"
                      style={{
                        color:
                          item.exception_status === "S5" ? "black" : "grey",
                      }}
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
              )}
            </ul>
          </td>
        )}
        {type.includes("with-reason") && (
          <td style={{ textAlign: "center" }}>
            {item.exception_status_reason_code}
          </td>
        )}
        {!hideTillDate && (
          <td style={{ textAlign: "center" }}>{item.till_date}</td>
        )}
        {!hideSeverity && (
          <td style={{ width: "100px !important" }}>
            <span
              className="severity"
              title={serverityInversionMapper[item.event_severity]}
            >
              {severity_logo[item.event_severity]
                ? severity_logo[item.event_severity]
                : severity_logo.not_measured}
            </span>
          </td>
        )}
        <td>{item.event_start_time}</td>
        {showPiVision && (
          <td style={{ textAlign: "center" }}>
            {item.pivision_url ? (
              <i className="fa fa-check-circle text-success"></i>
            ) : (
              <i className="fa fa-times-circle text-danger"></i>
            )}
          </td>
        )}
        {!hideREMSEvent && (
          <td style={{ textAlign: "center" }}>
            {item.has_rems_event ? (
              <i className="fa fa-check-circle text-success"></i>
            ) : (
              <i className="fa fa-times-circle text-danger"></i>
            )}
          </td>
        )}
        {!hideEventStatus && (
          <td style={{ textAlign: "center" }}>
            {item.event_status === "Active" ? (
              <i className="fa fa-check-circle text-success"></i>
            ) : (
              <i className="fa fa-times-circle text-danger"></i>
            )}
          </td>
        )}
        {!hideIsTaco && (
          <td style={{ textAlign: "center" }}>
            {item.is_taco ? (
              <i className="fa fa-check-circle text-success"></i>
            ) : (
              <i className="fa fa-times-circle text-danger"></i>
            )}
          </td>
        )}
        {!hideAnalyticStatus && (
          <td style={{ textAlign: "center" }}>
            {item.analytic_status ? (
              <i className="fa fa-check-circle text-success"></i>
            ) : (
              <i className="fa fa-times-circle text-danger"></i>
            )}
          </td>
        )}
        <td style={{ textAlign: "center", width: "100px" }}>
          {item.event_total_count}
        </td>
      </tr>
    );
  };
  const renderTableContent = (tableData) => {
    return tableData.map((item, index) => {
      return showPiVision
        ? renderRow(item, index)
        : showPiVision
        ? null
        : renderRow(item, index);
    });
  };

  const changeHandler = (updatedInputValue) => {
    let updatedSearchParams = {};
    _.forEach(searchParams, (value, key) => {
      let search_value = updatedInputValue[key];
      let search_operator = value.operator;
      if (value.operator === "IN") {
        if (updatedInputValue[key] === "All") {
          search_operator = "IS NOT";
          search_value = "NULL";
        } else {
          search_value = updatedInputValue[key];
        }
      }
      updatedSearchParams[key] = {
        operator: search_operator,
        value: search_value,
        is_date: value.is_date,
      };
    });
    console.log(
      "==in changeHandler===",
      updatedInputValue,
      updatedSearchParams
    );
    setSearchParams(updatedSearchParams);
  };

  const debouncedChangeHandler = useCallback(
    _.debounce(changeHandler, 200),
    []
  );
  const handlerEventDates = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    handleInputChange({
      ...inputValue,
      date_range_start_date: start ? formatDate(start) : "",
      date_range_end_date: end ? formatDate(end) : "",
    });
    // if (!start && !end){
    //   handleInputChange({
    //     ...inputValue,
    //     date_range_start_date: "",
    //     date_range_end_date: ""
    // })};
  };

  const handleInputChange = (updatedInputValue) => {
    setInputValue(updatedInputValue);
    _.map(categoryFilterIds, (key, value) => {
      if (cat_id === value) {
        localStorage.setItem(
          key,
          JSON.stringify(updatedInputValue)
        );
      }
    });
    debouncedChangeHandler(updatedInputValue);
  };

  const summaryTable = () => {
    return (
      <table className="table table-fixed table-bordered no-footer table-hover">
        <thead>
          <tr>
            {!hideActions && (
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
            )}
            {!hideEquipmentType && (
              <th>
                Equipment Type
                <br />
                <input
                  type="text"
                  name="name"
                  className="textbox"
                  value={inputValue.fleet_type}
                  onChange={(e) => {
                    handleInputChange({
                      ...inputValue,
                      fleet_type: e.target.value,
                    });
                  }}
                />
                <span
                  className={`sorting ${
                    sortArrow.fleet_type === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    setTableContent(
                      sortData(
                        _.cloneDeep(localData),
                        sortArrow.fleet_type,
                        "pivision_url"
                      )
                    );
                    setSortArrow({
                      ...sortArrow,
                      fleet_type: sortArrow.fleet_type === 0 ? 1 : 0,
                    });
                  }}
                ></span>
              </th>
            )}
            {!hideModel && (
              <th>
                Model
                <br />
                <input
                  type="text"
                  name="name"
                  className="textbox"
                  value={inputValue.model}
                  onChange={(e) => {
                    handleInputChange({
                      ...inputValue,
                      model: e.target.value,
                    });
                  }}
                />
                <span
                  className={`sorting ${sortArrow.model === 0 ? "up" : "down"}`}
                  onClick={() => {
                    setTableContent(
                      sortData(
                        _.cloneDeep(localData),
                        sortArrow.model,
                        "pivision_url"
                      )
                    );
                    setSortArrow({
                      ...sortArrow,
                      model: sortArrow.model === 0 ? 1 : 0,
                    });
                  }}
                ></span>
              </th>
            )}
            <th>
              Current Site
              <br />
              <input
                type="text"
                name="name"
                className="textbox"
                value={inputValue.site_name_current}
                onChange={(e) => {
                  handleInputChange({
                    ...inputValue,
                    site_name_current: e.target.value,
                  });
                }}
              />
              <span
                className={`sorting ${
                  sortArrow.currentSite === 0 ? "up" : "down"
                }`}
                onClick={() => {
                  setTableContent(
                    sortData(
                      _.cloneDeep(localData),
                      sortArrow.currentSite,
                      "pivision_url"
                    )
                  );
                  setSortArrow({
                    ...sortArrow,
                    currentSite: sortArrow.currentSite === 0 ? 1 : 0,
                  });
                }}
              ></span>
            </th>
            {!hideEquipmentId && (
              <th>
                Equipment Id
                <br />
                <input
                  type="text"
                  name="name"
                  className="textbox"
                  value={inputValue.equipmentId}
                  onChange={(e) => {
                    handleInputChange({
                      ...inputValue,
                      equipmentId: e.target.value,
                    });
                  }}
                />
                <span
                  className={`sorting ${
                    sortArrow.equipmentIdArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    setTableContent(
                      sortData(
                        _.cloneDeep(localData),
                        sortArrow.equipmentIdArrow,
                        "equipmentId"
                      )
                    );
                    setSortArrow({
                      ...sortArrow,
                      equipmentIdArrow:
                        sortArrow.equipmentIdArrow === 0 ? 1 : 0,
                    });
                  }}
                ></span>
              </th>
            )}
            <th style={{ minWidth: "200px" }}>
              Description
              <br />
              <input
                type="text"
                name="name"
                className="textbox"
                value={inputValue.event_name}
                onChange={(e) => {
                  handleInputChange({
                    ...inputValue,
                    event_name: e.target.value,
                  });
                }}
              />
              <span
                className={`sorting ${
                  sortArrow.descriptionArrow === 0 ? "up" : "down"
                }`}
                onClick={() => {
                  setTableContent(
                    sortData(
                      _.cloneDeep(localData),
                      sortArrow.descriptionArrow,
                      "event_name"
                    )
                  );
                  setSortArrow({
                    ...sortArrow,
                    descriptionArrow: sortArrow.descriptionArrow === 0 ? 1 : 0,
                  });
                }}
              ></span>
            </th>
            {!hideActions && (
              <th style={{ textAlign: "center", minWidth: "155px" }}>
                Status
                <br />
                <div className="custom-select">
                  <select
                    value={inputValue.exception_status}
                    onChange={(e) => {
                      handleInputChange({
                        ...inputValue,
                        exception_status: e.target.value,
                      });
                    }}
                  >
                    <option>All</option>
                    {exceptionStatusValues?.map((status) =>
                      statusCodes && statusCodes.includes(status?.code) ? (
                        <option value={status.code} key={status.code}>
                          {StatusMapper[status.code]}{" "}
                        </option>
                      ) : null
                    )}
                  </select>
                </div>
              </th>
            )}
            {type.includes("with-reason") && (
              <th style={{ minWidth: "100px" }}>
                Reason
                <br />
                <input
                  type="text"
                  name="name"
                  className="textbox"
                  value={inputValue.exception_status_reason_code}
                  onChange={(e) => {
                    handleInputChange({
                      ...inputValue,
                      exception_status_reason_code: e.target.value,
                    });
                  }}
                />
                <span
                  className={`sorting ${
                    sortArrow.exception_status_reason_code === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    setTableContent(
                      sortData(
                        _.cloneDeep(localData),
                        sortArrow.exception_status_reason_code,
                        "exception_status_reason_code"
                      )
                    );
                    setSortArrow({
                      ...sortArrow,
                      exception_status_reason_code:
                        sortArrow.exception_status_reason_code === 0 ? 1 : 0,
                    });
                  }}
                ></span>
              </th>
            )}
            {!hideTillDate && (
              <th style={{ textAlign: "center", minWidth: "150px" }}>
                <span
                  className={`sorting ${
                    sortArrow.till_date === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    setTableContent(
                      sortData(
                        _.cloneDeep(localData),
                        sortArrow.till_date,
                        "till_date"
                      )
                    );
                    setSortArrow({
                      ...sortArrow,
                      till_date: sortArrow.till_date === 0 ? 1 : 0,
                    });
                  }}
                ></span>
                Snoozed Until
              </th>
            )}
            {!hideSeverity && (
              <th style={{ minWidth: "130px" }}>
                Severity
                <br />
                <div className="custom-select">
                  <select
                    value={inputValue.event_severity}
                    onChange={(e) => {
                      handleInputChange({
                        ...inputValue,
                        event_severity: e.target.value,
                      });
                    }}
                  >
                    <option>All</option>
                    {SeverityMapper?.map((severity) => (
                      <option value={severity.key} key={severity.value}>
                        {severity.key}
                      </option>
                    ))}
                  </select>
                </div>
                <span
                  className={`sorting ${
                    sortArrow.severityArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    setTableContent(
                      sortData(
                        _.cloneDeep(localData),
                        sortArrow.severityArrow,
                        "event_severity"
                      )
                    );
                    setSortArrow({
                      ...sortArrow,
                      severityArrow: sortArrow.severityArrow === 0 ? 1 : 0,
                    });
                  }}
                ></span>
              </th>
            )}
            <th className="datepickerbtn" style={{ minWidth: "120px" }}>
              Start Date
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                isClearable={startDate || endDate ? true : false}
                onChange={(dates) => {
                  handlerEventDates(dates);
                }}
                selectsRange={true}
                dateFormat={"yyyy/MM/dd"}
              />
              <span
                className={`sorting ${
                  sortArrow.startDateArrow === 0 ? "up" : "down"
                }`}
                onClick={() => {
                  setTableContent(
                    sortData(
                      _.cloneDeep(localData),
                      sortArrow.startDateArrow,
                      "event_start_time"
                    )
                  );
                  setSortArrow({
                    ...sortArrow,
                    startDateArrow: sortArrow.startDateArrow === 0 ? 1 : 0,
                  });
                }}
              ></span>
            </th>

            {/* <th style={{minWidth: '90px'}}>
                     Start Date
                     <br />
                     <input
                     type="text"
                     name="name"
                     className="textbox"
                     value={inputValue.event_start_time}
                     onChange={(e) => {
                       handleInputChange({
                         ...inputValue,
                         event_start_time: e.target.value,
                       });
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
                 </th> */}
            {showPiVision && (
              <th style={{ minWidth: "90px" }}>
                Pi Vision
                <br />
                <span
                  className={`sorting ${
                    sortArrow.piVisionArrow === 0 ? "up" : "down"
                  }`}
                  onClick={() => {
                    setTableContent(
                      sortData(
                        _.cloneDeep(localData),
                        sortArrow.piVisionArrow,
                        "pivision_url"
                      )
                    );
                    setSortArrow({
                      ...sortArrow,
                      piVisionArrow: sortArrow.piVisionArrow === 0 ? 1 : 0,
                    });
                  }}
                ></span>
              </th>
            )}
            {!hideREMSEvent && (
              <th style={{ textAlign: "center" }}>
                CMA REMS Watchlist Raised
                <br />
              </th>
            )}
            {!hideEventStatus && (
              <th style={{ textAlign: "center" }}>
                Event Status
                <br />
              </th>
            )}
            {!hideIsTaco && (
              <th style={{ textAlign: "center" }}>
                SAP Work Order Complete
                <br />
              </th>
            )}
            {!hideAnalyticStatus && (
              <th style={{ textAlign: "center" }}>
                PI Event Frame Closed
                <br />
              </th>
            )}

            <th style={{ minWidth: "160px" }}>
              PI Event Frame Count
              <br />
              <input
                type="text"
                name="name"
                className="textbox"
                value={inputValue.event_total_count}
                onChange={(e) => {
                  handleInputChange({
                    ...inputValue,
                    event_total_count: e.target.value,
                  });
                }}
              />
              <span
                className={`sorting ${
                  sortArrow.countArrow === 0 ? "up" : "down"
                }`}
                onClick={() => {
                  setTableContent(
                    sortData(
                      _.cloneDeep(localData),
                      sortArrow.countArrow,
                      "event_total_count"
                    )
                  );
                  setSortArrow({
                    ...sortArrow,
                    countArrow: sortArrow.countArrow === 0 ? 1 : 0,
                  });
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
    );
  };
  const infiniteScrolTable = () => {
    return (
      <InfiniteScroll
        dataLength={dataLength}
        next={() => next(searchParams)}
        hasMore={hasMore}
        scrollableTarget={cat_id}
        style={{ overflow: "inherit" }}
      >
        {summaryTable()}
      </InfiniteScroll>
    );
  };

  return (
    <>
      <div
        className="categorywise-tables show-scroller"
        id={heading === "Pi Exceptions" ? "pIexception" : ""}
      >
        {heading && (
          <div className="exception-popup-heading d-flex">
            <h6 className="d-flex align-items-center">
              <img
                src={window?.location?.origin + `/images/${logoImage}.svg`}
                alt="calendar"
              />
              {heading}
            </h6>
          </div>
        )}

        <div
          className={
            fullScreen
              ? "responsive-table data-table-div-full"
              : "responsive-table data-table-div"
          }
          id={cat_id}
        >
          {infiniteScroll ? infiniteScrolTable() : summaryTable()}
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
