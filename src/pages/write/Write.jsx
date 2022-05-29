import "./write.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import backend from '../../url';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { updateBlog } from '../../actions/actions';
import { useDispatch } from "react-redux";

export default function Write() {

  const [blogText, setBlogText] = useState('');
  const userName = useSelector(state => state.user);
  let blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  let history = useHistory();

  const showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setBlogText(text);
      
    }
    reader.readAsText(e.target.files[0]);
  }

  const handleChange = (e) => {
    e.preventDefault();
    setBlogText(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(backend + '/blog', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin':'http://localhost:8080',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': userName,
        'title': e.target.titleInput.value,
        'text': e.target.textarea.value,
      })
    }).then((response) => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    }).then((data) => {
      if (!data.status) throw Error("BLOG POST FAILED");
      blogs.push(e.target.titleInput.value);
      dispatch(updateBlog(blogs));
      history.push("/");
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      
      <form className="writeForm" onSubmit={onSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={showFile} />
          <input
            id="titleInput" 
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
          />
        </div>
        
        
        <div className="writeFormGroup">
          <div id="textInput" className="writeInput writeText">
            <textarea
              id="textarea"
              className="writeInput writeText"
              placeholder="Write in Markdown Format"
              type="text"
              value={blogText}
              onChange={handleChange}
              autoFocus={true}
            />
          </div>
          
          
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
