import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { CategoryTableContent } from "./categoryTableContent";
import { setShowDateModal } from "../../../redux/summary-table/summaryTableSlice";
import { DatePickerModal } from "../../SummaryPageComponent/DatePickerModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API from "../../../API/API";

const MySwal = withReactContent(Swal);

const TYPE = "exception-date-popup";
export const ExceptionPopupModal = ({ setPopupModal, PopupModal }) => {
  const dispatch = useDispatch();
  const exceptionSummaryData = useSelector(
    (state) => state.summaryTableReducer.exceptionSummary
  );
  const modalShowStatus = useSelector(
    (state) => state.summaryTableReducer.showDateModal
  );
  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  );
  const [selectedIds, setSelectedIds] = useState([]);
  const [clickedCategogy, setClickedCategory] = useState("");

  let renderCategoryWiseTable = () => {
    if (exceptionSummaryData && Object.keys(exceptionSummaryData).length > 0) {
      return (
        <>
          <CategoryTableContent
            logoImage="bell"
            heading="Pi Exceptions"
            data={
              exceptionSummaryData.PI_EXCEPTIONS
                ? exceptionSummaryData.PI_EXCEPTIONS
                : []
            }
            type={TYPE}
            onChangeSelectedIds={(ids) => setSelectedIds(ids)}
            handleCategoryClick={setClickedCategory}
          />
          <CategoryTableContent
            logoImage="calendar"
            heading="Event Analyzer"
            data={
              exceptionSummaryData.EVENT_ANALYZER
                ? exceptionSummaryData.EVENT_ANALYZER
                : []
            }
            type={TYPE}
            onChangeSelectedIds={(ids) => setSelectedIds(ids)}
            handleCategoryClick={setClickedCategory}
          />
          <CategoryTableContent
            logoImage="file-check"
            heading="Conmon Details"
            data={
              exceptionSummaryData.CONMON ? exceptionSummaryData.CONMON : []
            }
            type={TYPE}
            onChangeSelectedIds={(ids) => setSelectedIds(ids)}
            handleCategoryClick={setClickedCategory}
          />
        </>
      );
    } else {
      <p>no data</p>;
    }
  };

  const handleModalClick = (status) => {
    dispatch(setShowDateModal({ type: TYPE, status }));
  };

  const handleSubmitForm = (data) => {
    // console.log({ otherData: data, selectedIds });
    dispatch(setShowDateModal({ type: TYPE, status: false }));
    const body = {
      exception_ids: selectedIds,
      status: clickedCategogy,
      reason_code: data.reasonCode,
      user_id:
        userPreferences && userPreferences.user_id
          ? userPreferences.user_id
          : null,
      till_date: data.selectedDate ? data.selectedDate : null,
      custom_reason_code: data.otherReasonCode ? data.otherReasonCode : null,
    };

    // if (data.reasonCode === "R1") {
    //   body.other_reason_code = data.otherReasonCode;
    // }

    API.put(`/bulk-exception-status-change`, body)
      .then((res) => {
        MySwal.fire("success", res.data.message);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div
        className={`${
          PopupModal ? "show show-modal" : "hide-modal"
        } modal exception-popup modal-right fade`}
      >
        <div
          className="modal-outer-layer"
          onClick={() => {
            setPopupModal(!PopupModal);
          }}
        ></div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              {renderCategoryWiseTable(exceptionSummaryData)}
            </div>
          </div>
        </div>
      </div>
      <DatePickerModal
        setShowModal={handleModalClick}
        showModal={modalShowStatus}
        onSubmit={handleSubmitForm}
        type={TYPE}
        clickedCategogy={clickedCategogy}
      />
    </>
  );
};
