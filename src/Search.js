import React from "react";
import "./index.css";
import DepartmentSearch from "./Department_search";
import DepSearch from "./DepSearch";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchDetails: {},
            flag: false
        }
    }

    handleDepartmentSearch = (data) => {
        this.setState({
            searchDetails: data,
            flag: true
        })
    }

    manageComponents = (flag) => {
        if (flag) {
            return <DepSearch searchDetails={this.state.searchDetails} />
        }
        else {
            return <DepartmentSearch handleDepartmentSearch={this.handleDepartmentSearch} />
        }

    }

    render() {
        return (
            <div>
                {this.manageComponents(this.state.flag)}
            </div>
        )
    }
}

export default Search;
