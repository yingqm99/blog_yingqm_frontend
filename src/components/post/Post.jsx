import { Link } from "react-router-dom";
import "./post.css";
import { useSelector } from 'react-redux';
import { Card, CardContent } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { Typography } from "@mui/material";

export default function Post({title}) {
  const userName = useSelector(state => state.user);
  console.log(userName);


  return (
    <Card sx={{height: "150", mt: 1}}>
    
      <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
            <Link to="/post/{title}" className="link">
              
                {title}
            </Link>
            </Typography>
            <Typography variant="body3" color="text.secondary">
            <span className="postDate">1 hour ago</span>
            <span className="postDate">{userName}</span>
            </Typography>
            
          </CardContent>
      </CardActionArea>
      
    </Card>
    
  );
}
