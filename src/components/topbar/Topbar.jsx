import { Link } from "react-router-dom";
import "./topbar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/actions";
import { TextField } from "@mui/material";
import { useState } from "react";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { loginUser } from "../../actions/actions";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";

export default function Topbar() {

  const dispatch = useDispatch();
  const history = useHistory();

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  }

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  }

  const handleCloseRegister = () => {
    setOpenRegister(false);
  }

  let handleLogin = (event) => {
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
      setOpenLogin(false);
      // history.push("my");
    }).catch(err => {
      console.log(err);
    });
  }

  let handleRegister = (event) => {
    event.preventDefault();
    let formData = event.target;
    if (formData.password.value !== formData.repassword.value) {
      setPasswordMatch(false);
      return;
    } else {
      setPasswordMatch(true);
    }
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
        setOpenRegister(false);
        // history.push("my");
      }
    });
  }

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
      history.push("/");

    }).catch(err => {
      console.log(err);
    });
  }



  const user = userName !== '';
  return (
    <div className="top">
       
      <Dialog open={openLogin} onClose={handleCloseLogin}>
        <form onSubmit={handleLogin}>
          <DialogTitle>LOGIN</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Login to Account
            </DialogContentText>
            <Box mt={3} mb={2}>
              <TextField size="small" name="name" variant="outlined" label="User Name"/>
            </Box>
            <Box>
              <TextField type="password" size="small"
                         name="password" variant="outlined" label="Password"
              />
            </Box>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogin}>Cancel</Button>
            <Button type="submit">LOGIN</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={openRegister} onClose={handleCloseRegister} maxWidth='lg'>
        <form onSubmit={handleRegister}>
          <DialogTitle>REGISTER</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Register Account
            </DialogContentText>
            
            <Box mt={2} mb={2}>
              <TextField type="text" size="small"
                         name="name" variant="outlined" label="User Name"
              />
            </Box>
            <Box mt={2} mb={2}>
              <TextField type="text" size="small"
                         name="email" variant="outlined" label="Email"
              />
            </Box>
            <Box mt={2} mb={2}>
              <TextField type="password" size="small"
                         name="password" variant="outlined" label="Password"
              />
            </Box>
            <Box mt={2} mb={2}>
              <TextField type="password" size="small" 
                         name="repassword" variant="outlined" label="Reenter Password"
              />
            </Box>
            {
              passwordMatch ? <></> : (
                <DialogContentText>
                  password not match
                </DialogContentText>
              )
            }
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRegister}>Cancel</Button>
            <Button type="submit">REGISTER</Button>
          </DialogActions>
        </form>
      </Dialog>


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
          { user && <li className="topListItem">
              <Link className="link" to="/my">
                My
              </Link>
            </li>
          }
          <li className="topListItem">
            <Link className="link" to="/posts">
              Q&amp;A
            </Link>
          </li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            {user && 
              <Link className="link" to="/write">
                WRITE
            </Link>
            }
          </li>
          {user && <li className="topListItem">
            <div onClick={handleClick}>
              LOGOUT
            </div>
              
            
          </li>}
        </ul>
      </div>
      <div className="topRight">
        <i className="topSearchIcon fas fa-search"></i>
        <Box mr={3}>
        <TextField className="searchBar"
                   variant="outlined"
                   size="small"
                   label="Search" 
                   id="margin-dense" margin="dense"
         />
        </Box>
        
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
              <Button variant="contained" onClick={handleClickOpenLogin}>
                LOGIN
              </Button>
            </li>
            <li className="topListItem">
              
              <Button variant="contained" onClick={handleClickOpenRegister}>
                REGISTER
              </Button>
              
            </li>
          </ul>
        )}
        
      </div>
    </div>
  );
}
