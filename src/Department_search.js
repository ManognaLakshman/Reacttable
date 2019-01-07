import React from "react";
import "./index.css";
import { connect } from "react-redux";
import * as actionTypes from './store/actions';


class DepartmentSearch extends React.Component {
    handleChange = event => {
        if ([event.target.name]["0"] === "deptid") {
            let reg = new RegExp('^[0-9]*$');
            if (reg.test([event.target.value]) === false) {
                alert("Enter digits between 0 and 9");
                return false;
            }
        }
        this.props.onHandleChange(event);
        if (event.target.value === "") {
            this.props.onDeleteChange(event);
        }
    }

    handleSubmit = async (event) => {
        if (Object.keys(this.props.depDet).length === 0) {
            alert("At least 1 entry must be made");
            this.refs.deptid.focus();
            return false;
        }
        this.props.handleDepartmentSearch(this.props.depDet);
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
                                    <input ref="deptid" type="text" name="deptid"
                                        value={this.props.depDet.deptid ?
                                            this.props.depDet.deptid
                                            : ""}
                                        onChange={this.handleChange}
                                        autoFocus />
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    <label>Dep Name: </label>
                                </td>
                                <td>
                                    <input type="text" name="deptname"
                                        value={this.props.depDet.deptname ?
                                            this.props.depDet.deptname
                                            : ""}
                                        onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    <label>Dep Head: </label>
                                </td>
                                <td>
                                    <input type="text" name="depthead.name"
                                        value={this.props.depDet["depthead.name"] ?
                                            this.props.depDet["depthead.name"]
                                            : ""}
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

const mapStateToProps = state => {
    return {
        depDet: state.form.dep_details
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHandleChange: (event) => dispatch({
            type: actionTypes.HANDLECHANGE,
            payload: { eventName: [event.target.name], eventValue: [event.target.value] }
        }),
        onDeleteChange: (event) => dispatch({
            type: actionTypes.HANDLEDELETE,
            payload: { eventName: [event.target.name] }
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentSearch);