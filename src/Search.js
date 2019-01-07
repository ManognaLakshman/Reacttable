import React from "react";
import "./index.css";
import DepartmentSearch from "./Department_search";
import DepSearch from "./DepSearch";
import { connect } from "react-redux";
import * as actionTypes from './store/actions';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkFlag: false
        }
    }

    componentWillMount() {
        this.props.onSearch();

    }
    handleDepartmentSearch = (data) => {
        this.setState({
            checkFlag: true
        }, () => this.props.onHandleDepSearch(data));

    }

    manageComponents = (flag) => {
        if (flag && this.state.checkFlag) {
            return <DepSearch searchDetails={this.props.SeaDet} />
        }
        else {
            return <DepartmentSearch handleDepartmentSearch={this.handleDepartmentSearch} />
        }

    }

    render() {
        return (
            <div>
                {this.manageComponents(this.props.flag1)}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        depDet: state.dep_details,
        SeaDet: state.searchDetails,
        flag1: state.flag
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearch: () => dispatch({
            type: actionTypes.HANDLENEWSEARCH
        }),
        onHandleDepSearch: (data) => dispatch({
            type: actionTypes.HANDLEDEPSEARCH,
            payload: { searchData: data }
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
