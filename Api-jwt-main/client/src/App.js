import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import './App.css';
import Home from './pages/Home'
import Admin from './pages/Admin'
import Login from './pages/Login'
import User from './pages/User'
import Tech from './pages/Tech'
import ChangePassword from "./pages/ChangePassword";
const App =()=> {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/user" component={User}/>
        <Route exact path="/tech" component={Tech}/>
        <Route exact path="/changepassword/:id" component={ChangePassword}/>
      </Switch>
    </Router>
  );
}

export default App;
