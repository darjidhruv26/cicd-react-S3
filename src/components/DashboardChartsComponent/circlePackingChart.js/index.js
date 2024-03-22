export const CirclePackingChart = () => {
  return (
    <div className="dashboard-graph">
      <div className="cols cols1">
        <div className="col">
          <div className="graph-box">
            <img 
              src={window.location.origin + "/images/all-graph.png"}
              alt="all-graph"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
