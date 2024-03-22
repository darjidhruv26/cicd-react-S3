export const NotificationDeliveryComponent = () => {
  return (
    <div className="form-wizard-list">
      <div className="form-wizard-box">
        <div className="row">
          <div className="col-12 col-md-4">
            <h6>Select Alert Type(s)*</h6>
            <div className="checkbox-list">
              <div className="form-gruop">
                <div className="checkbox">
                  <label htmlFor="Phone">
                    <input type="checkbox" id="Phone" />
                    <em className="input-helper"></em>
                    <span>
                      <h6>
                        <img
                          className="mr-2"
                          src={window.location.origin + "/images/textsms.svg"}
                          alt="textsms"
                        />
                        Phone
                      </h6>
                      <p className="mt-1 text-small font-weight-normal text-black-50">
                        lorem impums This is dummy text here
                      </p>
                    </span>
                  </label>
                </div>
              </div>
              <div className="form-gruop">
                <div className="checkbox">
                  <label htmlFor="Email">
                    <input type="checkbox" id="Email" />
                    <em className="input-helper"></em>
                    <span>
                      <h6>
                        <img
                          className="mr-2"
                          src={window.location.origin + "/images/mail.svg"}
                          alt="textsms"
                        />
                        Default Account Email (preferred)
                      </h6>
                      <p className="mt-1 text-small font-weight-normal text-black-50">
                        jigajera@fmgl.com.au
                      </p>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
