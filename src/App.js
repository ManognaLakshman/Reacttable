import React from "react";
import Employee from "./Employee";
import Department from "./Department";
import { Route, Switch, Link } from "react-router-dom";
import Search from "./Search";
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
                    <p>Employee</p>
                  </Link>
                </li>
                <li>
                  <Link to="Department">
                    <p>Department</p>
                  </Link>
                </li>
                <li>
                  <Link to="Search">
                    <p>Search Department<br />Details</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <Switch>
            <Route path="/" exact component={Employee} />
            <Route path="/Department" component={() => <Department />} />
            <Route path="/Search" component={() => <Search />} />
          </Switch>
        </div>
      );
    }
    else {
      view = <div />;
    }
    return <div>{view}</div>;
  }
}
export default App;

