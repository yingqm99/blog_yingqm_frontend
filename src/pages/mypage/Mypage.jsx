import { useLocation } from "react-router";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./mypage.css";

export default function Mypage() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <div className="home">
        
        <div className="mainbar">
          
          <Posts />
        </div>
        {/* <div className="home"> */}
          
          <Sidebar />
        {/* </div> */}
      </div>
      
    </>
  );
}
