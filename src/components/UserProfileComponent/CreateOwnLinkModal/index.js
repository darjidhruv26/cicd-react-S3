export const CreateOwnLinkModal = ({ showModalStatus, setShowModal }) => {
  return (
    <div
      className={`modal fade modal-center ${
        showModalStatus ? "show linkModalShow" : ""
      }`}
      id="create-new-link"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h6 className="modal-title" id="exampleModalLabel">
              Create a New Link
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
            <form action="">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="FMG"
                  className="textbox bg-gray"
                />
              </div>
              <div className="form-group">
                <label>URL</label>
                <input
                  type="text"
                  placeholder="https://www.fmgl.com.au/"
                  className="textbox bg-gray"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary btn-sm">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
