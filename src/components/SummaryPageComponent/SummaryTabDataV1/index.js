import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { setShowDateModal } from "../../../redux/summaryV1-table/summaryV1TableSlice";
import { DatePickerModal } from "../DatePickerModal";
import "./index.scss"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API from "../../../API/API";
import { fetchExceptionSummary } from "../../../redux/summaryV1-table/summaryV1TableThunk";
import { CategorywiseTables } from "../CategorywiseTablesV1";
import RemsWatchlistTab from "../../ExceptionDetailsComponents/RemsWatchlistTab/RemsWatchlistTab";
import { fetchRemsConmonWatchlistValues } from "../../../redux/exception-details/exceptionDetailsThunks";
import ExceptionDetailsIFrame from "../../ExceptionDetailsComponents/ExceptionDetailsIFrame/ExceptionDetailsIFrame";
const MySwal = withReactContent(Swal);

const borderMapper = {
  critical: 'danger',
  major: 'warning',
  minor: 'grey',
  other: 'success',

}

const sampleData = {
  comments: 'DT123 – Coolant in oil',
  cmacomment: 'Colour doesnt match repoted coolant, possibly incorrect coolant details reported. Results indicate possibly a mix of Recochem HDD 1000 and Cummins Fleetguard PGPlus. A trace of oil is visible; possibly due to poor sampling.(i.e. Taking the coolant sample with the same extraction equipment used for oil). This sample is unsuitable for an ICtest (NO2) due to the oil in the sample. Recommend checking cooling system for evidence of oil and monitoring fluid levels. Advise investigation if oil entry is suspected. Suggest resampling in 125 hours to monitor. For technical enquiries regarding this evaluation; please contact Diana Grayson on (08) 93779745.',
  exception_acknowledged_by: 'Graphs etc',
}

const rowMapper = {
  'severe': 'danger',
  'abnormal': 'warning',
  'moderate': 'secondary',
  'other': 'success',
}

export const ExceptionBox = ({ comments, cmacomment, exception_acknowledged_by, pivision_url, exceptiontype }) => {
  return (
    <div className="summary-message-page">
      {exceptiontype !== 'PI_EXCEPTIONS' && <h6>{comments}</h6>}
      <div className="exception-box-content">
        {exceptiontype === 'PI_EXCEPTIONS' ? <ExceptionDetailsIFrame hideFullScreen pivision_url={pivision_url}/> : <p>{cmacomment}</p>}
      </div>
      {exceptiontype !== 'PI_EXCEPTIONS' && exception_acknowledged_by && <h6 className="summary-author">- {exception_acknowledged_by}</h6>}
    </div>
  );
}


