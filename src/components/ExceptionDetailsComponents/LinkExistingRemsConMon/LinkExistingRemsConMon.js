import React, { useState, useParams, useEffect } from 'react'
import "./LinkExistingRemsConMon.scss"
import { useSelector, useDispatch } from 'react-redux'
import API from "../../../API/API"
import Swal from 'sweetalert2'
import { fetchExceptionDetails } from '../../../redux/exception-details/exceptionDetailsThunks'
import moment from "moment";

const LinkExistingRemsConMon = (selectedConmon, handleStateChange) => {

    const dispatch = useDispatch();

    let remsWatchlistRecords = useSelector(
        (state) => state.exceptionDetailsReducer.remsConmonWatchlistRecord
    );

    let selectedException = useSelector(
        (state) => state.exceptionDetailsReducer.selectedException
    );

    const onSubmit = () => {
        API.post("link-rems-event", {
            exception_id: selectedException[0].id,
            rems_event_id: selectedConmon
        }).then((res) => {
            Swal.fire("REMS Linked to this exception.");
            console.log(selectedException[0].exception_id)
            dispatch(fetchExceptionDetails(selectedException[0].exception_id))
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="form-group">
            <label>Existing Conmon Items</label>
            <div className="custom-select">
                <select
                    defaultValue={selectedConmon}
                    value={selectedConmon}
                    onChange={handleStateChange}
                >
                    {remsWatchlistRecords.map((value, index) => (
                        <option value={value.eventId} key={index} title={`${moment(value.createdDate).format("YYYY/MM/DD hh:mm a")} - ${value.urgencyName} - ${value.comments}`}>{moment(value.createdDate).format("YYYY/MM/DD hh:mm a")} - {value.urgencyName}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default LinkExistingRemsConMon;