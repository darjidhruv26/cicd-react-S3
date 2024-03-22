import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const fileTypes = [
  "pdf",
  "docx",
  "jpg",
  "png",
  "jpeg",
  "doc",
  "xls",
  "xlsx",
  "txt",
];

const handleFileSizeExceed = (file) => {
  MySwal.fire({
    title: "Error!",
    text: file,
    type: "danger",
    icon: "error"
  })
};

const UploadFilesComponent = ({
  previousSelectedItem,
  handleDeleteRow,
  handleDownload,
  handleFileSelect,
}) => {
  const [showWarning, setShowWarning] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const children = (
    <div id="drag-and-drop-zone" className="dm-uploader">
      <p>
        <i className="icon-cloud"></i> Drop Files Here to Upload
        <i
          className="icon-warning small-icon"
          onMouseOver={() => setShowWarning(true)}
          onMouseLeave={() => setShowWarning(false)}
        >
          {showWarning ? (
            <div className="warning-message">
              <span>
                <strong>File Formats : </strong> "pdf", "docx", "jpg", "png", "jpeg", "doc", "xls", "xlsx" and "txt"
              </span>
              <br />
              <span><strong>Maximum File Size : </strong> 10MB</span>
            </div>
          ) : null}
        </i>
      </p>

      <span>OR</span>
      <div className="btn">
        <button type="button" className="button">
          Browse
        </button>
      </div>
    </div>
  );

  const handleFileUpload = (files) => {
    handleFileSelect &&
      handleFileSelect(files).then(() => {
        setRefresh(refresh + 1);
      });
  };

  return (
    <div className="col">
      <div className="common-box">
        <div className="title-row">
          <h4>File Uploads</h4>
        </div>
        {[
          <FileUploader
            key={refresh}
            handleChange={handleFileUpload}
            name="file_name"
            types={fileTypes}
            children={children}
            multiple={true}
            maxSize={10}
            onSizeError={handleFileSizeExceed}
          />,
        ]}

        <div className="card pb-1">
          {previousSelectedItem && previousSelectedItem.length > 0 ? (
            previousSelectedItem.map((doc, index) => (
              <div className="upload-file-list px-2 py-2 mx-2 mt-1" key={index}>
                <i className="icon-file"></i>
                <div className="upload-file-name">
                  <span href={doc.document_url}>{doc.document_name}</span>
                </div>
                <span className="download" onClick={handleDownload} data-url={doc.document_url} data-fileName={doc.document_name}>
                <i className="fa fa-download" aria-hidden="true"></i>
                </span>
                <span
                  className="delete"
                  onClick={handleDeleteRow ? handleDeleteRow : null}
                >
                  <i data-doc-id={doc.id} className="icon-delete"></i>
                </span>
              </div>
            ))
          ) : (
            <ul className="list-unstyled" id="files">
              <li className="text-muted text-center py-3">
                No files uploaded.
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadFilesComponent;