export const SummaryTabDataV1 = ({ data, isAssetsShow }) => {
  const dispatch = useDispatch();

  const exceptionSummaryData = useSelector(state => state.summaryTableReducerV1.exceptionSummary);
  const modalShowStatus = useSelector(state => state.summaryTableReducerV1.showDateModal);
  const userPreferences = useSelector(state => state.userPreferencesReducer.userPreferences);

  const getExceptionSummaryAll = (asset_name = '') => {
    let my_exception = []

    if (asset_name) {
      my_exception = asset_name && exceptionSummaryData && exceptionSummaryData.length > 0 && exceptionSummaryData?.filter(record => record.asset_name === asset_name)
    } else {
      my_exception = exceptionSummaryData && exceptionSummaryData.length > 0 && [...exceptionSummaryData]
    }
    return my_exception
  }

  const initialException = {
    exception_acknowledged_by: "",
    cmacomment: "",
    comments: "",
    workShopFinding: "",
    pivision_url: "",
    event_name: "",
    event_description: "",
    event_template: "",
  }

  const [exceptionSummaryHoverAssets, setExceptionSummaryHoverAssets] = useState([]);
  const [exceptionSummaryClickAssets, setExceptionSummaryClickAssets] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [clickedCategogy, setClickedCategory] = useState("");
  const [selectedSingleId, setSelectedSingleId] = useState(-1);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [activeAsset, setActiveAsset] = useState("");
  const [activeExcption, setActiveExcption] = useState(initialException);
  const [activeHoverExcption, setActiveHoverExcption] = useState(initialException);

  useEffect(() => {
    setExceptionSummaryHoverAssets(getExceptionSummaryAll());
    setExceptionSummaryClickAssets(getExceptionSummaryAll());
  }, [exceptionSummaryData]);


  const getColor = (item) => {
    if (item.total_critical === 0 && item.total_minor === 0 && item.total_major === 0) {
      return borderMapper.other
    }
    if (item.total_critical >= item.total_major && item.total_critical >= item.total_minor) {
      return borderMapper.critical
    }
    if (item.total_major >= item.total_critical && item.total_major >= item.total_minor) {
      return borderMapper.major
    }
    if (item.total_minor >= item.total_critical && item.total_minor >= item.total_major) {
      return borderMapper.minor
    }
  }

  const getTowerColor = (item) => {
    const now = new Date();
    const last_communication = new Date(item.last_communication);
    const timeDiffHOur = Math.ceil(Math.abs(now.getTime() - last_communication.getTime()) / 3600000);

    if (timeDiffHOur >= 24) {
      return 'red'
    }
    if (timeDiffHOur < 12) {
      return 'yellow'
    }
    if (timeDiffHOur >= 12 && timeDiffHOur < 24) {
      return 'orange'
    }

  }

  const onHoverAsset = (item, index) => {
    setExceptionSummaryHoverAssets([...getExceptionSummaryAll(item.asset_name)]);
  };

  const onClickAsset = (item, index) => {
    setActiveAsset(`${item.asset_name} - ${item.serial_number}(${item.model})`)
    setExceptionSummaryClickAssets([...getExceptionSummaryAll(item.asset_name)]);
    const filterView = document.getElementById("exception-table");
    var headerOffset = 105;
    var elementPosition = filterView.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    // handleSelectAllCheck(isSelectAll);
    setActiveExcption(initialException);
  };

  const handleExceptionHover = (exception) => {
    setActiveHoverExcption({ ...exception, ...sampleData });
  }

  const handleExceptionClick = (exception) => {
    dispatch(fetchRemsConmonWatchlistValues({ assetId: exception?.asset_name, siteCode: exception?.site_id_current }));
    // TODO remove with when original data get in api
    setActiveExcption({ ...exception, ...sampleData });
  }


  const handleModalClick = (status) => {
    dispatch(setShowDateModal({ type: "custom", status }));
  };

  const handleSubmitForm = (data) => {
    dispatch(setShowDateModal({ type: "custom", status: false }));
    const body = {
      exception_ids:
        selectedSingleId >= 0 ? [_.cloneDeep(selectedSingleId)] : selectedIds,
      status: clickedCategogy,
      reason_code: data.reasonCode,
      custom_reason_code: data.otherReasonCode ? data.otherReasonCode : null,
      till_date: data.selectedDate ? data.selectedDate : null,
      user_id:
        userPreferences && userPreferences.user_id
          ? userPreferences.user_id
          : null,
    };

    API.put(`/bulk-exception-status-change`, body)
      .then((res) => {
        MySwal.fire("success", res.data.message);
        dispatch(fetchExceptionSummary({
          selected_severity: userPreferences?.selected_severity
        }));
      })
      .catch((e) => {
        console.log(e);
      });
    if (selectedSingleId >= 0) {
      setSelectedSingleId(-1);
    }
  };


  return (
    <div className="recommendation-section no-bg summery-page-v1" >
      <div className="new-summary-content categorywise-tables" style={{ display: !isAssetsShow && 'none' }}>
        <div className="critical-result-boxes responsive-table show-scroller-grey">
          {data?.map((item, index) => {
            const border = getColor(item);
            const towerColor = getTowerColor(item);
            return (
              <Popup
                trigger={
                  <div className={`critical-box border-${border} background-${border} ${activeAsset.startsWith(item.asset_name) && 'color-'+ border} }`} style={{ height: 'min-content' }} onMouseEnter={() => onHoverAsset(item, index)} onClick={() => onClickAsset(item, index)}>
                    <img className="box-bg-img" src="images/crane.png" alt="crane"></img>
                    <p><i className={`icon-network ${towerColor + "-color"}`}></i>{item.last_communication}</p>
                    <p>{item.asset_name}</p>
                    <div className="summary-model-box">
                      <p>{item.serial_number + " - " + item.model}</p>
                      <div className="flex-box-span">
                        <span className="red-clr">{item.total_critical}</span>
                        <span className="yellow-clr">{item.total_major}</span>
                        <span className="gray-clr">{item.total_minor}</span>
                      </div>
                    </div>
                  </div>
                }
                on="hover"
                onOpen={() => onHoverAsset(item, index)}
                arrow={false}
                keepTooltipInside
                offsetY={-10}
                key={index}
              >
                <div className="categorywise-tables mt-0">
                  <div className="exception-popup-heading d-flex justify-content-between">
                    <h6 className="d-flex align-items-center"><img src="images/bell.svg" alt="bell" />{`Exception Details: ${item.asset_name} - ${item.serial_number}(${item.model})`}
                    </h6>
                  </div>
                  <div className="responsive-table show-scroller-grey popup-table" >
                    <table className="table">
                      <thead className="without-search-box">
                        <tr>
                          <th>Compartment</th>
                          <th>Description</th>
                          <th>Start Date</th>
                          <th>Exception Type</th>
                        </tr>
                      </thead>

                      <tbody>
                        {exceptionSummaryHoverAssets?.length > 0 && exceptionSummaryHoverAssets?.slice(0, 5)?.map((item, index) => {
                          const rowColor = item.event_severity.toLowerCase()
                          return (
                            <tr key={index} className={`table-${rowMapper[rowColor]}`}>
                              <td>{item.fleet_type}</td>
                              <td>{item.event_template}</td>
                              <td>{item.event_start_time}</td>
                              <td>{item.exceptiontype}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Popup>

            );
          })}
        </div>
      </div>
      <div className="categorywise-tables mt-0">
        {exceptionSummaryClickAssets && <div id="exception-table">
          <CategorywiseTables
            logoImage="bell"
            heading={`Exception Details ${activeAsset ? ": " + activeAsset : ""}`}
            data={
              exceptionSummaryClickAssets
                ? exceptionSummaryClickAssets
                : []
            }
            type="custom-table"
            showColoredRow
            handleExceptionClick={handleExceptionClick}
            handleExceptionHover={handleExceptionHover}
            activeExcption = {activeExcption}
            hoverElement={activeHoverExcption && <ExceptionBox comments={activeHoverExcption.comments} cmacomment={activeHoverExcption.cmacomment} exception_acknowledged_by={activeHoverExcption.exception_acknowledged_by} pivision_url={activeHoverExcption?.pivision_url} exceptiontype={activeHoverExcption?.exceptiontype}/>}
          /></div>}
      </div>
      {activeExcption?.event_template && <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="related-recommendations">
            <div className="exception-popup-heading d-flex justify-content-between">
              <h6 className="d-flex align-items-center">CMA Watchlist - {activeExcption.asset_name} 
              </h6>
            </div>
            <RemsWatchlistTab isStriped />
          </div>
        </div>
        <div className="col-sm-12 col-md-6 ">
          <ExceptionBox comments={activeExcption.comments} cmacomment={activeExcption.cmacomment} exception_acknowledged_by={activeExcption.exception_acknowledged_by} exceptiontype={activeExcption?.exceptiontype} pivision_url={activeExcption?.pivision_url} />
        </div>
      </div>}
      
      <DatePickerModal
        setShowModal={handleModalClick}
        showModal={modalShowStatus}
        onSubmit={handleSubmitForm}
        type={"custom"}
        clickedCategogy={clickedCategogy}
      />
    </div >

  );
};
