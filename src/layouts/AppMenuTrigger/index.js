import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppMenuLayoutDetails } from "../../redux/appMenuLayout/AppMenuThunks";

export const AppMenuTrigger = ({ className }) => {
  const dispatch = useDispatch();
  const [descriptionToggle, setDescriptionToggle] = useState(false);
  const menuList = useSelector((store) => store.appMenuReducer.appMenuDetails);

  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  )

  useEffect(() => {
    if (menuList && menuList.length === 0 && userPreferences.user_id) {
      
      dispatch(fetchAppMenuLayoutDetails({ user_id: userPreferences.user_id }));
    }
  }, [menuList, userPreferences, dispatch]);

  const renderMenuList = (data) => {
    if (data.length >= 1) {
      return (
        <>
          <div className="app-menu-box">
            <h4>Useful Links</h4>
            <ul>
              {data
                .slice(0, 3)
                .map((item, index) => {
                  return (
                    <li key={index}>
                      <a href={item.link ? item.link : null}>
                        <span className="code-name">
						  <span className="image-space">
						    <img
							  src={
							    window.location.origin + "/images/" + item.symbol
							  }
							  alt={item.name ? item.name : ""}
						    />
						  </span>
                          {item.name ? item.name : ""}
                        </span>
                        <i
                          className="icon-star"
                          style={item.favorite ? { color: "#F1C400" } : {}}
                        ></i>
                        <span
                          className={`${
                            descriptionToggle ? "showDescription" : ""
                          } app-content`}
                        >
                          {item.description ? item.description : ""}
                        </span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="app-menu-box">
            {/* <h4>Analytical Tools</h4> */}
            <ul>
              {data
                .slice(3, 4)
                .map((item, index) => {
                  return (
                    <li key={index}>
                      <a href={item.link ? item.link : null}>
                        <span className="code-name">
						  <span className="image-space">
						    <img
							  src={
							    window.location.origin + "/images/" + item.symbol
							  }
							  alt={item.name ? item.name : ""}
						    />
						  </span>
                          {item.name ? item.name : ""}
                        </span>
                        <i
                          className="icon-star"
                          style={item.favorite ? { color: "#F1C400" } : {}}
                        ></i>
                        <span
                          className={`${
                            descriptionToggle ? "showDescription" : ""
                          } app-content`}
                        >
                          {item.description ? item.description : ""}
                        </span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
          {/*<div className="app-menu-box">
            <h4>Operational</h4>
            <ul>
              {data
                .slice(
                  parseInt(data.length / 5) * 2,
                  parseInt(data.length / 5) * 3
                )
                .map((item, index) => {
                  return (
                    <li key={index}>
                      <a href={item.link ? item.link : null}>
                        <span className="code-name">
                          <img
                            src={
                              window.location.origin +
                              "/images/component-life.svg"
                            }
                            alt="component-life"
                          />
                          {item.name ? item.name : ""}
                        </span>
                        <i
                          className="icon-star"
                          style={item.favorite ? { color: "#F1C400" } : {}}
                        ></i>
                        <span
                          className={`${
                            descriptionToggle ? "showDescription" : ""
                          } app-content`}
                        >
                          {item.description ? item.description : ""}
                        </span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="app-menu-box">
            <h4>Work Flow</h4>
            <ul>
              {data
                .slice(
                  parseInt(data.length / 5) * 3,
                  parseInt(data.length / 5) * 4
                )
                .map((item, index) => {
                  return (
                    <li key={index}>
                      <a href={item.link ? item.link : null}>
                        <span className="code-name">
                          <img
                            src={
                              window.location.origin +
                              "/images/recommendation-icon.svg"
                            }
                            alt="recommendation-icon"
                          />
                          {item.name ? item.name : ""}
                        </span>
                        <i
                          className="icon-star"
                          style={item.favorite ? { color: "#F1C400" } : {}}
                        ></i>
                        <span
                          className={`${
                            descriptionToggle ? "showDescription" : ""
                          } app-content`}
                        >
                          {item.description ? item.description : ""}
                        </span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="app-menu-box">
            <h4>Measurable Value</h4>
            <ul>
              {data
                .slice(parseInt(data.length / 5) * 4, data.length)
                .map((item, index) => {
                  return (
                    <li key={index}>
                      <a href={item.link ? item.link : null}>
                        <span className="code-name">
                          <img
                            src={
                              window.location.origin + "/images/catch-value.svg"
                            }
                            alt="catch-value"
                          />
                          {item.name ? item.name : ""}
                        </span>
                        <i
                          className="icon-star"
                          style={item.favorite ? { color: "#F1C400" } : {}}
                        ></i>
                        <span
                          className={`${
                            descriptionToggle ? "showDescription" : ""
                          } app-content`}
                        >
                          {item.description ? item.description : ""}
                        </span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>*/}
        </>
      );
    } else {
      <div className="app-menu-box">
        <h4>Useful Links</h4>
        <ul>
          {data.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.link ? item.link : null}>
                  <span className="code-name">
                    <img
                      src={window.location.origin + "/images/fault-code.svg"}
                      alt="fault-code"
                    />
                    {item.name ? item.name : ""}
                  </span>
                  <i
                    className="icon-star"
                    style={item.favorite ? { color: "#F1C400" } : {}}
                  ></i>
                  <span
                    className={`${
                      descriptionToggle ? "showDescription" : ""
                    } app-content`}
                  >
                    {item.description ? item.description : ""}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>;
    }
  };

  return (
    <>
      <div className={`${className ? className : ""} app-menu-trigger`}>
        <div className="oprations-section">
          <div className="wrap">
            <div className="oprations-row">
              <div className="app-top-list">
                <ul>
                  <li>
                    <a href="#">
                      <img
                        src={window.location.origin + "/images/star.svg"}
                        alt="star"
                      />
                      Favorite
                    </a>
                  </li>
                  {/* <li>
                    <a href="#">
                      <img
                        src={
                          window.location.origin +
                          "/images/recommendation-icon.svg"
                        }
                        alt="star"
                      />
                      Recommendation
                    </a>
                  </li> */}
                  <li>
                    <div className="app-switch-btn">
                      <p>Description</p>
                      <label className="switchSmall">
                        <input
                          id="swith-on"
                          type="checkbox"
                          onClick={() => {
                            setDescriptionToggle(!descriptionToggle);
                          }}
                        />
                        <small></small>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="recommendation-section">
          <div className="dashboard-container app-btn-container">
            <div className="appmenu-boxes">
              {menuList && menuList.length > 0
                ? renderMenuList(menuList)
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
