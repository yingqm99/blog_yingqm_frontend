import { Link } from "react-router-dom";
import "./post.css";
import { useSelector } from 'react-redux';
import { Box } from "@mui/system";

export default function Post({title}) {
  const userName = useSelector(state => state.user);
  console.log(userName);

  const handleMouseOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.target.parent);
    e.target.parent.parent.style.borderStyle = "solid";
  }

  return (
    <div className="post">
      {/* <img
        className="postImg"
        src={img}
        alt=""
      /> */}
      <div className="postInfo">
        {/* <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span>
        </div> */}
        <div className="postTitle" onMouseOver={handleMouseOver}>
          <Link to="/post/{title}" className="link">
            {title}
          </Link>
          
          <span className="postDate">1 hour ago</span>
          <span className="postDate">{userName}</span>
        </div>
        {/* <hr /> */}
        
      </div>
      
      {/* <p className="postDesc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
        fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
        atque, exercitationem quibusdam, reiciendis odio laboriosam?
      </p> */}
    </div>
  );
}
