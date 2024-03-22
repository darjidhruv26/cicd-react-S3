export const SeverityChart = () => {
  return (
    <div className="dashboard-graph site">
      <div className="cols cols5">
        <div className="col">
          <div className="graph-box">
            <div className="graph-heading">
              <div className="switch-box success">
                <div className="switch-icon">
                  <img
                    src={window.location.origin + "/images/header-icon2.svg"}
                    alt="header-icon1"
                  />
                </div>
              </div>
              <h6>Healthy</h6>
            </div>
            <img
              src={window.location.origin + "/images/healthy.png"}
              alt="all-graph"
            />
          </div>
        </div>
        <div className="col">
          <div className="graph-box">
            <div className="graph-heading">
              <div className="switch-box">
                <div className="switch-icon">
                  <img
                    src={window.location.origin + "/images/header-icon1.svg"}
                    alt="header-icon1"
                  />
                </div>
              </div>
              <h6>Not Measured</h6>
            </div>
            <img
              src={window.location.origin + "/images/not-measured.png"}
              alt="all-graph"
            />
          </div>
        </div>
        <div className="col">
          <div className="graph-box">
            <div className="graph-heading">
              <div className="switch-box warning">
                <div className="switch-icon">
                  <img
                    src={window.location.origin + "/images/header-icon3.svg"}
                    alt="header-icon1"
                  />
                </div>
              </div>
              <h6>Moderate</h6>
            </div>
            <img
              src={window.location.origin + "/images/moderate.png"}
              alt="all-graph"
            />
          </div>
        </div>
        <div className="col">
          <div className="graph-box">
            <div className="graph-heading">
              <div className="switch-box pending">
                <div className="switch-icon">
                  <img
                    src={window.location.origin + "/images/header-icon4.svg"}
                    alt="header-icon1"
                  />
                </div>
              </div>
              <h6>Abnormal</h6>
            </div>
            <img
              src={window.location.origin + "/images/abnormal.png"}
              alt="all-graph"
            />
          </div>
        </div>
        <div className="col">
          <div className="graph-box">
            <div className="graph-heading">
              <div className="switch-box danger">
                <div className="switch-icon">
                  <img
                    src={window.location.origin + "/images/header-icon5.svg"}
                    alt="header-icon1"
                  />
                </div>
              </div>
              <h6>Severe</h6>
            </div>
            <img
              src={window.location.origin + "/images/severe.png"}
              alt="all-graph"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
