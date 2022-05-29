import Post from "../post/Post";
import "./posts.css";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";

export default function Posts() {
  const url = useLocation();
  const blogs = useSelector(state => state.blogs);

  console.log(blogs)


  return (
    <div className="posts">
      {
        blogs.map((blog, i) => {
          return <Post title={blog} />
        })
      }
    </div>
  );
}
