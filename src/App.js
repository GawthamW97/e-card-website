import React,{Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/auth/layout/NavBar'
import Dashboard from '../src/components/profile/Dashboard'
import ViewConnection from './components/connections/ViewConnection'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import CreateProfile from './components/profile/CreateProfile'

class App extends Component{
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
          </Switch>
        </div>
      </BrowserRouter> 
      );
    }
  }
export default App;
