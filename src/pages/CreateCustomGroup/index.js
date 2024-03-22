import React, { useState, useEffect, useMemo } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../layouts/Header/Header";
import { DashboardDetailSubheader } from "../../layouts/SubHeader/DashboardDetailSubheader";
import { AppMenuTrigger } from "../../layouts/AppMenuTrigger";
import {
  CustomGroupTable,
  CreateEditListModal,
} from "../../components/CreateCustomGroupComponent";
import { fetchCustomFilterAssets } from "../../redux/custom-filter/customFilterThunk";
import API from "../../API/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { setShowEquipmentSelect } from "../../redux/dashboard/dashboardSlice";

const CreateCustomGroup = () => {
  const { groupId } = useParams();
  const MySwal = withReactContent(Swal);
  const [visiblityStatus, setVisiblityStatus] = useState(false);
  let [selectedEquipmentIds, setSelectedEquipmentIds] = useState([]);
  const [checkedClickCount, setCheckedClickCount] = useState({
    sitesCount: 0,
    ModelsCount: 0,
    SerialNumbersCount: 0,
  });
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterTableData, setFilterTableData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  );

  let customFilterAssets = useSelector(
    (state) => state.customFilterReducer.customFilterAssets
  );

  const customFilterGroupList = useSelector(
    (store) => store.customFilterReducer.filterGroupList
  );

  const selectedFilterItem = useSelector(
    (store) => store.customFilterReducer.selectedFilterItem
  );

  let tableData = useSelector(
    (store) => store.customFilterReducer.updateFilterTable
  );

  const returnValue = useMemo(() => {
    let tableItem = _.cloneDeep(customFilterAssets).reduce(
      (assetAcc, asset) => {
        const retAsset = asset.fleet_types.reduce((fleetAcc, fleet) => {
          const retFleet = fleet.model.reduce((ModelAcc, model) => {
            const retModal = model.id.reduce((IdAcc, id) => {
              const isIdAvailble =
                id.id &&
                id.id
                  .toString()
                  .toLowerCase()
                  .includes(searchValue.toString().toLowerCase());
              // if(selectedEquipmentIds.includes(id.id.split("-")[0])){
              //   id.is_selected = true;
              // }
              isIdAvailble && IdAcc.push(id);
              return IdAcc;
            }, []);
            let updatedModal = _.cloneDeep(model);
            if (
              model.model &&
              model.model
                .toString()
                .toLowerCase()
                .includes(searchValue.toString().toLowerCase())
            ) {
              ModelAcc.push(model);
            } else {
              updatedModal.id = retModal;
              ModelAcc.push(updatedModal);
            }
            return ModelAcc;
          }, []);
          const updatedFleet = _.cloneDeep(fleet);
          if (
            fleet.fleet_type &&
            fleet.fleet_type
              .toString()
              .toLowerCase()
              .includes(searchValue.toString().toLowerCase())
          ) {
            fleetAcc.push(fleet);
          } else {
            updatedFleet.model = retFleet;
            fleetAcc.push(updatedFleet);
          }
          return fleetAcc;
        }, []);
        const updatedAsset = _.cloneDeep(asset);
        if (
          asset.sitename &&
          asset.sitename
            .toString()
            .toLowerCase()
            .includes(searchValue.toString().toLowerCase())
        ) {
          assetAcc.push(asset);
        } else {
          updatedAsset.fleet_types = retAsset;
          assetAcc.push(updatedAsset);
        }
        return assetAcc;
      },
      []
    );
    return tableItem;
  }, [customFilterAssets, searchValue]);

  useEffect(() => {
    if (groupId) {
      dispatch(fetchCustomFilterAssets({ filter_group_id: groupId }));
    } else {
      dispatch(fetchCustomFilterAssets());
    }
  }, [dispatch]);

  useEffect(() => {
    if (searchValue) {
      setFilterTableData(returnValue);
    } else {
      setFilterTableData(customFilterAssets);
    }
  }, [customFilterAssets, returnValue, searchValue]);

  const handleManuClick = () => {
    setVisiblityStatus(!visiblityStatus);
  };

  const onSubmitNewUser = (groupName) => {
    if (selectedEquipmentIds && selectedEquipmentIds.length > 0) {
      const body = {
        user_id: userPreferences.user_id ? userPreferences.user_id : null,
        group_name: groupName.filterName,
        equipment_ids: selectedEquipmentIds,
        set_default_group: groupName.setDefaultStatus,
      };
      // let formData = new FormData();
      // formData.append();
      // formData.append("group_name", groupName);
      // formData.append("equipment_ids", JSON.stringify(selectedEquipmentIds));
      API.post("/filter-group", body)
        .then((res) => {
          if (groupName.setDefaultStatus) {
            MySwal.fire(
              "success!",
              "new user filter group has been applied"
            ).then(function () {
              navigate(-1);
            });
          } else {
            navigate(-1);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      MySwal.fire(
        "Error!",
        "please select atleast one asset id to proceed.",
        "failure"
      );
    }
  };

  const handleUpdateSelection = () => {
    if (
      selectedEquipmentIds &&
      selectedEquipmentIds.length > 0 &&
      customFilterGroupList.length
    ) {
      const body = {
        user_id: userPreferences.user_id ? userPreferences.user_id : null,
        group_name: customFilterGroupList.find(
          (e) => e.group_id === parseInt(groupId)
        ).group_name,
        equipment_ids: selectedEquipmentIds,
      };

      API.put(`/filter-group/${groupId}`, body)
        .then((res) => {
          MySwal.fire("success", "selection updated").then(function () {
            navigate(-1);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      MySwal.fire("Error!", "there is some issue", "failure");
    }
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
              <CreateEditListModal
                showModal={showModal}
                setShowModal={setShowModal}
                onSubmitNewUser={onSubmitNewUser}
              />
            </div>
            <div className="container-second-selection border-bottom py-20 px-30  flex-wrap ">
              <div className="form-group">
                <label>Status</label>
                <div className="custom-select">
                  <select
                    onChange={(event) => {
                      const selectedItem =
                        event.target.options[event.target.selectedIndex];
                      if (selectedItem && selectedItem.value) {
                        dispatch(
                          fetchCustomFilterAssets({
                            filter_group_id: selectedItem.value,
                          })
                        );
                      }
                    }}
                    defaultValue={groupId}
                  >
                    {customFilterGroupList && customFilterGroupList.length > 0
                      ? customFilterGroupList.map((item, index) => (
                          <option
                            value={item.group_id}
                            key={index}
                          >{`${item.group_name} ( ${item.count} )`}</option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
              <div className="edit-euipment">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    navigate("/equipment-selection");
                  }}
                >
                  Create/Edit Equipment List
                </button>
              </div>
              {/* <div className="graph-resize">
                <a href="#">
                  <img
                    src={window.location.origin + "/images/graph-resize.svg"}
                    alt="graph-resize"
                  />
                </a>
              </div> */}
            </div>
            <div className="filter-custom-equipment border-bottom d-flex align-items-center justify-content-between flex-wrap px-30">
              <div className="custom-filter-box d-flex align-items-center flex-wrap flex-md-nowrap">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setSelectAll(!selectAll);
                  }}
                >
                  {selectAll ? "Deselect All" : "select All"}
                </button>
                <div className="form-group mb-0 py-20  position-relative ml-20 pl-20 border-left">
                  <input
                    type="text"
                    className="textbox"
                    placeholder="Type here to filter"
                    onChange={(event) => {
                      setSearchValue(event.target.value);
                    }}
                  />
                  <a className="d-flex align-items-center justify-content-center">
                    <img
                      src={window.location.origin + "/images/filter-black.svg"}
                      alt="filter-black"
                    />
                  </a>
                </div>
              </div>
              {/* <h6>
                <a href="#">Advanced Filters</a>
              </h6> */}
            </div>
            <div className="dashboard-container bg-color">
              <div className="create-custom-group-table">
                <div className="table-responsive-sm filter-group-table">
                  <CustomGroupTable
                    data={filterTableData}
                    setSelectedFields={setSelectedEquipmentIds}
                    selectAllStatus={selectAll}
                    changeSelectAll={setSelectAll}
                    calculateCount={setCheckedClickCount}
                    previousSelectedIds={selectedEquipmentIds}
                  />
                </div>
              </div>
            </div>
            <div className="update-selection-confirmation-box px-30 py-20 ">
              <div className="selected-box d-flex justify-content-center align-items-center flex-wrap flex-column flex-md-row  justify-content-sm-center justify-content-md-between">
                <p className="span-text d-flex font-weight-semibold">
                  <span className="mr-1 font-weight-normal">Selected:</span>
                  {checkedClickCount.sitesCount} Sites
                  <br /> {checkedClickCount.ModelsCount} Models and{" "}
                  {checkedClickCount.SerialNumbersCount} Serial Numbers
                </p>
                <div className="button-set">
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => {
                      dispatch(setShowEquipmentSelect(true));
                      navigate("/dashboard");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={groupId ? false : true}
                    type="button"
                    className="btn btn-primary btn-sm ml-3"
                    onClick={handleUpdateSelection}
                  >
                    Update Selection
                  </button>
                </div>
                <h6>
                  <a
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <i className="icon-plus"></i>Save as New List
                  </a>
                </h6>
              </div>
            </div>
            {showModal ? (
              <div className="modal-backdrop fade show"></div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default CreateCustomGroup;
