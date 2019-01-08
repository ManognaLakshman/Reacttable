import React from "react";
import "./index.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import debounce from "lodash/debounce";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import moment from "moment";
import Pagination from "./Pagination";
import { connect } from "react-redux";
import * as actionTypes from './store/actions';

class Employee extends React.Component {

  handleChange = (onChange, column) => {
    return event => {
      const type = column.type;
      if (type === "date") {
        if (event._d === undefined || event._d === null || event._d === "") {
          this.props.onDeleteFilter(column);
          onChange();
          return;
        }
      } else {
        if (
          event.target.value === undefined ||
          event.target.value === null ||
          event.target.value === ""
        ) {
          this.props.onDeleteFilter(column);
          onChange();
          return;
        }
      }

      if (type === "date") {
        this.props.onDateChange(column, event);
      } else {
        this.props.onFilterChange(column, event);
      }
      onChange();
    };
  };

  getFilterValueFromState = (identifier, defaultValue = "") => {
    const filterState = this.state.filterState;
    if (!filterState) {
      return defaultValue;
    }
    if (
      typeof filterState[identifier] !== "undefined" ||
      filterState[identifier] !== null
    ) {
      return filterState[identifier];
    }
    return defaultValue;
  };

  fetchGridData = debounce(async (state, instance) => {
    let search = null;
    const colTypeMapping = state.allDecoratedColumns.reduce(
      (accumulator, currentValue) => {
        return { ...accumulator, [currentValue.id]: currentValue.type };
      },
      {}
    );
    const filterKeys = Object.keys(this.props.filterState);
    if (filterKeys.length !== 0) {
      search = "( ";
      search += filterKeys
        .map(key => {
          let suffix = "";
          if (colTypeMapping[key] && colTypeMapping[key] === "text") {
            suffix = "*";
          }
          return this.props.filterState[key]
            ? key + ":" + this.props.filterState[key] + suffix
            : "";
        })
        .join(" and ");
      search += " )";
    }

    const params = {
      page: state.page,
      size: state.pageSize,
      sort: state.sorted["0"]
        ? state.sorted["0"].id +
        "," +
        (state.sorted["0"].desc === false ? "desc" : "asc")
        : "id",
      search
    };

    this.props.onLoadData();

    const json = await axios.get(
      "https://genericspringrest.herokuapp.com/employee",
      { params }
    );

    const newData = json.data.content.map(result => ({
      id: result.id,
      name: result.name,
      skill: result.skill,
      salary: result.salary,
      grade: result.grade,
      city: result.city,
      country: result.country,
      doj: result.doj,
      desg: result.desg,
      deptname: result.dept ? result.dept.deptname : "",
      Dep_head: result.dept
    }));

    this.props.onFetchingData(newData, json.data.totalPages);
  }, 500);

