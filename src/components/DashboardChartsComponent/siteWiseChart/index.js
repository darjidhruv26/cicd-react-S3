export const SiteWiseChart = () => {
  return (
    <div className="dashboard-graph site">
      <div className="cols cols3">
        <div className="col">
          <div className="graph-box">
            <div className="graph-heading">
              <h5>SOL</h5>
            </div>
            <img
              src={window.location.origin + "/images/sol.png"}
              alt="all-graph"
            />
          </div>
        </div>
        <div className="col">
          <div className="graph-box">
            <div className="graph-heading">
              <h5>CLB</h5>
            </div>
            <img
              src={window.location.origin + "/images/clb.png"}
              alt="all-graph"
            />
          </div>
        </div>
        <div className="col">
          <div className="graph-box">
            <div className="graph-heading">
              <h5>CCM</h5>
            </div>
            <img
              src={window.location.origin + "/images/cmm.png"}
              alt="all-graph"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
