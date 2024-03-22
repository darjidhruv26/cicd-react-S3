import { useState, useEffect } from "react";

let errorStyle = {
  border: "1px solid red",
};
let errorHelpTextStyle = {
  color: "red",
  marginLeft: "10px",
};

export const CreateEditListModal = ({
  setShowModal,
  showModal,
  onSubmitNewUser,
}) => {
  const [filterName, setFilterName] = useState("");
  const [error, setError] = useState({ isValid: false, message: "" });
  const [defaultCheckbox, setDefaultCheckbox] = useState(false);

  const onSubmitHandler = () => {
    if (filterName && filterName.length) {
      onSubmitNewUser({ filterName, setDefaultStatus: defaultCheckbox });
    } else {
      setError({ isValid: true, message: "invalid input" });
    }
  };

  return (
    <div
      className={`${showModal ? "show" : ""} modal fade modal-center`}
      style={showModal ? { display: "block", paddingRight: "17px" } : null}
    >
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
        onClick={() => {
          setShowModal(false);
        }}
      ></div>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h6 className="modal-title" id="exampleModalLabel">
              Create a New List
            </h6>
            <button
              type="button"
              className="close"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Equipment is added or removed by the user</label>
                <input
                  type="text"
                  placeholder="FMG CMA"
                  className="textbox bg-gray"
                  value={filterName}
                  onChange={(e) => {
                    setFilterName(e.target.value);
                  }}
                />
                <span
                  style={
                    error.isValid ? errorHelpTextStyle : { display: "none" }
                  }
                >
                  {error.message ? error.message : ""}
                </span>
              </div>
              <div className="form-gruop">
                <div className="checkbox">
                  <label htmlFor="default-checkbox1">
                    <input
                      type="checkbox"
                      id="default-checkbox1"
                      checked={defaultCheckbox}
                      onChange={(event) =>
                        setDefaultCheckbox(event.target.checked)
                      }
                    />
                    <em className="input-helper"></em>
                    <span>Set as Default List</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              data-dismiss="modal"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onSubmitHandler}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
