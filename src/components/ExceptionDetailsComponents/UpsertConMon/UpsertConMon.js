import React, { useState, useEffect } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import CustomSelect from "../../Common/CustomSelect";
import DatePicker from "react-datepicker";
import "./UpsertConMon.scss"
import RemsAPI from "../../../API/RemsAPI"
import API from "../../../API/API"
import moment from "moment";
import DropdownTreeSelect from 'react-dropdown-tree-select'

import { objectWithCustomKeys } from "../../../utils/Utility";
import { fetchExceptionDetails, fetchExceptionPMStatusNextDate, fetchExceptionStatus, fetchRemsConmonWatchlistValues } from "../../../redux/exception-details/exceptionDetailsThunks";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const SiteCodeMapper = {
    IB: "IBJFLEET",
    CC: "CCFLEET",
    EW: "EWFLEET",
    CB: "CBFLEET",
    SM: "SOLFLEET"
}

const targetDateMapper = {
    '1': 2,
    '2': 7,
    '3': 28,
    '4': 28,
    '5': null,
}


const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <DatePicker
            {...field}
            {...props}
            selected={field.value && new Date(field.value)}
            onChange={(val) => {
                setFieldValue(field.name, val);
            }}
        />
    );
};

const AddEventValidationSchema = Yup.object().shape({
    equipment: Yup.string()
        .required("Equipment is required"),
    functional_location: Yup.string()
        .required("Function Location is required"),

    event_status: Yup.string()
        .required("Event Status is required"),
    event_urgency: Yup.string()
        .required("Event Urgency is required"),
    event_priority: Yup.string()
        .required("Event Priority is required"),
    event_title: Yup.string()
        .required("Event Title is required"),
    target_date: Yup.string()
        .required("Target Date is required"),
    next_service_date: Yup.string()
        .required("Next Service Date is required"),
    responsible: Yup.string()
        .required("Responsible name is required"),
    event_source: Yup.string()
        .required("Event Source is required"),
    workorder: Yup.number()
    .when('event_status', {
        is: value => value && value === "3",
        then: Yup
            .number()
            .required('Work Order is Required'),
    }),
    notification: Yup.number()
    .when('event_status', {
        is: value => value && value !== "1",
        then: Yup
            .number()
            .required('Please enter number only.'),
    }),
});

