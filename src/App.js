import React from "react";
import Employee from "./Employee";
import Department from "./Department";
import { Route, Switch, Link } from "react-router-dom";
import Search from "./Search";
import "./App.css";
import Axios from "axios";
import { connect } from "react-redux";
import * as actionCreators from './store/actions/actions';

class App extends React.Component {

  loadUserDetails = userId => {
    try {
      Axios.defaults.headers.common["SM_USER"] = userId;
      this.props.setUserDetails(userId);
      sessionStorage.setItem("userid", userId);
    } catch {
      alert("Not Authorized");
    }
  }

  componentDidMount() {
    const savedUserId = sessionStorage.getItem("userId");
    if (savedUserId) {
      this.loadUserDetails(savedUserId);
    }
  }

  captureUserId = event => {
    this.props.onChangeUserId(event);
  }

  handleLogin = event => {
    event.preventDefault();
    const userId = this.props.userTextBoxValue;
    this.loadUserDetails(userId);
  }

  LogOutUser = () => {
    sessionStorage.clear();
    window.location.href = "/";
  }

  render() {
    let username = `UserName: ${this.props.userDetails.name}`;
    let view;
    if (this.props.isLoggedIn) {
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
              value={this.props.userTextBoxValue}
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

const mapStateToProps = state => {
  return {
    userDetails: state.login.userDetails,
    isLoggedIn: state.login.isLoggedIn,
    userId: state.login.userId,
    userTextBoxValue: state.login.userTextBoxValue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserDetails: (userId) => dispatch(actionCreators.set_user_details(userId)),
    onChangeUserId: event => dispatch(actionCreators.change_userid(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
