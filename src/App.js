import React from "react";
import Employee from "./Employee";
import Department from "./Department";
import { Route, Switch, Link } from "react-router-dom";
import Search from "./Search";


class App extends React.Component {

  render() {
    return (
      <div>
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
}
export default App;


