import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUpdateFilterTable } from "../../../redux/custom-filter/customFilterSlice";
import _ from "lodash";

const TableDataCheckbox = ({ name, spanCount, active, clickHandler }) => {
  return (
    <td rowSpan={spanCount ? spanCount : 0} title={name}>
      <span>
        <div className="checkbox">
          <label htmlFor="default-checkbox">
            <input
              type="checkbox"
              id="default-checkbox"
              onChange={(e) => {
                clickHandler(e);
              }}
              checked={active ? active : false}
            />
            <em className="input-helper"></em>
          </label>
        </div>
        {name ? name : ""}
      </span>
    </td>
  );
};

export const CustomGroupTable = ({
  data,
  setSelectedFields,
  selectAllStatus,
  changeSelectAll,
  calculateCount,
  previousSelectedIds,
}) => {
  const dispatch = useDispatch();
  const [selectAllByCheckbox, setSelectAllByCheckbox] = useState(false);
  let tableData = useSelector(
    (store) => store.customFilterReducer.updateFilterTable
  );
  const setTableData = useCallback(
    (content) => {
      dispatch(setUpdateFilterTable(content));
    },
    [dispatch]
  );

  const UpdateActiveStatusOfTableData = useCallback((data, status = null) => {
    let sites = 0;
    let Models = 0;
    let SerialNumbers = 0;
    const getSelectedEquipmentIds = [];
    const UpdateData = _.cloneDeep(data).map((asset) => {
      let assetIsActive = false;
      asset.fleet_types.map((fleet) => {
        let fleetIsActive = false;
        fleet.model.map((model) => {
          let modalIsActive = false;
          model.id.map((id) => {
            if (
              !modalIsActive &&
              (id.is_selected ||
                previousSelectedIds.includes(id.id.split("-")[0])) &&
              status === null
            ) {
              modalIsActive = previousSelectedIds.includes(id.id.split("-")[0])
                ? true
                : id.is_selected;
            }
            id.isActive =
              status !== null
                ? status
                : previousSelectedIds.includes(id.id.split("-")[0])
                ? true
                : id.is_selected;
            if (id.isActive) {
              SerialNumbers += 1;
              getSelectedEquipmentIds.push(id.id.split("-")[0]);
            }
            return id;
          });
          model.isActive = status ? status : modalIsActive;
          if (!fleetIsActive && modalIsActive && status === null) {
            fleetIsActive = modalIsActive;
          }
          if (model.isActive) {
            Models += 1;
          }
          return model;
        });
        fleet.isActive = status ? status : fleetIsActive;
        if (!assetIsActive && fleetIsActive && status === null) {
          assetIsActive = fleetIsActive;
        }
        return fleet;
      });
      asset.isActive = status ? status : assetIsActive;
      if (asset.isActive) {
        sites += 1;
      }
      return asset;
    });
    return {
      tableContent: UpdateData,
      sites,
      Models,
      SerialNumbers,
      getSelectedEquipmentIds
    };
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      if (selectAllByCheckbox) {
        setSelectAllByCheckbox(false);
      } else {
        const returnData = UpdateActiveStatusOfTableData(data, selectAllStatus);
        calculateCount({
          sitesCount: returnData.sites,
          ModelsCount: returnData.Models,
          SerialNumbersCount: returnData.SerialNumbers,
        });
        setSelectedFields(returnData.getSelectedEquipmentIds);
        setTableData(returnData.tableContent);
      }
    } else {
      setTableData([]);
    }
  }, [data, setTableData, selectAllStatus, calculateCount, UpdateActiveStatusOfTableData, setSelectedFields]);

  useEffect(() => {
    if (data && data.length > 0) {
      const returnData = UpdateActiveStatusOfTableData(data);
      calculateCount({
        sitesCount: returnData.sites,
        ModelsCount: returnData.Models,
        SerialNumbersCount: returnData.SerialNumbers,
      });
      setSelectedFields(returnData.getSelectedEquipmentIds);
      setTableData(returnData.tableContent);
    } else {
      setTableData([]);
    }
  }, [data, setTableData, calculateCount, UpdateActiveStatusOfTableData, setSelectedFields]);

  const onClickCheckbox = (
    e,
    index,
    fleet_index,
    model_index,
    id_index,
    clickElement
  ) => {
    const selectedItems = [];
    const data = JSON.parse(JSON.stringify(tableData));
    const idObject =
      data[index].fleet_types[fleet_index].model[model_index].id[id_index];
    const Modal = data[index].fleet_types[fleet_index].model[model_index];
    const fleet = data[index].fleet_types[fleet_index];
    const asset = data[index];
    const { checked } = e.target;

    let sites = 0;
    let Models = 0;
    let SerialNumbers = 0;

    if (clickElement === "id") {
      idObject.isActive = checked;
      const ModelcheckStatus = Modal.id.findIndex((id) => id.isActive) >= 0;
      const fleetCheckStatus =
        fleet.model.findIndex(
          (item) => item.id.findIndex((id) => id.isActive) >= 0
        ) >= 0;
      const assetCheckStatus =
        asset.fleet_types.findIndex(
          (element) =>
            element.model.findIndex(
              (item) => item.id.findIndex((id) => id.isActive) >= 0
            ) >= 0
        ) >= 0;
      ModelcheckStatus ? (Modal.isActive = true) : (Modal.isActive = false);
      fleetCheckStatus ? (fleet.isActive = true) : (fleet.isActive = false);
      assetCheckStatus ? (asset.isActive = true) : (asset.isActive = false);
    } else if (clickElement === "model") {
      Modal.id.forEach((id) => {
        Modal.isActive = checked;
        id.isActive = checked;
      });
      const fleetCheckStatus =
        fleet.model.findIndex(
          (item) => item.id.findIndex((id) => id.isActive) >= 0
        ) >= 0;
      const assetCheckStatus =
        asset.fleet_types.findIndex(
          (element) =>
            element.model.findIndex(
              (item) => item.id.findIndex((id) => id.isActive) >= 0
            ) >= 0
        ) >= 0;
      fleetCheckStatus ? (fleet.isActive = true) : (fleet.isActive = false);
      assetCheckStatus ? (asset.isActive = true) : (asset.isActive = false);
    } else if (clickElement === "fleet") {
      fleet.model.forEach((model) => {
        model.id.forEach((id) => {
          model.isActive = checked;
          fleet.isActive = checked;
          id.isActive = checked;
        });
      });
      const assetCheckStatus =
        asset.fleet_types.findIndex(
          (element) =>
            element.model.findIndex(
              (item) => item.id.findIndex((id) => id.isActive) >= 0
            ) >= 0
        ) >= 0;
      assetCheckStatus ? (asset.isActive = true) : (asset.isActive = false);
    } else {
      asset.fleet_types.forEach((fleet) => {
        fleet.model.forEach((model) => {
          model.id.forEach((id) => {
            model.isActive = checked;
            fleet.isActive = checked;
            id.isActive = checked;
            asset.isActive = checked;
          });
        });
      });
    }

    // for site, modal and serial number count
    data.forEach((element) => {
      element.isActive &&
        element.fleet_types.forEach((item) => {
          item.isActive &&
            item.model.forEach((elem) => {
              elem.isActive &&
                elem.id.forEach((e) => {
                  e.isActive && selectedItems.push(e.id.split("-")[0]);
                  if (e.isActive) {
                    SerialNumbers += 1;
                  }
                });
              if (elem.isActive) {
                Models += 1;
              }
            });
        });
      if (element.isActive) {
        sites += 1;
      }
    });

    calculateCount({
      sitesCount: sites,
      ModelsCount: Models,
      SerialNumbersCount: SerialNumbers,
    });
    if (selectAllStatus && !checked) {
      changeSelectAll(false);
      setSelectAllByCheckbox(true);
    }
    // setSelectedFields([...new Set([...previousSelectedIds, ...selectedItems])]);
    setSelectedFields(selectedItems);
    setTableData(data);
  };

  const renderTableContent = (customFilterAssets) => {
    let sitename;
    let fleet_type;
    let model_name;

    let sitename_rowspan = Boolean();
    let fleet_type_rowspan = Boolean();
    let model_rowspan = Boolean();

    let fleet_type_rowspan_count = 0;
    let sitename_rowspan_count = 0;

    const renderTable = customFilterAssets.map((asset, index) => {
      sitename = asset.sitename;
      return asset.fleet_types.map((fleet, fleet_index) => {
        fleet_type = fleet.fleet_type;
        sitename_rowspan_count = 0;
        return fleet.model.map((model, model_index) => {
          model_name = model.model;
          fleet_type_rowspan_count = 0;
          return model.id.map((id, id_index) => {
            sitename_rowspan = sitename === asset.sitename ? true : false;
            sitename = undefined;
            if (sitename_rowspan) {
              asset.fleet_types.forEach((fleet, fleet_index) => {
                fleet.model.forEach((model, model_index) => {
                  sitename_rowspan_count += model.id.length;
                });
              });
            }

            fleet_type_rowspan = fleet_type === fleet.fleet_type ? true : false;
            fleet_type = undefined;
            if (fleet_type_rowspan) {
              fleet.model.forEach((model, model_index) => {
                fleet_type_rowspan_count += model.id.length;
              });
            }

            model_rowspan = model_name === model.model ? true : false;
            model_name = undefined;
            return (
              <tr key={id_index}>
                {sitename_rowspan ? (
                  <TableDataCheckbox
                    spanCount={sitename_rowspan_count}
                    name={asset.sitename}
                    clickHandler={(e) => {
                      onClickCheckbox(
                        e,
                        index,
                        fleet_index,
                        model_index,
                        id_index,
                        "siteName"
                      );
                    }}
                    active={asset.isActive}
                  />
                ) : null}
                {fleet_type_rowspan ? (
                  <TableDataCheckbox
                    spanCount={fleet_type_rowspan_count}
                    name={fleet.fleet_type}
                    clickHandler={(e) => {
                      onClickCheckbox(
                        e,
                        index,
                        fleet_index,
                        model_index,
                        id_index,
                        "fleet"
                      );
                    }}
                    active={fleet.isActive}
                  />
                ) : null}
                {model_rowspan ? (
                  <TableDataCheckbox
                    spanCount={model.id.length}
                    name={model.model}
                    clickHandler={(e) => {
                      onClickCheckbox(
                        e,
                        index,
                        fleet_index,
                        model_index,
                        id_index,
                        "model"
                      );
                    }}
                    active={model.isActive}
                  />
                ) : null}
                <TableDataCheckbox
                  spanCount={1}
                  name={id.id.split("-")[0]}
                  clickHandler={(e) => {
                    onClickCheckbox(
                      e,
                      index,
                      fleet_index,
                      model_index,
                      id_index,
                      "id"
                    );
                  }}
                  active={id.isActive}
                />
                {id.id.split("-")[1].replaceAll(" ", "").length > 0 ? (
                  <td>{id.id.split("-")[1]}</td>
                ) : (
                  <td></td>
                )}
                {/* <td>
                  <ul className="product-model-duration">
                    <li>
                      <i className="icon-network"></i>25<sup>th</sup> Dec 2021{" "}
                      <span>|</span> 09:02 AM{" "}
                    </li>
                  </ul>
                </td>
                <td>24000</td>
                <td>25th Jan 2022</td>
                <td>40%</td> */}
              </tr>
            );
          });
        });
      });
    });
    return renderTable;
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Site</th>
          <th scope="col">
            Equipment
            <br />
            Type
          </th>
          <th scope="col">Model</th>
          <th scope="col">
            Equipment
            <br />
            Id
          </th>
          <th scope="col">
            Serial
            <br />
            No.
          </th>
          {/* <th scope="col">
            Data
            <br />
            Status
          </th> */}
          {/* <th scope="col">
            Operating
            <br />
            Hours
          </th>
          <th scope="col">
            Upcoming
            <br />
            PM
          </th>
          <th scope="col">
            Fuel
            <br />
            Level
          </th> */}
        </tr>
      </thead>
      <tbody>
        {tableData.length > 0 ? (
          renderTableContent(tableData)
        ) : (
          <tr>
            <td colSpan="13">No Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
