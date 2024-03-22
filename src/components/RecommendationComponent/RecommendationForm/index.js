import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import _ from "lodash";
import Editor from "../../EditorComponent";
import API from "../../../API/API";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchRecommendationDetailsByException } from "../../../redux/recommendation/RecommendationThunks";
import { useSelector, useDispatch } from "react-redux";

const MySwal = withReactContent(Swal);

let errorStyle = {
  border: "1px solid red",
};
let errorHelpTextStyle = {
  color: "red",
  marginLeft: "10px",
};

export const RecommendationForm = ({ handleFormSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let recomandationData = useSelector(
      (state) => state.recommendationReducer.recommendationData[0]
    );

  const [formData, setFormData] = useState({
    title: "",
    severity: "",
    target_date: "",
    work_order: null,
    work_order_status: null,
    cost_avoidance_parts: "",
    cost_avoidance_production: "",
    cost_avoidance_labour: "",
    save_as: null,
    conmon_event_id: null,
    workorder_number: "",
    exception_id: null,
    updated_at: null,
    submitted: false,
    notes: "",
  });

  const [errors, setErrors] = useState({
    title: {
      isValid: false,
      message: "",
    },
    severity: {
      isValid: false,
      message: "",
    },
    target_date: {
      isValid: false,
      message: "",
    },
    cost_avoidance_parts: {
      isValid: false,
      message: "",
    },
    cost_avoidance_production: {
      isValid: false,
      message: "",
    },
    cost_avoidance_labour: {
      isValid: false,
      message: "",
    },
    workorder_number: {
      isValid: false,
      message: "",
    },
  });

  const validateForm = (submitted) => {
    const {
      title,
      severity,
      target_date,
      cost_avoidance_parts,
      cost_avoidance_production,
      cost_avoidance_labour,
      workorder_number,
    } = formData;
    let retData = _.cloneDeep(errors);
    if (submitted) {
      if (!title) {
        retData.title = {
          isValid: true,
          message: "This field is required.",
        };
      }
      if (!severity) {
        retData.severity = {
          isValid: true,
          message: "This field is required.",
        };
      }
      if (!target_date) {
        retData.target_date = {
          isValid: true,
          message: "This field is required.",
        };
      }
      if (!cost_avoidance_parts) {
        retData.cost_avoidance_parts = {
          isValid: true,
          message: "This field is required.",
        };
      }
      if (!cost_avoidance_production) {
        retData.cost_avoidance_production = {
          isValid: true,
          message: "This field is required.",
        };
      }
      if (!cost_avoidance_labour) {
        retData.cost_avoidance_labour = {
          isValid: true,
          message: "This field is required.",
        };
      }
      if (!workorder_number) {
        retData.workorder_number = {
          isValid: true,
          message: "This field is required.",
        };
      }
    }
    return retData;
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    const validation = validateForm(true);
    setErrors(validation);
    if (
      validation.title.isValid ||
      validation.severity.isValid ||
      validation.target_date.isValid ||
      validation.cost_avoidance_parts.isValid ||
      validation.cost_avoidance_production.isValid ||
      validation.cost_avoidance_labour.isValid ||
      validation.workorder_number.isValid
    ) {
      return;
    } else {
      handleFormSubmit(formData);
    }
  };

  useEffect(() => {
    setFormData({ ...formData, ...recomandationData })
  }, [recomandationData]);

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-9">
          <div className="row">
            <div className="col-sm-4 col-md-5">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  className="textbox bg-gray"
                  style={errors.title.isValid ? errorStyle : {}}
                  value={formData.title}
                  onChange={(event) => {
                    if (event.target.value) {
                      setErrors({
                        ...errors,
                        title: {
                          isValid: false,
                          message: "",
                        },
                      });
                    }
                    setFormData({ ...formData, title: event.target.value });
                  }}
                />
                <span
                  style={
                    errors.title && errors.title.isValid
                      ? errorHelpTextStyle
                      : { display: "none" }
                  }
                >
                  {errors.title ? errors.title.message : ""}
                </span>
              </div>
            </div>
            <div className="col-sm-4 col-md-3">
              <div className="form-group">
                <label>Severity</label>
                <div className="custom-select">
                  <select
                    value={formData.severity}
                    style={errors.severity.isValid ? errorStyle : {}}
                    onChange={(e) => {
                      if (e.target.value) {
                        setErrors({
                          ...errors,
                          severity: {
                            isValid: false,
                            message: "",
                          },
                        });
                      }
                      setFormData({ ...formData, severity: e.target.value });
                    }}
                  >
                    <option value="">Select</option>
                    <option value="severe">Severe</option>
                    <option value="abnormal">Abnormal</option>
                    <option value="moderate">Moderate</option>
                    <option value="healthy">Healthy</option>
                    <option value="not measured">Not Measured</option>
                  </select>
                  <span
                    style={
                      errors.severity.isValid
                        ? errorHelpTextStyle
                        : { display: "none" }
                    }
                  >
                    {errors.severity.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-md-4">
              <div className="form-group">
                <span>
                  <label>Target Date</label>
                  <DatePicker
                    style={
                      errors.target_date && errors.target_date.isValid
                        ? errorStyle
                        : {}
                    }
                    selected={Date.parse(formData.target_date)}
                    // selected="2020-01-01"
                    onChange={(date) => {
                      if (date) {
                        setErrors({
                          ...errors,
                          target_date: {
                            isValid: false,
                            message: "",
                          },
                        });
                      }
                      setFormData({ ...formData, target_date: date });
                    }}
                    placeholderText="Select Date"
                    dateFormat="yyyy-MM-dd"
                  />
                  <span
                    style={
                      errors.target_date && errors.target_date.isValid
                        ? errorHelpTextStyle
                        : { display: "none" }
                    }
                  >
                    {errors.target_date ? errors.target_date.message : ""}
                  </span>
                </span>
              </div>
            </div>
          </div>
          {/* <figure>
            <img
              className="img-fluid"
              src={window.location.origin + "/images/writing-img.png"}
              alt="writing-img"
            />
          </figure> */}
          <Editor formData={formData} setFormData={setFormData} notes={formData?.notes}/>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-3">
          <div className="form-group right-side-col">
            <label htmlFor="inputDate">Work Order number</label>
            <input
              type="text"
              placeholder="Work Order No."
              className="textbox bg-gray"
              style={errors.workorder_number.isValid ? errorStyle : {}}
              value={formData.workorder_number}
              onChange={(event) => {
                if (event.target.value) {
                  setErrors({
                    ...errors,
                    workorder_number: {
                      isValid: false,
                      message: "",
                    },
                  });
                }
                setFormData({
                  ...formData,
                  workorder_number: event.target.value,
                });
              }}
            />
            <span
              style={
                errors.workorder_number && errors.workorder_number.isValid
                  ? errorHelpTextStyle
                  : { display: "none" }
              }
            >
              {errors.workorder_number ? errors.workorder_number.message : ""}
            </span>
          </div>
          <div className="card drop-shadow-small border-0">
            <h6 className="card-header py-3  text-center">Cost Avoidance</h6>
            <div className="card-body px-5">
              <form>
                <div className="form-group">
                  <label>Parts</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Value"
                    style={
                      errors.cost_avoidance_parts.isValid ? errorStyle : {}
                    }
                    value={formData.cost_avoidance_parts}
                    onChange={(event) => {
                      if (event.target.value) {
                        setErrors({
                          ...errors,
                          cost_avoidance_parts: {
                            isValid: false,
                            message: "",
                          },
                        });
                      }
                      setFormData({
                        ...formData,
                        cost_avoidance_parts: event.target.value,
                      });
                    }}
                  />
                  <span
                    style={
                      errors.cost_avoidance_parts &&
                      errors.cost_avoidance_parts.isValid
                        ? errorHelpTextStyle
                        : { display: "none" }
                    }
                  >
                    {errors.cost_avoidance_parts
                      ? errors.cost_avoidance_parts.message
                      : ""}
                  </span>
                </div>
                <div className="form-group">
                  <label>Production</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    maxLength="10"
                    minLength="3"
                    pattern="^[a-zA-Z0-9_.-]*$"
                    placeholder="Value"
                    style={
                      errors.cost_avoidance_production.isValid ? errorStyle : {}
                    }
                    value={formData.cost_avoidance_production}
                    onChange={(event) => {
                      if (event.target.value) {
                        setErrors({
                          ...errors,
                          cost_avoidance_production: {
                            isValid: false,
                            message: "",
                          },
                        });
                      }
                      setFormData({
                        ...formData,
                        cost_avoidance_production: event.target.value,
                      });
                    }}
                  />
                  <span
                    style={
                      errors.cost_avoidance_production &&
                      errors.cost_avoidance_production.isValid
                        ? errorHelpTextStyle
                        : { display: "none" }
                    }
                  >
                    {errors.cost_avoidance_production
                      ? errors.cost_avoidance_production.message
                      : ""}
                  </span>
                </div>
                <div className="form-group mb-0 pb-0">
                  <label>Labour</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Labour"
                    style={
                      errors.cost_avoidance_labour.isValid ? errorStyle : {}
                    }
                    value={formData.cost_avoidance_labour}
                    onChange={(event) => {
                      if (event.target.value) {
                        setErrors({
                          ...errors,
                          cost_avoidance_labour: {
                            isValid: false,
                            message: "",
                          },
                        });
                      }
                      setFormData({
                        ...formData,
                        cost_avoidance_labour: event.target.value,
                      });
                    }}
                  />
                  <span
                    style={
                      errors.cost_avoidance_labour &&
                      errors.cost_avoidance_labour.isValid
                        ? errorHelpTextStyle
                        : { display: "none" }
                    }
                  >
                    {errors.cost_avoidance_labour
                      ? errors.cost_avoidance_labour.message
                      : ""}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="update-selection-confirmation-box px-30 py-20">
        <div className="selected-box d-flex justify-content-center align-items-center">
          <div className="button-set">
            <button type="button" onClick={() => { navigate(-1);}} className="btn btn-outline-dark btn-sm">
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm ml-3"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
