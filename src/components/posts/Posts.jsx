import Post from "../post/Post";
import "./posts.css";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useState, useEffect } from "react";

export default function Posts() {
  const url = useLocation();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  console.log(blogs);

  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/all_blogs", {
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
      if (!data.status) throw Error("load main page failed");

      if (url.pathname === '/') {
        let all_blogs = [];
        data.blogs.map((blog) => {
          all_blogs.push(blog);
        })
        console.log(all_blogs);
        setAllBlogs(all_blogs);
      } else {
        setAllBlogs(blogs);
      }
    }).catch(err => {
      console.log(err);
    });
  }, [user, url.pathname, blogs])



  return (
    <div className="posts">
      {
        allBlogs.map((blog, i) => {
          console.log(blog);
          return <Post blog={blog} />
        })
      }
    </div>
  );
}
