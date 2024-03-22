export const DetailsComponent = () => {
  return (
    <div className="form-wizard-list">
      <div className="form-wizard-box">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="form-group mb-0 pb-0">
              <label>Name:</label>
              <input
                type="text"
                placeholder="Test"
                name="name"
                className="textbox"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
