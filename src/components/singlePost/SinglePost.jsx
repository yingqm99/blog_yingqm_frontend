import { Link } from "react-router-dom";
import Markdown from "marked-react";
import "./singlePost.css";
import { useLocation } from 'react-router';
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Dialog, DialogTitle, DialogContentText, DialogActions, Button } from "@mui/material";

export default function SinglePost() {

  const loginUser = useSelector(state => state.user);
  const location = useLocation();
  const history = useHistory();
  console.log(location.pathname);

  const blogId = location.pathname.split("/")[2];
  console.log(blogId);

  const [blogText, setBlogText] = useState("");
  const [blogUser, setBlogUser] = useState("");
  const [title, setTitle] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [modifyDialog, setModifyDialog] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/post?id=" + blogId, {
      method: 'GET',
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
      if (!data.status) throw Error("load blog failed");
      setBlogText(data.blogText);
      setBlogUser(data.blogUser);
      setTitle(data.title);
    }).catch(err => {
      console.log(err);
    });
  })

  const handleDeleteClick = (e) => {
    setDeleteDialog(true);
  }

  const handleCloseDeteleDialog = (e) => {
    setDeleteDialog(false);
  }

  const handleDeleteConfirmClick = (e) => {
    setDeleteDialog(false);
    fetch("http://localhost:8080/delete?id=" + blogId, {
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
      if (!data.status) throw Error("delete blog failed");
      history.push('/');
    }).catch(err => {
      console.log(err);
    });
  }

  const handleModifyClick = (e) => {
    setModifyDialog(true);
  }
  

  return (
    <div className="singlePost">
      <Dialog open={deleteDialog}>
          <DialogTitle>Delete Blog</DialogTitle>
            <DialogContentText>
              Are you sure to delete this blog?
            </DialogContentText>
          <DialogActions>
            <Button onClick={handleCloseDeteleDialog}>CANCEL</Button>
            <Button onClick={handleDeleteConfirmClick}>DELTE</Button>
          </DialogActions>
      </Dialog>

      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <h1 className="singlePostTitle">
          {title}
          {/* Lorem ipsum dolor */}
          <div className="singlePostEdit">
            {
              blogUser == loginUser && 
              <>
                <i className="singlePostIcon far fa-edit" onClick={handleModifyClick}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDeleteClick}></i>
              </>
            }
            
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
                {blogUser}
              </Link>
            </b>
          </span>
          {/* <span>1 day ago</span> */}
        </div>
        
        
        <p className="singlePostDesc">
          <Markdown>
            {blogText}
          </Markdown>
        </p>
      </div>
    </div>
  );
}
