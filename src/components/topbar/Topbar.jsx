import { Link } from "react-router-dom";
import "./topbar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/actions";

export default function Topbar() {

  const dispatch = useDispatch();

  const userName = useSelector(state => state.user);
  console.log('userName ' + userName);

  const handleClick = e => {
    e.preventDefault();
    fetch("http://localhost:8080/logout?name=" + userName, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin':'http://localhost:8080',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    }).then((data) => {
      if (!data.status) throw Error("login failed");
      console.log("logout succeed");
      dispatch(logoutUser());
    }).catch(err => {
      console.log(err);
    });
  }


  const user = userName !== '';
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/posts">
              MY
            </Link>
          </li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && <li className="topListItem">
            <div onClick={handleClick}>
              LOGOUT
            </div>
              
            
          </li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
