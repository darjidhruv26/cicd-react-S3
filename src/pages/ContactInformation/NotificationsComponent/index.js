import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NotificationsStandardComponent } from "./NotificationsStandardComponent";
import { NotificationsCustomComponent } from "./NotificationsCustomComponent";

export const NotificationsComponent = () => {
  return (
    <>
      <Tabs>
        <TabList className="nav nav-tabs">
          <Tab className="nav-item">
            <a
              className="nav-link"
              id="StandardTab"
              data-toggle="tab"
              href="#standard"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Standard
            </a>
          </Tab>
          <Tab className="nav-item">
            <a
              className="nav-link"
              id="customTab"
              data-toggle="tab"
              href="#custom"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Custom(1)
            </a>
          </Tab>
        </TabList>
        <div className="tab-content position-relative" id="myTabContent">
          <TabPanel className="tabcontent" id="standard">
            <NotificationsStandardComponent />
          </TabPanel>
          <TabPanel className="tabcontent" id="custom">
            <NotificationsCustomComponent />
          </TabPanel>
        </div>
      </Tabs>
    </>
  );
};
