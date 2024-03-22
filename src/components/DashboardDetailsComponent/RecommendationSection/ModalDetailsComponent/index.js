import React, { Fragment } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Moment from "react-moment";
import { AccordionLineChart } from "../../index"

export const ModalDetailsComponent = ({ setPopupModal, otherData }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const graphData = {
    labels: ["orange", "red", "yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [4, 2, 2],
        backgroundColor: [
          "rgb(216, 96, 24)",
          "rgb(178, 41, 46)",
          "rgb(241, 196, 0)",
        ],
        borderColor: [
          "rgb(216, 96, 24)",
          "rgb(178, 41, 46)",
          "rgb(241, 196, 0)",
        ],
        borderWidth: 1,
        cutout: 26,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      className="opration-accordion-trigger itemActive"
      onClick={() => {
        setPopupModal &&
          otherData &&
          otherData.asset_name &&
          setPopupModal(true, otherData.asset_name);
      }}
    >
      <div className="recommendation-point mr-30">
        <ul className="recommendation">
          <li>
            <span>SN</span>
            {otherData && otherData.serial_number
              ? otherData.serial_number
              : ""}
          </li>
          <li>
            <span>Asset:</span>
            {otherData && otherData.asset_name
              ? otherData.asset_name
              : ""}
          </li>
          <li>
            <span>Model:</span>
            {otherData && otherData.model ? otherData.model : ""}
          </li>
          <li>
            <span>Site:</span>
            {otherData && otherData.sitename ? otherData.sitename : ""}
          </li>
        </ul>
      </div>
      <div className="barchartbox">
        <div
          id="pie"
          className="example"
          style={{ width: "80px", height: "80px", position: "relative" }}
        >
          <img src={window.location.origin + "/images/union.svg"} alt="union" />
          <Doughnut data={graphData} options={options} />
        </div>
      </div>
      <ul className="product-model-duration mr-30">
        <li>
          <i className="icon-network"></i>
          {otherData && otherData.last_communication ?
            <Moment format="YYYY/MM/DD h:mm a">
              {otherData.last_communication}
            </Moment>
            : ""}
        </li>
        <li>
          <i className="icon-calendar"></i>
              {otherData && otherData.next_pm ?
            <Fragment>
              <Moment format="YYYY/MM/DD h:mm a">
                {otherData.next_pm}
              </Moment><Fragment>&nbsp;(Next PM)</Fragment>
            </Fragment>
              : ""}
        </li>
        <li>
          <i className="icon-calendar"></i>
          {otherData && otherData.last_pm ?
            <Fragment>
              <Moment format="YYYY/MM/DD h:mm a">
                {otherData.last_pm}
              </Moment><Fragment>&nbsp;(Last PM)</Fragment>
            </Fragment>
            : ""}
        </li>
      </ul>
      <div className="chartbar-img mr-30">
        {/* <img
          src={window.location.origin + "/images/yearly-charte-bar.svg"}
          alt="yearly-charte-bar"
        /> */}
        <AccordionLineChart LastPM= {otherData.last_pm} NextPM= {otherData.next_pm} graphContent={[]} />
      </div>
      <div className="recommendation-point mr-30">
        <ul>
          <li>
            <a
              href="#"
              className="TooltipTrigger"
              data-tooltips="25th Dec 2021"
              data-position="OnTop"
            >
              <span>SMU Hour:</span>{otherData && otherData.smh ? otherData.smh : ""}
            </a>
          </li>
        </ul>
      </div>
      <div className="exceptions-chart-div mr-30">
        <ul>
          <li>Exceptions</li>
          <li>
            {/* <img
              src={window.location.origin + "/images/exceptions-chart.svg"}
              alt="exceptions-chart"
            /> */}
            <ul className="chart">
              <li>
                <div className="chart-icon">
                  <img
                    src={window.location.origin + "/images/bell.svg"}
                    alt="bell"
                  />
                </div>
                <span className="chart-bar-relative">
                  <span
                    className="bar"
                    data-number={otherData.exception_count}
                    style={{ width: `${otherData.exception_count}%` }}
                  ></span>
                  <span className="number">{otherData.exception_count}</span>
                </span>
              </li>
              <li>
                <div className="chart-icon">
                  <img
                    src={window.location.origin + "/images/calendar.svg"}
                    alt="calendar"
                  />
                </div>
                <span className="chart-bar-relative">
                  <span
                    className="bar"
                    data-number={otherData.event_count}
                    style={{ width: `${otherData.event_count}%` }}
                  ></span>
                  <span className="number">{otherData.event_count}</span>
                </span>
              </li>
              <li>
                <div className="chart-icon">
                  <img
                    src={window.location.origin + "/images/chart.svg"}
                    alt="chart"
                  />
                </div>
                <span className="chart-bar-relative">
                  <span
                    className="bar"
                    data-number={otherData.oil_count}
                    style={{ width: `${otherData.oil_count}%` }}
                  ></span>
                  <span className="number">{otherData.oil_count}</span>
                </span>
              </li>
              <li>
                <div className="chart-icon">
                  <img
                    src={window.location.origin + "/images/file-check.svg"}
                    alt="file-check"
                  />
                </div>
                <span className="chart-bar-relative">
                  <span
                    className="bar"
                    data-number={otherData.conmon_count}
                    style={{ width: `${otherData.conmon_count}%` }}
                  ></span>
                  <span className="number">{otherData.conmon_count}</span>
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="recommendation-point">
        <ul>
          <li>Recommendation</li>
          <li>
            <span>Immediate Attention:</span>235
          </li>
          <li>
            <span>At Next Stop:</span>35
          </li>
          <li>
            <span>At Next Service:</span>20
          </li>
          <li>
            <span>Monitor:</span>20
          </li>
        </ul>
      </div>
    </div>
  );
};
