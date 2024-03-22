import React, { useState, useRef } from "react";
import moment from "moment";
import Popup from "reactjs-popup";
import "./index.scss"

const CommentComponent = ({
  comments,
  handleSubmit,
  handleEditComment,
  handleDeleteComment,
}) => {
  const closeIcon = useRef(null);
  const updateCloseIcon = useRef(null);

  const [currentComment, setCurrentComment] = useState("");
  const [updateComment, setUpdateComment] = useState("");

  const handleOpenPopup = (data) => {
    setUpdateComment(data);
  };

  const clickElement = (ref) => {
    ref.current.dispatchEvent(
      new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    );
  };

  const handleFormSubmit = (event) => {
    handleSubmit(event, currentComment)
      .then((res) => {
        setCurrentComment("");
        clickElement(closeIcon);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditCommentForm = (event) => {
    handleEditComment(event, updateComment)
      .then((res) => {
        clickElement(updateCloseIcon);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderCommnets = comments.map((comment, index) => (
    <div className="comment-box" key={index}>
      <Popup
        trigger={<p className="comment-text">{comment.comment}</p>}
        modal
        onOpen={() => handleOpenPopup(comment.comment)}
        onClose={(e) => setUpdateComment("")}
      >
        {(close) => (
          <form onSubmit={handleEditCommentForm} data-comment_id={comment.id}>
            <div className="pop-contentbox" style={{ width: "auto" }}>
              <div className="popup-header">
                <h6>
                  View and Update Comment
                  <span className="close-dialogbox">
                    <i
                      className="icon-close"
                      ref={updateCloseIcon}
                      onClick={close}
                    ></i>
                  </span>
                </h6>
              </div>
              <div className="popup-content">
                <div className="comment-form">
                  <div className="form-group">
                    <textarea
                      placeholder="Write Comment here..."
                      value={updateComment}
                      onChange={(e) => {
                        if (e.target.value.length <= 2000) {
                          setUpdateComment(e.target.value);
                        }
                      }}
                    ></textarea>
                    <span>
                      {updateComment.length > 0
                        ? `${
                            2000 - updateComment.length
                          } of 2000 characters left`
                        : "2000 characters left"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="popup-footer">
                <div className="button-action">
                  <div className="form-group">
                    <input
                      type="button"
                      className="btn-lightgray"
                      value="Cancel"
                      onClick={close}
                    ></input>
                    <input type="submit" value="Update"></input>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Popup>
      <span>
        <span>
          {comment.name} -{" "}
          {moment(comment.created_at).format("YYYY/MM/DD hh:mm a")}
        </span>
      </span>
      <div className="comment-action">
        <Popup
          trigger={
            <span data-rel="edit-comment" className="action-btn poptrigger">
              <i className="icon-edit"></i>
            </span>
          }
          modal
          onOpen={() => handleOpenPopup(comment.comment)}
          onClose={(e) => setUpdateComment("")}
        >
          {(close) => (
            <form onSubmit={handleEditCommentForm} data-comment_id={comment.id}>
              <div className="pop-contentbox" style={{ width: "auto" }}>
                <div className="popup-header">
                  <h6>
                    Edit Comment
                    <span className="close-dialogbox">
                      <i
                        className="icon-close"
                        ref={updateCloseIcon}
                        onClick={close}
                      ></i>
                    </span>
                  </h6>
                </div>
                <div className="popup-content">
                  <div className="comment-form">
                    <div className="form-group">
                      <textarea
                        placeholder="Write Comment here..."
                        value={updateComment}
                        onChange={(e) => {
                          if (e.target.value.length <= 2000) {
                            setUpdateComment(e.target.value);
                          }
                        }}
                      ></textarea>
                      <span>
                        {updateComment.length > 0
                          ? `${
                              2000 - updateComment.length
                            } of 2000 characters left`
                          : "2000 characters left"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="popup-footer">
                  <div className="button-action">
                    <div className="form-group">
                      <input
                        type="button"
                        className="btn-lightgray"
                        value="Cancel"
                        onClick={close}
                      ></input>
                      <input type="submit" value="Update"></input>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Popup>
        <a
          href="/exception-details/2555"
          onClick={handleDeleteComment}
          className="action-btn"
        >
          <i data-comment_id={comment.id} className="icon-delete"></i>
        </a>
      </div>
    </div>
  ));

  return (
    <div className="col">
      <div className="common-box">
        <div className="title-row">
          <h4>Comments</h4>
          <Popup
            trigger={
              <span
                href="#"
                className="poptrigger"
                data-rel="add-comment"
              >
                <i className="icon-plus"></i>Add Comment
              </span>
            }
            modal
          >
            {(close) => (
              <form onSubmit={handleFormSubmit}>
                <div className="pop-contentbox" style={{ width: "auto" }}>
                  <div className="popup-header">
                    <h6>
                      Add Comment{" "}
                      <span className="close-dialogbox">
                        <i
                          className="icon-close"
                          ref={closeIcon}
                          onClick={close}
                        ></i>
                      </span>
                    </h6>
                  </div>
                  <div className="popup-content">
                    <div className="comment-form">
                      <div className="form-group">
                        <textarea
                          placeholder="Write Comment here..."
                          value={currentComment}
                          onChange={(e) => {
                            if (e.target.value.length <= 2000) {
                              setCurrentComment(e.target.value);
                            }
                          }}
                        ></textarea>
                        <span>
                          {currentComment.length > 0
                            ? `${
                                2000 - currentComment.length
                              } of 2000 characters left`
                            : "2000 characters left"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="popup-footer">
                    <div className="button-action">
                      <div className="form-group">
                        <input
                          type="button"
                          className="btn-lightgray"
                          value="Cancel"
                          onClick={close}
                        ></input>
                        <input type="submit" value="Add"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Popup>
        </div>
        {renderCommnets.length > 0 ? (
          <div className="comment-list">{renderCommnets}</div>
        ) : (
          <div className="card comments">
            <ul className="list-unstyled" id="files">
              <li className="text-muted text-center py-3">No comments.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentComponent;
