import {Switch, Redirect, Route} from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'

import NotFound from './Components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
