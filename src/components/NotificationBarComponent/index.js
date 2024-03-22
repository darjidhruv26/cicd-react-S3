import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export const NotificationBar = ({ showNotification }) => {
  return (
    <div
      className={`notification-header-box ${showNotification ? "active" : ""}`}
    >
      <div className="notification-box-detail">
        <div className="custombox-tabs">
          <Tabs className="tab-data">
            <TabList className="tabnav cf">
              <Tab>
                <a href="#" data-rel="inboxTab">
                  <i className="icon-mail"></i>Inbox
                </a>
              </Tab>
              <Tab>
                <a href="#" data-rel="starredTab">
                  <i className="icon-star"></i>Starred
                </a>
              </Tab>
            </TabList>
            <div className="tab-container">
              <TabPanel className="tabcontent" id="inboxTab">
                <div className="inbox-box-tab">
                  <div className="notification-list">
                    <div className="notification-list-box d-flex align-items-center">
                      <img
                        src={
                          window.location.origin +
                          "/images/notification-msg.svg"
                        }
                        className="mr-2"
                        alt="notification-msg"
                      />
                      <div className="notiication-point-info">
                        <p>High Air Filter Differential Pressure Left</p>
                        <div className="small-font equipment-detail d-flex align-items-center flex-wrap">
                          <ul className="text-black-50 ">
                            <li>Solomon</li>
                            <li>793F </li>
                            <li>SSP00273</li>
                          </ul>
                          <p className="text-black-50">
                            25th Dec 2021 09:43:21
                          </p>
                        </div>
                      </div>
                      <a href="#" className="notification-star">
                        <i className="icon-star"></i>
                      </a>
                    </div>
                    <div className="notification-list-box  d-flex align-items-center">
                      <div className="warning-icon">
                        <img
                          src={
                            window.location.origin + "/images/warning-icon.svg"
                          }
                          alt=""
                          warning-icon="true"
                        />
                      </div>
                      <img
                        src={
                          window.location.origin + "/images/cleaner-filter.svg"
                        }
                        className="mr-2"
                        alt="notification-msg"
                      />
                      <div className="notiication-point-info">
                        <p>Possible plugged Air Cleaners/Filters</p>
                        <div className="small-font equipment-detail d-flex align-items-center flex-wrap">
                          <ul className="text-black-50 ">
                            <li>Solomon</li>
                            <li>793F </li>
                            <li>SSP00273</li>
                          </ul>
                          <p className="text-black-50">
                            25th Dec 2021 09:43:21
                          </p>
                        </div>
                      </div>
                      <a href="#" className="notification-star active">
                        <i className="icon-star"></i>
                      </a>
                    </div>
                  </div>
                  <div className="profile-footer">
                    <div className="contact-us-profile text-center flex-column d-flex align-items-center justify-center">
                      <h6>
                        To receive notifications,
                        <br />
                        setup a subscription
                      </h6>
                      <button
                        type="button"
                        className="my-3 btn btn-outline-primary btn-sm"
                        data-dismiss="modal"
                      >
                        <img
                          src={window.location.origin + "/images/gear.svg"}
                          alt="gear"
                        />
                        settings
                      </button>
                      <p>
                        Note: If you have already set up one or more
                        subscriptions, notifications will be shown here as soon
                        as you have a new one.
                      </p>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel className="tabcontent" id="starredTab">
                <div className="inbox-box-tab">
                  <div className="notification-list">
                    <div className="notification-list-box d-flex align-items-center">
                      <div className="warning-icon">
                        <img
                          src={
                            window.location.origin + "/images/warning-icon.svg"
                          }
                          alt=""
                          warning-icon="true"
                        />
                      </div>
                      <img
                        src={
                          window.location.origin + "/images/cleaner-filter.svg"
                        }
                        className="mr-2"
                        alt="notification-msg"
                      />
                      <div className="notiication-point-info">
                        <p>Possible plugged Air Cleaners/Filters</p>
                        <div className="small-font equipment-detail d-flex align-items-center flex-wrap">
                          <ul className="text-black-50 ">
                            <li>Solomon</li>
                            <li>793F </li>
                            <li>SSP00273</li>
                          </ul>
                          <p className="text-black-50">
                            25th Dec 2021 09:43:21
                          </p>
                        </div>
                      </div>
                      <a href="#" className="notification-star active">
                        <i className="icon-star"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
