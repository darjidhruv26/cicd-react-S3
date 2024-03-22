import { useState } from "react";
import moment from "moment";
import { NotificationBar } from "../../components/NotificationBarComponent";
import { UserProfileModal } from "../../components/UserProfileComponent";

const Header = ({
  subHeader,
  handleManuClick,
  headerVisiblity,
  headerIcon,
  heading,
  setShowLinkModal,
  menuVisiblityStatus,
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  if ((window.location.pathname != "/summary") && (window.location.pathname != "/history")) {
    let getSummaryTabInterval = JSON.parse(
      localStorage.getItem("summary_interval")
    );
    let getHistoryTabInterval = JSON.parse(
      localStorage.getItem("history_interval")
    );
    if (getSummaryTabInterval && getSummaryTabInterval.summary_tab_value) {
      clearInterval(getSummaryTabInterval.summary_tab_value);
      localStorage.removeItem("summary_interval");
    }
    if (getHistoryTabInterval && getHistoryTabInterval.history_tab_value) {
      clearInterval(getHistoryTabInterval.history_tab_value);
      localStorage.removeItem("history_interval");
    }
  }
  
  return (
    <header
      id="header"
      className={`${headerVisiblity ? "removeHeader" : "showDescription"}`}
    >
      <div className="header-row">
        <a href="/dashboard" id="logo" title="Fortescue">
          <img
            src={window.location.origin + "/images/logo.svg"}
            width="184"
            height="75"
            alt="Fortescue"
          ></img>
        </a>
        <div className="header-right">
          <div className="header-top">
            <div className="expectation">
              <h5>
                <img
                  src={
                    headerIcon
                      ? headerIcon
                      : window.location.origin + "/images/expectation.svg"
                  }
                  alt={heading ? heading : ""}
                ></img>
                {heading ? heading : ""}
              </h5>
            </div>
            <div className="notification-div">
              {/* <div className="search-box">
                <form action="" className="search-bar">
                  <input
                    type="search"
                    placeholder="Search here..."
                    name="search"
                    pattern=".*\S.*"
                    required
                  ></input>
                  <button className="search-btn" type="submit">
                    <i className="icon-search-icon"></i>
                  </button>
                </form>
              </div> */}
              {/* <div className="help-box">
                <a href="/#">
                  <i className="icon-help"></i>
                </a>
              </div> */}
              <div className="update-box">
                <p>
                  <span>Updated On </span>{" "}
                  {moment().format("MMMM Do YYYY, h:mm:ss a")}
                </p>
              </div>
              <div
                className={`app-menu ${menuVisiblityStatus ? "active" : ""}`}
              >
                <a
                  className="app"
                  onClick={handleManuClick ? handleManuClick : () => {}}
                >
                  <i className="icon-app"></i>
                </a>
              </div>
              {/* <div
                className={`notification-box ${
                  showNotification ? "active" : ""
                }`}
              >
                <a
                  onClick={() => {
                    setShowNotification(!showNotification);
                    setShowProfile(false);
                  }}
                >
                  <i className="icon-notification"></i>
                  <span>5</span>
                </a>
                {showNotification && (
                  <div
                    className="notification-bg"
                    onClick={() => {
                      setShowNotification(false);
                      setShowProfile(false);
                    }}
                  ></div>
                )}
                <NotificationBar showNotification={showNotification} />
              </div> */}
              <div className={`my-profile ${showProfile ? "active" : ""}`}>
                <a
                  className="pointer"
                  onClick={() => {
                    setShowProfile(!showProfile);
                    setShowNotification(false);
                  }}
                >
                  <img
                    src={window.location.origin + "/images/user-photo.png"}
                    alt="user"
                  ></img>
                </a>
                {showProfile && (
                  <div
                    className="notification-bg"
                    onClick={() => {
                      setShowProfile(false);
                      setShowNotification(false);
                    }}
                  ></div>
                )}
                {
                  <UserProfileModal
                    showProfile={showProfile}
                    setShowLinkModal={setShowLinkModal}
                  />
                }
              </div>
            </div>
          </div>
          <div className="header-bottom">{subHeader ? subHeader : null}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
