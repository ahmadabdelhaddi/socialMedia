// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function Comment() {
//   const [users, setUsers] = useState([]);
//   const [comments, setComment] = useState({
//     Image: "./avatar.jpg",
//     description: "",
//   });
//   const [allComments, setAllComments] = useState([]);
//   const currentDate = new Date().toLocaleString();

//   const [editComment, setEditComment] = useState({
//     id: null,
//     Image: "./avatar.jpg",
//     description: "",

//   });

//   const { userId } = useParams();

//   useEffect(() => {
//     getUsers();
//     getComments();
//   }, []);

//   const getUsers = () => {
//     axios
//       .get(`http://localhost:9000/Users/`)
//       .then((response) => {
//         setUsers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const getComments = () => {
//     axios
//       .get(`http://localhost:9000/Comments`)
//       .then((response) => {
//         setAllComments(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (editComment.id) {
//       updateComment();
//     } else {
//       postNewComment();
//     }
//     resetEditComment();
   
//   };

//   const postNewComment = () => {
//     axios
//       .post(`http://localhost:9000/Comments`, editComment)
//       .then((response) => {
//         getUsers();
//         getComments();
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleComment = (e) => {
//     setComment({ ...comments, description: e.target.value });
//   };

//   const handleDeletePost = (commentId) => {
//     axios
//       .delete(`http://localhost:9000/Comments/${commentId}`)
//       .then((response) => {
//         const updatedComments = allComments.filter(
//           (comment) => comment.id !== commentId
//         );
//         setAllComments(updatedComments);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleEdit = (comment) => {
//     setEditComment({
//       id: comment.id,
//       Image: comment.Image,
//       description: comment.description
//     });
//   };

//   const handleEditComment = (e) => {
//     setEditComment({ ...editComment, [e.target.name]: e.target.value });
//   };

//   const updateComment = () => {
//     axios
//       .put(`http://localhost:9000/Comments/${editComment.id}`, editComment)
//       .then((response) => {
//         getComments();
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const resetEditComment = () => {
//     setEditComment({
//       id: null,
//       Image: "./avatar.jpg",
//       description: ""
//     });
//   };

//   return (
//     <>
//       <div className="commentsBox">
//         <div className="flex-comment">
//           <div className="img-comment">
//             <img name="Image" src={comments.Image} alt="Avatar" />
//           </div>
//           <div className="comments">
//             <form onSubmit={handleSubmit}>
//               <input
//                 name="description"
//                 type="text"
//                 value={editComment.description}
//                 onChange={handleEditComment}
//                 placeholder="Write a comment..."
//               />
//               <button className="greather_than" type="submit">
//                 {editComment.id ? "Update" : "Submit"}
//               </button>
//             </form>
//           </div>
//         </div>

//         {allComments.map((comment) => (
//           <div className="flex-comment" key={comment.id}>
//             <div className="img-comment">
//               <img src={comment.Image} alt="Avatar" />
//             </div>
//             <div
//               className="comments"
//               style={{
//                 display: "flex",
//                 justifyContent: "space-around",
//                 width: "450px"
//               }}
//             >
//               <label>{comment.description}</label>
//               <label>{comment.date}</label>
//               <button onClick={() => handleDeletePost(comment.id)}>
//                 Delete
//               </button>
//               <button onClick={() => handleEdit(comment)}>Edit</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Comment;





// ##################################################

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

function Comment() {
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

  const { userId } = useParams();

  useEffect(() => {
    getUsers();
    getComments();
  }, []);

  // Function to get all users
  const getUsers = () => {
    axios
      .get(`http://localhost:9000/Users/`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to get all comments
  const getComments = () => {
    axios
      .get(`http://localhost:9000/Comments`)
      .then((response) => {
        setAllComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (editComment.id) {
      updateComment();
    } else {
      postNewComment();
    }
    resetEditComment();
  };

  // Function to post a new comment
  const postNewComment = () => {
    const currentDate = moment().format("MM/DD/YYYY, hh:mm:ss A");
    const newComment = {
      ...editComment,
      date: editComment.id ? editComment.date : currentDate,
    };

    axios
      .post(`http://localhost:9000/Comments`, newComment)
      .then((response) => {
        getUsers();
        getComments();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to handle comment input change
  const handleComment = (e) => {
    setComment({ ...comments, description: e.target.value });
  };

  // Function to delete a comment
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

  // Function to handle edit button click
  const handleEdit = (comment) => {
    setEditComment({
      id: comment.id,
      Image: comment.Image,
      date: comment.date,
    });
  };

  // Function to handle edit comment input change
  const handleEditComment = (e) => {
    setEditComment({ ...editComment, [e.target.name]: e.target.value });
  };

  // Function to update a comment
  const updateComment = () => {
    axios
      .put(`http://localhost:9000/Comments/${editComment.id}`, editComment)
      .then((response) => {
        getComments();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Function to reset edit comment form
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
              <button className="deleteBtn" onClick={() => handleDeletePost(comment.id)}>
                Delete
              </button>
              <button className="updateBtn" onClick={() => handleEdit(comment)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Comment;
