export const NotificationsStandardComponent = () => {
  return (
    <>
      <div className="account-information-box">
        <div className="account-category-info">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-8 border-right col-lg-9">
              <p>
                Select the topic below that would like to be noticed about, for
                more precise notifications,
                <a href="#">create a subscriptions</a> in the custom tab.{" "}
                <a href="#">Learn more</a>
              </p>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-3">
              <div className="d-flex align-items-center justify-content-between">
                <p>Prefferred List</p>
                <a href="#" className="primary-link">
                  <i className="icon-edit"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="account-information-box">
        <div className="account-category-info small-spacing d-flex flex-wrap align-items-center justify-content-between">
          <h6 className="d-flex align-items-center">
            <img className="mr-2" src="images/bell.svg" alt="bell" />
            Exceptions
          </h6>
        </div>
        <div className="account-category-info small-spacing">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <h6>New alert</h6>
              <p className="text-small">
                All Equipments in your Preferred List will be checked every 15
                minutes
              </p>
            </div>
            <div className="col-md-12 col-lg-6 d-flex align-items-center flex-wrap justify-content-md-start justify-content-lg-end ">
              <div className="app-switch-btn">
                <p>PMP</p>
                <label className="switchSmall">
                  <input id="swith-on" type="checkbox" />
                  <small></small>
                </label>
              </div>
              <div className="app-switch-btn">
                <p>Phone</p>
                <label className="switchSmall">
                  <input id="swith-on" type="checkbox" />
                  <small></small>
                </label>
              </div>
              <div className="app-switch-btn mr-0">
                <p>Email</p>
                <label className="switchSmall">
                  <input id="swith-on" type="checkbox" />
                  <small></small>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="account-information-box">
        <div className="account-category-info small-spacing d-flex flex-wrap align-items-center justify-content-between">
          <h6 className="d-flex align-items-center">
            <img className="mr-2" src="images/calendar.svg" alt="calendar" />
            Fault Code
          </h6>
        </div>
        <div className="account-category-info small-spacing">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <h6>New alert</h6>
              <p className="text-small">
                All Equipments in your Preferred List will be checked every 15
                minutes
              </p>
            </div>
            <div className="col-md-12 col-lg-6 d-flex align-items-center flex-wrap justify-content-md-start justify-content-lg-end">
              <div className="app-switch-btn">
                <p>PMP</p>
                <label className="switchSmall">
                  <input id="swith-on" type="checkbox" />
                  <small></small>
                </label>
              </div>
              <div className="app-switch-btn">
                <p>Phone</p>
                <label className="switchSmall">
                  <input id="swith-on" type="checkbox" />
                  <small></small>
                </label>
              </div>
              <div className="app-switch-btn mr-0">
                <p>Email</p>
                <label className="switchSmall">
                  <input id="swith-on" type="checkbox" />
                  <small></small>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="account-information-box">
        <div className="account-category-info small-spacing d-flex flex-wrap align-items-center justify-content-between">
          <h6 className="d-flex align-items-center">
            <img className="mr-2" src="images/chart.svg" alt="chart" />
            Oil Analysis
          </h6>
        </div>
        <div className="account-category-info small-spacing">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <h6>New alert</h6>
              <p className="text-small">
                All Equipments in your Preferred List will be checked every 15
                minutes
              </p>
            </div>
            <div className="col-md-12 col-lg-6 d-flex align-items-center flex-wrap justify-content-md-start justify-content-lg-end">
              <div className="app-switch-btn">
                <p>PMP</p>
                <label className="switchSmall">
                  <input id="swith-on" type="checkbox" />
                  <small></small>
                </label>
              </div>
              <div className="app-switch-btn">
                <p>Phone</p>
                <label className="switchSmall">
                  <input id="swith-on" type="checkbox" />
                  <small></small>
                </label>
              </div>
              <div className="app-switch-btn mr-0">
                <p>Email</p>
                <label className="switchSmall">
                  <input id="swith-on" type="checkbox" />
                  <small></small>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
