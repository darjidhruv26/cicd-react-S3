import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../Common/CustomSelect";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import RemsAPI from "../../../API/RemsAPI";
import { parsePath } from "react-router-dom";
const MySwal = withReactContent(Swal);


const mylist = [
    { label: 'no_feedback', value: 'no_feedback' },
    { label: 'issue_not_resolved', value: 'issue_not_resolved' },
    { label: 'monitor_event', value: 'monitor_event' },
    { label: 'general_repair_inspection', value: 'general_repair_inspection' },
    { label: 'out_of_strategy', value: 'out_of_strategy' },
    { label: 'replacement', value: 'replacement' },
    { label: 'success_story', value: 'success_story' },
    { label: 'high_value_story', value: 'high_value_story' },
]

const faultList = [
    { label: 'Found', value: '1' },
    { label: 'Not Found', value: '2' },
    { label: 'Preventative Maintenance', value: '3' },
    { label: 'No Feedback', value: '4' },
]

const AddEventValidationSchema = Yup.object().shape({
    // closer_type: Yup.string()
    //     .required("Closer Type is required"),
    // defination: Yup.string()
    //     .required("Defination is required"),
    ImpactDescription: Yup.string()
        .required("Impact Description is required"),
    IssueDescription: Yup.string().required('Issue is Required'),
    FaultDescription: Yup.string().required("Fault Description is Required"),
    WorkShopFinding: Yup.string().required("Workshop Finding is Required"),
    FaultID: Yup.string().required("Fault is Required"),
});

