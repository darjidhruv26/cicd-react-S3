import { useDispatch, useSelector } from "react-redux";
import { FilterContainer } from "../FilterContainer";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import API from "../../../API/API";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { fetchFilteredSummaryDetails, fetchSummaryFilterPreferences } from "../../../redux/summaryV1-table/summaryV1TableThunk";
const MySwal = withReactContent(Swal);


const childHirarchy = {
  'site_names': ['models', 'asset_names'],
  'fleet_types': ['models', 'asset_names'],
  'models': ['asset_names'],
  'asset_names': []
}

const MAIN_CATEGORIES = [{ 'key': 'site_names', 'name': 'Sites', 'isselected': false }, { 'key': 'fleet_types', 'name': 'Fleet', 'isselected': false }, { 'key': 'models', 'name': 'Model', 'isselected': false }, { 'key': 'asset_names', 'name': 'Asset ID', 'isselected': false }]

export const Filter = ({
  close,
  activeFilter,
  setActiveFilter,
  filters,
  setFilters,
  filterData,

  filterPreferences,
  setFilterPreferences,
  filterActivePreferences,
  setFilterActivePreferences,
}) => {

  const [newFilterPreference, setNewFilterPreference] = useState({ name: '', is_default: false });
  const dispatch = useDispatch();

  useEffect(() => {
    setNewFilterPreference({ name: filterActivePreferences?.name, is_default: filterActivePreferences?.is_default });
  }, [filterActivePreferences]);

  useEffect(() => {
    setNewFilterPreference({ name: filterActivePreferences?.name, is_default: filterActivePreferences?.is_default });
}, [filterActivePreferences]);

  useEffect(() => {
    let default_filter = filterPreferences.filter(preference => preference.is_default)[0];
    !filterActivePreferences?.name && default_filter?.name && updateFilterPreferenceSetFilters(default_filter?.name);
    // let isFilterSelected = 
}, [filterActivePreferences, filterPreferences]);

  let userPreferences = useSelector(state => state.userPreferencesReducer.userPreferences);
  let summeryFilterPreferenceAssets = useSelector(state => state.summaryTableReducerV1.filterPreferenceAssets);

  function updateChildFilter(updated_filter) {
    childHirarchy[activeFilter].forEach(filter_preference => {
      const selected_sites = updated_filter['site_names'].filter(site => site.isselected)
      const selected_fleets = updated_filter['fleet_types'].filter(fleet_type => fleet_type.isselected)
      const selected_models = updated_filter['models'].filter(model => model.isselected)
      const selected_assets = updated_filter['asset_names'].filter(model => model.isselected)

      let child_filter_data = filterData[filter_preference]

      if (selected_sites.length > 0){
        child_filter_data = child_filter_data?.filter(item => selected_sites?.find(selected_site => selected_site?.value === item.site_name))
      }
      if (selected_fleets.length > 0){
        child_filter_data = child_filter_data?.filter(item => selected_fleets?.find(selected_fleet => selected_fleet?.value === item.fleet_type))
      }
      if (selected_models.length > 0 && activeFilter === 'models' ){
        child_filter_data = child_filter_data?.filter(item => selected_models?.find(selected_model => selected_model?.value === item.model))
      }

      // setting already selected models
      let all_models = [...child_filter_data]
      selected_models.forEach(selectedModel => {
        const selectedIndex = all_models?.findIndex(model => model?.value === selectedModel.value && model.fleet_type === selectedModel.fleet_type && model.site_name === selectedModel.site_name)
        all_models[selectedIndex] = {...child_filter_data[selectedIndex], isselected: selectedModel.isselected}
        child_filter_data = [...all_models]
      })

      // setting already selected assets
      let all_asset_names = [...child_filter_data]
      selected_assets.forEach(selectedAsset => {
        const selectedIndex = all_asset_names?.findIndex(asset => asset?.value === selectedAsset.value && asset.fleet_type === selectedAsset.fleet_type && asset.site_name === selectedAsset.site_name)
        all_asset_names[selectedIndex] = {...child_filter_data[selectedIndex], isselected: selectedAsset.isselected}
        child_filter_data = [...all_asset_names]
      })

      updated_filter[filter_preference] = child_filter_data
    });
    return updated_filter
  }

  function setParentFilter(updated_filter, record) {
      let setParentFilter = {...updated_filter}

    const selected_sites_index = updated_filter['site_names'].findIndex(site => site.value === record?.site_name)
    let updatedSiteNames = [...setParentFilter['site_names']]
      updatedSiteNames[selected_sites_index] = {...setParentFilter['site_names'][selected_sites_index], isselected: true}
    setParentFilter['site_names'] = updatedSiteNames

    const selected_fleets_index = updated_filter['fleet_types'].findIndex(fleet_type => fleet_type.value === record?.fleet_type)
    let updatedFleetTypes = [...setParentFilter['fleet_types']]
      updatedFleetTypes[selected_fleets_index] = {...setParentFilter['fleet_types'][selected_fleets_index], isselected: true}
    setParentFilter['fleet_types'] = updatedFleetTypes

    const selected_models_index = updated_filter['models'].findIndex(model => model.value === record?.model)
    let updatedModels = [...setParentFilter['models']]
      updatedModels[selected_models_index] = {...setParentFilter['models'][selected_models_index], isselected: true}
    setParentFilter['models'] = updatedModels
    return setParentFilter
  }

  const getSeletedFilters = (record, updated_filter, isSelected) => {
    const updated_record = {...record, isselected: isSelected, value: record.value} 

    let updated_active_filter = [...updated_filter[activeFilter]];
    const index_of_updated_rec = updated_active_filter.findIndex(filter => filter.value === record.value && filter?.fleet_type === record?.fleet_type && filter?.site_name === record?.site_name);
    updated_active_filter[index_of_updated_rec] = updated_record
    updated_filter[activeFilter] = updated_active_filter
    if (isSelected){
      updated_filter = setParentFilter(updated_filter, record)
    }
    updated_filter = updateChildFilter(updated_filter)
    return updated_filter
  }

  const handleCheckboxClick = (filterItems, isChecked) => {
    let updatedFilter = {...filters};
    filterItems.forEach(activeFilterData => {
      updatedFilter = getSeletedFilters(activeFilterData, updatedFilter, isChecked);
    });
    setFilters({...updatedFilter});
  }

  const toggleSelection = (record) => {
    let updated_filter = {...filters};
    updated_filter = getSeletedFilters(record, updated_filter, !record.isselected);
    setFilters({...updated_filter});
  }

  const updateFilterPreferenceSetFilters = (preferenceName) => {
    setActiveFilter('asset_names');
    resetFilter();

    const selectedPreference = filterPreferences.find(filterPreference => filterPreference.name === preferenceName);
    let selectedPreferenceAssetsIDs = summeryFilterPreferenceAssets?.filter(preferenceAsset => preferenceAsset.filter_preference_id === selectedPreference?.id);

    let updatedFilter = {...filterData};
    selectedPreferenceAssetsIDs.forEach(preferenceAsset => {
      const asset = filterData['asset_names'].filter(asset => asset.id === preferenceAsset.asset_id)[0]
      updatedFilter = getSeletedFilters(asset, updatedFilter, true);
    });
    setFilters({...updatedFilter});
    setFilterActivePreferences({...selectedPreference})

  }

  const resetFilter = () => {
    setFilterActivePreferences({id: false, name: '', isselected: false, is_default: false});
    setFilters({ ...filterData });
    setActiveFilter('asset_names');
    dispatch(fetchFilteredSummaryDetails());
  }

  const applyFilter = (closeInner) => {
    const assets = filters['asset_names']?.filter((asset, index) => asset.isselected).map((asset) => asset.id)
    const query_str = assets.join(',')
    dispatch(fetchFilteredSummaryDetails({ids_str: query_str}));
    closeInner();
    close();
  }

  const saveApplyFilter = (closeInner, activeFilterPreference) => {
    const assets = filters['asset_names']?.filter(asset => asset.isselected).map(asset => asset.id);
    let payload = {
      user_id: userPreferences.user_id,
      filter_preference_name: newFilterPreference?.name,
      is_default: newFilterPreference?.is_default,
      ids: assets,
    };
    const headers = { "Content-Type": "application/json",};

    activeFilterPreference?.id
      ? API.put(`/filter-preferences/${activeFilterPreference.id}`, payload, { headers })
        .then((res) => {
          MySwal.fire("Updated!", "Filter Preference Updated.", "success")
          dispatch(fetchSummaryFilterPreferences({user_id: userPreferences.user_id}))
          setFilterActivePreferences({ id: activeFilterPreference.id, name: newFilterPreference.name, is_default: newFilterPreference.is_default, isselected: true });
        })
        .catch(error => MySwal.fire("failure !", error))
      : API.post(`/filter-preferences`, payload, { headers })
        .then((res) => {
          MySwal.fire("Created!", "Filter Preference Created.", "success")
          dispatch(fetchSummaryFilterPreferences({user_id: userPreferences.user_id}))
          setFilterActivePreferences({ id: res?.data?.filter_preference_id, name: newFilterPreference.name, is_default: newFilterPreference.is_default, isselected: true});
        })
        .catch(error => MySwal.fire("failure !", error))

    applyFilter(closeInner);
  }

  const deleteFilterPreference = (filterPreference) => {
    API.delete(`/filter-preferences/${filterPreference.id}`)
      .then((res) => {
        MySwal.fire("Deleted!", "Filter Preference deleted.", "success");
        dispatch(fetchSummaryFilterPreferences({user_id: userPreferences.user_id}));
        resetFilter();
      })
      .catch(error => MySwal.fire("failure !", error))
  }

  return (
    <div className="pop-contentbox modal-content" >
      <div className="modal-header align-items-center">
        <h6 className="modal-title" id="CategoryFilter">DT123 - High exhaust temperature</h6>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="modal-body" style={{minWidth: "90vw"}}>
        <div className="filter-preference-container" style={{maxWidth: "88vw"}}>
          <div className="select-filter-preference">
            <ul>
              {filterPreferences?.map((preference, index) => {
                return (
                    <li key={preference.name+index}>
                    <button type="button" className="filter-box" style={{ backgroundColor: preference.id === filterActivePreferences.id ? '#418FDE' : 'white', color: preference.id === filterActivePreferences.id ? '#FFFFFF' : '#333F48' }} onClick={() => updateFilterPreferenceSetFilters(preference.name)}>{preference.name}</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="category-filter-content d-flex flex-wrap">
          <div className="tab-data d-flex">
            <ul className="tabnav flex-column cf">
              {MAIN_CATEGORIES.map((preference, index) => {
                return (
                  <li key={preference.name}>
                    <button type="button" className="filter-box" style={{ backgroundColor: preference.key === activeFilter ? '#418FDE' : 'white', color: preference.key === activeFilter ? '#FFFFFF' : '#333F48' }} onClick={() => setActiveFilter(preference.key)}>{preference.name}</button>
                  </li>
                )
              })}
            </ul>
            <div className="tab-container" >
              <div className="tabcontent" style={{display: 'block'}}>
                {filters && activeFilter && <FilterContainer activeFilter={activeFilter} filters={filters} setFilters={setFilters} filterData={filterData} toggleSelection={toggleSelection} handleCheckboxClick={handleCheckboxClick}/>}
              </div>
            </div>
          </div>
          <div className="result-for-selected-item ">
            <div className="category-select-result mCustomScrollbar _mCS_6 selected-filter-result-scoll">
              {MAIN_CATEGORIES.map((preference, index) => {
                return (
                  <div className="category-selected-list" key={preference.name}>
                      <p className="mt-3" style={{color: '#a2aaa4'}}>{preference.name}</p>
                    <ul>
                      {
                        filters[preference.key]?.filter((filter, index) => filter.isselected)?.map((filter, index) => {
                            return <li key={filter.value+index}>
                            <button type="button" className="filter-box" style={{ backgroundColor: '#418FDE' , color: '#FFFFFF'  }} onClick={() => setActiveFilter(preference.key)}>{filter.value}</button>
                          </li>
                        })
                      }
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-outline-dark btn-sm" onClick={resetFilter}>Reset</button>
        <Popup trigger={ <button type="button" className="btn btn-primary btn-sm">Apply</button>} modal  nested>
          {(closeInner) => (
            <div className="pop-contentbox" style={{ width: "auto" }}>
              <div className="popup-header">
                <h6>
                  Want to Save it for future ?
                  <span className="close-dialogbox">
                    <i className="icon-close" onClick={closeInner} />
                  </span>
                </h6>
              </div>
              <div className="popup-content">
                <div className="comment-form">
                  <div className="form-group">
                    <input className = "form-control" placeholder="Filter name here..." value={newFilterPreference?.name} onChange={(e) => setNewFilterPreference((newFilterPreference) => ({ ...newFilterPreference, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>Set to default ?</label>
                    <input type="checkbox" id="default-checkbox" onChange={() => {
                      setNewFilterPreference((newFilterPreference) => ({ ...newFilterPreference, is_default: !newFilterPreference.is_default }))
                    }}
                      checked={newFilterPreference?.is_default}
                      style={{ marginTop: 0, marginLeft: 10, height: 15, width: 15 }}
                    />
                  </div>
                </div>
              </div>
              <div className="popup-footer">
                <div className="button-action">
                  <div className="form-group">
                    <input type="button" className="btn-lightgray" value="Apply" onClick={() => applyFilter(closeInner)} />
                    <input type="submit" value={filterActivePreferences?.name ? "Apply and Update" : "Apply and Create" } onClick={() => saveApplyFilter(closeInner, filterActivePreferences)}/>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Popup>
        {filterActivePreferences?.name && <button className="btn btn-outline-danger btn-sm"  onClick={() => deleteFilterPreference(filterActivePreferences)}>Delete</button> }
      </div>
    </div>
  );
};
