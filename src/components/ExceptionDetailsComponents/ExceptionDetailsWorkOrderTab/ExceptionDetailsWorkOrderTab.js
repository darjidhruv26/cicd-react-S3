/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WorkOrderTable } from "../workOrderTableComponent";
import { fetchExceptionWorkOrders } from "../../../redux/exception-details/exceptionDetailsThunks";
import _ from "lodash";

const pageLimit = 20;

const ExceptionDetailsWorkOrderTab = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState({ teco: 0, planned: 0 });
  const [selectedFilter, setSelectedFilter] = useState("PM02");
  const [tecoWorkOrder, setTecoWorkOrder] = useState([]);
  const [plannedWorkOrders, setPlannedWorkOrders] = useState([]);

  let selectedEquipment = useSelector(
    (state) => state.exceptionDetailsReducer.selectedEquipment
  );
  selectedEquipment = selectedEquipment?.length > 0 ? selectedEquipment[0] : {};

  let selectedException = useSelector(
    (state) => state.exceptionDetailsReducer.selectedException
  );
  selectedException = selectedException?.length > 0 ? selectedException[0] : {};

  let selectedTecoExceptionWorkOrders = useSelector(
    (state) =>
      state.exceptionDetailsReducer.selectedTecoExceptionWorkOrders.data
  );

  let selectedPlannedExceptionWorkOrders = useSelector(
    (state) =>
      state.exceptionDetailsReducer.selectedPlannedExceptionWorkOrders.data
  );

  useEffect(() => {
    if (selectedEquipment.asset_name && selectedException.event_start_time) {
      const tecoPageCount = 0;
      const plannedPageCount = 0;

      dispatch(
        fetchExceptionWorkOrders({
          equipmentID: selectedEquipment.asset_name,
          startdate: selectedException.event_start_time,
          status: "teco",
          page: tecoPageCount,
          limit: pageLimit,
          workorder_type: selectedFilter,
        })
      );
      dispatch(
        fetchExceptionWorkOrders({
          equipmentID: selectedEquipment.asset_name,
          startdate: selectedException.event_start_time,
          status: "planned",
          page: plannedPageCount,
          limit: pageLimit,
          workorder_type: selectedFilter,
        })
      );
    }
  }, [selectedEquipment, selectedException, dispatch, selectedFilter]);

  useEffect(() => {
    setPage({ planned: 0, teco: 0 });
  }, [selectedFilter]);

  const handleFilterClick = (selected) => {
    setSelectedFilter(selected);
  };

  useEffect(() => {
    setTecoWorkOrder(_.cloneDeep(selectedTecoExceptionWorkOrders));
  }, [selectedTecoExceptionWorkOrders]);

  useEffect(() => {
    setPlannedWorkOrders(_.cloneDeep(selectedPlannedExceptionWorkOrders));
  }, [selectedPlannedExceptionWorkOrders]);

  const handleNextPageClick = (param) => {
    const pageCount = page[param] + 1;
    setPage({ ...page, [param]: pageCount });
    dispatch(
      fetchExceptionWorkOrders({
        equipmentID: selectedEquipment.asset_name,
        startdate: selectedException.event_start_time,
        status: param,
        page: pageCount,
        limit: pageLimit,
        workorder_type: selectedFilter,
      })
    );
  };

  return (
    <Fragment>
      <div className="tab-main-content">
        <div className="oprations-tab workorder">
          <ul>
            <li
              className={`${selectedFilter === "all" ? "active" : ""} pointer`}
            >
              <a
                href="#"
                onClick={() => {
                  handleFilterClick("all");
                }}
              >
                ALL
              </a>
            </li>
            <li
              className={`${selectedFilter === "PM01" ? "active" : ""} pointer`}
            >
              <a
                href="#"
                onClick={() => {
                  handleFilterClick("PM01");
                }}
              >
                PM01
              </a>
            </li>
            <li
              className={`${selectedFilter === "PM02" ? "active" : ""} pointer`}
            >
              <a
                href="#"
                onClick={() => {
                  handleFilterClick("PM02");
                }}
              >
                PM02
              </a>
            </li>
            <li
              className={`${selectedFilter === "PM05" ? "active" : ""} pointer`}
            >
              <a
                href="#"
                onClick={() => {
                  handleFilterClick("PM05");
                }}
              >
                PM05
              </a>
            </li>
          </ul>
        </div>
        <h6>Lead-up to Exception start</h6>
        <WorkOrderTable data={tecoWorkOrder} tableTitle="" />
        <a
          href="#"
          className="next-row-link"
          onClick={() => {
            handleNextPageClick("teco");
          }}
        >
          Show Next 20 Rows
        </a>
        <h6>After Exception start</h6>
        <WorkOrderTable data={plannedWorkOrders} tableTitle="" />
        <a
          href="#"
          className="next-row-link"
          onClick={() => {
            handleNextPageClick("planned");
          }}
        >
          Show Next 20 Rows
        </a>
      </div>
    </Fragment>
  );
};

export default ExceptionDetailsWorkOrderTab;
