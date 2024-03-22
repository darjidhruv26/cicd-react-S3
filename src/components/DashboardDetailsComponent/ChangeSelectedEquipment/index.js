import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFilterItem } from "../../../redux/custom-filter/customFilterSlice";
import { updateUserPreferences } from "../../../redux/user-preferences/userPreferencesThunk";

export const ChangeSelectedEquipment = () => {
  const dispatch = useDispatch();
  const customFilterGroupList = useSelector(
    (store) => store.customFilterReducer.filterGroupList
  );

  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  )
  
  const selectedFilterItem = useSelector(
    (store) => store.customFilterReducer.selectedFilterItem
  );
  const [filterGroup, setFilterGroup] = useState([]);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(-1);

  useEffect(() => {
    if (customFilterGroupList && customFilterGroupList.length > 0) {
      setFilterGroup(customFilterGroupList);
    }

    if (userPreferences && Object.keys(userPreferences).length > 0) {
      dispatch(setSelectedFilterItem(userPreferences.selected_filter_group_id));
    }
  }, [customFilterGroupList, userPreferences]);

  const handleCreateCustomGroup = () => {
    navigate("/dashboard-create-custom-group");
  };

  const handleListItemSelect = (index) => {
    setSelectedItem(index);
  };

  const renderListItem = (data) => {
    return data.map((item, index) => {
      return (
        <li
          className={
            selectedItem === index || selectedFilterItem === item.group_id
              ? "active"
              : ""
          }
          key={index}
        >
          {`${item.group_name} ( ${item.count} )`}
          <div className="float-right">
            <a
              className={`${selectedItem === index || selectedFilterItem === item.group_id
                ? "active"
                : ""
                } mr-md-4`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleListItemSelect(index);
                  dispatch(setSelectedFilterItem(item.id));
                  dispatch(updateUserPreferences({
                    ...userPreferences,
                    selected_filter_group_id: item.group_id
                  }));

                  // dispatch(fetchDashboardAssets({filterGroupId: item.group_id}));
                  // dispatch(fetchSelectedFilterGroupCounts({group_id: item.group_id, group_name: item.group_name}));
                }}
            >
              <i className={`fa fa-check-circle ${selectedItem === index || selectedFilterItem === item.group_id ? "text-success" : ""}`}></i>
            </a>
            <a
              onClick={() =>
                navigate(`/dashboard-create-custom-group/${item.group_id}`)
              }
            >
              <i className="icon-edit"></i>
            </a>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="change-selected-equipment-box">
      <div className="change-selected-quipment-header">
        <h6>Change Selected Equipment</h6>
        <h6>
          <a className="anchorLink" onClick={handleCreateCustomGroup}>
            <i className="icon-plus"></i>Create Custom Filter Group
          </a>
        </h6>
      </div>
      <ul className="equipment-details">
        {filterGroup.length > 0 ? renderListItem(filterGroup) : null}
      </ul>
    </div>
  );
};
