import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = "/">
            <HomePage className="HomePage"/>
          </Route>
          <Route exact path = "/login">
            <Login/>
          </Route>
          <Route exact path = "/signup">
            <Signup/>
          </Route>
          <Route exact path = "/cart">
            <Cart/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
