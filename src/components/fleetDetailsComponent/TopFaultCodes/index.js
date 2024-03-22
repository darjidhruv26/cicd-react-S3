export const TopFaultCodes = ({asset}) => {
  return (
    <div className="col-sm-12 col-md-6">
      <div className="top-boxes">
        <h6 className="d-flex align-items-center">
          <img className="mr-2" src={window.location.origin + "/images/fault-code.svg"} alt="" />
          Top 3 Fault Codes
        </h6>
        <div className="top-box d-flex justify-content-center justify-content-sm-between">
          {asset?.exceptions?.filter((i, index) => (index < 3))?.map(code => <div key={code.id} className="top-box-info">
            <h5 className="orange d-flex align-items-center justify-content-center">
                {code.total_critical}
              </h5>
              <p>{code.event_description}</p>
          </div>)}
        </div>
      </div>
    </div>
  );
};
