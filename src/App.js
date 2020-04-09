import React,{Component} from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import Navbar from './components/auth/layout/NavBar'
import Dashboard from '../src/components/profile/Dashboard'
import ViewConnection from './components/connections/ViewConnection'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import CreateProfile from './components/profile/CreateProfile'
import UserProfile from './components/profile/UserProfile'
// import ValidationForm from './components/ValidationForm';
// import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
  state = {
    visible: true
  };

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/project/:id' component={ViewConnection} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/create' component={CreateProfile} />
            <Route path='/profile' component={UserProfile} />
          </Switch>
        </div>
      </BrowserRouter>
      );
    }
  }

export default App;
