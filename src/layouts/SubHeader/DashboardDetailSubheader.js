import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPreferences } from "../../redux/user-preferences/userPreferencesThunk";
import { fetchSeverityData } from "../../redux/sub-header/subHeaderThunks";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";


const iconImages = {
  icon1: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19.567"
      height="18.855"
      viewBox="0 0 19.567 18.855"
    >
      <path
        id="Path_106102"
        data-name="Path 106102"
        d="M142.143,30.083a.259.259,0,0,0-.127-.2l-6.286-3.629a.259.259,0,0,0-.259,0l-6.286,3.629a.259.259,0,0,0-.13.226v7.258a.259.259,0,0,0,.13.226l6.286,3.629a.259.259,0,0,0,.259,0l6.286-3.629a.259.259,0,0,0,.13-.226V30.1s0,0,0-.021Zm-6.8,10.459-5.767-3.331V30.551l5.767,3.331Zm6.286-3.331-5.767,3.331V33.882l5.767-3.331Z"
        transform="translate(48.371 143.727) rotate(-120)"
        fill="#a2aaa4"
      />
    </svg>
  ),
  icon2: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15.045"
      height="9.027"
      viewBox="0 0 15.045 9.027"
    >
      <path
        id="noun-low-battery-797382"
        d="M84.292,115.009H83.54v-2.257a.711.711,0,0,0-.752-.752H70.752a.711.711,0,0,0-.752.752v7.522a.711.711,0,0,0,.752.752H82.788a.711.711,0,0,0,.752-.752v-2.257h.752a.711.711,0,0,0,.752-.752v-1.5A.711.711,0,0,0,84.292,115.009Zm-10.531,4.212a.324.324,0,0,1-.3.3H71.805a.324.324,0,0,1-.3-.3v-5.416a.324.324,0,0,1,.3-.3H73.46a.324.324,0,0,1,.3.3Z"
        transform="translate(-70 -112)"
        fill="#6abf4a"
      />
    </svg>
  ),
  icon3: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13.055"
      height="15.639"
      viewBox="0 0 13.055 15.639"
    >
      <path
        id="Path_106101"
        data-name="Path 106101"
        d="M165.6,28a.4.4,0,0,0-.4.4V43.244a.4.4,0,0,0,.791,0V28.4A.4.4,0,0,0,165.6,28Zm11.114,1.582a8.784,8.784,0,0,0-3.4.822,7.5,7.5,0,0,1-6.923-.55V37a7.372,7.372,0,0,0,6.923.55c3.365-1.409,4.945-.544,4.945-.544V29.861A3.337,3.337,0,0,0,176.711,29.582Z"
        transform="translate(-165.201 -28)"
        fill="#f1c400"
      />
    </svg>
  ),
  icon4: (
    <svg
      id="noun-warning-18974"
      xmlns="http://www.w3.org/2000/svg"
      width="14.149"
      height="13.166"
      viewBox="0 0 14.149 13.166"
    >
      <path
        id="Path_106100"
        data-name="Path 106100"
        d="M132.289,73.619l-6.046,10.89c-.5.917-.289,1.794,1.07,1.794h11.511c1.363,0,1.573-.877,1.07-1.794l-6.171-10.861a.762.762,0,0,0-.692-.511.8.8,0,0,0-.742.482Zm-.016,3.486h1.415v4.952h-1.415Zm0,6.013h1.415v1.415h-1.415Z"
        transform="translate(-125.995 -73.136)"
        fill="#d86018"
      />
    </svg>
  ),
  icon5: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="14"
      viewBox="0 0 19 14"
    >
      <path
        id="Union_23"
        data-name="Union 23"
        d="M22745.908-6104.335a2.566,2.566,0,0,1-1.387-1.594h-3.934a2.588,2.588,0,0,1-1.391,1.592,2.52,2.52,0,0,1-2.094,0,2.574,2.574,0,0,1-1.381-1.592h-1.4a.783.783,0,0,1-.559-.236.818.818,0,0,1-.23-.572l.1-8.542a.824.824,0,0,1,.236-.572.784.784,0,0,1,.561-.236h8.205l.262-1.372a.818.818,0,0,1,.275-.464.789.789,0,0,1,.506-.184h1.494a.79.79,0,0,1,.477.161.817.817,0,0,1,.285.418h0l.426,1.441h1.158a.8.8,0,0,1,.646.329l2.494,3.5,1.617,1.474a.827.827,0,0,1,.26.606v3.442a.813.813,0,0,1-.234.572.79.79,0,0,1-.559.236h-2.357a2.563,2.563,0,0,1-1.385,1.594,2.5,2.5,0,0,1-1.049.228A2.487,2.487,0,0,1,22745.908-6104.335Zm.367-3.043a.993.993,0,0,0-.277.688,1,1,0,0,0,.277.688.964.964,0,0,0,.68.285.936.936,0,0,0,.676-.286.982.982,0,0,0,.283-.687.965.965,0,0,0-.283-.688.932.932,0,0,0-.676-.286A.961.961,0,0,0,22746.275-6107.378Zm-8.8,0a1,1,0,0,0-.279.688,1,1,0,0,0,.279.688.968.968,0,0,0,.68.285.957.957,0,0,0,.678-.286,1,1,0,0,0,.281-.687.979.979,0,0,0-.281-.688.953.953,0,0,0-.678-.286A.964.964,0,0,0,22737.475-6107.378Zm10.5-1.683a2.588,2.588,0,0,1,1.387,1.526h1.586l.006-2.285-1.193-1.089h-5.293a.791.791,0,0,1-.564-.237.816.816,0,0,1-.23-.571v-2.754h-8.453l-.082,6.935h.613a2.563,2.563,0,0,1,1.385-1.529,2.5,2.5,0,0,1,2.045,0,2.566,2.566,0,0,1,1.383,1.529h3.982a2.585,2.585,0,0,1,1.385-1.526,2.516,2.516,0,0,1,1.023-.217A2.527,2.527,0,0,1,22747.973-6109.062Zm-2.717-3.462h3.25l-1.391-1.947h-1.859Zm-1.006-3.563h.451l-.119-.4h-.254Zm-5.191,6.5v-1.247h-1.227v-1.615h1.227v-1.247h1.59v1.247h1.229v1.615h-1.229v1.247Z"
        transform="translate(-22733.537 6118.107)"
        fill="#b2292e"
      />
    </svg>
  ),
};

