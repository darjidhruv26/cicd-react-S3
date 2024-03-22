import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { fetchExceptionPMStatusNextDate } from "../../../redux/exception-details/exceptionDetailsThunks";
import { fetchFleetDetails } from "../../../redux/fleet-details/fleetDetailsThunks";
import { useNavigate } from "react-router-dom";

export const ProductInfoSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let selectedEquipment = useSelector(
    (state) => state.exceptionDetailsReducer.selectedEquipment
  );
  selectedEquipment = selectedEquipment?.length > 0 ? selectedEquipment[0] : {};

  let selectedException = useSelector(
    (state) => state.exceptionDetailsReducer.selectedException
  );
  selectedException = selectedException?.length > 0 ? selectedException[0] : {};

  let lastNextDate = useSelector(
    (state) => state.exceptionDetailsReducer.lastNextDate
  );

  useEffect(() => {
    if (selectedException.event_start_time) {
      dispatch(
        fetchExceptionPMStatusNextDate({
          startdate: selectedException.event_start_time,
          equipmentID: selectedException.equipment_id
        })
      );
    }
  }, [selectedEquipment, selectedException]);

  const showFleet = () => navigate(`/fleet-detail/${selectedEquipment?.asset_name}`);


  return (
    <div className="product-info-section">
      <div className="wrap">
        <div className="product-info-row">
          <div className="product-information">
            <div className="product-photo" style={{cursor: 'pointer'}} onClick={showFleet}>
              <figure>
                <span>{selectedEquipment.serial_number}</span>
                {selectedEquipment.fleet_type === "Haul Trucks" ? (
                  <img
                    src={window.location.origin + "/images/product-1.png"}
                    alt="product-1"
                  ></img>
                ) : (
                  <img
                    src={window.location.origin + "/images/product-0.png"}
                    alt="no image"
                  ></img>
                )}
              </figure>
            </div>
            <div className="product-info-cols">
              <div className="cols cols3">
                <div className="col" style={{cursor: 'pointer'}} onClick={showFleet}>
                  <ul className="product-model-info">
                    <li>
                      <span>Model:</span>
                      {selectedEquipment.model}
                    </li>
                    <li>
                      <span>Equipment Id:</span>
                      {selectedEquipment.asset_name}
                    </li>
                    <li>
                      <span>Fleet Type:</span>
                      {selectedEquipment.fleet_type}
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="product-model-duration">
                    {/* <li><i className="icon-network"></i>25<sup>th</sup> Dec 2021 <span>|</span> 09:02 AM </li> */}
                    <li>
                      <i className="icon-network"></i>
                      <Moment format="YYYY/MM/DD h:mm a">
                        {selectedEquipment.last_communication}
                      </Moment>
                    </li>
                    <li>
                      <i className="icon-calendar"></i>
                      {lastNextDate && lastNextDate.last_date ? (
                        <>
                          <Moment format="DD MMM YYYY">
                            {lastNextDate.last_date}
                          </Moment>
                          <>&nbsp;(Last PM)</>
                        </>
                      ) : (
                        "-"
                      )}
                    </li>
                    <li>
                      <i className="icon-calendar"></i>
                      {lastNextDate && lastNextDate.next_date ? (
                        <>
                          <Moment format="DD MMM YYYY">
                            {lastNextDate.next_date}
                          </Moment>
                          <>&nbsp;(Next PM)</>
                        </>
                      ) : (
                        "-"
                      )}
                    </li>
                  </ul>
                </div>
                {/* <div className="col">
                  <ul className="product-model-info">
                    <li>
                      <span>Last PM:</span>20,530
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
            <div className="count-box">
              <span>Count</span>
              <h3>{selectedException.event_total_count}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
