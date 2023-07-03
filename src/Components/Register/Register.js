// import { useEffect, useState } from "react";
// // import "./Register.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   // State with information Registration
//   const navigation = useNavigate();
//   const [username, setuserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [Users, setUsers] = useState([]);
//   //VALIDATION ERRORS

//   const [error, setError] = useState("");
//   const [errorEmail, setErrorEmail] = useState("");
//   const [errorPassword, setErrorPassword] = useState("");
//   const [errorUsername, setErrorUsername] = useState("");
//   //GET DATA USERS IN JSON SERVER
//   useEffect(() => {
//     GetRegistration();
//   }, []);

//   const GetRegistration = () => {
//     axios
//       .get("http://localhost:9000/Users/") // Replace the URL with your JSON server endpoint
//       .then((response) => {
//         setUsers(response.data);
//         // Do something with the retrieved data
//       });
//   };

//   const valid = Users.find((user) => {
//     return user.email == email;
//   });

//   // TO POST DATA on Array of Users in json server
//   const PostRegistration = () => {
//     axios
//       .post("http://localhost:9000/Users", {
//         email,
//         phone: "",
//         country: "",
//         city: "",
//         address: "",
//         firstname: "",
//         lastname: "",

//         password,
//         username,
//         Image: "./",
//         IsLogin: false,
//         phone: "",
//         Address: "",
//         History: [],
//         Cart: [],
//         Favorite: []
//       })
//       .then((data) => {});
//   };

//   // Handle forms in click submit
//   const handleForm = (e) => {
//     validationForms();
//     e.preventDefault();
//   };

//   // setErrorPassword("Please enter a valid password.");
//   // setErrorEmail("Please enter a valid email address.");
//   // setErrorUsername("Username must be at least 3 characters long.");

//   //VALIDATION ####################################################
//   const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9-_]{8,}$/;
//   const validationForms = () => {
//     const isValidEmail = (email) => {
//       // Regular expression for email validation
//       //EMAIL VALIDATION
//       return email.match(emailRegex);
//     };

//     const isValidPassword = (password) => {
//       return password.match(passwordRegex);
//     };
//     //PASSWORD VALIDATION
//     // Password validation regex pattern

//     //username VALIDATION
//     const isValidUserName = (username) => {
//       return username.length > 3;
//     };

//     if (
//       valid == undefined &&
//       username !== "" &&
//       isValidUserName(username) &&
//       password !== "" &&
//       isValidPassword(password) &&
//       email !== "" &&
//       isValidEmail(email)
//     ) {
//       setEmail("");
//       setPassword("");
//       setuserName("");
//       PostRegistration();
//       console.log(Users);
//       navigation("/Login");
//       // window.location.replace("https://www.google.com");
//     }

//     GetErorr();
//   };

//   const GetErorr = () => {
//     UserNameGetErorr();
//     PasswordGetErorr();
//     EmailGetErorr();
//   };

//   const UserNameGetErorr = () => {
//     if (username.length < 3 && username.length > 0) {
//       setErrorUsername("• Username must be at least 3 characters long.");
//     } else if (username == "") {
//       setErrorUsername("• Please Enter Your Username ");
//     } else {
//       setErrorUsername("");
//     }
//     // Password VALIDATION
//     // Email validation
//   };

//   const PasswordGetErorr = () => {
//     if (password !== "") {
//       if (password.length >= 8) {
//         if (!password.match(/[A-Z]/) || !password.match(/[a-z]/)) {
//           setErrorPassword(
//             "• Please enter at least one uppercase and one lowercase letter"
//           );
//         } else {
//           setErrorPassword("");
//         }
//       } else {
//         setErrorPassword("• Password must be at least 8 characters long");
//       }
//     } else {
//       setErrorPassword("• Please enter your password");
//     }
//   };

//   const EmailGetErorr = () => {
//     if (email == "") {
//       setErrorEmail("• Please Enter Your Email");
//     } else if (!email.match(emailRegex)) {
//       setErrorEmail("• Enter Valid Email expamle xxx@xx.com");
//     } else if (valid !== undefined) {
//       setErrorEmail("• Email Already exicst");
//     } else {
//       setErrorEmail("");
//     }
//   };

//   // Email validation

//   const getUserName = (e) => {
//     setuserName(e.target.value);
//     UserNameGetErorr();
//   };

//   //  get Email value in input

//   const getEmail = (e) => {
//     setEmail(e.target.value);
//     EmailGetErorr();
//   };

//   //  get Password value in input
//   const getPassword = (e) => {
//     setPassword(e.target.value);
//     PasswordGetErorr();
//   };

//   return (
//     // const [errorEmail, setErrorEmail] = useState("");
//     // const [errorPassword, setErrorPassword] = useState("");
//     // const [errorUsername, setErrorUsername] = useState("");

//     <>
//       <div className="register-containerr">
//         <h4>Register</h4>
//         <br></br>
//         <h6>Customer Register</h6>

//         <div >
//           <form className="register-ContainerForm" onSubmit={handleForm}>
//             <div >
//               <label className="register-lable" htmlFor="userName">Username*</label>
//               <input className="register-input"
//                 onChange={getUserName}
//                 value={username}
//                 type="text"
//                 id="userName"
//               />
//               {/* {errorUsername && <p>{errorUsername}</p>} */}
//               {/* {errorUsername && <p>{errorUsername}</p>} */}
//             </div>
//             <div>
//               <label  className="register-lable" htmlFor="Email">Email*</label>
//               <input  className="register-input"onChange={getEmail} value={email} type="text" id="Email" />
//               {/* {errorEmail && <p>{errorEmail}</p>} */}
//               {/* {errorUsername && <p>{errorUsername}</p>} */}
//             </div>
//             <div >
//               <label className="register-lable" htmlFor="Password">Password*</label>
//               <input className="register-input"
//                 onChange={getPassword}
//                 value={password}
//                 type="password"
//                 id="Password"
//               />
//               {/* {errorPassword && <p>{errorPassword}</p>} */}
//             </div>
//             <div className="register-erorrs">
//           {errorUsername && <p className="login-p">{errorUsername}</p>}
//           {errorEmail && <p className="login-p">{errorEmail}</p>}
//           {errorPassword && <p className="login-p">{errorPassword}</p>}
//         </div>
//             <button className="register-button" type="submit">
//               Sign Up
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
// export default Register;
