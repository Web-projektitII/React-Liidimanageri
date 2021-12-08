import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/auth";
import PrivateRoute from './PrivateRoute';
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import Unauthorized from './components/Unauthorized';
import Home from './Views/Home';
import About from './Views/About';
import Product from './Views/Product';

const laskuri = [0];

function App(props) {
  const [authTokens, setAuthTokens] = useState(sessionStorage.getItem('tokens') || '');
  /*const [apu,setApu] = useState([0]);*/
  /* const apu = [...laskuri] */
  const apu = laskuri
    
  const setTokens = (data) => {
    if (data) sessionStorage.setItem("tokens", JSON.stringify(data));
    else sessionStorage.removeItem("tokens");
    setAuthTokens(data);
    /*setApu([apu[0]+1]);*/
    apu[0] += 1;
    }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      {console.log("Provider,authTokens:",authTokens,",apu:"+apu)}
      <div className="relative pb-10 min-h-screen">
      <Router basename="/react-liidimanageri">
        <Header />
        <div className="p-3">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/products/:id" component={Product} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path='/unauthorized' component={Unauthorized} />  
            <PrivateRoute path="/admin" component={Admin} />
          </Switch>
        </div>
        <Footer />
      </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;