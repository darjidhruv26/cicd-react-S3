import React from "react";
import ExceptionDetailsIFrame from "../ExceptionDetailsIFrame/ExceptionDetailsIFrame";
import { useSelector } from "react-redux";

const PIVisionTab = () => {

  let selectedException = useSelector(
    (state) => state.exceptionDetailsReducer.selectedException
  );
  selectedException = selectedException?.length > 0 ? selectedException[0] : {};

 
  const showIframeExtend = useSelector(
    (state) => state.exceptionDetailsReducer.iframefullScreen
  );
 
  return (
    <div
      className={`product-manage-section ${
        showIframeExtend ? "full-screen" : ""
      }`}
    >
      <div className="wrap">
        <div className="cols cols2">
         <div className="col">
            <ExceptionDetailsIFrame
              pivision_url={selectedException?.pivision_url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PIVisionTab;
