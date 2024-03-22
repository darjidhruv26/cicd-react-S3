import { Link } from "react-router-dom";
export const OprationSection = ({
  operationRightTab,
  activeTab,
  handleAutoRefresh,
  autoRefresh,
  isVisibleautoRefresh
}) => {
  const handleRefreshInteval = (tab) => {
    if (tab === "summary") {
      let summaryIntervalData = JSON.parse(
        localStorage.getItem("summary_interval")
      );
      if (summaryIntervalData && summaryIntervalData.summary_tab_value) {
        clearInterval(summaryIntervalData.summary_tab_value);
      }
      localStorage.removeItem("summary_interval");
    } else {
      let historyIntervalData = JSON.parse(
        localStorage.getItem("history_interval")
      );
      if (historyIntervalData && historyIntervalData.history_tab_value) {
        clearInterval(historyIntervalData.history_tab_value);
      }
      localStorage.removeItem("history_interval");
    }
  };

  return (
    <>
      <div className="oprations-section">
        <div className="wrap">
          <div className="oprations-row header-right-option">
            <div className="oprations-tab">
              <ul>
                {/* <li
                  className={activeMenu && activeMenu === "kpi" ? "active" : ""}
                >
                  <a href="#">KPI</a>
                </li> */}
                {/* <li
                  className={
                    activeMenu && activeMenu === "dashboard" ? "active" : ""
                  }
                >
                  <Link to="/dashboard">Operations</Link>
                </li> */}
                <li
                  className={activeTab === "summary" ? "active" : ""}
                  name="summary"
                  onClick={(e) => handleRefreshInteval(activeTab)}
                >
                  <Link to="/summary">Summary</Link>
                </li>
                <li
                  className={activeTab === "AllData" ? "active" : ""}
                  name="AllData"
                  onClick={(e) => handleRefreshInteval(activeTab)}
                >
                  <Link to="/All-Data">Dashboard</Link>
                </li>
                <li
                  className={activeTab === "history" ? "active" : ""}
                  name="history"
                  onClick={(e) => handleRefreshInteval(activeTab)}
                >
                  <Link to="/history">History</Link>
                </li>
                {/* <li
                  className={activeMenu["history"] ? "active" : ""}
                  onClick={() =>
                    handleManuClick({ summary: false, history: true })
                  }
                >
                  <Link to="/history">History</Link>
                </li> */}
                {/* <li
                  className={
                    activeMenu && activeMenu === "summary_v1" ? "active" : ""
                  }
                >
                  <Link to="/summary-v1">Summary V1</Link>
                </li> */}
              </ul>
            </div>
            {isVisibleautoRefresh ? <div style={{ marginRight: "100px" }}>
              <div className="mr-3 checkbox">
                <label htmlFor="default-checkbox">
                  <input
                    type="checkbox"
                    id="default-checkbox"
                    onChange={() => {
                      handleAutoRefresh(!autoRefresh);
                    }}
                    checked={autoRefresh}
                  />
                  <em className="input-helper"></em>
                </label>
              </div>
              <span className="ml-2">Auto Refresh</span>
            </div> :<> </>}
            {operationRightTab}
          </div>
        </div>
      </div>
    </>
  );
};
