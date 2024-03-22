import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../layouts/Header/Header";
import EquipmentDetails from "../../components/ExceptionDetailsComponents/EquipmentDetails/EquipmentDetails";
import EquipmentManagement from "../../components/ExceptionDetailsComponents/EquipmentManagement/EquipmentManagement";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExceptionDetails,
  fetchEquipmentDetails,
  fetchExceptionComments,
  fetchExceptionStatus,
  fetchExceptionDocuments,
  fetchExceptionStatusValues,
  fetchExceptionReasonValues,
  fetchREMSOptions,
  fetchFunctionalLocations,
  fetchExceptionHistory,
  fetchREMSDetails,
  fetchExceptionManagementHistory,
} from "../../redux/exception-details/exceptionDetailsThunks";
import { ExceptionDetailSubheader } from "../../layouts/SubHeader";
import { AppMenuTrigger } from "../../layouts/AppMenuTrigger";
import { resetExceptionDetails } from "../../redux/exception-details/exceptionDetailsSlice";

const ExceptionDetails = () => {
  const dispatch = useDispatch();
  const { exceptionId } = useParams();
  const [visiblityStatus, setVisiblityStatus] = useState(false);

  const showIframeExtend = useSelector(state => state.exceptionDetailsReducer.iframefullScreen);
  const selectedException = useSelector(state => state.exceptionDetailsReducer.selectedException);
  
  const handleManuClick = () => {
    setVisiblityStatus(!visiblityStatus);
  };

  useEffect(() => {
    const fetchExceptionStatusValuesPromise = dispatch(fetchExceptionStatusValues());
    const fetchExceptionReasonValuesPromise = dispatch(fetchExceptionReasonValues());
    const fetchREMSOptionsPromise = dispatch(fetchREMSOptions());
    return () => {
      fetchExceptionStatusValuesPromise.abort()
      fetchExceptionReasonValuesPromise.abort()
      fetchREMSOptionsPromise.abort()
    };
  }, [dispatch]);

  useEffect(() => {
    const fetchExceptionDetailsPromise = dispatch(fetchExceptionDetails(exceptionId));
    const fetchEquipmentDetailsPromise = dispatch(fetchEquipmentDetails(exceptionId));
    const fetchExceptionCommentsPromise = dispatch(fetchExceptionComments(exceptionId));
    const fetchExceptionStatusPromise = dispatch(fetchExceptionStatus(exceptionId));
    const fetchExceptionDocumentsPromise = dispatch(fetchExceptionDocuments(exceptionId));
    return () => {
      fetchExceptionDetailsPromise.abort()
      fetchEquipmentDetailsPromise.abort()
      fetchExceptionCommentsPromise.abort()
      fetchExceptionStatusPromise.abort()
      fetchExceptionDocumentsPromise.abort()
    };
  }, [dispatch, exceptionId]);


  useEffect(() => {
    selectedException?.length && dispatch(fetchFunctionalLocations({EquipmentName: selectedException[0].equipment_id}));
  }, [selectedException, dispatch])

  useEffect(() => {
    if (selectedException?.length > 0 && selectedException[0]?.equipment_id && selectedException[0]?.event_template){
      dispatch(fetchExceptionHistory({
        event_template: selectedException[0].event_template,
        equipment_id: selectedException[0].equipment_id,
        exception_id: selectedException[0].id,
      }));
      dispatch(fetchExceptionManagementHistory({
        exception_id: selectedException[0].id,
      }));
    }
    const fetchREMSDetailsPromise = dispatch(fetchREMSDetails({remsId: selectedException?.length && selectedException[0]?.rems_event_id}));
    return () => {
      fetchREMSDetailsPromise.abort()
    };
  }, [selectedException, dispatch]);

  useEffect(() => {
        return () => {
      dispatch(resetExceptionDetails());
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      {!showIframeExtend ? (
        <Header
          subHeader={<ExceptionDetailSubheader />}
          headerIcon={window.location.origin + "/images/expectation.svg"}
          heading="Exception Details"
          handleManuClick={handleManuClick}
          menuVisiblityStatus={visiblityStatus}
        />
      ) : null}
      <div id="main" className={`${visiblityStatus ? "app-btn-active" : ""}`}>
        {visiblityStatus ? (
          <AppMenuTrigger
            className={`${visiblityStatus ? "fadeIn" : "fadeOut"}`}
          />
        ) : (
          <>
            {!showIframeExtend ? <EquipmentDetails /> : null}
            <EquipmentManagement />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default ExceptionDetails;
