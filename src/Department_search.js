import React from "react";
import "./index.css";

class DepartmentSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dep_details: {}
        }
    }

    handleChange = event => {
        if ([event.target.name]["0"] === "deptid") {
            let reg = new RegExp('^[0-9]*$');
            if (reg.test([event.target.value]) === false) {
                alert("Enter digits between 0 and 9");
                return false;
            }
        }

        if (
            event.target.value === undefined ||
            event.target.value === null ||
            event.target.value === ""
        ) {
            delete this.state.dep_details[event.target.name];
            this.setState({
                ...this.state.dep_details
            });
        }
        else {
            const dep_details = {
                ...this.state.dep_details,
                [event.target.name]: event.target.value
            }
            this.setState({
                dep_details
            });
        }

    }

    handleSubmit = async (event) => {
        if (Object.keys(this.state.dep_details).length === 0) {
            alert("At least 1 entry must be made");
            this.refs.deptid.focus();
            return false;
        }
        this.props.handleDepartmentSearch(this.state.dep_details);
    }

    render() {

        return (
            <div>
                <form>
                    <table cellSpacing="0px" cellPadding="10px" align="center" >
                        <tbody>
                            <tr>
                                <td align="right">
                                    <label>Dep ID: </label>
                                </td>
                                <td >
                                    <input ref="deptid" type="text" name="deptid" value={this.state.dep_details.deptid ?
                                        this.state.dep_details.deptid : ""}
                                        onChange={this.handleChange}
                                        autoFocus />
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    <label>Dep Name: </label>
                                </td>
                                <td>
                                    <input type="text" name="deptname" value={this.state.dep_details.deptname ?
                                        this.state.dep_details.deptname : ""}
                                        onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    <label>Dep Head: </label>
                                </td>
                                <td>
                                    <input type="text" name="depthead.name"
                                        value={this.state.dep_details["depthead.name"] ?
                                            this.state.dep_details["depthead.name"] : ""}
                                        onChange={this.handleChange} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <div align="center">
                        <input type="button" value="Submit"
                            onClick={this.handleSubmit} />
                    </div>
                </form>
            </div>
        )
    }
}

export default DepartmentSearch;