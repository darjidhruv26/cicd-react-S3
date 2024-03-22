export const NotificationsCustomComponent = () => {
  return (
    <>
      <div className="account-information-box">
        <div className="add-aubscription">
          <h6>
            <a href="#">
              <i className="icon-plus"></i>Add Subscription
            </a>
          </h6>
        </div>
        <div className="account-category-info small-spacing">
          <div className="row align-items-center flex-nowrap">
            <div className="col-sm-7 col-md-7">
              <h6 className="d-flex align-items-center">
                <span className="online-status"></span>
                <img className="mr-2" src="images/bell.svg" alt="bell" />
                Test Subscription
              </h6>
            </div>
            <div className="col-sm-5 col-md-5">
              <div className="action-btn d-flex align-items-center justify-content-end pr-0">
                <a className="ml-4" href="#">
                  <img src="images/edit.svg" alt="Edit" />
                </a>
                <a href="#" className="ml-3">
                  <img src="images/delete.svg" alt="Delete" />
                </a>
                <div className="app-switch-btn ml-3 mr-0">
                  <label className="switchSmall">
                    <input id="swith-on" type="checkbox" />
                    <small></small>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="account-category-info small-spacing">
          <ul className="product-model-info">
            <li>
              <span>Topic</span>Alerts
            </li>
            <li>
              <span>Equipment</span>1 Package
            </li>
            <li>
              <span>Alerts</span>All Alerts New & Recurred
            </li>
            <li>
              <span>Notification Delivery</span>Default Account Email, Show in
              Notification Center
            </li>
            <li>
              <span>Schedule</span>Every hour
            </li>
          </ul>
        </div>
        <div className="account-category-info small-spacing">
          <div className="row align-items-center flex-nowrap">
            <div className="col-sm-7 col-md-7">
              <h6 className="d-flex align-items-center">
                <span className="online-status"></span>
                <img className="mr-2" src="images/bell.svg" alt="bell" />
                Test Subscription
              </h6>
            </div>
            <div className="col-sm-5 col-md-5">
              <div className="action-btn d-flex align-items-center justify-content-end pr-0">
                <a className="ml-4" href="#">
                  <img src="images/edit.svg" alt="Edit" />
                </a>
                <a href="#" className="ml-3">
                  <img src="images/delete.svg" alt="Delete" />
                </a>
                <div className="app-switch-btn ml-3 mr-0">
                  <label className="switchSmall">
                    <input id="swith-on" type="checkbox" />
                    <small></small>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="account-category-info small-spacing">
          <ul className="product-model-info">
            <li>
              <span>Topic</span>Alerts
            </li>
            <li>
              <span>Equipment</span>1 Package
            </li>
            <li>
              <span>Alerts</span>All Alerts New & Recurred
            </li>
            <li>
              <span>Notification Delivery</span>Default Account Email, Show in
              Notification Center
            </li>
            <li>
              <span>Schedule</span>Every hour
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
