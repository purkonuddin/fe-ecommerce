import React, { Suspense }  from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Product from "./components/product";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import SendResetPassword from "./components/auth/send_reset_password";
import ResetPassword from "./components/auth/reset_password";
import { store, persistor } from "./redux/store";
import Checkout from "./components/checkout";
import Category from "./components/categori";
import Profile from "./components/profile"; 
import error from "./assets/404.png";
import { Button } from "react-bootstrap";
import logo from './logo.svg'
import './App.css'

const Home = React.lazy(() => import('./components/home'));

const notFound = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <img src={error} alt="notFound" height={550} width={900} />
      </div>
      <div className="col text-center">
        <Link to="/">
          <Button variant="outline-primary">Back To Home</Button>
        </Link>
      </div>
    </div>
  );
}; 

const SearchPage = ({ match, location }) => {
  return (
    <p>
      <strong>Location Props: </strong>
      {JSON.stringify(location, null, 2)}
    </p>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={
          <div className='container-fluid' > 
              <img style={{ height: '150px'}} src={logo} alt='Loading....' />
              <p>Loading...</p>
          </div>}>
          <Router>
            <Switch> 
              <Route path="/login" component={Login} />
              <Route path="/sign-up" component={Register} />
              <Route path="/send_reset_password" component={SendResetPassword} />
              <Route path="/reset_password/:token" component={ResetPassword} />
              <Route exact path="/" component={Home} />
              <Route path="/product/:category/:product_id" component={Product} />
              <Route path="/category/:categori_id" component={Category} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/profile" component={Profile} />
              <Route exact path="/search" component={SearchPage} />
              <Route component={notFound} />
            </Switch>
          </Router>
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
