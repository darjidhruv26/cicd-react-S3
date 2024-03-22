import React from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../API/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { fetchExceptionComments } from "../../../redux/exception-details/exceptionDetailsThunks";
import RenderCommentComponent from "../../Common/CommentComponent";

const MySwal = withReactContent(Swal);

const ExceptionDetailsComments = () => {
  const dispatch = useDispatch();

  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  );

  let selectedException = useSelector(
    (state) => state.exceptionDetailsReducer.selectedException
  );
  selectedException = selectedException?.length > 0 ? selectedException[0] : {};

  const commentsList = useSelector(
    (state) => state.exceptionDetailsReducer.allComments
  );

  const handleSubmit = async (e, currentComment) => {
    e.preventDefault();
    try {
      const res = await API.post("/comments", {
        id: selectedException.id,
        comment: currentComment,
        user_id: userPreferences.user_id,
        module_type: "exception",
      });
      dispatch(fetchExceptionComments(selectedException.id));
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditComment = async (e, updateComment) => {
    e.preventDefault();
    try {
      const res = await API.patch("/comments", {
        id: e.target.dataset.comment_id,
        comment: updateComment,
        module_id: selectedException.id,
        user_id: userPreferences.user_id,
        module_type: "exception",
      });
      dispatch(fetchExceptionComments(selectedException.id));
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = (e) => {
    e.preventDefault();

    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        let comment_id = e.target.dataset.comment_id;
        API.delete("/comments", {
          params: {
            id: comment_id ? comment_id : null,
            module_type: "exception",
          },
        })
          .then((res) => {
            MySwal.fire("Deleted!", "The selected comment has been deleted.", "success");
            dispatch(fetchExceptionComments(selectedException.id));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <RenderCommentComponent
      comments={commentsList}
      handleSubmit={handleSubmit}
      handleDeleteComment={handleDeleteComment}
      handleEditComment={handleEditComment}
    />
  );
};

export default ExceptionDetailsComments;
