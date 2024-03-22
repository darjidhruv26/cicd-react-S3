export const AlertComponent = () => {
  return (
    <div className="form-wizard-list">
      <div className="form-wizard-box">
        <div className="row">
          <div className="col-12 col-md-4">
            <h6>Select Alert Type(s)*</h6>
            <div className="checkbox-list">
              <div className="form-gruop">
                <div className="checkbox">
                  <label for="All-Equipment">
                    <input type="checkbox" id="All-Equipment" />
                    <em className="input-helper"></em>
                    <span>All Equipment (392)</span>
                  </label>
                </div>
              </div>
              <div className="form-gruop">
                <div className="checkbox">
                  <label for="Recurred">
                    <input type="checkbox" id="Recurred" />
                    <em className="input-helper"></em>
                    <span>Recurred (for "Watched" alert only)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
