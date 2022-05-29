import { useLocation } from "react-router";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import "./homepage.css";
import { useEffect } from "react";

export default function Homepage() {
  const location = useLocation();
  console.log(location);

  return (
    <>
      <div className="home">
        
        <div className="mainbar">
          <Header />
          <Posts />
        </div>
        {/* <div className="home"> */}
          
          <Sidebar />
        {/* </div> */}
      </div>
      
    </>
  );
}
