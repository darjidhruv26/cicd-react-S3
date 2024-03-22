export const ScheduleComponent = () => {
  return (
    <div className="form-wizard-list">
      <div className="form-wizard-box">
        <div className="induvidual-filter">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <div className="form-group mb-0 pb-0">
                <label>Check for Alerts*</label>
                <div className="custom-select">
                  <select>
                    <option>Every 15 minutes</option>
                    <option>Every 15 minutes</option>
                    <option>Every 15 minutes</option>
                    <option>Every 15 minutes</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <div className="form-group mb-0 pb-0">
                <label>When</label>
                <div className="custom-select">
                  <select>
                    <option>Always</option>
                    <option>Always</option>
                    <option>Always</option>
                    <option>Always</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
