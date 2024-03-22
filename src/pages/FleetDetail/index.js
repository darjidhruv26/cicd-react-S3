import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header/Header";
import fileDownload from 'js-file-download'
import { DashboardDetailSubheader } from "../../layouts/SubHeader/DashboardDetailSubheader";
import { ProductInfo } from "../../components/fleetDetailsComponent/ProductInfo";
import { TopRecommendation } from "../../components/fleetDetailsComponent/TopRecommendation";
import { TopFaultCodes } from "../../components/fleetDetailsComponent/TopFaultCodes";
import { ConsumableRemainingLife } from "../../components/fleetDetailsComponent/ConsumableRemainingLife";
import { RecommendationsTable } from "../../components/fleetDetailsComponent/RecommendationsTable";
import { Comments } from "../../components/fleetDetailsComponent/Comments";
import { AppMenuTrigger } from "../../layouts/AppMenuTrigger";
import UploadFileComponent from "../../components/Common/UploadFilesComponent";
import { useDispatch, useSelector } from "react-redux";
import {  fetchFleetComments, fetchFleetDetails } from "../../redux/fleet-details/fleetDetailsThunks";
import API from "../../API/API";
import { fetchFleetUploadedDocuments } from "../../redux/fleet-details/fleetDetailsThunks";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CategorywiseTables } from "../../components/SummaryPageComponent";
import { useParams } from "react-router-dom";

const MySwal = withReactContent(Swal);

const FleetDetail = () => {
  const dispatch = useDispatch();

  let uploadedFleetDocuments = useSelector(state => state.fleetDetailsReducer.uploadedDocumentList);
  let fleetDetails = useSelector(state => state.fleetDetailsReducer.fleetDetails);
  const { assetName } = useParams();

  const [visiblityStatus, setVisiblityStatus] = useState(false);
  const [fleet, setFleet] = useState({
    asset_name: '',
    site_name_current: '',
    fleet_type: '',
    model: '',
    serial_number: '',
    site_id_current: '',
    exceptions: [],
  })
  
  useEffect(() => {
    dispatch(fetchFleetComments(null));
    dispatch(fetchFleetDetails(assetName));
  }, [dispatch]);

  useEffect(() => {
    fleetDetails.length && setFleet({...fleetDetails[0]});
  },[fleetDetails]);
  // console.log("===========",fleetDetails);
  
  const handleManuClick = () => {
    setVisiblityStatus(!visiblityStatus);
  };

  const handleFileUpdload = (file) => {
    let formData = new FormData();

    Object.keys(file).forEach((key) => {
      formData.append("myFile", file[key]);
      formData.append("file_name", file[key].name);
    });
    formData.append("id", null);
    formData.append("equipment_id", fleet?.asset_name);

    formData.append("user_id", null);
    formData.append("document_type", "fleet");

    let formdata_obj = {};

    formData.forEach((value, key) => (formdata_obj[key] = value));
    formdata_obj = JSON.stringify(formdata_obj);

    const headers = {
      "Content-Type": "application/json",
    };
    API.post(`/document`, formData, { headers }).then((res) => {
      dispatch(fetchFleetUploadedDocuments(null));
      MySwal.fire("Uploaded!", "document has been uploaded.", "success");
    }).catch(error => MySwal.fire("failure !", error));
  };

  const handlePreviousRowDelete = (e) => {
    e.preventDefault();
    const docId = e.target.dataset?.docId;

    const headers = {
      "Content-Type": "application/json",
    };
    API.delete(`/document`, {
      params: {
        id: docId,
        document_type: "fleet",
      },
      headers,
    }).then((res) => {
      dispatch(fetchFleetUploadedDocuments(null));
      MySwal.fire("Deleted!", "document has been deleted.", "success");
    });
  };

  const handleDownload = (e) => {
    e.preventDefault();
    console.log(API);
    const object_url = e.target.closest("span").dataset.url;
    const file_name = e.target.closest("span").dataset.filename;

    API.get("/download-document", {
      responseType: 'blob',
      headers:{
        "Accept": "application/octet-stream",
        "Content-Type": "application/octet-stream"
      },
      params: {
        object_url,
        file_name
      },
    }).then((res) => {
      fileDownload(res.data, res.headers['content-disposition'].replace('attachment; filename=', ""));
    });
  };

  return (
    <>
      <Header
        subHeader={<DashboardDetailSubheader />}
        handleManuClick={handleManuClick}
        menuVisiblityStatus={visiblityStatus}
        headerIcon={window.location.origin + "/images/graph.svg"}
        heading="Fleet Details"
      />
      <div id="main" className="fleet-details">
        {visiblityStatus ? (
          <AppMenuTrigger
            className={`${visiblityStatus ? "fadeIn" : "fadeOut"}`}
          />
        ) : (
          <>
            <ProductInfo asset={fleet}/>
            <div className="recommendation-section">
              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <div className="row mx-n5">
                    <TopRecommendation asset={fleet} />
                    <TopFaultCodes asset={fleet} />
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <ConsumableRemainingLife />
                </div>
              </div>
              <CategorywiseTables
                logoImage="fault-code"
                heading="Fault Codes"
                data={
                  fleet?.exceptions
                }
                type={"fault-codes"}
              />
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <RecommendationsTable asset={fleet}/>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="row recommendation-upload mt-0">
                    <Comments />
                    <UploadFileComponent
                      previousSelectedItem={uploadedFleetDocuments}
                      handleFileSelect={handleFileUpdload}
                      handleDeleteRow={handlePreviousRowDelete}
                      handleDownload={handleDownload}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FleetDetail;
