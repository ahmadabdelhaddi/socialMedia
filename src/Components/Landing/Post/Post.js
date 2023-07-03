import "./Post_style.css";
import Menu from "../Menu/Mneu";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "../../Comment/Comment";
import { useParams } from "react-router-dom";

function Post() {
  const [users, setUsers] = useState([]);

  const [posts, setposts] = useState([]);
  const [image, setimage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [post_img, setpostimg] = useState("");
  const currentDate = new Date().toLocaleString();
  const handleName = (e) => {
    setName(e.target.value);
  };
  const { userId } = useParams();

  //GET THE DESCRIPTION WHENE USER WRITE IT
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  //GET THE IMAGE WHEN USER UPLOAD IT
  const handleFileChange = (e) => {
    setpostimg(e.target.files[0]);
  };
  useEffect(() => {
    if (post_img) {
      console.log(post_img);
    }
  }, [post_img]);
  //GET URL THE IMAGE TO SAVE IT ON JSON SERVER
  // const imageURL = () => {

  //   // setRealImage(URL.createObjectURL(post_img));
  // };

  useEffect(() => {
    GetPosts();
  }, []);

  // const GetPosts = () => {
  //   axios
  //     .get("http://localhost:9000/Users/", {

  //     }) // Replace the URL with your JSON server endpoint
  //     .then((response) => {
  //       setUsers(response.data);
  //       // Do something with the retrieved data
  //     });
  // };
  const GetPosts = () => {
    axios
      .get(`http://localhost:9000/Users/`)
      .then((response) => {
        const users = response.data;
        const posts = users[0].posts; // Access the posts array from the first user (assuming only one user in the array)
  
        // Do something with the posts data
        console.log(posts);
  
        setUsers(response.data);
        // Update state or perform any other necessary actions with the retrieved data
      })
      .catch((error) => {
        // Handle error response
      });
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();

    // imageUpload()
    // if (post_img) {
    //   imageURL();
    // } else {
    //   console.log("NOT FOUND");
    // }
    // setposts(handleSubmit)
    setName("");
    setDescription("");
    PostNewpost();
    setpostimg(null);
    GetPosts();
  };
  // to send data to json server
  const PostNewpost = () => {
    if (post_img) {
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        const url = e.target.result;
        axios
          .post("http://localhost:9000/Users", {
            email: "",
            password: "",
            name,
            Image: "./avatar.jpg",
            description,
            post_img: url,
            comments: [],
            date: currentDate,
          })
          .then((data) => {});
      };
      fileReader.readAsDataURL(post_img);
    } else {
      axios
        .post(`http://localhost:9000/Users/`, {
          // ...users[0], // Spread the existing user data
          // posts: [
          //   ...users[0].posts,
          //   {
          //     description,
          //     date: currentDate,
          //     post_img,
          //     comments: [],
          //   },
          // ],
           // Add the new post to the posts array

           name ,
           Image: "./avatar.jpg",
           description,
           post_img: "",
           comments: [],
           date: currentDate,

        })
        .then((data) => {});
    }
  };

  // FUNCTION TO DELETE THE POSTS

  const handleDeletePost = (postId) => {
    axios
      .delete(`http://localhost:9000/Users/${postId}`)
      .then((response) => {
        // Remove the deleted post from the users state
        const updatedUsers = users.filter((user) => user.id !== postId);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        // Handle error response
      });
  };

  // FUNCTION TO UPDATE THE POST (DESCRIPTION && PHOTO)


  return (
    <>
      <div className="Big-container">
        <Menu />

        <div className="container">
          {/* {post_img && (<><img src={URL.createObjectURL(post_img)}/></>)} */}

          <div className="newPost">
            <div className="postBox">
              <form onSubmit={handleSubmit}>
               
              <input
                  style={{ padding: "10px" }}
                  className="formInput"
                  type="text"
                  value={name}
                  onChange={handleName}
                  placeHolder="Enter your Name"
                />

                <input
                  style={{ padding: "10px" }}
                  className="formInput description"
                  type="text"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeHolder="Enter the description"
                />


            

                <input type="file" onChange={handleFileChange} />

                <input type="submit" />
              </form>

              <div className="uploadIcons">
                <div>
                  <img
                    height="24"
                    width="24"
                    alt=""
                    referRerpolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/v1iF2605Cb5.png?_nc_eui2=AeHzWMzpEvMCerrlttg-bXYs3Eh3Wgl8GJPcSHdaCXwYk2GASqOB1sW6W1oVSzy9MG7QNeiReaWnzdTiMzBt9Vzu"
                  />
                  Live video{" "}
                </div>
                <div>
                  <img
                    height="24"
                    width="24"
                    alt=""
                    referRerpolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png?_nc_eui2=AeHlWDJdsBSjXKmszycuO0pefK5Z1qDG7FV8rlnWoMbsVVviRRIStojAk6bLUQD255khykKvdsjsiBakMagXbOSI"
                  />
                  Photo/video
                </div>
                <div>
                  <img
                    height="24"
                    width="24"
                    alt=""
                    referRerpolicy="origin-when-cross-origin"
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png?_nc_eui2=AeGBCJVHgwD2Uzf6az-UTD-3v2_PAiqLvPK_b88CKou88nPP2gF7kX-3o4pqjEuA_cpYlAl_J08QeqKHk_KAOTqD"
                  />
                  Feeling/activity
                </div>
              </div>
            </div>
          </div>
          <div className="allPosts">
            {users.map((post) => {
              return (
                <>
                  <div className="post" key={post.id}>
                    <div className="user_name_img">
                      <div className="user_info">
                        <img src={post.Image} width="50px" />
                        <h4 style={{ margin: "8px" }}>{post.name}</h4>
                       
                        <h6>{post.date}</h6>
                      
                      
                       
                       <button
                          className="postDeleteButton"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                      <p>{post.description}</p>
                    </div>
                    <img src={post.post_img} width="400px" alt="" />
                    <Comment />
                        {/* <h6>{elm.date}</h6> */}
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="third-section" >
          <h1 style={{color:"#f0f2f5"}}>....................</h1>
        </div>
      </div>
    </>
  );
}
export default Post;