const UpsertConMon = ({ close }) => {
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({
        equipment: "",
        functional_location: "",
        event_title: "",
        event_urgency: "",
        target_date: "",
        next_service_date: "",
        event_priority: "",
        responsible: "",
        event_source: "8",
        event_status: "",

        event_description: "",
        recommendation: "",
        general_comments: "",
        notification: "",
        workorder: "",
    })

    const [eventStatusList, setEventStatusList] = useState([]);
    const [eventUrgencyList, setEventUrgencyList] = useState([]);
    const [eventPriorityList, setEventPriorityList] = useState([]);
    const [eventSourceList, setEventSourceList] = useState([]);
    const [functionalLocationList, setFunctionalLocationList] = useState([]);
    const [groupedFunctionalLocation, setGroupedFunctionalLocation] = useState([]);

    let selectedEquipment = useSelector(state => state.exceptionDetailsReducer.selectedEquipment);
    selectedEquipment = selectedEquipment?.length > 0 ? selectedEquipment[0] : {};

    let selectedException = useSelector(state => state.exceptionDetailsReducer.selectedException);
    selectedException = selectedException?.length > 0 ? selectedException[0] : {};

    const remsOptions = useSelector(state => state.exceptionDetailsReducer.remsOptions);
    const functionalLocations = useSelector(state => state.exceptionDetailsReducer.functionalLocations);
    const userPreferences = useSelector(state => state.userPreferencesReducer.userPreferences);
    const authenticatedUser = useSelector(state => state.authenticationReducer.user);
    const lastNextDate = useSelector(state => state.exceptionDetailsReducer.lastNextDate)

    useEffect(() => {
        setInitialValues((initialValues) => ({
            ...initialValues,
            equipment: selectedEquipment?.asset_name,
            responsible: authenticatedUser?.user_name + " " + authenticatedUser?.user_family_name,
            next_service_date: new Date(moment(lastNextDate?.next_date).subtract(new Date(lastNextDate?.next_date).getTimezoneOffset(), 'minutes'))
        }))
    }, [selectedEquipment, authenticatedUser, lastNextDate])

    useEffect(() => {
        if (functionalLocations.length > 0) {
            try {
                let functionalLocationArray = functionalLocations?.map((value) => ({ functionalLocation: value.FunctionalLocation, Description: value.Description }))
                functionalLocationArray = functionalLocationArray.sort(function (a, b) {
                    if (a.functionalLocation > b.functionalLocation) {
                        return 1;
                    }
                    if (b.functionalLocation > a.functionalLocation) {
                        return -1;
                    }
                    return 0;
                })
                // functionalLocationArray = functionalLocationArray.map((value, index) => {
                //     return {
                //         ...value,
                //         functionalLocation: value.functionalLocation.replace(selectedEquipment.asset_name + " ", selectedEquipment.asset_name)
                //     }
                // })
                functionalLocationArray = functionalLocationArray.map((value, index) => {
                    return {
                        ...value,
                        functionalLocation: value.functionalLocation.split("-")
                    }
                })
                
                functionalLocationArray = functionalLocationArray.map(v => {
                    let assetIndex = -1;
                    if (v.functionalLocation.indexOf(selectedEquipment.asset_name) !== -1){
                        assetIndex = v.functionalLocation.indexOf(selectedEquipment.asset_name)
                    }
                    if (v.functionalLocation.indexOf(selectedEquipment.asset_name + " ") !== -1){
                        assetIndex = v.functionalLocation.indexOf(selectedEquipment.asset_name + " ")
                    }
                    if (assetIndex === -1) {
                        throw v.functionalLocation.join("") + "Valus is not valid";
                    }
                    let splittedFunctionalLocation = [v.functionalLocation.splice(0, assetIndex + 1).join("-"), ...v.functionalLocation]
                    let value = {
                        splittedFunctionalLocation,
                        Description: v.Description,
                        value: splittedFunctionalLocation.join("-")
                    }
                    return value
                })
                const addChild = (ids, arr, label, description) => {
                    const value = ids.shift();
                    let index = arr.findIndex(item => item.flag === value );
                    if (index < 0) {
                        arr.push({ value: label, children: [], label: value + "( " + description + " )", flag: value});
                        index = arr.length - 1; 
                    }
                    if (ids.length > 0) {
                        const children = arr[index].children;
                        addChild(ids, children, label, description);
                    }
                }
                setGroupedFunctionalLocation(_.cloneDeep(functionalLocationArray.reduce((tree, item) => {
                    addChild(item.splittedFunctionalLocation, tree, item.value, item.Description);
                    return tree;
                }, [])));
            } catch (error) {
                console.log(error)
            }
        }
    }, [functionalLocations])

    useEffect(() => {
        setEventUrgencyList(objectWithCustomKeys(remsOptions["CONMON_URGENCY"], { UrgencyID: 'value', Urgency: 'label' }))
        setEventStatusList(objectWithCustomKeys(remsOptions["CONMON_STATUS"], { StatusID: 'value', Status: 'label', StatusCode: 'code' }))
        setEventPriorityList(objectWithCustomKeys(remsOptions["CONMON_PRIORITY"], { ImpactID: 'value', ImpactCode: 'name', ImpactName: 'label' }))
        setEventSourceList(objectWithCustomKeys(remsOptions["CONMON_SOURCE"], { SourceID: 'value', SourceName: 'label', SourceCode: 'code' }))
    }, [remsOptions])
    
    useEffect(() => {
        setFunctionalLocationList(objectWithCustomKeys(functionalLocations, { FunctionalLocation: 'value' }));
        setFunctionalLocationList(objectWithCustomKeys(functionalLocations, { FunctionalLocation: 'label' }));
    }, [functionalLocations])

    useEffect(() => {
        if (selectedException.event_start_time) {
            dispatch(
                fetchExceptionPMStatusNextDate({
                    startdate: selectedException.event_start_time,
                    equipmentID: selectedException.equipment_id
                })
            );
        }
    }, [selectedException, dispatch]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        let event_start_time = new Date(selectedException?.event_start_time)
        let created_date = new Date(moment.now())
        let data = {
            subSiteCode: SiteCodeMapper[selectedEquipment?.site_id_current],
            equipmentName: values.equipment,
            functionalLocation: values.functional_location,
            impactId: parseInt(values.event_priority),
            responsibleEmail: authenticatedUser?.user_email,
            statusId: parseInt(values.event_status),
            urgencyId: parseInt(values.event_urgency),
            eventSource: values.event_source,
            equipmentTypeCode: "DOZR",
            eventStartDate: event_start_time,
            createdBy: authenticatedUser?.user_email,
            createdByName: authenticatedUser?.user_name,
            createdDate: created_date,
            cmacomment: values.event_description,
            comments: values.event_title,
            isActive: true,
            responsibleName: values.responsible,
            isManualNotification: true,
            notification: values.notification.toString(),
            notificationCreationDate: created_date,
            notificationText: "",
            type: "",
            workOrder: values.workorder.toString(),
            targetDate: values.target_date,
            recommendation: values.recommendation,
            nextServiceDate: values.next_service_date,
            generalComment: values.general_comments,
        }
        RemsAPI.post("/conmon/add/",
            data
        ).then((response) => {
            dispatch(fetchRemsConmonWatchlistValues({
                assetId: selectedEquipment.asset_name,
                siteCode: selectedEquipment.site_id_current
            }));
            API.put(`/exception-status`, {
                exception_id: selectedException.id,
                status: "S1",
                user_id: userPreferences?.user_id || null,
                reason_code: '',
                till_date: null,
                custom_reason_code: '',
            }).then((res) => {
                dispatch(fetchExceptionStatus(selectedException.id));
                MySwal.fire(
                    "Updated!",
                    "Exception status has been updated.",
                    "success"
                )
            }).catch(err => console.log(err));
            API.post("link-rems-event", {
                exception_id: selectedException.id,
                rems_event_id: response.data,
            }).then((res) => {
                dispatch(fetchExceptionDetails(selectedException.id))
            }).catch(error => console.log(error));

            close();
        }).catch((error) => { 
            console.log(`========${error}=========`)
            MySwal.fire(
                "Error!",
                "Event is not added.",
                "error"
            )
        })
        setSubmitting(false)
    }

    const checkTreeNode = (selectedValue) => {
        if (functionalLocations.length > 0) {
            try {
                let functionalLocationArray = functionalLocations?.map((value) => ({ functionalLocation: value.FunctionalLocation, Description: value.Description }))
                functionalLocationArray = functionalLocationArray.sort(function (a, b) {
                    if (a.functionalLocation > b.functionalLocation) {
                        return 1;
                    }
                    if (b.functionalLocation > a.functionalLocation) {
                        return -1;
                    }
                    return 0;
                })
                // functionalLocationArray = functionalLocationArray.map((value, index) => {
                //     return {
                //         ...value,
                //         functionalLocation: value.functionalLocation.replace(selectedEquipment.asset_name + " ", selectedEquipment.asset_name)
                //     }
                // })
                functionalLocationArray = functionalLocationArray.map((value, index) => {
                    return {
                        ...value,
                        functionalLocation: value.functionalLocation.split("-")
                    }
                })
                functionalLocationArray = functionalLocationArray.map(v => {
                    let assetIndex = -1;
                    if (v.functionalLocation.indexOf(selectedEquipment.asset_name) !== -1){
                        assetIndex = v.functionalLocation.indexOf(selectedEquipment.asset_name)
                    }
                    if (v.functionalLocation.indexOf(selectedEquipment.asset_name + " ") !== -1){
                        assetIndex = v.functionalLocation.indexOf(selectedEquipment.asset_name + " ")
                    }
                    if (assetIndex === -1) {
                        throw v.functionalLocation.join("") + "Valus is not valid";
                    }
                    let splittedFunctionalLocation = [v.functionalLocation.splice(0, assetIndex + 1).join("-"), ...v.functionalLocation]
                    let value = {
                        splittedFunctionalLocation,
                        Description: v.Description,
                        value: splittedFunctionalLocation.join("-")
                    }
                    return value
                })
                const addChild = (ids, arr, label, description) => {
                    const value = ids.shift();
                    let index = arr.findIndex(item => item.flag === value );
                    if (index < 0) {
                        arr.push({ value: label, children: [], label: value + "( " + description + " )", flag: value, checked: selectedValue === label ? true : false});
                        index = arr.length - 1; 
                    }
                    if (ids.length > 0) {
                        const children = arr[index].children;
                        addChild(ids, children, label, description);
                    }
                }
                setGroupedFunctionalLocation(_.cloneDeep(functionalLocationArray.reduce((tree, item) => {
                    addChild(item.splittedFunctionalLocation, tree, item.value, item.Description);
                    return tree;
                }, [])));
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={AddEventValidationSchema}
                onSubmit={handleSubmit}
                style={{}}
                enableReinitialize
            >
                {({ touched, errors, isSubmitting, values, setFieldValue, handleChange, handleBlur }) => {
                    return !isSubmitting ? (
                        <div className="wrap" style={{ backgroundColor: 'white' }}>
                            <div className="popup-header"><h6>Add Event <span className="close-dialogbox"><i className="icon-close" onClick={close}></i></span></h6></div>
                            <div className="add-event-form-block" style={{ maxHeight: '70vh', width: '100%' }}>
                                <Form autoComplete="off">
                                    <div className="form-block" style={{ width: '90%' }}>
                                        <div className="p-2" style={{ backgroundColor: '#EFEFEF' }}>
                                            <div>
                                                Equipment
                                            </div>
                                        </div>
                                        <div className="py-3">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <div className="custom-input">
                                                            <label>Equipment Name</label>
                                                            <input
                                                                name="equipment"
                                                                type="text"
                                                                value={values.equipment}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled={true}
                                                            ></input>
                                                        </div>
                                                        {errors.equipment && touched.equipment ? <div className='error'>{errors.equipment}</div> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-md-11">
                                                    <label>Functional Location</label>
                                                    <div className="form-group">
                                                        <div >
                                                            <DropdownTreeSelect texts={{ placeholder: values.functional_location ? ' ' : 'Select One' }} expanded data={groupedFunctionalLocation}
                                                                onChange={(currentNode) => {
                                                                    setFieldValue('functional_location', currentNode?.value);
                                                                    checkTreeNode(currentNode?.value)
                                                                }}

                                                                mode="radioSelect"
                                                                className="mdl-demo"
                                                            />
                                                            <img
                                                                src={window.location.origin + "/images/down-arrow.png"}
                                                                alt="header-icon1"
                                                                style={{ position: 'absolute', right: 22, top: 25, zIndex: 3 }}
                                                                width={35}
                                                                height={35}
                                                            />
                                                        </div>
                                                        {errors.functional_location && touched.functional_location ? <div className='error'>{errors.functional_location}</div> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-md-11" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group">
                                                        <label>Event Title</label>
                                                        <div className="custom-input">
                                                            <input
                                                                type="text"
                                                                name="event_title"
                                                                value={values.event_title}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Enter Event Title"
                                                            ></input>
                                                        </div>
                                                        <div className='error'>{errors.event_title && touched.event_title && errors.event_title}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-md-5" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group" >
                                                        <CustomSelect
                                                            label='Urgency'
                                                            className='input'
                                                            onChange={event => {
                                                                setFieldValue('event_urgency', event.target.value);
                                                                let days = targetDateMapper[event.target?.value];
                                                                setFieldValue('target_date', days ? new Date(moment().add(days, 'days').subtract(new Date().getTimezoneOffset, 'minutes')) : '');
                                                            }}
                                                            value={values.event_urgency}
                                                            options={eventUrgencyList}
                                                        />
                                                        <div className='error'>{errors.event_urgency && touched.event_urgency && errors.event_urgency}</div>
                                                    </div>
                                                </div>

                                                <div className="col-md-5 ml-5" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group" >
                                                        <CustomSelect
                                                            label='Priority'
                                                            className='input'
                                                            onChange={event => setFieldValue('event_priority', event.target.value)}
                                                            value={values.event_priority}
                                                            options={eventPriorityList}
                                                        />
                                                        {errors.event_priority && touched.event_priority ? <div className='error'>{errors.event_priority}</div> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row" >
                                                <div className="col-md-5" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group" >
                                                        <label htmlFor="target_date">Target Date</label>
                                                        <DatePickerField
                                                            name="target_date"
                                                            placeholderText="Select Target Date"
                                                            dateFormat="dd/MM/yyyy"
                                                        />
                                                        <div className='error'>{errors.target_date && touched.target_date && errors.target_date}</div>
                                                    </div>
                                                </div>

                                                <div className="col-md-5 ml-5" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group" >
                                                        <label htmlFor="next_service_date">Next Service Date</label>
                                                        <DatePickerField
                                                            name="next_service_date"
                                                            placeholderText="Select Service Date"
                                                            dateFormat="dd/MM/yyyy"
                                                        />
                                                        <div className='error'>{errors.next_service_date && touched.next_service_date && errors.next_service_date}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <div className="custom-input">
                                                            <label>Responsible</label>
                                                            <input
                                                                name="responsible"
                                                                type="text"
                                                                value={values.responsible}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                disabled={true}
                                                            ></input>
                                                        </div>
                                                        {errors.responsible && touched.responsible ? <div className='error'>{errors.responsible}</div> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-md-5" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group" >
                                                        <CustomSelect
                                                            label='Source'
                                                            className='input'
                                                            onChange={event => setFieldValue('event_source', event.target.value)}
                                                            value={values.event_source}
                                                            defaultValue={"8"}
                                                            options={eventSourceList}
                                                        />
                                                        <div className='error'>{errors.event_source && touched.event_source && errors.event_source}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-5" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group" >
                                                        <CustomSelect
                                                            label='Status'
                                                            className='input'
                                                            onChange={event => setFieldValue('event_status', event.target.value)}
                                                            value={values.event_status}
                                                            options={eventStatusList}
                                                        />
                                                        {errors.event_status && touched.event_status ? <div className='error'>{errors.event_status}</div> : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2" style={{ backgroundColor: '#EFEFEF' }}>
                                            <div>
                                                Event Details
                                            </div>
                                        </div>
                                        <div className="py-3">
                                            <div className="row" >
                                                <div className="col-md-11" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group">
                                                        <label>Event Description</label>
                                                        <div className="custom-input">
                                                            <textarea
                                                                name="event_description"
                                                                value={values.event_description}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Enter Event description"
                                                            ></textarea>
                                                        </div>
                                                        <div className='error'>{errors.event_description && touched.event_description && errors.event_description}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-md-11" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group">
                                                        <label>Recommendation</label>
                                                        <div className="custom-input">
                                                            <textarea
                                                                name="recommendation"
                                                                value={values.recommendation}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Enter Recommendation"
                                                            ></textarea>
                                                        </div>
                                                        <div className='error'>{errors.recommendation && touched.recommendation && errors.recommendation}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-md-11" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group">
                                                        <label>General Comments</label>
                                                        <div className="custom-input">
                                                            <textarea
                                                                name="general_comments"
                                                                value={values.general_comments}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Enter General Comments"
                                                            ></textarea>
                                                        </div>
                                                        <div className='error'>{errors.general_comments && touched.general_comments && errors.general_comments}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >
                                                <div className="col-md-5" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group">
                                                        <label>Notification</label>
                                                        <div className="custom-input">
                                                            <input
                                                                type="number"
                                                                name="notification"
                                                                value={values.notification}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Enter Notification No"
                                                            ></input>
                                                        </div>
                                                        <div className='error'>{errors.notification && touched.notification && errors.notification}</div>
                                                    </div>
                                                </div>

                                                <div className="col-md-5 ml-5" style={{ border: 1, borderWidth: 1, }}>
                                                    <div className="form-group">
                                                        <label>Work Order</label>
                                                        <div className="custom-input">
                                                            <input
                                                                type="number"
                                                                name="workorder"
                                                                value={values.workorder}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="Enter functional description"
                                                            ></input>
                                                        </div>
                                                        <div className='error'>{errors.workorder && touched.workorder && errors.workorder}</div>
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

export default UpsertConMon;
