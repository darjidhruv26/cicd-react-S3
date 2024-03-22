import React from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../API/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { fetchFleetComments } from "../../../redux/fleet-details/fleetDetailsThunks";
import RenderCommentComponent from "../../Common/CommentComponent";

const MySwal = withReactContent(Swal);

export const Comments = () => {
  const dispatch = useDispatch();

  const userPreferences = useSelector(
    (state) => state.userPreferencesReducer.userPreferences
  );

  const commentsList = useSelector(
    (state) => state.fleetDetailsReducer.commentList
  );

  const handleSubmit = async (e, currentComment) => {
    e.preventDefault();
    try {
      const res = await API.post("/comments", {
        comment: currentComment,
        id: null,
        user_id: userPreferences.user_id,
        module_type: "fleet",
      });
      dispatch(fetchFleetComments(null));
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
        module_id: null,
        user_id: userPreferences.user_id,
        module_type: "fleet",
      });
      dispatch(fetchFleetComments(null));
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
            module_type: "fleet",
          },
        })
          .then((res) => {
            MySwal.fire("Deleted!", "Your file has been deleted.", "success");
            dispatch(fetchFleetComments(null));
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
