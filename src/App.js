import React from "react";
import Employee from "./Employee";
import Department from "./Department";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      isLoggedIn: false
    };
  }
  componentWillMount() {
    this.username = require("./UserInfo.json");
    console.log(this.username);
    if (this.username["name"] === "Manogna") {
      this.setState({
        userDetails: this.username,
        isLoggedIn: true
      });
    } else {
      alert("please enter correct user details");
    }
  }
  render() {
    let username = `UserName: ${this.state.userDetails["name"]}`;
    let view;
    if (this.state.isLoggedIn) {
      view = (
        <div>
          <p className="userNameView">{username} </p>
          <header>
            <nav>
              <ul>
                <li>
                  <Link to="/">
                    <p>Department</p>
                  </Link>
                </li>
                <li>
                  <Link to="Employee">
                    <p>Employee</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <Switch>
            <Route path="/" exact component={Department} />
            <Route path="/Employee" component={Employee} />
          </Switch>
        </div>
      );
    } else {
      view = <div />;
    }
    return <div>{view}</div>;
  }
}
export default App;

// import React from "react";
// import Employee from "./Employee";
// import Department from "./Department";
// import Login from "./Login";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect
// } from "react-router-dom";
// import "./index.css";

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100);
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       fakeAuth.isAuthenticated === true ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/" />
//       )
//     }
//   />
// );
// export default function Auth() {
//   return (
//     <Router>
//       <div>
//         <header>
//           <nav>
//             <ul>
//               <li>
//                 <Link to="/">
//                   <p>Employee</p>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="Department">
//                   <p>Department</p>
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </header>
//         <Link to="/Employee" />
//         <Link to="/Department" />
//         <PrivateRoute path="/Employee" component={Employee} />
//         <PrivateRoute path="/Department" component={Department} />
//         <Route path="/" exact component={Login} />
//       </div>
//     </Router>
//   );
// }
