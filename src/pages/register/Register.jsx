import "./register.css"
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/actions";

export default function Register() {
  const dispatch = useDispatch();
  let registerUser = (event) => {
    event.preventDefault();
    let formData = event.target;
    fetch("http://localhost:8080/register", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin':'http://localhost:8080',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': formData.name.value,
        'email': formData.email.value,
        'password': formData.password.value,
        'repassword': formData.repassword.value,
      })

    }).then((response) => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    }).then((data) => {
      if (!data.status) {
        console.log("failed");
      } else {
        console.log("succeed!");
        dispatch(loginUser(data.userName, []));
      }
    });
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form method="post" onSubmit={registerUser} className="registerForm">
        <label>Username</label>
        <input className="registerInput" type="text" name="name" placeholder="Enter your username..." />
        <label>Email</label>
        <input className="registerInput" type="text" name="email" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="registerInput" type="password" name="password" placeholder="Enter your password..." />
        <label>Reenter Password</label>
        <input className="loginInput" type="password" name="repassword" placeholder="Reenter your password..." />
        <button className="registerButton">Register</button>
      </form>
      <button className="registerLoginButton">Login</button>
    </div>
  )
}
