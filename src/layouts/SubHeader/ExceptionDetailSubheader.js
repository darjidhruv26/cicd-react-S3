import React, { useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const ExceptionDetailSubheader = () => {
  let severityLogos = {
    Critical: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="27"
        viewBox="0 0 28 27"
      >
        <g id="red" transform="translate(0.329)">
          <g id="Group_11377" data-name="Group 11377">
            <g
              id="Rectangle_8798"
              data-name="Rectangle 8798"
              transform="translate(-0.329)"
              fill="#fff"
              stroke="#d9534f"
              strokeWidth="1"
            >
              <rect width="28" height="27" rx="13.5" stroke="none" />
              <rect
                x="0.5"
                y="0.5"
                width="27"
                height="26"
                rx="13"
                fill="none"
              />
            </g>
            <path
              id="Union_23"
              data-name="Union 23"
              d="M22745.908-6104.335a2.566,2.566,0,0,1-1.387-1.594h-3.934a2.588,2.588,0,0,1-1.391,1.592,2.52,2.52,0,0,1-2.094,0,2.574,2.574,0,0,1-1.381-1.592h-1.4a.783.783,0,0,1-.559-.236.818.818,0,0,1-.23-.572l.1-8.542a.824.824,0,0,1,.236-.572.784.784,0,0,1,.561-.236h8.205l.262-1.372a.818.818,0,0,1,.275-.464.789.789,0,0,1,.506-.184h1.494a.79.79,0,0,1,.477.161.817.817,0,0,1,.285.418h0l.426,1.441h1.158a.8.8,0,0,1,.646.329l2.494,3.5,1.617,1.474a.827.827,0,0,1,.26.606v3.442a.813.813,0,0,1-.234.572.79.79,0,0,1-.559.236h-2.357a2.563,2.563,0,0,1-1.385,1.594,2.5,2.5,0,0,1-1.049.228A2.487,2.487,0,0,1,22745.908-6104.335Zm.367-3.043a.993.993,0,0,0-.277.688,1,1,0,0,0,.277.688.964.964,0,0,0,.68.285.936.936,0,0,0,.676-.286.982.982,0,0,0,.283-.687.965.965,0,0,0-.283-.688.932.932,0,0,0-.676-.286A.961.961,0,0,0,22746.275-6107.378Zm-8.8,0a1,1,0,0,0-.279.688,1,1,0,0,0,.279.688.968.968,0,0,0,.68.285.957.957,0,0,0,.678-.286,1,1,0,0,0,.281-.687.979.979,0,0,0-.281-.688.953.953,0,0,0-.678-.286A.964.964,0,0,0,22737.475-6107.378Zm10.5-1.683a2.588,2.588,0,0,1,1.387,1.526h1.586l.006-2.285-1.193-1.089h-5.293a.791.791,0,0,1-.564-.237.816.816,0,0,1-.23-.571v-2.754h-8.453l-.082,6.935h.613a2.563,2.563,0,0,1,1.385-1.529,2.5,2.5,0,0,1,2.045,0,2.566,2.566,0,0,1,1.383,1.529h3.982a2.585,2.585,0,0,1,1.385-1.526,2.516,2.516,0,0,1,1.023-.217A2.527,2.527,0,0,1,22747.973-6109.062Zm-2.717-3.462h3.25l-1.391-1.947h-1.859Zm-1.006-3.563h.451l-.119-.4h-.254Zm-5.191,6.5v-1.247h-1.227v-1.615h1.227v-1.247h1.59v1.247h1.229v1.615h-1.229v1.247Z"
              transform="translate(-22728.865 6124.108)"
              fill="#b2292e"
            />
          </g>
        </g>
      </svg>
    ),
    Major: (
      <svg
        id="orage"
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        viewBox="0 0 27 27"
      >
        <g
          id="Rectangle_8798"
          data-name="Rectangle 8798"
          fill="#fff"
          stroke="#d86018"
          strokeWidth="1"
        >
          <rect width="27" height="27" rx="13.5" stroke="none" />
          <rect x="0.5" y="0.5" width="26" height="26" rx="13" fill="none" />
        </g>
        <g id="noun-warning-18974" transform="translate(6.577 6)">
          <path
            id="Path_106100"
            data-name="Path 106100"
            d="M132.289,73.619l-6.046,10.89c-.5.917-.289,1.794,1.07,1.794h11.511c1.363,0,1.573-.877,1.07-1.794l-6.171-10.861a.762.762,0,0,0-.692-.511.8.8,0,0,0-.742.482Zm-.016,3.486h1.415v4.952h-1.415Zm0,6.013h1.415v1.415h-1.415Z"
            transform="translate(-125.995 -73.136)"
            fill="#d86018"
          />
        </g>
      </svg>
    ),
    Minor: (
      <svg
        id="yelllow"
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        viewBox="0 0 27 27"
      >
        <g
          id="Rectangle_8798"
          data-name="Rectangle 8798"
          fill="#fff"
          stroke="#f1c400"
          strokeWidth="1"
        >
          <rect width="27" height="27" rx="13.5" stroke="none" />
          <rect x="0.5" y="0.5" width="26" height="26" rx="13" fill="none" />
        </g>
        <path
          id="Path_106101"
          data-name="Path 106101"
          d="M165.6,28a.4.4,0,0,0-.4.4V43.244a.4.4,0,0,0,.791,0V28.4A.4.4,0,0,0,165.6,28Zm11.114,1.582a8.784,8.784,0,0,0-3.4.822,7.5,7.5,0,0,1-6.923-.55V37a7.372,7.372,0,0,0,6.923.55c3.365-1.409,4.945-.544,4.945-.544V29.861A3.337,3.337,0,0,0,176.711,29.582Z"
          transform="translate(-157.802 -22.522)"
          fill="#f1c400"
        />
      </svg>
    ),
    healthy: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="27"
        viewBox="0 0 28 27"
      >
        <g id="green_icon" transform="translate(0.252)">
          <g
            id="Rectangle_8798"
            data-name="Rectangle 8798"
            transform="translate(-0.252)"
            fill="#fff"
            stroke="#6abf4a"
            strokeWidth="1"
          >
            <rect width="28" height="27" rx="13.5" stroke="none" />
            <rect x="0.5" y="0.5" width="27" height="26" rx="13" fill="none" />
          </g>
          <path
            id="noun-low-battery-797382"
            d="M84.292,115.009H83.54v-2.257a.711.711,0,0,0-.752-.752H70.752a.711.711,0,0,0-.752.752v7.522a.711.711,0,0,0,.752.752H82.788a.711.711,0,0,0,.752-.752v-2.257h.752a.711.711,0,0,0,.752-.752v-1.5A.711.711,0,0,0,84.292,115.009Zm-10.531,4.212a.324.324,0,0,1-.3.3H71.805a.324.324,0,0,1-.3-.3v-5.416a.324.324,0,0,1,.3-.3H73.46a.324.324,0,0,1,.3.3Z"
            transform="translate(-63.775 -103)"
            fill="#6abf4a"
          />
        </g>
      </svg>
    ),
    "not measured": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        viewBox="0 0 27 27"
      >
        <g id="gray_icon" transform="translate(-0.108)">
          <g
            id="Rectangle_8798"
            data-name="Rectangle 8798"
            transform="translate(0.108)"
            fill="#fff"
            stroke="#a2aaa4"
            strokeWidth="1"
          >
            <rect width="27" height="27" rx="13.5" stroke="none" />
            <rect x="0.5" y="0.5" width="26" height="26" rx="13" fill="none" />
          </g>
          <path
            id="Path_106102"
            data-name="Path 106102"
            d="M142.143,30.083a.259.259,0,0,0-.127-.2l-6.286-3.629a.259.259,0,0,0-.259,0l-6.286,3.629a.259.259,0,0,0-.13.226v7.258a.259.259,0,0,0,.13.226l6.286,3.629a.259.259,0,0,0,.259,0l6.286-3.629a.259.259,0,0,0,.13-.226V30.1s0,0,0-.021Zm-6.8,10.459-5.767-3.331V30.551l5.767,3.331Zm6.286-3.331-5.767,3.331V33.882l5.767-3.331Z"
            transform="translate(52.479 147.727) rotate(-120)"
            fill="#a2aaa4"
          />
        </g>
      </svg>
    ),
  };

  let statusLogos = {
    S1: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 30.243 23.056"
      >
        <path
          id="check"
          d="M13.021,23.78,5.851,16.611,3.41,19.035l9.611,9.611L33.653,8.014,31.228,5.59Z"
          transform="translate(-3.41 -5.59)"
          fill="#418fde"
        />
      </svg>
    ),
    S2: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 29.973 30.182"
      >
        <path
          id="snooze"
          d="M10.812,4.153,8.894,1.86,2,7.63,3.933,9.923l6.879-5.77ZM31.973,7.645,25.079,1.86,23.146,4.153,30.04,9.938ZM16.987,5.067A13.488,13.488,0,1,0,30.474,18.555,13.489,13.489,0,0,0,16.987,5.067Zm0,23.978a10.49,10.49,0,1,1,10.491-10.49A10.483,10.483,0,0,1,16.987,29.045Zm-4.5-13.488h5.44l-5.44,6.294v2.7h8.992v-3h-5.44l5.44-6.294v-2.7H12.491Z"
          transform="translate(-2 -1.86)"
          fill="#418fde"
        />
      </svg>
    ),
    S3: (
      <svg
        id="equipment-detail"
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 35 36"
      >
        <rect
          id="Rectangle_98"
          data-name="Rectangle 98"
          width="35"
          height="36"
          fill="none"
        />
        <g
          id="Group_35174"
          data-name="Group 35174"
          transform="translate(-2.052 -2.052)"
        >
          <path
            id="equipment-detail-2"
            data-name="equipment-detail"
            d="M-2333.265-3657.556l-3.388-3.263a14.269,14.269,0,0,1-8.04,2.459A14.324,14.324,0,0,1-2359-3672.683a14.321,14.321,0,0,1,14.307-14.32,14.33,14.33,0,0,1,14.338,14.319,14.244,14.244,0,0,1-2.564,8.181l3.365,3.239a2.438,2.438,0,0,1,.709,1.794,2.681,2.681,0,0,1-.792,1.833,2.663,2.663,0,0,1-1.889.784A2.437,2.437,0,0,1-2333.265-3657.556Zm-22.87-15.126a11.457,11.457,0,0,0,11.459,11.457,11.457,11.457,0,0,0,11.457-11.457,11.457,11.457,0,0,0-11.457-11.458,11.458,11.458,0,0,0-11.459,11.463Z"
            transform="translate(2363.526 3691.524)"
            fill="#418fde"
          />
          <g
            id="Group_35173"
            data-name="Group 35173"
            transform="translate(10.671 13.584)"
          >
            <g id="noun-mining-1504745">
              <path
                id="Path_106093"
                data-name="Path 106093"
                d="M159.577,57.879c1.94.472,3.619,2.78,3.933,5.769a9.262,9.262,0,0,1-.21,2.989,6.247,6.247,0,0,0-.367-2.517,6.641,6.641,0,0,0-4.248-4.353Z"
                transform="translate(-154.941 -57.879)"
                fill="#418fde"
                fillRule="evenodd"
              />
              <path
                id="Path_106094"
                data-name="Path 106094"
                d="M7.39,66.574l1.521,1.311L2.46,75.542A1,1,0,1,1,.939,74.231Z"
                transform="translate(-0.694 -66.364)"
                fill="#418fde"
                fillRule="evenodd"
              />
              <path
                id="Path_106095"
                data-name="Path 106095"
                d="M200.345,303.511l1.311,1.626,3.409-3.776,4.877,5.4H197.828Z"
                transform="translate(-193.281 -295.487)"
                fill="#418fde"
                fillRule="evenodd"
              />
            </g>
          </g>
        </g>
      </svg>
    ),
    S4: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 24.322 24.321"
      >
        <path
          id="close"
          d="M29.322,7.45,26.872,5l-9.711,9.711L7.45,5,5,7.45l9.711,9.711L5,26.872l2.45,2.45,9.711-9.711,9.711,9.711,2.45-2.45L19.61,17.161Z"
          transform="translate(-5 -5)"
          fill="#418fde"
        />
      </svg>
    ),
    S5: (
      <i
        className="fa fa-calendar-check-o fa-lg"
        aria-hidden="true"
      ></i>
    ),
  };

  let selectedException = useSelector(
    (state) => state.exceptionDetailsReducer.selectedException
  );
  selectedException = selectedException?.length > 0 ? selectedException[0] : {};

  let selectedExceptionStatus = useSelector(
    (state) => state.exceptionDetailsReducer.selectedExceptionStatus
  );
  selectedExceptionStatus =
    selectedExceptionStatus?.length > 0 ? selectedExceptionStatus[0] : {};

  
  let isLoading = useSelector(
    (state) => state.exceptionDetailsReducer.isLoading
  );
  
  const navigate = useNavigate();
  return (
    <>
      <a className="mx-2" style={{color: '#418FDE', fontWeight: 600, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}} onClick={() => {
        navigate(-1);
        }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      </a>
      <div className="current-view">
        <p
          title={
            selectedException.event_name ? selectedException.event_name : ""
          }
        >
          Currently Viewing:{" "}
          {isLoading ? <Skeleton style={{minWidth: '325px'}} height={16}/> :<a href="/#">
            {selectedException.event_name
              ? selectedException.event_name.length > 80
                ? selectedException.event_name.substring(0, 80) + "..."
                : selectedException.event_name
              : ""}
          </a>}
        </p>
        <div className="equipment-detail">
          <span>{severityLogos[selectedExceptionStatus.event_severity]}</span>
          <a href="/#">{statusLogos[selectedExceptionStatus.exception_status]}</a>
        </div>
      </div>
      <div className="start-end-time">
        <p className="span-text">
          <span>Start Date:</span>{" "}
          {isLoading ? <Skeleton style={{minWidth: '120px' }}  height={16} /> : 
            moment.utc(selectedException.event_start_time).local().format("YYYY/MM/DD hh:mm a")
          }
        </p>
        <p className="span-text">
          <span>End Date:</span>{" "}
          {isLoading ? <Skeleton style={{minWidth: '120px'}} height={16} /> : selectedException?.event_end_time?.includes('9999') ? '-' 
            : moment.utc(selectedException.event_end_time).local().format("YYYY/MM/DD hh:mm a")
          }
        </p>
      </div>
    </>
  );
};
