// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../Register/Register.css";
// import { useNavigate } from "react-router-dom";
// import './login.css'

// function Login() {
//   const navigation = useNavigate();
//   const [Users, setUsers] = useState([]);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     GetRegistration();

//     // Event listener for window close
   
//   }, []);

//   // get data from server
//   const GetRegistration = () => {
//     axios
//       .get("http://localhost:9000/Users/") // Replace the URL with your JSON server endpoint
//       .then((response) => {
//         setUsers(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const getEmail = (event) => {
//     setEmail(event.target.value);
//   };

//   const getPassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const FormHandle = (event) => {
//     event.preventDefault();
//     ValidationLogin();
//   };

//   const ValidationLogin = () => {
//     const valid = Users.find((user) => user.email === email);

//     if (valid) {
//       if (valid.password === password) {
//         setError("");
//         navigation(`/${valid.id}`);

//         axios
//           .put(`http://localhost:9000/Users/${valid.id}`, {
//             ...valid,
//             IsLogin: true
//           })
//           .then((response) => {
//             console.log(response);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       } else {
//         setError("• Password or email is not correct");
//       }
//     } else {
//       setError("• Password or email is not correct");
//     }
//   };

//   return (
//     <>
//       <div className="login-containerr">
//         <h4>Login</h4>
 

//         <form  className = "login-form"onSubmit={FormHandle}>
//           <label  className="login-label">Email</label>
//           <input className="login-input"type="text" onChange={getEmail} />
//           <label className="login-label">Password</label>
//           <input className="login-input"type="password" onChange={getPassword} />
//         <div className="login-errors">{error && <p className="login-p">{error}</p>}</div>
          
//           <span className="login-span">
//             Forget Password ?
//           </span>

//           <button className="login-button" type="submit">Sign in</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Login;
