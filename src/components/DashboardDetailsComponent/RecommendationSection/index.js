import { BasicDetailsComponent } from "./BasicDetailsComponent";
import { ModalDetailsComponent } from "./ModalDetailsComponent";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDashboardAssetBySitename,
  fetchDashboardAssetByFleettype,
  fetchDashboardAssetByModel,
} from "../../../redux/dashboard/dashboardThunks";
import { useEffect } from "react";

export const RecommendationSection = ({ setPopupModal }) => {
  const dispatch = useDispatch();
  let dashboardAssets = useSelector(
    (state) => state.dashboardAssetsReducer.dashboardAssets
  );

  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  )

  const handleSiteClick = (index, siteName) => {
    dispatch(fetchDashboardAssetBySitename({ index, siteName, filterGroupId: userPreferences.selected_filter_group_id }));
  };

  const handleFleetClick = (index, siteIndex, siteItem) => {
    dispatch(fetchDashboardAssetByFleettype({ index, siteIndex, siteItem, filterGroupId: userPreferences.selected_filter_group_id }));
  };

  const handleModalClick = (index, siteIndex, fleetIndex, fleetItem) => {
    dispatch(
      fetchDashboardAssetByModel({
        index,
        siteIndex,
        fleetIndex,
        fleetItem,
        filterGroupId: userPreferences.selected_filter_group_id 
      })
    );
  };

  return (
    <div className="recommendation-section">
      <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
        {dashboardAssets && dashboardAssets.length > 0
          ? dashboardAssets.map((item, index) => (
              <AccordionItem key={index}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <BasicDetailsComponent
                      otherData={item}
                      name={item && item.sitename ? item.sitename : ""}
                      itemIndex={index}
                      handleClick={(name) => handleSiteClick(index, name)}
                    />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <Accordion
                    allowMultipleExpanded={true}
                    allowZeroExpanded={true}
                  >
                    {item.data && item.data.length > 0
                      ? item.data.map((siteItem, siteIndex) => {
                          return (
                            <AccordionItem key={siteIndex}>
                              <AccordionItemHeading className="itemActive">
                                <AccordionItemButton>
                                  <BasicDetailsComponent
                                    otherData={siteItem}
                                    name={
                                      siteItem && siteItem.fleet_type
                                        ? siteItem.fleet_type
                                        : ""
                                    }
                                    itemIndex={index}
                                    handleClick={() =>
                                      handleFleetClick(
                                        index,
                                        siteIndex,
                                        siteItem
                                      )
                                    }
                                  />
                                </AccordionItemButton>
                              </AccordionItemHeading>
                              <AccordionItemPanel>
                                <Accordion
                                  allowMultipleExpanded={true}
                                  allowZeroExpanded={true}
                                >
                                  {siteItem.data && siteItem.data.length > 0
                                    ? siteItem.data.map(
                                        (fleetItem, fleetIndex) => {
                                          return (
                                            <AccordionItem key={fleetIndex}>
                                              <AccordionItemHeading className="itemActive">
                                                <AccordionItemButton>
                                                  <BasicDetailsComponent
                                                    otherData={fleetItem}
                                                    name={
                                                      fleetItem &&
                                                      fleetItem.model
                                                        ? fleetItem.model
                                                        : ""
                                                    }
                                                    itemIndex={index}
                                                    handleClick={() =>
                                                      handleModalClick(
                                                        index,
                                                        siteIndex,
                                                        fleetIndex,
                                                        fleetItem
                                                      )
                                                    }
                                                  />
                                                </AccordionItemButton>
                                              </AccordionItemHeading>
                                              <AccordionItemPanel className="accordion">
                                                {fleetItem.data &&
                                                fleetItem.data.length > 0
                                                  ? fleetItem.data.map(
                                                      (
                                                        modelItem,
                                                        modelItemIndex
                                                      ) => {
                                                        return (
                                                          <ModalDetailsComponent
                                                            setPopupModal={
                                                              setPopupModal
                                                            }
                                                            otherData={
                                                              modelItem
                                                            }
                                                            key={modelItemIndex}
                                                          />
                                                        );
                                                      }
                                                    )
                                                  : null}
                                              </AccordionItemPanel>
                                            </AccordionItem>
                                          );
                                        }
                                      )
                                    : null}
                                </Accordion>
                              </AccordionItemPanel>
                            </AccordionItem>
                          );
                        })
                      : null}
                  </Accordion>
                </AccordionItemPanel>
              </AccordionItem>
            ))
          : null}
      </Accordion>
    </div>
  );
};
