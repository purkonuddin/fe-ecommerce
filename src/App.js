// import React, { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// import Jumbotron from 'react-bootstrap/Jumbotron';
// import Toast from 'react-bootstrap/Toast';
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';

// import './App.css';

// const routes = [
//   {
//     path: "/",
//     exact: true,
//     sidebar: () => <div>home!</div>,
//     main: () => <h2>Home</h2>
//   },
//   {
//     path: "/bubblegum",
//     sidebar: () => <div>bubblegum!</div>,
//     main: () => <h2>Bubblegum</h2>
//   },
//   {
//     path: "/shoelaces",
//     sidebar: () => <div>shoelaces!</div>,
//     main: () => <h2>Shoelaces</h2>
//   }
// ];

// const ExampleToast = ({ children }) => {
//   const [show, toggleShow] = useState(true);

//   return (
//     <>
//       {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
//       <Toast show={show} onClose={() => toggleShow(false)}>
//         <Toast.Header>
//           <strong className="mr-auto">React-Bootstrap</strong>
//         </Toast.Header>
//         <Toast.Body>{children}</Toast.Body>
//       </Toast>
//     </>
//   );
// };

// const App = () => (
//   <Container className="p-3">
//     <Jumbotron>
//       <h1 className="header">Welcome To React-Bootstrap</h1>
//       <ExampleToast>
//         We now have Toasts
//         <span role="img" aria-label="tada">
//           🎉
//         </span>
//       </ExampleToast>
//     </Jumbotron>
//     <SidebarExample/>
//   </Container>
// );

// export default App;

// function SidebarExample() {
//   return (
//     <Router>
//       <div style={{ display: "flex" }}>
//         <div
//           style={{
//             padding: "10px",
//             width: "40%",
//             background: "#f0f0f0"
//           }}
//         >
//           <ul style={{ listStyleType: "none", padding: 0 }}>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/bubblegum">Bubblegum</Link>
//             </li>
//             <li>
//               <Link to="/shoelaces">Shoelaces</Link>
//             </li>
//           </ul>

//           <Switch>
//             {routes.map((route, index) => (
//               // You can render a <Route> in as many places
//               // as you want in your app. It will render along
//               // with any other <Route>s that also match the URL.
//               // So, a sidebar or breadcrumbs or anything else
//               // that requires you to render multiple things
//               // in multiple places at the same URL is nothing
//               // more than multiple <Route>s.
//               <Route
//                 key={index}
//                 path={route.path}
//                 exact={route.exact}
//                 children={<route.sidebar />}
//               />
//             ))}
//           </Switch>
//         </div>

//         <div style={{ flex: 1, padding: "10px" }}>
//           <Switch>
//             {routes.map((route, index) => (
//               // Render more <Route>s with the same paths as
//               // above, but different components this time.
//               <Route
//                 key={index}
//                 path={route.path}
//                 exact={route.exact}
//                 children={<route.main />}
//               />
//             ))}
//           </Switch>
//         </div>
//       </div>
//     </Router>
//   );
// }

import React, { Suspense }  from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import Product from "./components/product/product";
import Login from "./components/auth/login";
import { store, persistor } from "./redux/store";
// import Home from "./components/home";
// import Category from "./components/category/category";
// import User from "./components/user/user";
// import Merchant from "./components/merchant/merchant";
// import History from "./components/history/history";
import error from "./assets/404.png";
import { Button } from "react-bootstrap";
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

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              {/* <Route path="/product" component={Product} /> */}
              {/* <Route path="/category" component={Category} /> */}
              {/* <Route path="/user" component={User} /> */}
              {/* <Route path="/merchant" component={Merchant} /> */}
              {/* <Route path="/history" component={History} /> */}
              <Route component={notFound} />
            </Switch>
          </Router>
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
