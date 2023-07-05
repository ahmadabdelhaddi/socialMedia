import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function Comment({ posTId }) {
  // State variables

  const [users, setUsers] = useState([]);
  const [comments, setComment] = useState({
    Image: "./avatar.jpg",
    description: "",
  });

  const [allComments, setAllComments] = useState([]);
  const [editComment, setEditComment] = useState({
    id: null,
    Image: "./avatar.jpg",
    description: "",
  });

  useEffect(() => {
    // Runs once when the component mounts

    getUsers();
    getComments();
  }, []);

  // Fetches Posts from the server

  const getUsers = () => {
    axios
      .get(`http://localhost:9000/Users?id=${posTId}`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Fetches comments for the post
  const getComments = () => {
    axios
      .get(`http://localhost:9000/Comments?posTId=${posTId}`)
      .then((response) => {
        setAllComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    // Handles form submission for adding or updating a comment

    event.preventDefault();

    if (editComment.id) {
      updateComment();
    } else {
      postNewComment();
    }
    resetEditComment();
  };

  // Posts a new comment to the server

  const postNewComment = () => {
    const currentDate = moment().format("MM/DD/YYYY, hh:mm:ss A");
    const newComment = {
      ...editComment,
      //  Preserve the existing date when editing
      date: editComment.id ? editComment.date : currentDate,
      posTId,
    };

    axios
      .post(`http://localhost:9000/Comments`, newComment)
      .then((response) => {
        getComments();
        getUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handles changes in the comment input field

  const handleComment = (e) => {
    setComment({ ...comments, description: e.target.value });
  };

  // Deletes a comment from the server

  const handleDeletePost = (commentId) => {
    axios
      .delete(`http://localhost:9000/Comments/${commentId}`)
      .then((response) => {
        const updatedComments = allComments.filter(
          (comment) => comment.id !== commentId
        );
        setAllComments(updatedComments);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handles editing of a comment
  const handleEdit = (comment) => {
    setEditComment({
      id: comment.id,
      Image: comment.Image,
      date: comment.date,

      posTId: comment.posTId,
    });
  };

  // Handles changes in the edit comment input field
  const handleEditComment = (e) => {
    setEditComment({ ...editComment, [e.target.name]: e.target.value });
  };

  // Updates an existing comment on the server
  const updateComment = () => {
    axios
      .put(`http://localhost:9000/Comments/${editComment.id}`, editComment)
      .then((response) => {
        getComments();
        getUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Resets the edit comment state
  const resetEditComment = () => {
    setEditComment({
      id: null,
      Image: "./avatar.jpg",
      description: "",
    });
  };

  return (
    <>
      <div className="commentsBox">
        <div className="flex-comment">
          <div className="img-comment">
            <img name="Image" src={comments.Image} alt="Avatar" />
          </div>
          <div className="comments">
            <form onSubmit={handleSubmit}>
              <input
                name="description"
                type="text"
                value={editComment.description}
                onChange={handleEditComment}
                placeholder="Write a comment..."
              />
              <button className="greather_than" type="submit">
                {editComment.id ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>

        {allComments.map((comment) => (
          <div className="flex-comment" key={comment.id}>
            <div className="img-comment">
              <img src={comment.Image} alt="Avatar" />
            </div>
            <div
              className="comments"
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "450px",
              }}
            >
              <label>{comment.description}</label>
              <label>{comment.date}</label>
              <button
                className="deleteBtn"
                onClick={() => handleDeletePost(comment.id)}
              >
                Delete
              </button>
              <button className="updateBtn" onClick={() => handleEdit(comment)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Comment;