export const DashboardDetailSubheader = ({ selectedFilterGroup }) => {
  const dispatch = useDispatch();

  const filterGroupList = useSelector(
    (state) => state.customFilterReducer.filterGroupList
  );

  const selectedFilterGroupCounts = useSelector(
    (state) => state.subHeaderReducer.selectedFilterGroupCounts
  );

  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  )

  const severityData = useSelector(
    (store) => store.subHeaderReducer.severityData
  );

  const [activeStatus, setActiveStatus] = useState({
    notMeasured: false,
    healthy: false,
    Minor: false,
    Major: false,
    Critical: false,
  });

  const [selectedFilterGroupUser, setSelectedFilterGroupUser] = useState({
    group_name: '',
    is_selected: false,
    asset_count: 0,
    model_count: 0,
    site_count: 0,
    fleet_count: 0,
  })

  const handleSeverityChange = (e) => {
    let key = e.target.closest("div.switch-box").dataset.severity
    let value = {
      ...activeStatus,
      [key]: !activeStatus[key]
    }
    dispatch(updateUserPreferences({
      ...userPreferences,
      selected_severity: Object.keys(
        value
      ).filter((key) => value[key]),
    }));
    setActiveStatus(
      value
    );
  }

  useEffect(() => {
    dispatch(fetchSeverityData({ 'selected_filter_group_id': userPreferences?.selected_filter_group_id || '' }));
  }, [dispatch, userPreferences])

  useEffect(() => {
    Object.keys(userPreferences).length > 0 ? setActiveStatus(activeStatus => {
      let activeStatusStash = { ...activeStatus }
      if (userPreferences.selected_severity) {
        userPreferences.selected_severity.map(key => {
          if (Object.keys(activeStatus).includes(key)) {
            activeStatusStash[key] = true
          }
        })
      }
      return activeStatusStash
    }) : setActiveStatus(activeStatus)
  }, [filterGroupList, userPreferences, dispatch]);

  useEffect(() => {
    const selected_filter_group = filterGroupList.filter(filter_group => filter_group.is_selected === true);
    setSelectedFilterGroupUser(selected_filter_group?.length && selected_filter_group[0]);
  }, [filterGroupList])

  const selectedFilterListEle = () => {
    return (
      <ul>
        <li>{selectedFilterGroupUser?.site_count} Sites</li>
        <li>{selectedFilterGroupUser?.fleet_count} Fleets</li>
        <li>{selectedFilterGroupUser?.model_count} Models</li>
        <li>{selectedFilterGroupUser?.asset_count} Serial Numbers</li>
      </ul>
    );
  }
  const navigate = useNavigate();

  return (
    <>
      <div className="current-view">
        <a className="mx-2" style={{ color: '#418FDE', fontWeight: 600, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => {
          navigate(-1);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
        </a>
        <p>
          Currently Viewing: <a href="#">{selectedFilterGroupUser?.group_name}</a>
        </p>
        <div className="equipment-detail">
          {selectedFilterGroupUser?.group_name !== 'All Equipment' && selectedFilterListEle()}
        </div>
      </div>
      <div className="start-end-time">
        <div className="switch-btn">
          {/* <Popup
              key={`switch-1`}
              contentStyle={{backgroundColor:'#f1c400', borderRadius: '5px', height: 'auto', color:'#fff', borderBottom: 0, display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",fontSize: "16px", lineHeight: "1.5",padding: "8px"}}
              arrowStyle= {{color:'#f1c400'}}
              trigger={
            <div
              className="switch-box warning"
              onClick={handleSeverityChange}
              data-severity="Minor"
            >
              <div className="switch-icon">{iconImages.icon3}</div>
              <div
                className={`switch-value ${activeStatus.Minor ? "active" : "inactive"
                  }`}
              >
                <span>{severityData?.Minor?.total_events || 0}</span>
                <span>{severityData?.Minor?.active_events || 0}</span>
              </div>
            </div>
            }
              position="top right"
              closeOnDocumentClick
              on={['hover', 'focus']}
            >
              <span>Minor</span>
              <span>Total Events|Active Events</span>
            </Popup> */}
          <Popup
            key={`switch-2`}
            contentStyle={{ backgroundColor: '#d86018', borderRadius: '5px', height: 'auto', color: '#fff', borderBottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "16px", lineHeight: "1.5", padding: "8px" }}
            arrowStyle={{ color: '#d86018' }}
            trigger={
              <div
                className="switch-box pending"
                onClick={handleSeverityChange}
                data-severity="Major"
              >
                <div className="switch-icon">{iconImages.icon4}</div>
                <div
                  className={`switch-value ${activeStatus.Major ? "active" : "inactive"
                    }`}
                >
                  <span>{severityData?.Major?.total_events || 0}</span>
                  <span>{severityData?.Major?.active_events || 0}</span>
                </div>
              </div>
            }
            position="top right"
            closeOnDocumentClick
            on={['hover', 'focus']}
          >
            <span>Major</span>
            <span>Total Events|Active Events</span>
          </Popup>
          <Popup
            key={`switch-3`}
            contentStyle={{ backgroundColor: '#d9534f', borderRadius: '5px', height: 'auto', color: '#fff', borderBottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "16px", lineHeight: "1.5", padding: "8px" }}
            arrowStyle={{ color: '#d9534f' }}
            trigger={
              <div
                className="switch-box danger"
                onClick={handleSeverityChange}
                data-severity="Critical"
              >
                <div className="switch-icon">{iconImages.icon5}</div>
                <div
                  className={`switch-value ${activeStatus.Critical ? "active" : "inactive"
                    }`}
                >
                  <span>{severityData?.Critical?.total_events || 0}</span>
                  <span>{severityData?.Critical?.active_events || 0}</span>
                </div>
              </div>
            }
            position="top right"
            closeOnDocumentClick
            on={['hover', 'focus']}
          >
            <span>Critical</span>
            <span>Total Events|Active Events</span>
          </Popup>

        </div>
      </div>
    </>
  );
};
