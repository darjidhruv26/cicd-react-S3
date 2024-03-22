import React, { useState } from "react";
import Header from "../../layouts/Header/Header";
import { DashboardDetailSubheader } from "../../layouts/SubHeader/DashboardDetailSubheader";
import { AppMenuTrigger } from "../../layouts/AppMenuTrigger";
import { useDispatch, useSelector } from "react-redux";
import API from "../../API/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { fetchCustomFilterGroupList } from "../../redux/custom-filter/customFilterThunk";

const MySwal = withReactContent(Swal);

const EquipmentSelection = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  )

  const customFilterGroupList = useSelector(
    (store) => store.customFilterReducer.filterGroupList
  );

  const [visiblityStatus, setVisiblityStatus] = useState(false);

  const handleManuClick = () => {
    setVisiblityStatus(!visiblityStatus);
  };

  const handleDeleteGroup = (data) => {
    const headers = {"Content-Type": "application/json",};
    API.delete("/filter-group", {params : {
      filter_group_id: data,
    }}, headers)
      .then((res) => {
        dispatch(fetchCustomFilterGroupList({userId: userPreferences?.user_id}));
        MySwal.fire(
          "success",
          res.data.message
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Header
        subHeader={<DashboardDetailSubheader />}
        handleManuClick={handleManuClick}
        menuVisiblityStatus={visiblityStatus}
        headerIcon={window.location.origin + "/images/graph.svg"}
        heading="Dashboard"
      />
      <div id="main">
        {visiblityStatus ? (
          <AppMenuTrigger
            className={`${visiblityStatus ? "fadeIn" : "fadeOut"}`}
          />
        ) : (
          <>
            <div className="container-top-heading">
              <h6>Equipment Selection</h6>
            </div>
            <div className="container-second-selection border-bottom py-20 px-30">
              <div className="d-flex align-items-center flex-wrap">
                <h6 className="text-black-50 mr-3 font-weight-normal">
                  Create/Edit Equipment List(s)
                </h6>
                <h6>
                  <a onClick={() => navigate("/dashboard-create-custom-group")}>
                    <i className="icon-plus"></i>New List
                  </a>
                </h6>
              </div>
              <div className="graph-resize">
                <a onClick={() => navigate("/dashboard-create-custom-group")}>
                  <img src="images/close-big.svg" alt="graph-resize" />
                </a>
              </div>
            </div>
            <div className="equipment-selection-list">
              {customFilterGroupList &&
                customFilterGroupList.length > 0 &&
                customFilterGroupList.map(function (item, index) {
                  return (
                    <div
                      className="equipment-selection-box px-30 py-20 d-flex align-items-center justify-content-between"
                      key={item.group_id}
                    >
                      <h6>{item.group_name}</h6>
                      <h6>{item.count} Serial Numbers</h6>
                      <div className="action-btn d-flex align-items-center pr-0">
                        <a
                          onClick={() =>
                            navigate(
                              "/dashboard-create-custom-group/" + item.group_id
                            )
                          }
                        >
                          <img src="images/edit.svg" alt="Edit" />
                        </a>
                        <a
                          onClick={() => {
                            handleDeleteGroup(item.group_id);
                          }}
                          className="ml-3"
                        >
                          <img src="images/delete.svg" alt="Delete" />
                        </a>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EquipmentSelection;
