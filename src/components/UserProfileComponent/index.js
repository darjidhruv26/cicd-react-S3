import { useNavigate } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import { useMsal } from "@azure/msal-react";
import packageJson from "../../../package.json";

export const UserProfileModal = ({ showProfile, setShowLinkModal }) => {
  const navigate = useNavigate()
  const { instance } = useMsal();
  const account = instance.getActiveAccount();
  return (
    <>
      <div
        className={`profile-detail-box ${showProfile ? "active" : ""}`}
        // style={!showProfile ? { opacity: "0" } : { opacity: "1" }}
      >
        <div className="profile-detail">
          <div className="profile-name-info">
            <div className="profile-pic">
              <figure>
                <img
                  src={window.location.origin + "/images/user-photo.png"}
                  alt="userPhoto"
                />
              </figure>
              <h6>
                {account?.name} <span>{account?.username}</span>
              </h6>
            </div>
            <h6>
              <SignOutButton/>
            </h6>
          </div>
          <div className="dark-mode-box d-flex align-items-center justify-content-between">
            <h6>Dark Theme</h6>
            <div className="app-switch-btn">
              <label className="switchSmall">
                <input id="swith-on" type="checkbox" />
                <small></small>
              </label>
            </div>
          </div>
          <div className="notes-box">
            <h6>
              <a
                href="#"
                className="d-flex align-items-center justify-content-between"
              >
                Release Notes <i className="icon-arrow-down"></i>
              </a>
            </h6>
          </div>
          <div className="notes-box">
            <h6>
              <a
                href="#"
                className="d-flex align-items-center justify-content-between"
              >
                FMG<i className="icon-arrow-down rotate-90"></i>
              </a>
            </h6>
          </div>
          <div className="notes-box d-flex align-items-center justify-content-center border-0">
            <h6 className="pointer">
              <a
                onClick={() => {
                  setShowLinkModal(true);
                }}
              >
                <i className="icon-plus"></i>Create your own link(s)
              </a>
            </h6>
          </div>

          <div className="profile-footer">
            <div className="contact-us-profile d-flex align-items-center justify-content-center">
              <a href="#" onClick={()=>{navigate("/contact-information")}}>
                <h6 className="d-flex align-items-center">
                  <img
                    className="mr-2"
                    src={window.location.origin + "/images/contact-us.svg"}
                    alt="contact-us"
                  />
                  Contact Us
                </h6>
              </a>
            </div>
            <div className="profile-copy-right-box d-flex justify-content-center align-items-center flex-column">
              <div className="profile-company-logo">
                <img
                  src={window.location.origin + "/images/FMG_sqaure.svg"}
                  alt="FMG_sqaure"
                />
              </div>
              <p>
                © 2022 Fortescue Metals Group - PMP <br />
                Version {packageJson.version}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
