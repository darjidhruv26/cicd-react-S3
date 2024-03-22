import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import {
  fetchExceptionPMStatusNextDate,
  fetchRemsConmonWatchlistValues,
} from "../../../redux/exception-details/exceptionDetailsThunks";
import { fetchFleetDetails } from "../../../redux/fleet-details/fleetDetailsThunks";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";


const fleetType = ["Drills", "Excavators", "Haul Trucks"];
const fleetSubType = [
  "Graders",
  "Wheel Loaders",
  "Dozers",
  "Low Loader",
  "Service Vehicles",
  "Water Trucks",
];

const EquipmentDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fleetImage, setFleetImage] = useState(
    `${window?.location?.origin}/images/product-0.png`
  );

  let selectedEquipment = useSelector(
    (state) => state.exceptionDetailsReducer.selectedEquipment
  );

  selectedEquipment = selectedEquipment?.length > 0 ? selectedEquipment[0] : {};

  let isLoading = useSelector(
    (state) => state.exceptionDetailsReducer.isLoading
  );

  let selectedException = useSelector(
    (state) => state.exceptionDetailsReducer.selectedException
  );
  selectedException = selectedException?.length > 0 ? selectedException[0] : {};

  let lastNextDate = useSelector(
    (state) => state.exceptionDetailsReducer.lastNextDate
  );


 
  useEffect(() => {
    let imagePath = `${window.location.origin}/images/fleet_images/`;
    if (
      selectedEquipment &&
      selectedEquipment.fleet_type &&
      fleetType.includes(selectedEquipment.fleet_type)
    ) {
      setFleetImage(
        imagePath +
          `${selectedEquipment.fleet_type
            .toLowerCase()
            .replaceAll(" ", "_")}.png`
      );
    } else if (
      selectedEquipment &&
      selectedEquipment.fleet_sub_type &&
      fleetSubType.includes(selectedEquipment.fleet_sub_type)
    ) {
      setFleetImage(
        `${imagePath}${selectedEquipment.fleet_sub_type
          .toLowerCase()
          .replaceAll(" ", "_")}.png`
      );
    }
  }, [selectedEquipment]);

  useEffect(() => {
    if (selectedException.event_start_time) {
      dispatch(
        fetchExceptionPMStatusNextDate({
          startdate: selectedException.event_start_time,
          equipmentID: selectedException.equipment_id,
        })
      );
    }
  }, [selectedEquipment, selectedException]);

  useEffect(() => {
    if (selectedEquipment.asset_name){
      dispatch(fetchRemsConmonWatchlistValues({
        assetId: selectedEquipment.asset_name,
        siteCode: selectedEquipment.site_id_current
      }));
    }
  }, [selectedEquipment]);

  const showFleet = () =>
    navigate(`/fleet-detail/${selectedEquipment?.asset_name}`);

  return (
    <div className="product-info-section">
      <div className="wrap">
        <div className="product-info-row">
          <div className="product-information">
            <div
              className="product-photo"
              style={{ cursor: "pointer" }}
              onClick={showFleet}
            >
              <figure>
                <span>{selectedEquipment.serial_number}</span>
                {fleetImage && (
                  <img
                    src={fleetImage}
                    alt="No Image"
                  ></img>
                )}
              </figure>
            </div>
            <div className="product-info-cols">
              <div className="cols cols3">
                <div
                  className="col"
                  style={{ cursor: "pointer" }}
                  onClick={showFleet}
                >
                  <ul className="product-model-info" style={{ height: "100%" }}>
                    <li>
                      <span>Model:</span>
                      {isLoading ? (
                        <Skeleton height={14} />
                      ) : (
                        selectedEquipment.model
                      )}
                    </li>
                    <li>
                      <span>Equipment Id:</span>
                      {isLoading ? (
                        <Skeleton height={14} />
                      ) : (
                        selectedEquipment.asset_name
                      )}
                    </li>
                    <li>
                      <span>Fleet Type:</span>
                      {isLoading ? (
                        <Skeleton height={14} />
                      ) : (
                        selectedEquipment.fleet_type
                      )}
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="product-model-duration">
                    {/* <li><i className="icon-network"></i>25<sup>th</sup> Dec 2021 <span>|</span> 09:02 AM </li> */}
                    <li>
                      <i className="icon-network"></i>
                      {isLoading ? <p><Skeleton width={175} height={14}/></p> :
                      selectedEquipment?.last_communication ? moment(selectedEquipment.last_communication).format("YYYY/MM/DD hh:mm a") : ''}

                    </li>
                    <li>
                      <i className="icon-calendar"></i>
                      {isLoading ? (
                        <p>
                          <Skeleton width={175} height={14} />
                        </p>
                      ) : lastNextDate && lastNextDate.last_date ? (
                        <Fragment>
                          <Moment format="DD MMM YYYY">
                            {lastNextDate.last_date}
                          </Moment>
                          <Fragment>&nbsp;(Last PM)</Fragment>
                        </Fragment>
                      ) : (
                        "-"
                      )}
                    </li>
                    <li>
                      <i className="icon-calendar"></i>
                      {isLoading ? (
                        <p>
                          <Skeleton width={175} height={14} />
                        </p>
                      ) : lastNextDate && lastNextDate.next_date ? (
                        <Fragment>
                          <Moment format="DD MMM YYYY">
                            {lastNextDate?.next_date}
                          </Moment>
                          <Fragment>&nbsp;(Next PM)</Fragment>
                        </Fragment>
                      ) : (
                        "-"
                      )}
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="product-model-info">
                    <li>
                      <span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="count-box">
              <span>Count</span>
              <h3>{selectedException.event_total_count}</h3>
            </div>
          </div>

          <div className="recomandation">
            <a href="/#">
              <i className="icon-mail"></i>
            </a>
            <a
              onClick={() =>
                navigate("/recommendation", {
                  state: { exceptionId: selectedException?.id },
                })
              }
              className="pointer"
            >
              <i className="icon-plus"></i>
              <span>Recommendation</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;
