import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIframeFullScreen } from "../../../redux/exception-details/exceptionDetailsSlice";
import "./index.scss"

const ExceptionDetailsIFrame = ({hideFullScreen, pivision_url}) => {
  const dispatch = useDispatch();

  const showIframeExtend = useSelector(
    (state) => state.exceptionDetailsReducer.iframefullScreen
  );

  const getSRC = (pivision_url) => {
    let url =  pivision_url.replace(pivision_url.slice(pivision_url.indexOf("StartTime")), 'StartTime=-7d&EndTime=*')
    return url
  }
  
  return (
    // <div style={{height: '480px'}}>
    <>
      {pivision_url ? (
        <>
          <iframe
            className="exception-iframe"
            src={getSRC(pivision_url)}
            name="PiVisionDisplay"
            title="selectedException_pivision_url"
          />
          {!hideFullScreen && <div className="resize-box">
            <a
              onClick={() => {
                setIframeFullScreen &&
                  dispatch(setIframeFullScreen(!showIframeExtend));
              }}
            >
              <img
                src={
                  showIframeExtend
                    ? window.location.origin + "/images/srink-resize.svg"
                    : window.location.origin + "/images/resize.svg"
                }
                alt="resize"
              />
            </a>
          </div>}
        </>
      ) : (
        <div className="no-data-error">No pivision display</div>
      )}
    </>

    // </div>
    // <div className="image-box">
    //     <figure>
    //         <img src={window.location.origin + "/images/microsoftteams.png"} alt="microsoftteams"></img>
    //     </figure>
    //     <a href="/#" className="graph"><img src={window.location.origin + "/images/graph.svg"} alt="graph"></img></a>
    // </div>
  );
};

export default ExceptionDetailsIFrame;