const ExceptionCloser = ({ close }) => {
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({
        // closer_type: "",
        // defination: "",
        ImpactDescription: "",
        FaultDescription: "",
        IssueDescription: "",
        WinDescription: "",
        WorkShopFinding: "",
        FaultID: "",
    })

    let REMSDetails = useSelector(
        (state) => state.exceptionDetailsReducer.REMSDetails
    );
    
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        if(REMSDetails.length > 0){
            let payload = REMSDetails[0]
            payload = {
                ...payload, 
                ...values, 
                FaultID: parseInt(values.FaultID),
                statusId: 5
            }
            console.log(payload)
            let final_payload = {
                eventDetail: {
                    eventId: payload.eventId,
                    subSiteCode: payload.subSiteCode,
                    equipmentName: payload.equipmentName,
                    eventTypeId: payload.eventTypeId,
                    functionalLocation: payload.functionalLocation,
                    impactId: payload.impactId,
                    responsibleEmail: payload.responsibleEmail,
                    statusId: payload.statusId,
                    urgencyId: payload.urgencyId,
                    eventSourceList: payload.eventSourceList,
                    eventSource: payload.eventSource,
                    eventSourceIds: payload.eventSourceIds,
                    acknowledgedBy: payload.acknowledgedBy,
                    acknowledgedDateTime: payload.acknowledgedDateTime,
                    closureComments: payload.closureComments,
                    cmacomment: payload.cmacomment,
                    comments: payload.comments,
                    createdBy: payload.createdBy,
                    createdByName: payload.createdByName,
                    createdDate: payload.createdDate,
                    equipmentTypeCode: payload.equipmentTypeCode,
                    escalationId: payload.escalationId,
                    eventClosedDate: payload.eventClosedDate,
                    eventStartDate: payload.eventStartDate,
                    eventTypeName: payload.eventTypeName,
                    faultId: payload.faultId,
                    faultName: payload.faultName,
                    feedbackRating: payload.feedbackRating,
                    functionalLevel1: payload.functionalLevel1,
                    functionalDescription: payload.functionalDescription,
                    isAcknowledged: payload.isAcknowledged,
                    isActive: payload.isActive,
                    isEmailRequired: payload.isEmailRequired,
                    impactName: payload.impactName,
                    isManualNotification: payload.isManualNotification,
                    modifiedBy: payload.modifiedBy,
                    modifiedDate: payload.modifiedDate,
                    monitorDate: payload.monitorDate,
                    notification: payload.notification,
                    notificationCreationDate: payload.notificationCreationDate,
                    notificationText: payload.notificationText,
                    responsibleName: payload.responsibleName,
                    targetDate: payload.targetDate,
                    type: payload.type,
                    urgencyName: payload.urgencyName,
                    workShopFault: payload.workShopFault,
                    workOrder: payload.workOrder,
                    workShopFinding: payload.workShopFinding,
                    modifiedByName: payload.modifiedByName,
                    recommendation: payload.recommendation,
                    nextServiceDate: payload.nextServiceDate,
                    generalComment: payload.generalComment,
                    winTypeID: payload.winTypeID,
                    winDescription: payload.winDescription,
                    reopenreason: payload.reopenreason,
                    reportAttachmentID: "00000000-0000-0000-0000-000000000000"
                },
                attachments: null,
                discussions: null,
                eventSources: null
            }
            console.log(final_payload)
            const resoponse = await RemsAPI.put("/conmon/update", final_payload)
        }
        setSubmitting(true)
        alert('wooohooo')
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={AddEventValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors, isSubmitting, values, setFieldValue, handleChange, handleBlur }) => {
                    return !isSubmitting ? (
                        <div className="wrap" style={{ backgroundColor: 'white' }}>
                            <div className="popup-header"><h6>Closure <span className="close-dialogbox"><i className="icon-close" onClick={close}></i></span></h6></div>
                            <div className="add-event-form-block" style={{ maxHeight: '70vh', width: '100%' }}>
                                <Form autoComplete="off">
                                    <div className="form-block" style={{ width: '90%' }}>
                                        <div className="py-3">
                                            <div className="row" >
                                                <div className="col-md-5" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group field-text" >
                                                        <label>Fault</label>
                                                            {
                                                                faultList.map((value, index) => (
                                                                    <div key={index}>
                                                                        <Field
                                                                            type="radio"
                                                                            name="FaultID"
                                                                            id={value.value}
                                                                            value={value.value}
                                                                        />
                                                                        <label htmlFor={value.value}>{value.label}</label>
                                                                    </div>
                                                                ))
                                                            }
                                                        <div className='error'>{errors.FaultID && touched.FaultID && errors.FaultID}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-md-11" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group">
                                                        <label>Workshop finding</label>
                                                        <div className="custom-input">
                                                            <textarea
                                                                type="text"
                                                                name="WorkShopFinding"
                                                                value={values.WorkShopFinding}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Enter Workshop Finding"
                                                                rows="3"
                                                                style={{ maxHeight: '50px' }}

                                                            ></textarea>
                                                        </div>
                                                        <div className='error'>{errors.WorkShopFinding && touched.WorkShopFinding && errors.WorkShopFinding}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="row" >
                                                <div className="col-md-5" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group field-text" >
                                                        <CustomSelect
                                                            label='Closure Type'
                                                            className='input'
                                                            onChange={event => {
                                                                setFieldValue('closer_type', event.target.value);
                                                            }}
                                                            value={values.closer_type}
                                                            options={mylist}
                                                        />
                                                        <div className='error'>{errors.closer_type && touched.closer_type && errors.closer_type}</div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* <div className="row" >
                                                <div className="col-md-11" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group">
                                                        <label>Defination</label>
                                                        <div className="custom-input">
                                                            <textarea
                                                                type="text"
                                                                name="defination"
                                                                value={values.defination}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Enter defination"
                                                                rows="3"
                                                                style={{ maxHeight: '50px' }}

                                                            ></textarea>
                                                        </div>
                                                        <div className='error'>{errors.defination && touched.defination && errors.defination}</div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="row" >
                                                <div className="col-md-11" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group">
                                                        <label>Fault Description</label>
                                                        <div className="custom-input">
                                                            <textarea
                                                                type="text"
                                                                name="FaultDescription"
                                                                value={values.fault}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Enter Fault"
                                                                rows="3"
                                                                style={{ maxHeight: '50px' }}

                                                            ></textarea>
                                                        </div>
                                                        <div className='error'>{errors.FaultDescription && touched.FaultDescription && errors.FaultDescription}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-md-11" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group">
                                                        <label>Impact Description</label>
                                                        <div className="custom-input">
                                                            <textarea
                                                                type="text"
                                                                name="ImpactDescription"
                                                                value={values.ImpactDescription}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Enter Impact Description"
                                                                rows="3"
                                                                style={{ maxHeight: '50px' }}

                                                            ></textarea>
                                                        </div>
                                                        <div className='error'>{errors.ImpactDescription && touched.ImpactDescription && errors.ImpactDescription}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-md-11" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group">
                                                        <label>Issue Description</label>
                                                        <div className="custom-input">
                                                            <textarea
                                                                type="text"
                                                                name="IssueDescription"
                                                                value={values.IssueDescription}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Enter Issue Description"
                                                                rows="3"
                                                                style={{ maxHeight: '50px' }}

                                                            ></textarea>
                                                        </div>
                                                        <div className='error'>{errors.IssueDescription && touched.IssueDescription && errors.IssueDescription}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-md-11" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group">
                                                        <label>Closer Description</label>
                                                        <div className="custom-input">
                                                            <textarea
                                                                type="text"
                                                                name="WinDescription"
                                                                value={values.WinDescription}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Enter Closer Description"
                                                                rows="3"
                                                                style={{ maxHeight: '50px' }}
                                                            ></textarea>
                                                        </div>
                                                        <div className='error'>{errors.WinDescription && touched.WinDescription && errors.WinDescription}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="text-center py-3">
                                        <button
                                            type="submit"
                                            className="mx-2"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="submit"
                                            className="mx-2"
                                            onClick={close}
                                        >
                                            discard
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    ) : null
                }
                }
            </Formik>
        </div>
    );
};

export default ExceptionCloser;
