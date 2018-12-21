import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import "./index.css";
import debounce from "lodash/debounce";
import Pagination from "./Pagination";

class Department extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dep_data: [],
      isLoading: false,
      filterState: {},
      pages: -1
    };
  }

  fetchGridData = debounce(async (state, instance) => {
    let search = null;

    const colTypeMapping = state.allDecoratedColumns.reduce(
      (accumulator, currentValue) => {
        return { ...accumulator, [currentValue.id]: currentValue.type };
      },
      {}
    );
    const filterKeys = Object.keys(this.state.filterState);
    if (filterKeys.length !== 0) {

      search = "( ";
      search += filterKeys
        .map(key => {
          let suffix = "";
          if (colTypeMapping[key] && colTypeMapping[key] === "text") {
            suffix = "*";
          }
          return this.state.filterState[key]
            ? key + ":" + this.state.filterState[key] + suffix
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

    this.setState({
      isLoading: true
    });

    const json = await axios.get(
      "https://genericspringrest.herokuapp.com/department",
      { params }
    );

    const newData = json.data.content.map(result => ({
      deptid: result.deptid,
      deptname: result.deptname,
      depthead: result.depthead ? result.depthead.name : ""
    }));

    this.setState({
      ...this.state,
      dep_data: newData,
      isLoading: false,
      pages: json.data.totalPages
    });
  }, 500);


  handleChange = (onChange, column) => {
    return event => {
      const identifier = column.id;
      if (
        event.target.value === undefined ||
        event.target.value === null ||
        event.target.value === ""
      ) {
        delete this.state.filterState[identifier];
        this.setState({
          ...this.state.filterState
        });
        onChange();
        return;
      } else {
        const filterState = {
          ...this.state.filterState,
          [identifier]: event.target.value
        };
        this.setState({
          filterState
        });
        console.log(filterState);
      }
      onChange();
    };
  };

  render() {
    const { dep_data, isLoading, pages } = this.state;
    return (
      <div>
        <ReactTable
          data={dep_data}
          filterable
          pages={pages}
          showPagination={true}
          showPaginationTop={true}
          showPaginationBottom={true}
          PaginationComponent={Pagination}
          manual
          minRows={0}
          loading={isLoading}
          onFetchData={this.fetchGridData}
          columns={[
            {
              Header: "Deptid",
              accessor: "deptid",
              type: "number",
              Filter: ({ column, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, column)}
                  value={
                    this.state.filterState.deptid
                      ? this.state.filterState.deptid
                      : ""
                  }
                />
              )
            },
            {
              Header: "Department",
              accessor: "deptname",
              type: "text",
              Filter: ({ column, onChange }) => (
                <input
                  type="text"
                  size="8"
                  onChange={this.handleChange(onChange, column)}
                  value={
                    this.state.filterState.deptname
                      ? this.state.filterState.deptname
                      : ""
                  }
                />
              )
            },
            {
              id: "depthead.name",
              Header: "DeptHead",
              accessor: "depthead",
              type: "text",
              Filter: ({ column, onChange }) => (
                <input
                  type="text"
                  value={
                    this.state.filterState["depthead.name"]
                      ? this.state.filterState["depthead.name"]
                      : ""
                  }
                  onChange={this.handleChange(onChange, column)}
                />
              )
            }
          ]}
          defaultSorted={[
            {
              id: "deptid",
              desc: true
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
export default Department;