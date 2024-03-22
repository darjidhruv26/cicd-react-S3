export const PreferencesComponent = () => {
  return (
    <>
      <div className="container-top-heading">
        <h6>Contact Information</h6>
      </div>
      <div className="account-information">
        <div className="account-information-box">
          <div className="account-category-info d-flex flex-wrap align-items-center justify-content-between">
            <h6 className="d-flex align-items-center">
              <img className="mr-2" src="images/mail.svg" alt="mail" />
              Email
            </h6>
            <h6>
              <a href="#">
                <i className="icon-plus"></i>Add
              </a>
            </h6>
          </div>
          <div className="account-category-info d-flex flex-wrap align-items-center justify-content-between">
            <h6 className="d-flex align-items-center">
              jigajera@fmgl.com.au{" "}
              <span className="text-black-50 text-small font-weight-normal mt-1 ml-1">
                (Default)
              </span>
            </h6>
            <div className="action-btn d-flex align-items-center pr-0 ml-2">
              <div className="checkbox">
                <label for="default-checkbox">
                  <input type="checkbox" id="default-checkbox" />
                  <em className="input-helper"></em>
                </label>
              </div>
              <a className="ml-4" href="#">
                <img src="images/edit.svg" alt="Edit" />
              </a>
              <a href="#" className="ml-3">
                <img src="images/delete.svg" alt="Delete" />
              </a>
            </div>
          </div>
        </div>
        <div className="account-information-box">
          <div className="account-category-info d-flex flex-wrap align-items-center justify-content-between">
            <h6 className="d-flex align-items-center">
              <img className="mr-2" src="images/textsms.svg" alt="textsms" />
              Phone
            </h6>
            <h6>
              <a href="#">
                <i className="icon-plus"></i>Add
              </a>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};
