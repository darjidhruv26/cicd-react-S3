import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API from "../../../API/API";
import DatePicker from "react-datepicker";
import { fetchExceptionStatus, fetchExceptionDetails, fetchREMSDetails, fetchExceptionDocuments } from "../../../redux/exception-details/exceptionDetailsThunks";
import "react-datepicker/dist/react-datepicker.css";
import "./ManagementTab.scss"
import Popup from "reactjs-popup";
import UpsertConMon from "../UpsertConMon/UpsertConMon";
import ExceptionCloser from "../ExceptionCloser/ExceptionCloser";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import ExceptionDetailsComments from "../ExceptionDetailsComments/ExceptionDetailsComments";
// import ExceptionDetailsUploadFiles from "../../Common/UploadFilesComponent";
import ExceptionDetailsUploadFiles from '../../Common/UploadFilesComponent'
import fileDownload from "js-file-download";



const MySwal = withReactContent(Swal);
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

const disabledStatus = ['S4'];
const enabledStatus = ['S1', 'S2', 'S3'];
const completedStatus = ['S3', 'S5'];

const ManagementTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    statusId: "",
    selectedStatus: "",
    oldStatus: "",
    reasonCode: "",
    toDate: "",
    otherReasonCode: "",
    submitted: false,
    conmonItem: false,
  });
  const [selectedConmon, setSelectedConmon] = useState();

  const [availableStatus, setAvailableStatus] = useState([])

  const [errors, setErrors] = useState({
    selectedStatus: {
      isValid: false,
      message: "",
    },
    reasonCode: {
      isValid: false,
      message: "",
    },
    selectedConmon: {
      isValid: false,
      message: "",
    }
  });

  const [showOtherReasonCode, setShowOtherReasonCode] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  );

  let selectedExceptionDocuments = useSelector(
    (state) => state.exceptionDetailsReducer.selectedExceptionDocuments
  );

  let selectedExceptionStatus = useSelector(
    (state) => state.exceptionDetailsReducer.selectedExceptionStatus
  );

  let selectedException = useSelector(
    (state) => state.exceptionDetailsReducer.selectedException
  );

  let REMSDetails = useSelector(
    (state) => state.exceptionDetailsReducer.REMSDetails
  );

  let exceptionStatusValues = useSelector(
    (state) => state.exceptionDetailsReducer.exceptionStatusValues
  );

  let exceptionReasonValues = useSelector(
    (state) => state.exceptionDetailsReducer.exceptionReasonValues
  );
  selectedException = selectedException?.length > 0 ? selectedException[0] : {};
  REMSDetails = REMSDetails.length > 0 ? REMSDetails[0]: {};

  let remsWatchlistRecords = useSelector(
    (state) => state.exceptionDetailsReducer.remsConmonWatchlistRecord
  );
  
  let selectedEquipment = useSelector(
    (state) => state.exceptionDetailsReducer.selectedEquipment
  );
  selectedEquipment = selectedEquipment?.length > 0 ? selectedEquipment[0] : {};

  const handleFileSelect = (f) => {
    let formData = new FormData();

    Object.keys(f).forEach((key) => {
      formData.append("myFile", f[key]);
      formData.append("file_name", f[key].name);
    });
    formData.append("id", selectedException.id);
    formData.append("equipment_id", selectedEquipment.asset_name);

    formData.append("user_id", null);
    formData.append("document_type", "exception");

    let formdata_obj = {};

    formData.forEach((value, key) => (formdata_obj[key] = value));
    formdata_obj = JSON.stringify(formdata_obj);

    const headers = {
      "Content-Type": "application/json",
    };
    API.post(`/document`, formData, { headers }).then((res) => {
      dispatch(fetchExceptionDocuments(selectedException.id));
      MySwal.fire(
        "Uploaded!",
        "Exception document has been uploaded.",
        "success"
      );
    });
  };

  const handlePreviousRowDelete = (e) => {
    e.preventDefault();
    const docId = e.target.dataset.docId;

    const headers = {
      "Content-Type": "application/json",
    };
    API.delete(`/document`, {
      params: {
        id: docId,
        document_type: "exception",
      },
      headers,
    }).then((res) => {
      dispatch(fetchExceptionDocuments(selectedException.id));
      MySwal.fire(
        "Deleted!",
        "Exception document has been deleted.",
        "success"
      );
    });
  };

  const handleDownload = (e) => {
    e.preventDefault();
    console.log(API);
    const object_url = e.target.closest("span").dataset.url;
    const file_name = e.target.closest("span").dataset.filename;
    API.get("/download-document", {
      responseType: "blob",
      headers: {
        Accept: "application/octet-stream",
        "Content-Type": "application/octet-stream",
      },
      params: {
        object_url,
        file_name,
      },
    }).then((res) => {
      fileDownload(
        res.data,
        res.headers["content-disposition"].replace("attachment; filename=", "")
      );
    });
  };

  useEffect(() => {
    if (
      selectedExceptionStatus.length &&
      Object.keys(selectedExceptionStatus[0]).length
    ) {
      const {
        exception_id,
        exception_status,
        exception_status_reason_code,
        exception_status_till_date,
        exception_status_custom_reason_code,
      } = selectedExceptionStatus[0];
      if (exception_status === "S2") {
        setShowDatePicker(true);
      }
      else{
        setShowDatePicker(false);
      }
      if(exception_status === "S5") {
        setAvailableStatus(completedStatus);
      }
      else{
        setAvailableStatus(enabledStatus);
      }
      if (exception_status_reason_code === "R4") {
        setShowOtherReasonCode(true);
      }
      setFormData((formData) => {
        return {
          ...formData,
          exceptionId: exception_id || "",
          selectedStatus: exception_status || "",
          oldStatus: exception_status || "",
          reasonCode: exception_status_reason_code || "",
          toDate: exception_status_till_date || "",
          otherReasonCode: exception_status_custom_reason_code || "",
        };
      });
    }
  }, [selectedExceptionStatus]);

  useEffect(() => {
    setSelectedConmon(selectedException?.rems_event_id || "")
  }, [selectedException])

  const validateForm = (submitted) => {
    const { selectedStatus, reasonCode, otherReasonCode, toDate } = formData;
    let retData = {
      selectedStatus: {
        isValid: false,
        message: "",
      },
      reasonCode: {
        isValid: false,
        message: "",
      },
      selectedConmon: {
        isValid: false,
        message: "",
      },
    };
    if (submitted) {
      if (!selectedStatus) {
        retData.selectedStatus = {
          isValid: true,
          message: "This field is required.",
        };
      } else if (
        (selectedStatus === "S2") &&
        !toDate
      ) {
        retData.toDate = {
          isValid: true,
          message: "Date is required.",
        };
      }
      if (!reasonCode && selectedStatus !== "S1") {
        retData.reasonCode = {
          isValid: true,
          message: "This field is required.",
        };
      } else if (
        reasonCode === "R4" &&
        !otherReasonCode &&
        selectedStatus === "S2"
      ) {
        retData.custom_reason_code = {
          isValid: true,
          message: "This field is required.",
        };
      } else if (reasonCode && !statusReasonMapping[selectedStatus].includes(reasonCode)) {
        retData.reasonCode = {
          isValid: true,
          message: "Plesase select appropriate reason.",
        };
      }
      else if (selectedStatus === "S1" && (!selectedConmon || selectedConmon === 'SelectOne')){
        retData.selectedConmon = {
          isValid: true,
          message: "Plesase select from existing conmon item or create new one.",
        };
      }
    }
    return retData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateForm(true);
    setErrors(validation);
    if (
      validation.reasonCode.isValid ||
      validation.selectedStatus.isValid ||
      validation.toDate ||
      validation.custom_reason_code ||
      validation.selectedConmon.isValid
    ) {
      return;
    } else {
      const {
        selectedStatus,
        oldStatus,
        reasonCode,
        otherReasonCode,
        toDate,
      } = formData;

      const data = {
        exception_id: selectedException.id,
        status: selectedStatus,
        old_status: oldStatus ? oldStatus : null,
        reason_code: reasonCode,
        custom_reason_code: otherReasonCode ? otherReasonCode : null,
        till_date: toDate ? toDate : null,
        user_id: userPreferences.user_id ? userPreferences.user_id : null,
      };

      API.put(`/exception-status`, data)
        .then((res) => {
          dispatch(fetchExceptionStatus(selectedException.id));
          MySwal.fire(
            "Updated!",
            "Exception status has been updated.",
            "success"
          );
          navigate(location.state?.redirect_to);
        })
        .catch((err) => {
          console.log(err);
        });

      selectedConmon && API.post("link-rems-event", {
        exception_id: selectedException.id,
        rems_event_id: selectedConmon
      }).then((res) => {
        dispatch(fetchExceptionDetails(selectedException.id))
        dispatch(fetchREMSDetails({remsId: selectedConmon}));
      }).catch((error) => {
        console.log(error);
      })
      setFormData({ ...formData, submitted: true });
    }
  };

  const handleStatusChange = (e) => {
    let toDate = ""
    if (e.target.value === "S2") {
      setShowDatePicker(true);
      toDate = moment().format('YYYY-MM-DD');
    } else {
      errors.toDate && delete errors.toDate;
      setShowDatePicker(false);
    }
    if (e.target.value) {
      setErrors({
        ...errors,
        selectedStatus: {
          isValid: false,
          message: "",
        },
      });
    }
    setShowOtherReasonCode(false);
    setFormData({
      ...formData,
      selectedStatus: e.target.value,
      toDate: toDate,
      reasonCode: "",
      otherReasonCode: "",
    });
  };

  const handleReasonCodeChange = (e) => {
    errors.custom_reason_code && delete errors.custom_reason_code;
    setShowOtherReasonCode(true);
    if (e.target.value) {
      setErrors({
        ...errors,
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

  return (
    <div className="form-box">
      <div className="tab-main-content" style={{height: formData.selectedStatus === "S1" ? '394px' : '330px'}}>
        <form onSubmit={handleSubmit} id="StatusForm">
          <div className="form-block">
            <div className="row">
              <div className="col-md-5">
                <div className="form-group">
                  <label>Status</label>
                  <div className="custom-select">
                    <input
                      type={"hidden"}
                      value={formData.statusId}
                    //   onChange={(e) => setStatusId(e.target.value)}
                    ></input>
                    <select
                      value={formData.selectedStatus}
                      style={errors.selectedStatus.isValid ? errorStyle : {}}
                      onChange={handleStatusChange}
                    >
                      <option value="">Select Status</option>
                      {exceptionStatusValues?.length && exceptionStatusValues.map((status, index) => (
                        availableStatus.includes(status?.code) ? (<option value={status.code} key={index}>{status.name}</option>) : null
                      ))}
                    </select>
                    <span
                      style={
                        errors.selectedStatus.isValid
                          ? errorHelpTextStyle
                          : { display: "none" }
                      }
                    >
                      {errors.selectedStatus.message}
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="color-text">
                <Popup trigger=
                  {<a className="float-right "> Close </a>}
                  modal
                  contentStyle={{ width: '70%' }}
                >
                  {(close) => (
                    <ExceptionCloser close={close} />
                  )}

                </Popup>
              </div> */}
              <div className="col-md-5">
                <div className="form-group">
                  <span style={showDatePicker ? {} : { display: "none" }}>
                    <label>Snooze Until</label>
                    <DatePicker
                      style={
                        errors.toDate && errors.toDate.isValid ? errorStyle : {}
                      }
                      selected={Date.parse(formData.toDate) || Date.parse(new Date())}
                      onChange={(date) => {
                        if (date) {
                          errors.toDate && delete errors.toDate;
                          setErrors(errors);
                        }
                        setFormData({ ...formData, toDate: date });
                      }}
                      placeholderText="Select Date"
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      maxDate={addDays(30)}
                    />
                    <span
                      style={
                        errors.toDate && errors.toDate.isValid
                          ? errorHelpTextStyle
                          : { display: "none" }
                      }
                    >
                      {errors.toDate ? errors.toDate.message : ""}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            {formData.selectedStatus === "S1" ? (
              <>
                <div className="anchor-link" style={{ paddingLeft: 0 }}>
                  <Popup
                    trigger={
                      <span
                        className="poptrigger"
                        data-rel="update-event"
                      >
                        Create new entry in conmon watchlist
                      </span>
                    }
                    modal
                    contentStyle={{ width: '70%' }}
                  >
                    {(close) => (
                      <UpsertConMon close={close} />
                    )}
                  </Popup>
                </div>
              </>
            ) : null}
            {(formData.selectedStatus === "S2" || formData.selectedStatus === 'S3') && <div className="row">
              <div className="col-md-5">
                <div className="form-group">
                  <label>Reason</label>
                  <div className="custom-select">
                    <select
                      value={formData.reasonCode}
                      style={errors.reasonCode.isValid ? errorStyle : {}}
                      onChange={handleReasonCodeChange}
                      disabled={!formData.selectedStatus}
                    >
                      <option value="">Select a Reason</option>
                      {exceptionReasonValues.filter((reason) => {
                        return statusReasonMapping[formData?.selectedStatus]?.includes(reason.code)
                      }).map((reason, index) => {
                        return (
                          <option
                            key={index}
                            value={reason.code}
                          >
                            {reason.name}
                          </option>
                        );
                      })
                      }
                    </select>
                    <span
                      style={
                        errors.reasonCode.isValid
                          ? errorHelpTextStyle
                          : { display: "none" }
                      }
                    >
                      {errors.reasonCode.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div
                  className="form-group"
                  style={showOtherReasonCode ? {} : { display: "none" }}
                >
                  <label>Comment</label>
                  <div className="custom-input">
                    <input
                      style={
                        errors.custom_reason_code &&
                          errors.custom_reason_code.isValid
                          ? errorStyle
                          : {}
                      }
                      value={formData.otherReasonCode}
                      onChange={(e) => {
                        if (e.target.value) {
                          errors.custom_reason_code &&
                            delete errors.custom_reason_code;
                          setErrors(errors);
                        }
                        setFormData({
                          ...formData,
                          otherReasonCode: e.target.value,
                        });
                      }}
                      placeholder="Enter Comment"
                    ></input>
                    <span
                      style={
                        errors.custom_reason_code &&
                          errors.custom_reason_code.isValid
                          ? errorHelpTextStyle
                          : { display: "none" }
                      }
                    >
                      {errors.custom_reason_code
                        ? errors.custom_reason_code.message
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>}
            {formData.selectedStatus === "S1" ? (
              <>
                <div className="form-group">
                  <label>Existing Conmon Items</label>
                  <div className="custom-select">
                    <select
                      value={selectedConmon}
                      onChange={(e) => setSelectedConmon(e.target.value)}
                      style={errors.selectedConmon.isValid ? errorStyle : {}}
                    >
                      {remsWatchlistRecords?.length > 0 ? <option value={'SelectOne'} title={`Select One`}>Select One</option> : null}
                      {remsWatchlistRecords?.length > 0 ? remsWatchlistRecords.map((value, index) => {
                        let comment = value.comments.slice(0, 50);
                        return <option value={value.eventId} key={index} title={`${moment(value.createdDate).format("YYYY/MM/DD")} - ${value.urgencyName} - ${value.comments}`}>{moment(value.createdDate).format("YYYY/MM/DD")} - {value.urgencyName} - {comment} {value.comments?.length !== comment?.length && ' . . .'}</option>
                      })
                      :
                      <option disabled value={'No Data'} title={`No Data`}>No Data</option>
                    }
                    </select>
                    <span
                      style={
                        errors.selectedConmon.isValid
                          ? errorHelpTextStyle
                          : { display: "none" }
                      }
                    >
                      {errors.selectedConmon.message}
                    </span>
                  </div>
                </div>

                {REMSDetails?.count && <div className="row" >
                  <div className="col-md-5" style={{ border: 1, borderWidth: 1, }}>
                    <div className="row">
                      <div className="col-md-4">
                        <span>Notification: </span>
                      </div>
                      <div className="col-md-8">
                        {REMSDetails.notification}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5 ml-3" style={{ border: 1, borderWidth: 1, }}>
                    <div className="row">
                      <div className="col-md-4">
                        <span>Work Order: </span>
                      </div>
                      <div className="col-md-8">
                        {REMSDetails.workOrder}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5 mt-3" style={{ border: 1, borderWidth: 1, }}>

                    <div className="row">
                      <div className="col-md-4">
                        <span>REMS Status: </span>
                      </div>
                      <div className="col-md-8">
                        {REMSDetails.statusName}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5 ml-3  mt-3" style={{ border: 1, borderWidth: 1, }}>
                    <div className="row">
                      <div className="col-md-4">
                        <span>Workshop Findings: </span>
                      </div>
                      <div className="col-md-8">
                        {REMSDetails.workShopFinding}
                      </div>
                    </div>
                  </div>
                </div>}

              </>
            ) : null}
          </div>
        </form>
      </div>
      <div className="tab-footer">
        <div className="button-action">
          <div className="form-group">
            {/* <input type="button" className="btn-lightgray" value="Cancel" onClick={handleReset}></input> */}
            <input type="submit" form="StatusForm" value="Save Changes"></input>
          </div>
        </div>
      </div>
      <div style={{display:'flex'}}>
      <ExceptionDetailsComments />
                <ExceptionDetailsUploadFiles
                  previousSelectedItem={selectedExceptionDocuments}
                  handleFileSelect={handleFileSelect}
                  handleDeleteRow={handlePreviousRowDelete}
                  handleDownload={handleDownload}
                />
      </div>
    </div>
  );
};

export default ManagementTab;
