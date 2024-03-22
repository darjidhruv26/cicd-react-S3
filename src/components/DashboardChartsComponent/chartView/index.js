import { useState } from "react";
import { CirclePackingChart, SeverityChart, SiteWiseChart } from "../index";

export const ChartView = ({
  setShowGraph,
  headerVisiblity,
  setHeaderVisiblity,
}) => {
  const [graphType, setGraphType] = useState("circle");
  return (
    <>
      <div className="oprations-section">
        <div className="wrap">
          <div className="oprations-row">
            <div className="oprations-tab">
              <ul>
                <li
                  className={`pointer ${
                    graphType === "circle" ? "active" : ""
                  }`}
                >
                  <a
                    onClick={() => {
                      setGraphType("circle");
                    }}
                  >
                    All
                  </a>
                </li>
                <li
                  className={`pointer ${graphType === "site" ? "active" : ""}`}
                >
                  <a
                    onClick={() => {
                      setGraphType("site");
                    }}
                  >
                    Site
                  </a>
                </li>
                <li
                  className={`pointer ${
                    graphType === "severity" ? "active" : ""
                  }`}
                >
                  <a
                    onClick={() => {
                      setGraphType("severity");
                    }}
                  >
                    Severity
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="recommendation-section">
        <div className="dashboard-container">
          <div className="dashboard-heading">
            <h4>
              {graphType === "severity"
                ? "Severity Wise"
                : graphType === "site"
                ? "Site Wise"
                : "All"}
            </h4>
            <div className="resize-box">
              <a
                onClick={() => {
                  setHeaderVisiblity && setHeaderVisiblity(!headerVisiblity);
                }}
              >
                <img
                  src={window.location.origin + "/images/resize.svg"}
                  alt="resize"
                />
              </a>
              <a
                onClick={() => {
                  setShowGraph(false);
                }}
              >
                <img
                  src={window.location.origin + "/images/close-big.svg"}
                  alt="close-big"
                />
              </a>
            </div>
          </div>
          {graphType === "severity" ? (
            <SeverityChart />
          ) : graphType === "site" ? (
            <SiteWiseChart />
          ) : (
            <CirclePackingChart />
          )}
        </div>
      </div>
    </>
  );
};
