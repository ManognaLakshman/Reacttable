import React from "react";
import "../../index.css";
import DepartmentSearch from "./Department_search";
import DepSearch from "./DepSearch";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";

import { withRouter } from "react-router-dom";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkFlag: false
    };
  }

  componentWillMount() {
    this.props.onSearch();
    this.props.onRefresh();
  }
  handleDepartmentSearch = data => {
    this.setState(
      {
        checkFlag: true
      },
      () => this.props.onHandleDepSearch(data)
    );
  };

  manageComponents = flag => {
    if (flag && this.state.checkFlag) {
      return <DepSearch searchDetails={this.props.SeaDet} />;
    } else {
      return (
        <DepartmentSearch
          handleDepartmentSearch={this.handleDepartmentSearch}
        />)

    }
  };

  render() {
    return <div>{this.manageComponents(this.props.flag1)}</div>;
  }
}

const mapStateToProps = state => {
  return {
    depDet: state.form.dep_details,
    SeaDet: state.form.searchDetails,
    flag1: state.form.flag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch: () => dispatch(actionCreators.handlenewsearch()),
    onHandleDepSearch: data => dispatch(actionCreators.handledepsearch(data)),
    onRefresh: () => dispatch(actionCreators.refresh_table())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
