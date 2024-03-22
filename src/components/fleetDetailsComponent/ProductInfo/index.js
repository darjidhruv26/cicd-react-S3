import Moment from "react-moment";
import { StackedLineAreaChart } from "../../../components/fleetDetailsComponent/stackedLineAreaChart";

export const ProductInfo = ({ asset} ) => {

  return (
    <div className="product-info-section">
      <div className="wrap">
        <div className="product-info-row">
          <div className="product-information">
            <div className="product-photo">
              <figure>
                <span>{asset.serial_number}</span>
                <img
                  src={`${window.location.origin}/images/${(asset.fleet_type.toLowerCase()).replace(/ /g,"_")}.png`}
                  alt="No image"
                />
              </figure>
            </div>
            <div className="product-info-cols">
              <div className="cols cols3">
                <div className="col">
                  <ul className="product-model-info">
                    <li>
                      <span>Model:</span>
                      {asset.model}
                    </li>
                    <li>
                      <span>Equipment Id:</span>
                      {asset.asset_name}
                    </li>
                    <li>
                      <span>Fleet Manager:</span>
                      {asset.fleet_type}
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="product-model-duration">
                    <li>
                      <i className="icon-network"></i>
                      <Moment format="YYYY/MM/DD h:mm a">
                        {asset.last_communication}
                      </Moment>
                    </li>
                    <li>
                      <i className="icon-calendar"></i>20<sup>th</sup> Oct 2021
                      (Last)
                    </li>
                    <li>
                      <i className="icon-calendar"></i>2<sup>nd</sup> Feb 2022
                      (Next)
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="product-model-info">
                    <li>
                      <span>Last PM:</span>
                      {asset.smh}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-4">
                <div className="header-graph">
                  <h6>Mean Time Between Failures</h6>
                  {/* <img src={window.location.origin + "/images/top-graph.png"} alt="top-graph" /> */}
                  <StackedLineAreaChart />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4">
                <div className="header-graph">
                  <h6>Mean Time Between Failures</h6>
                  {/* <img src={window.location.origin + "/images/top-graph.png"} alt="top-graph" /> */}
                  <StackedLineAreaChart />
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="header-graph">
                  <h6>Mean Time Between Failures</h6>
                  {/* <img src={window.location.origin + "/images/top-graph.png"} alt="top-graph" /> */}
                  <StackedLineAreaChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
