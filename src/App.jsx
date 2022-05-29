import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Mypage from "./pages/mypage/Mypage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from 'react-redux'

function App() {
  const userName = useSelector(state => state.user);
  console.log('userName ' + userName);


  const currentUser = userName !== '';
  console.log(currentUser);
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/posts">
          <Homepage />
        </Route>
        <Route path="/register">
          <Homepage />
        </Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/write">
          <Write />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route exact path="/my">
          {currentUser ? <Mypage /> : <Homepage />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
