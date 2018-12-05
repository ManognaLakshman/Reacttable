import React from "react";
import "./index.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import debounce from "lodash/debounce";


class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emp_data: [],
      dep_data: {},
      isLoading: false,
      filterState: {},
      page: null

    };
  }


  handleChange = (onChange, identifier) => {
    //console.log("in handlechange");
    return e => {
      this.setState({
        filterState: {
          ...this.state.filterState,
          [identifier]: e.target.value
        }
      });
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


  fetchGridData = debounce((state, instance) => {
    console.log(state, instance);
    console.log(state.sorted["0"]);
    this.setState({ isLoading: true });
    //const params = { page: state.page, size: state.pageSize }
    axios
      .get("https://spring-employee.herokuapp.com/employees", {
        params: {
          page: state.page,
          size: state.pageSize,
          sort: state.sorted["0"] ? (state.sorted["0"].id + "," + (state.sorted["0"].desc === false ? "desc" : "asc")) : "empid"
        }
      })
      //.then(json => console.log(json))
      // }
      .then(json =>
        json.data.content.map(result => ({
          empid: result.empid,
          empname: result.empname,
          skill: result.skill,
          salary: result.salary,
          grade: result.grade,
          city: result.city,
          country: result.country,
          doj: result.doj,
          DeptName: result.deptid.deptname,
          designation: result.designation,
          Dep_head: result.deptid
        }))
      )

      .then(newData =>
        this.setState({
          ...this.state,
          emp_data: newData,
          isLoading: false
        })
      )

      .catch(function (error) {
        console.log(error);
      });
  }
    , 500);

  render() {
    const { emp_data, isLoading, page, sort } = this.state;
    const content = (
      <div>
        <ReactTable
          data={emp_data}
          freezeWhenExpanded={true}
          pages={page}
          sorted={sort}
          filterable
          manual={true}
          loading={isLoading}
          onFetchData={this.fetchGridData}
          columns={[
            {
              Header: "ID",
              accessor: "empid",
              Filter: ({ filter, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, "ID")}
                  value={
                    this.state.filterState.ID ? this.state.filterState.ID : ""
                  }
                />
              )
            },
            {
              Header: "Name",
              accessor: "empname",
              Filter: ({ filter, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, "Name")}
                  value={
                    this.state.filterState.Name
                      ? this.state.filterState.Name
                      : ""
                  }
                />
              )
            },

            {
              Header: "Skill",
              accessor: "skill",
              Filter: ({ filter, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, "Skill")}
                  value={
                    this.state.filterState.Skill
                      ? this.state.filterState.Skill
                      : ""
                  }
                />
              )
            },
            {
              Header: "DOJ",
              accessor: "doj"
            },
            {
              Header: "Designation",
              accessor: "designation",
              minWidth: 110,
              Filter: ({ filter, onChange }) => (
                <select
                  onChange={this.handleChange(onChange, "Designation")}
                  value={this.getFilterValueFromState("Designation", "all")}
                  style={{ width: "100%" }}
                >
                  <option value="all">Show all</option>
                  <option value="protector of Asgard">
                    protector of Asgard
                  </option>
                  <option value="Sr.manager">Sr.manager</option>
                  <option value="developer">developer</option>
                </select>
              )
            },
            {
              Header: "DeptName",
              accessor: "DeptName",
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
            },
            {
              Header: "Grade",
              accessor: "grade",
              Filter: ({ filter, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, "Grade")}
                  value={
                    this.state.filterState.Grade
                      ? this.state.filterState.Grade
                      : ""
                  }
                />
              )
            },
            {
              Header: "Salary",
              accessor: "salary",
              Filter: ({ filter, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, "Salary")}
                  value={
                    this.state.filterState.Salary
                      ? this.state.filterState.Salary
                      : ""
                  }
                />
              )
            },
            {
              Header: "City",
              accessor: "city",
              Filter: ({ filter, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, "City")}
                  value={
                    this.state.filterState.City
                      ? this.state.filterState.City
                      : ""
                  }
                />
              )
            },
            {
              Header: "Country",
              accessor: "country",
              Filter: ({ filter, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, "Country")}
                  value={
                    this.state.filterState.Country
                      ? this.state.filterState.Country
                      : ""
                  }
                />
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          getTdProps={() => {
            return {
              style: {
                overflow: "visible"
              }
            };
          }}

          SubComponent={rows => {
            console.log(rows);
            const dep = rows.original.Dep_head.depthead;
            return (
              <div className="Posts">
                <header>
                  <ul>
                    <li>Dep ID : {rows.original.Dep_head.deptid}</li>
                    <li>Dep Name : {rows.original.Dep_head.deptname}</li>
                    <li>Dep Head : {dep.empname}</li>
                    <li>City : {dep.city}</li>
                    <li>Country : {dep.country}</li>
                    <li>Designation : {dep.designation}</li>
                    <li>DOJ : {dep.doj}</li>
                    <li>Grade : {dep.grade}</li>
                    <li>Salary : {dep.salary}</li>
                    <li>Skill : {dep.skill}</li>
                  </ul>
                </header>
              </div>
            );
          }
          }

        />
      </div>
    );

    return <div>{content}</div>;
  }
}

export default Employee;
