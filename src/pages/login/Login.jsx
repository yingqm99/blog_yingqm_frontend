import "./login.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/actions";

export default function Login() {
  const dispatch = useDispatch();
  let login = (event) => {
    event.preventDefault();
    let formData = event.target;
    console.log(formData);
    fetch("http://localhost:8080/login", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin':'http://localhost:8080',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': formData.name.value,
        'password': formData.password.value,
      })
    }).then((response) => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    }).then((data) => {
      if (!data.status) throw Error("login failed");
      console.log("login succeed");
      console.log(data.blogs);
      dispatch(loginUser(data.userName, data.blogs));
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={login}>
        <label>User Name</label>
        <input className="loginInput" type="text" name="name" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="loginInput" type="password" name="password" placeholder="Enter your password..." />
        <button className="loginButton">Login</button>
      </form>
        <button className="loginRegisterButton">Register</button>
    </div>
  );
}
