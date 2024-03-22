import React, { useState } from "react";
import API from "../../../API/API";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import fileDownload from "js-file-download";
import { fetchExceptionDocuments } from "../../../redux/exception-details/exceptionDetailsThunks";
import ExceptionDetailsComments from "../ExceptionDetailsComments/ExceptionDetailsComments";
import ExceptionDetailsUploadFiles from "../../Common/UploadFilesComponent";
import ExceptionDetailsTabView from "../ExceptionDetailsTabView/ExceptionDetailsTabView";
import ExceptionDetailsIFrame from "../ExceptionDetailsIFrame/ExceptionDetailsIFrame";
import { useSelector, useDispatch } from "react-redux";
import { fetchFleetDetails } from "../../../redux/fleet-details/fleetDetailsThunks";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const EquipmentManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [fullTab, setFullTab] = useState(false);

  let selectedExceptionDocuments = useSelector(
    (state) => state.exceptionDetailsReducer.selectedExceptionDocuments
  );

  let selectedException = useSelector(
    (state) => state.exceptionDetailsReducer.selectedException
  );
  selectedException = selectedException?.length > 0 ? selectedException[0] : {};

  let selectedEquipment = useSelector(
    (state) => state.exceptionDetailsReducer.selectedEquipment
  );
  selectedEquipment = selectedEquipment?.length > 0 ? selectedEquipment[0] : {};

  const showIframeExtend = useSelector(
    (state) => state.exceptionDetailsReducer.iframefullScreen
  );
  
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
  return (
    <div
      className={`product-manage-section ${
        showIframeExtend ? "full-screen" : ""
      }`}
    >
      <div className="wrap">
        <div className="cols cols2">
            <div className="col">
             {!showIframeExtend && ( <div className="product-manage-box">
                <ExceptionDetailsTabView   />
              </div>
                )}
             {/* {!showIframeExtend && ( <div className="product-manage-box"> */}
              {/* <div className="cols cols2"> */}
                {/* <ExceptionDetailsComments />
                <ExceptionDetailsUploadFiles
                  previousSelectedItem={selectedExceptionDocuments}
                  handleFileSelect={handleFileSelect}
                  handleDeleteRow={handlePreviousRowDelete}
                  handleDownload={handleDownload}
                /> */}
              {/* </div> */}
            {/* </div>)} */}
       
         {showIframeExtend && (
            <ExceptionDetailsIFrame
              pivision_url={selectedException?.pivision_url}
            />
          )}  </div>
      </div></div>
    </div>
  );
};

export default EquipmentManagement;
