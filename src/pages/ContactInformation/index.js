import React, { useState } from "react";
import Header from "../../layouts/Header/Header";
import { DashboardDetailSubheader } from "../../layouts/SubHeader/DashboardDetailSubheader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { PreferencesComponent } from "./PreferencesComponent";
import { NotificationsComponent } from "./NotificationsComponent";
import { AppMenuTrigger } from "../../layouts/AppMenuTrigger";

const ContactInformation = () => {
  const [visiblityStatus, setVisiblityStatus] = useState(false);

  const handleManuClick = () => {
    setVisiblityStatus(!visiblityStatus);
  };

  return (
    <>
      <Header
        subHeader={<DashboardDetailSubheader />}
        handleManuClick={handleManuClick}
        menuVisiblityStatus={visiblityStatus}
        headerIcon={window.location.origin + "/images/graph.svg"}
        heading="Dashboard"
      />
      <div id="main">
        {visiblityStatus ? (
          <AppMenuTrigger
            className={`${visiblityStatus ? "fadeIn" : "fadeOut"}`}
          />
        ) : (
          <div className="left-sidebar-dashboard">
            <Tabs className="tab-data sidebar d-flex">
              <TabList className="tabnav flex-column cf">
                <Tab>
                  <a href="#" data-rel="preferences">
                    Preferences
                  </a>
                </Tab>
                <Tab>
                  <a href="#" data-rel="notifications">
                    Notifications
                  </a>
                </Tab>
              </TabList>
              <div className="tab-container">
                <TabPanel className="tabcontent" id="preferences">
                  <PreferencesComponent />
                </TabPanel>
                <TabPanel className="tabcontent" id="notifications">
                  <NotificationsComponent />
                </TabPanel>
              </div>
            </Tabs>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactInformation;
