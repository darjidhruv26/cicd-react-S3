export const BasicDetailsComponent = ({
  otherData,
  name,
  itemIndex,
  handleClick,
}) => {
  return (
    <div
      className="opration-accordion-trigger"
      onClick={() => {
        handleClick && handleClick(name);
      }}
    >
      <div className="product-name-box">
        <div className="product-counter">{otherData && otherData.totalcount ? otherData.totalcount : 0}</div>
        <div className="product-info">
          <p className="site-title" title={name}>{name}</p>
        </div>
      </div>
      <div className="barchartbox">
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
      </div>
      <div className="network-box">
        <ul>
          <li>
            <i className="icon-network success-color"></i>{otherData.green}
          </li>
          <li>
            <i className="icon-network pending-color"></i>{otherData.orange}
          </li>
          <li>
            <i className="icon-network danger-color"></i>{otherData.red}
          </li>
        </ul>
      </div>
      {/* <div className="recommendation-point">
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
      </div> */}
    </div>
  );
};
