import React from "react";
import Employee from "./Employee";
import Department from "./Department";
import { Route, Switch, Link } from "react-router-dom";
import Search from "./Search";
import "./App.css";
import Axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      isLoggedIn: false,
      userId: null,
      userTextBoxValue: "",
      Role: null
    };
  }

  async loadUserDetails(userId) {
    try {
      Axios.defaults.headers.common["SM_USER"] = userId;
      const userDetails = await Axios.get(
        `http://localhost:8080/user/getcurrentuserinfo`
      );
      this.setState({
        userDetails: userDetails.data,
        isLoggedIn: true,
        userId: userId
      });
      sessionStorage.setItem("userid", userId);
    } catch {
      alert("Not Authorized");
    }
  }
  async componentDidMount() {
    const savedUserId = sessionStorage.getItem("userid");
    if (savedUserId) {
      this.loadUserDetails(savedUserId);
    }
  }

  captureUserId(ev) {
    this.setState({ userTextBoxValue: ev.target.value });
  }

  handleLogin(ev) {
    ev.preventDefault();
    const userId = this.state.userTextBoxValue;
    this.loadUserDetails(userId);
  }

  LogOutUser(event) {
    //console.log("User logged out");
    sessionStorage.clear();
    window.location.href = "/";
  }

  render() {
    let username = `UserName: ${this.state.userDetails.name}`;
    let view;
    if (this.state.isLoggedIn) {
      view = (
        <div>
          <p className="userNameView">{username} </p>
          <br />
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
                    <p>
                      Search Department
                      <br />
                      Details
                    </p>
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
          <br />
          <input
            type="button"
            value="LogOut"
            onClick={event => this.LogOutUser(event)}
          />
        </div>
      );
    } else {
      view = (
        <div>
          <form onSubmit={ev => this.handleLogin(ev)}>
            <input
              type="text"
              maxLength="25"
              onChange={ev => this.captureUserId(ev)}
              placeholder="Username"
              value={this.state.userTextBoxValue}
            />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
    return <div>{view}</div>;
  }
}
export default App;