  render() {
    const emp_data = this.props.emp_data;
    const isLoading = this.props.isLoading;
    const pages = this.props.pages;
    const content = (
      <div>
        <ReactTable
          data={emp_data}
          freezeWhenExpanded={true}
          filterable
          pages={pages}
          Pagination={true}
          showPagination={true}
          showPaginationTop={true}
          showPaginationBottom={true}
          showPageSizeOptions={true}
          PaginationComponent={Pagination}
          manual
          minRows={0}
          loading={isLoading}
          onFetchData={this.fetchGridData}
          columns={[
            {
              Header: "ID",
              accessor: "id",
              type: "number",
              Filter: ({ column, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, column)}
                  value={
                    this.props.filterState.id ? this.props.filterState.id : ""
                  }
                />
              )
            },
            {
              Header: "Name",
              accessor: "name",
              type: "text",
              Filter: ({ column, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, column)}
                  value={
                    this.props.filterState.name
                      ? this.props.filterState.name
                      : ""
                  }
                />
              )
            },

            {
              Header: "Skill",
              accessor: "skill",
              type: "text",
              Filter: ({ column, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, column)}
                  value={
                    this.props.filterState.skill
                      ? this.props.filterState.skill
                      : ""
                  }
                />
              )
            },
            {
              Header: "DOJ",
              accessor: "doj",
              type: "date",
              Filter: ({ column, onChange }) => (
                <DatePicker
                  placeholderText="Select a date"
                  value={
                    this.props.filterState.doj ? this.props.filterState.doj : ""
                  }
                  onChange={this.handleChange(onChange, column)}
                />
              )
            },
            {
              Header: "Designation",
              accessor: "desg",
              type: "text",
              minWidth: 110,
              Filter: ({ column, onChange }) => (
                <select
                  onChange={this.handleChange(onChange, column)}
                  value={this.getFilterValueFromState("desg", "all")}
                  style={{
                    width: "100%"
                  }}
                >
                  <option value="">Show all</option>
                  <option value="dev">dev</option>
                  <option value="Tester">Tester</option>
                  <option value="Specialist">Specialist</option>
                  <option value="UI">UI dev</option>
                </select>
              )
            },
            {
              Header: "Grade",
              accessor: "grade",
              type: "number",
              Filter: ({ column, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, column)}
                  value={
                    this.props.filterState.grade
                      ? this.props.filterState.grade
                      : ""
                  }
                />
              )
            },
            {
              id: "dept.deptname",
              Header: "Department",
              accessor: "deptname",
              type: "text",
              Filter: ({ column, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, column)}
                  value={
                    this.props.filterState["dept.deptname"]
                      ? this.props.filterState["dept.deptname"]
                      : ""
                  }
                />
              )
            },
            {
              Header: "Salary",
              accessor: "salary",
              type: "number",
              Filter: ({ column, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, column)}
                  value={
                    this.props.filterState.salary
                      ? this.props.filterState.salary
                      : ""
                  }
                />
              )
            },
            {
              Header: "City",
              accessor: "city",
              type: "text",
              Filter: ({ column, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, column)}
                  value={
                    this.props.filterState.city
                      ? this.props.filterState.city
                      : ""
                  }
                />
              )
            },
            {
              Header: "Country",
              accessor: "country",
              type: "text",
              Filter: ({ column, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, column)}
                  value={
                    this.props.filterState.country
                      ? this.props.filterState.country
                      : ""
                  }
                />
              )
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
          getTdProps={() => {
            return {
              style: {
                overflow: "visible"
              }
            };
          }}
          getTheadFilterThProps={() => {
            return {
              style: {
                position: "inherit",
                overflow: "inherit"
              }
            };
          }}
          SubComponent={rows => {
            const dep = rows.original.Dep_head
              ? rows.original.Dep_head.depthead
              : "";
            return (
              <div className="Posts">
                <header>
                  <ul>
                    <li>
                      Dep ID :{" "}
                      {rows.original.Dep_head
                        ? rows.original.Dep_head.deptid
                        : ""}
                    </li>
                    <li>
                      Dep Name :{" "}
                      {rows.original.Dep_head
                        ? rows.original.Dep_head.deptname
                        : ""}
                    </li>
                    <li>Dep Head : {dep ? dep.name : ""}</li>
                    <li>City : {dep ? dep.city : ""}</li>
                    <li>Country : {dep ? dep.country : ""}</li>
                    <li>Designation : {dep ? dep.desg : ""}</li>
                    <li>DOJ : {dep ? dep.doj : ""}</li>
                    <li>Grade : {dep ? dep.grade : ""}</li>
                    <li>Salary : {dep ? dep.salary : ""}</li>
                    <li>Skill : {dep ? dep.skill : ""}</li>
                  </ul>
                </header>
              </div>
            );
          }}
        />
      </div>
    );

    return <div> {content} </div>;
  }
}

const mapStateToProps = state => {
  return {
    emp_data: state.emp.emp_data,
    isLoading: state.emp.isLoading,
    filterState: state.emp.filterState,
    pages: state.emp.pages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDateChange: (column, event) => dispatch({
      type: actionTypes.DATE_CHANGE,
      payload: { identifier: column.id, value: event._d }
    }),
    onFilterChange: (column, event) => dispatch({
      type: actionTypes.FILTER_CHANGE,
      payload: { identifier: column.id, value: event.target.value }
    }),
    onFetchingData: (newData, pages) => dispatch({
      type: actionTypes.FETCH_EMPLOYEE,
      payload: { empData: newData, pages: pages }
    }),
    onLoadData: () => dispatch({
      type: actionTypes.LOAD_EMPLOYEE
    }),
    onDeleteFilter: (column) => dispatch({
      type: actionTypes.DELETE_FILTER_EMP,
      payload: { identifier: column.id }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
