import React, { useState } from "react";
import Header from "../../layouts/Header/Header";
import { DashboardDetailSubheader } from "../../layouts/SubHeader/DashboardDetailSubheader";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { DetailsComponent } from "./DetailsComponent";
import { EquipmentComponent } from "./EquipmentComponent";
import { AlertComponent } from "./AlertComponent";
import { NotificationDeliveryComponent } from "./NotificationDeliveryComponent";
import { ScheduleComponent } from "./ScheduleComponent";
import { AppMenuTrigger } from "../../layouts/AppMenuTrigger";

const AddCustomSubscription = () => {
  const [visiblityStatus, setVisiblityStatus] = useState(false);
  const [ExpandItem, setExpandItem] = useState("Details");

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
          <>
            <div className="container-top-heading border-0">
              <h6>Add Custom Subscription</h6>
            </div>
            <div className="form-wizard">
              <Accordion className="list-group" preExpanded={["Details"]}>
                <AccordionItem
                  className="list-group-item"
                  uuid="Details"
                  dangerouslySetExpanded={
                    ExpandItem === "Details" ? true : false
                  }
                >
                  <AccordionItemHeading
                    className={ExpandItem === "Details" ? "itemActive" : ""}
                  >
                    <AccordionItemButton>
                      <h6>
                        <span className="acc-step-number badge badge-pill badge-primary mr-1">
                          1
                        </span>
                        Details
                      </h6>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <DetailsComponent />
                    <a
                      href="#"
                      className="btn btn-primary btn-next"
                      onClick={() => {
                        setExpandItem("Equipment");
                      }}
                    >
                      Next
                    </a>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem
                  className="list-group-item"
                  uuid="Equipment"
                  dangerouslySetExpanded={
                    ExpandItem === "Equipment" ? true : false
                  }
                >
                  <AccordionItemHeading
                    className={ExpandItem === "Equipment" ? "itemActive" : ""}
                  >
                    <AccordionItemButton>
                      <h6>
                        <span className="acc-step-number badge badge-pill badge-primary mr-1">
                          2
                        </span>
                        Equipment
                      </h6>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <EquipmentComponent />
                    <a
                      href="#"
                      className="btn btn-light btn-outline-dark btn-previous"
                      onClick={() => {
                        setExpandItem("Details");
                      }}
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="btn btn-primary btn-next"
                      onClick={() => {
                        setExpandItem("Alert");
                      }}
                    >
                      Next
                    </a>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem
                  className="list-group-item"
                  uuid="Alert"
                  dangerouslySetExpanded={ExpandItem === "Alert" ? true : false}
                >
                  <AccordionItemHeading
                    className={ExpandItem === "Alert" ? "itemActive" : ""}
                  >
                    <AccordionItemButton>
                      <h6>
                        <span className="acc-step-number badge badge-pill badge-primary mr-1">
                          3
                        </span>
                        Alert
                      </h6>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <AlertComponent />
                    <a
                      href="#"
                      className="btn btn-light btn-outline-dark btn-previous"
                      onClick={() => {
                        setExpandItem("Equipment");
                      }}
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="btn btn-primary btn-next"
                      onClick={() => {
                        setExpandItem("NotificationDelivery");
                      }}
                    >
                      Next
                    </a>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem
                  className="list-group-item"
                  uuid="NotificationDelivery"
                  dangerouslySetExpanded={
                    ExpandItem === "NotificationDelivery" ? true : false
                  }
                >
                  <AccordionItemHeading
                    className={
                      ExpandItem === "NotificationDelivery" ? "itemActive" : ""
                    }
                  >
                    <AccordionItemButton>
                      <h6>
                        <span className="acc-step-number badge badge-pill badge-primary mr-1">
                          4
                        </span>
                        Notification Delivery
                      </h6>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <NotificationDeliveryComponent />
                    <div className="send-seperate-message">
                      <div className="form-group pb-0 mb-0">
                        <div className="checkbox">
                          <label htmlFor="separate-email">
                            <input type="checkbox" id="separate-email" />
                            <em className="input-helper"></em>
                            <span className="text-black-50">
                              Send separate email for reach package
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="btn btn-light btn-outline-dark btn-previous"
                      onClick={() => {
                        setExpandItem("Alert");
                      }}
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="btn btn-primary btn-next"
                      onClick={() => {
                        setExpandItem("Schedule");
                      }}
                    >
                      Next
                    </a>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem
                  className="list-group-item"
                  uuid="Schedule"
                  dangerouslySetExpanded={
                    ExpandItem === "Schedule" ? true : false
                  }
                >
                  <AccordionItemHeading
                    className={ExpandItem === "Schedule" ? "itemActive" : ""}
                  >
                    <AccordionItemButton>
                      <h6>
                        <span className="acc-step-number badge badge-pill badge-primary mr-1">
                          5
                        </span>
                        Schedule
                      </h6>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <ScheduleComponent />
                    <a
                      href="#"
                      className="btn btn-light btn-outline-dark btn-previous"
                      onClick={() => {
                        setExpandItem("NotificationDelivery");
                      }}
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="btn btn-primary btn-next"
                      onClick={() => {}}
                    >
                      Done
                    </a>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddCustomSubscription;
