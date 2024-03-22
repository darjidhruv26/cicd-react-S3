export const EquipmentComponent = () => {
  return (
    <div className="form-wizard-list">
      <div className="form-wizard-box">
        <div className="row">
          <div className="col-12 col-md-4">
            <h6>Add List(s)</h6>
            <div className="checkbox-list">
              <div className="form-gruop">
                <div className="checkbox">
                  <label htmlFor="default-checkbox1">
                    <input type="checkbox" id="default-checkbox1" />
                    <em className="input-helper"></em>
                    <span>All Equipment (392)</span>
                  </label>
                </div>
              </div>
              <div className="form-gruop">
                <div className="checkbox">
                  <label htmlFor="default-checkbox2">
                    <input type="checkbox" id="default-checkbox2" />
                    <em className="input-helper"></em>
                    <span>FMG CMA (100)</span>
                  </label>
                </div>
              </div>
              <div className="form-gruop">
                <div className="checkbox">
                  <label htmlFor="default-checkbox3">
                    <input type="checkbox" id="default-checkbox3" />
                    <em className="input-helper"></em>
                    <span>Group 2 (5)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-wizard-box small-spacing">
        <div className="account-category-info d-flex flex-wrap align-items-center justify-content-between p-0">
          <h6>
            <a href="#">
              <i className="icon-plus"></i>Add Individual Packages
            </a>
          </h6>
        </div>
      </div>
      <div className="form-wizard-box">
        <div className="account-category-info d-flex flex-wrap align-items-center justify-content-between p-0">
          <div className="current-view d-flex align-item-center flex-wrap">
            <p>FMG CMA</p>
            <div className="equipment-detail">
              <ul>
                <li>2 Sites</li>
                <li>4 Models</li>
                <li>100 Serial Numbers</li>
              </ul>
            </div>
          </div>
          <h6>
            <a href="#">
              <i className="icon-delete m-0"></i>
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
};
