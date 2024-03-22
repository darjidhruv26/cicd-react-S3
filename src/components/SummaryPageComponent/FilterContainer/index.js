import { useState, useCallback, useEffect } from "react";
import _ from "lodash";


export const FilterContainer = ({activeFilter, filters, toggleSelection, handleCheckboxClick}) => {

  const [searchInput, setSearchInput] = useState("");
  const [filterItems, setFilterItems] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  useEffect(() => {
    setFilterItems(filters[activeFilter]);
  }, [activeFilter, filters])

  useEffect(() => {
    const notSelected = filterItems?.filter(filterRecrod => !filterRecrod?.isselected);
    notSelected && notSelected.length > 0 ? setIsSelectAll(false) : setIsSelectAll(true);
  }, [activeFilter, filterItems])

  useEffect(() => {
    searchInput && handleInputChange(searchInput)
  }, [searchInput, filters])
  
  const handleInputChange = useCallback(
    (input) => {
      let tableItem = _.cloneDeep(filters[activeFilter]);
      tableItem = tableItem.filter((item) => {
        return (
          item?.value
          ?.toString()
          .toLowerCase()
          .includes(input.toString().toLowerCase())
          );
        });
      setFilterItems(tableItem);
    },
    [activeFilter, filters]
  );

  return ( filters && filters[activeFilter]?.length >= 0 ?
    <div className="category-select-result mCustomScrollbar _mCS_1">

      <div className="category-search-box">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search here..."
            name="search"
            required
            value={searchInput}
            onChange={(e) => {
              const retData = handleInputChange(e.target.value);
              setSearchInput(e.target.value);
            }}
          />
          <a href="#" className="category-btn-search"><i className="icon-search-icon"></i></a>
        </div>
      </div>

      <div className="d-flex flex-row mb-3 align-items-center">
        <p style={{alignSelf: 'center', height: 15}}>select all</p>
        <input
          type="checkbox"
          id="default-checkbox"
          onChange={() => {
            const toggleSelected = !isSelectAll
            setIsSelectAll(toggleSelected)
            handleCheckboxClick(filterItems, toggleSelected);
            
          }}
          checked={isSelectAll}
          style={{marginTop: 0, marginLeft: 10, height:15, width: 15}}
        />
      </div>

      <div className="category-selected-list select-filter-tag">
        <ul>
          {filterItems?.map((record, index) => {
            return (
              <li key={record.value+index}>
                <button type="button" className="filter-box" style={{ backgroundColor: record.isselected ? '#418FDE' : 'white', color: record.isselected ? '#FFFFFF' : '#333F48' }}  onClick={() => toggleSelection(record)}>{record.value}</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  : null)
};
