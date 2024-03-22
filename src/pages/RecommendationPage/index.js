import { useEffect, useState } from "react";
import fileDownload from 'js-file-download'
import Header from "../../layouts/Header/Header";
import { ExceptionDetailSubheader } from "../../layouts/SubHeader";
import { AppMenuTrigger } from "../../layouts/AppMenuTrigger";
import {
  ProductInfoSection,
  RecommendationForm,
  AddEditComment,
  RelatedRecommendationsTable,
} from "../../components/RecommendationComponent";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API from "../../API/API";
import UploadFilesComponent from "../../components/Common/UploadFilesComponent";
import {
  fetchRecommendationUploadedDocuments,
  fetchRecommendationDetailsByException,
  fetchRecommendationComments,
} from "../../redux/recommendation/RecommendationThunks";
import ExceptionDetailsComments from "../../components/ExceptionDetailsComponents/ExceptionDetailsComments/ExceptionDetailsComments";
import { useLocation } from "react-router-dom";

const MySwal = withReactContent(Swal);

const RecommendationPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(
      fetchRecommendationDetailsByException({
        exception_id: location.state.exceptionId,
      })
    );
    dispatch(fetchRecommendationComments(null));
  });

  let selectedEquipment = useSelector(
    (state) => state.exceptionDetailsReducer.selectedEquipment
  );
  selectedEquipment = selectedEquipment?.length > 0 ? selectedEquipment[0] : {};

  let uploadedRecommendationDocuments = useSelector(
    (state) => state.recommendationReducer.uploadedRecommendationDocuments
  );

  const [visiblityStatus, setVisiblityStatus] = useState(false);
  const [searchVisiblity, setSearchVisiblity] = useState(false);

  const handleManuClick = () => {
    setVisiblityStatus(!visiblityStatus);
  };

  const handleSearchClick = (status) => {
    setSearchVisiblity(status);
  };

  const handleFormSubmit = (data) => {
    data = { ...data, exception_id: location.state.exceptionId };
    if ("id" in data) {
      API.put(`/recommendations`, data)
        .then((res) => {
          MySwal.fire("success", res.data.message);
        })
        .catch((error) => MySwal.fire("failure !", error));
    } else {
      API.post(`/recommendations`, data)
        .then((res) => {
          MySwal.fire("success", res.data.message);
        })
        .catch((error) => MySwal.fire("failure !", error));
    }
  };

  const handleFileUpdload = (file) => {
    let formData = new FormData();

    Object.keys(file).forEach((key) => {
      formData.append("myFile", file[key]);
      formData.append("file_name", file[key].name);
    });
    formData.append("id", null);
    formData.append("equipment_id", selectedEquipment.asset_name);

    formData.append("user_id", null);
    formData.append("document_type", "recommendation");

    let formdata_obj = {};

    formData.forEach((value, key) => (formdata_obj[key] = value));
    formdata_obj = JSON.stringify(formdata_obj);

    const headers = {
      "Content-Type": "application/json",
    };
    API.post(`/document`, formData, { headers }).then((res) => {
      dispatch(fetchRecommendationUploadedDocuments(null));
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
        document_type: "recommendation",
      },
      headers,
    }).then((res) => {
      dispatch(fetchRecommendationUploadedDocuments(null));
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
        subHeader={<ExceptionDetailSubheader />}
        handleManuClick={handleManuClick}
        headerIcon={window.location.origin + "/images/recommendation-icon.svg"}
        heading="Recommendation"
      />
      <div id="main" className={`${visiblityStatus ? "app-btn-active" : ""}`}>
        {visiblityStatus ? (
          <AppMenuTrigger className={`${visiblityStatus ? "fadeIn" : ""}`} />
        ) : (
          <>
            <ProductInfoSection />
            <div className="recommendation-section margin-bottom">
              <div className="dashboard-container pl-20 pr-20 py-20">
                <RecommendationForm handleFormSubmit={handleFormSubmit} />
                <div className="row mt-4">
                  <div className="col-12 col-sm-12 col-md-6">
                    <div className="card drop-shadow-small border-0">
                      <h6 className="card-header py-3 text-center">
                        Attach Confluence
                      </h6>
                      <div className="card-body px-3">
                        <form>
                          <div className="form-group search-with-suggestion position-relative d-flex align-items-center">
                            <input
                              onFocus={(event) => {
                                event.stopPropagation();
                                handleSearchClick(true);
                              }}
                              onBlur={(event) => {
                                event.stopPropagation();
                                handleSearchClick(false);
                              }}
                              type="text"
                              className="textbox bg-gray"
                              placeholder="Search"
                            />
                            <button
                              type="button"
                              className="btn btn-primary btn-sm ml-3"
                              onClick={() => {
                                setSearchVisiblity(false);
                              }}
                            >
                              Search
                            </button>
                            <a className="search-icon">
                              <img
                                src={
                                  window.location.origin + "/images/search.svg"
                                }
                                alt="search"
                              />
                            </a>
                            <div
                              className={`searching-list-trigger ${
                                searchVisiblity ? "fadeIn" : ""
                              }`}
                            >
                              <ul>
                                <li className="list-box d-flex align-items-center justify-content-center">
                                  <span>no data</span>
                                </li>
                              </ul>
                              <div className="attach-button text-center">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                  onClick={() => {
                                    setSearchVisiblity(false);
                                  }}
                                >
                                  attach
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="search-lists">
                            <div className="list-box d-flex align-items-center justify-content-center">
                              <a>
                                <span className="file-icon text-black-50 d-flex align-items-center">
                                  no data
                                </span>
                              </a>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6">
                    <RelatedRecommendationsTable />
                    <div className="row recommendation-upload">
                      <div className="col-12 col-sm-6 px-2">
                        <AddEditComment />
                        {/* <ExceptionDetailsComments/> */}
                      </div>
                      <div className="col-12 col-sm-6 px-2">
                        <UploadFilesComponent
                          previousSelectedItem={uploadedRecommendationDocuments}
                          handleFileSelect={handleFileUpdload}
                          handleDeleteRow={handlePreviousRowDelete}
                          handleDownload={handleDownload}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* {visiblityStatus || visiblityStatus ? (
        <div className="modal-backdrop fade show"></div>
      ) : null} */}
    </>
  );
};

export default RecommendationPage;
