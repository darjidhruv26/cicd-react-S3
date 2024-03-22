import moment from "moment";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { fetchExceptionDetails } from "../../../redux/exception-details/exceptionDetailsThunks";
import UpsertConMon from "../../ExceptionDetailsComponents/UpsertConMon/UpsertConMon";

let errorStyle = {
  border: "1px solid red",
};
let errorHelpTextStyle = {
  color: "red",
  marginLeft: "10px",
};

const addDays = (days) => {
  let DateObj = new Date();
  DateObj.setDate(DateObj.getDate() + days);
  return DateObj;
};

const statusReasonMapping = {
  'S1': [],
  'S2': ['R3', 'R4', 'R5', 'R6', 'R7'],
  'S3': ['R0', 'R4', 'R5', 'R8', 'R9'],
  'S4': [],
  'S5': [],
}

export const DatePickerModal = ({
  setShowModal,
  showModal,
  onSubmit,
  type,
}) => {
  const [formData, setFormData] = useState({
    selectedDate: moment().format('YYYY-MM-DD'),
    reasonCode: "",
    otherReasonCode: "",
    exceptionId: "",
  });
  const [showOtherReasonCode, setShowOtherReasonCode] = useState(false);
  const [error, setError] = useState({
    selectedDate: { isValid: false, message: "" },
    reasonCode: { isValid: false, message: "" },
  });
  
  const dispatch = useDispatch();
  
  let exceptionReasonValues = useSelector(
    (state) => state.exceptionDetailsReducer.exceptionReasonValues
    );
    
    let remsWatchlistRecords = useSelector(state => state.exceptionDetailsReducer.remsConmonWatchlistRecord);
    const [selectedConmon, setSelectedConmon] = useState();
    
    let selectedException = useSelector(state => state.exceptionDetailsReducer.selectedException);
    
  useEffect(() => {
    showModal?.exceptionId && dispatch(fetchExceptionDetails(showModal?.exceptionId));
  }, [showModal]);

  useEffect(() => {
    if (selectedException?.length > 0) { 
      setSelectedConmon(selectedException[0]?.rems_event_id);
      setFormData((formData) => {
        return {
          ...formData,
          exceptionId: selectedException[0].id,
          selectedStatus: selectedException[0].exception_status,
          reasonCode: selectedException[0].exception_status_reason_code,
          selectedDate: selectedException[0].exception_status_till_date || moment().format('YYYY-MM-DD'),
          otherReasonCode: selectedException[0].exception_status_custom_reason_code,
        };
      });
    }
  }, [selectedException]);

  useEffect(() => {
    setFormData({
      selectedDate: moment().format('YYYY-MM-DD'),
      reasonCode: "",
      otherReasonCode: "",
    });
    setShowOtherReasonCode(false);
    setError({
      selectedDate: { isValid: false, message: "" },
      reasonCode: { isValid: false, message: "" },
    });
  }, [showModal]);

  const handleReasonCodeChange = (e) => {
    if (e.target.value === "R4") {
      setShowOtherReasonCode(true);
    } else {
      error.custom_reason_code && delete error.custom_reason_code;
      setShowOtherReasonCode(false);
    }
    if (e.target.value) {
      setError({
        ...error,
        reasonCode: {
          isValid: false,
          message: "",
        },
      });
    }
    setFormData({
      ...formData,
      reasonCode: e.target.value,
      otherReasonCode: "",
    });
  };

  const onSubmitHandler = () => {
    if(showModal.category !== "S1"){
      const validation = validateForm(true);
      setError(validation);
      if (
        !(
          validation.reasonCode.isValid ||
          validation.custom_reason_code ||
          validation.selectedDate.isValid
        )
      ) {
        if (["S2"].includes(showModal.category)) {
          onSubmit({...formData, rems_event_id: selectedConmon});
        } else {
          delete formData.selectedDate;
          onSubmit({...formData, rems_event_id: selectedConmon});
        }
      }
    }else{
      onSubmit({...formData, rems_event_id: selectedConmon, selectedDate: "", reasonCode: ""});
    }
  };

  const validateForm = (submitted) => {
    const { selectedDate, reasonCode, otherReasonCode } = formData;
    let retData = {
      selectedDate: {
        isValid: false,
        message: "",
      },
      reasonCode: {
        isValid: false,
        message: "",
      },
    };
    if (submitted) {
      if (!selectedDate && ["S2"].includes(showModal.category)) {
        retData.selectedDate = {
          isValid: true,
          message: "This field is required.",
        };
      }
      if (!reasonCode) {
        retData.reasonCode = {
          isValid: true,
          message: "This field is required.",
        };
      } else if (reasonCode === "R4" && !otherReasonCode) {
        retData.custom_reason_code = {
          isValid: true,
          message: "This field is required.",
        };
      } else if (reasonCode && !statusReasonMapping[showModal.category].includes(reasonCode)) {
        retData.reasonCode = {
          isValid: true,
          message: "Plesase select appropriate reason.",
        };
      }
    }
    return retData;
  };

  return (
    <div
      className={`${
        showModal[type] ? "show" : ""
      } modal fade modal-center datePickerModal`}
      style={
        showModal[type] ? { display: "block", paddingRight: "17px" } : null
      }
    >
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
        onClick={() => {
          setShowModal(false);
        }}
      ></div>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h6 className="modal-title" id="exampleModalLabel">
              Select Status
            </h6>
            <button
              type="button"
              className="close"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
            {/* {showModal.category === "S1" ? (
                <>
                  <div className="anchor-link">
                    <Popup trigger={<a href="#">Link to existing entry in ConMon Watchlist</a>} modal contentStyle = {{width: '70%'}} nested>
                      {close => <UpsertConMon close={close} />}
                    </Popup>
                  </div>
                </>
              ) : null} */}
              
                {(showModal.category === "S2" || showModal.category === "S3") && <>
                  <div className="form-group">
                    <label>Reason</label>
                    <div className="custom-select">
                      <select
                        value={formData.reasonCode}
                        style={error.reasonCode.isValid ? errorStyle : {}}
                        onChange={handleReasonCodeChange}
                      >
                        <option value="">Select</option>
                        {
                        exceptionReasonValues.filter((reason) => {
                          return statusReasonMapping[showModal.category]?.includes(reason.code)})
                          ?.map((reason) => {
                                return (
                                  <option
                                    value={reason.code }
                                    key = {reason.code}
                                  >
                                    {reason.name}
                                  </option>
                                );
                              })
                        }
                      </select>
                      <span
                        style={
                          error.reasonCode.isValid
                            ? errorHelpTextStyle
                            : { display: "none" }
                        }
                      >
                        {error.reasonCode.message}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <span
                      style={showOtherReasonCode ? {} : { display: "none" }}
                    >
                      <label>Other Comment</label>
                      <div className="custom-input">
                        <input
                          style={
                            error.custom_reason_code &&
                            error.custom_reason_code.isValid
                              ? errorStyle
                              : {}
                          }
                          value={formData.otherReasonCode}
                          onChange={(e) => {
                            if (e.target.value) {
                              error.custom_reason_code &&
                                delete error.custom_reason_code;
                              setError(error);
                            }
                            setFormData({
                              ...formData,
                              otherReasonCode: e.target.value,
                            });
                          }}
                          placeholder="Enter Comment"
                        ></input>
                      </div>
                      <span
                        style={
                          error.custom_reason_code &&
                          error.custom_reason_code.isValid
                            ? errorHelpTextStyle
                            : { display: "none" }
                        }
                      >
                        {error.custom_reason_code
                          ? error.custom_reason_code.message
                          : ""}
                      </span>
                    </span>
                  </div>
                </>}
                
                {showModal.category === "S2" && <div className="form-group">
                  <span>
                    <label>Snooze Until</label>
                    <DatePicker
                      style={error.selectedDate.isValid ? {} : errorStyle}
                      selected={Date.parse(formData.selectedDate) || Date.parse(new Date())}
                      onChange={(date) => {
                        if (date) {
                          setError({
                            ...error,
                            selectedDate: { isValid: false, message: "" },
                          });
                        }
                        setFormData({ ...formData, selectedDate: date });
                      }}
                      minDate={new Date()}
                      maxDate={addDays(30)}
                      placeholderText="Select Date"
                      dateFormat="yyyy-MM-dd"
                    />
                    <span
                      style={
                        error.selectedDate.isValid
                          ? errorHelpTextStyle
                          : { display: "none" }
                      }
                    >
                      {error.selectedDate.isValid
                        ? error.selectedDate.message
                        : ""}
                    </span>
                  </span>
                </div>}
                {showModal.category === "S1" && (
                  <>
                    <div className="form-group">
                        <label>Existing Conmon Items</label>
                        <div className="custom-select">
                            <select
                                value={selectedConmon}
                                onChange={(e) => setSelectedConmon(e.target.value)}
                            >
                                {remsWatchlistRecords.map((value, index) => {
                                  let comment  = value.comments.slice(0, 50);
                                  return  <option value={value.eventId}  key={index} title={`${moment(value.createdDate).format("YYYY/MM/DD hh:mm a")} - ${value.urgencyName} - ${value.comments}`}>{moment(value.createdDate).format("YYYY/MM/DD hh:mm a")} - {value.urgencyName} - {comment} {value.comments?.length !== comment?.length  && ' . . .'}</option>
                                })}
                            </select>
                        </div>
                    </div>
                  </>
                )}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onSubmitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
