import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import "./index.css";
import debounce from "lodash/debounce";
import Pagination from "./Pagination";
import { connect } from "react-redux";
import * as actionTypes from './store/actions';

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

    this.props.onLoadChange();

    const json = await axios.get(
      "https://genericspringrest.herokuapp.com/department",
      { params }
    );

    const newData = json.data.content.map(result => ({
      deptid: result.deptid,
      deptname: result.deptname,
      depthead: result.depthead ? result.depthead.name : ""
    }));

    this.props.onFetchingData(newData, json.data.totalPages);
  }, 500);


  handleChange = (onChange, column) => {
    return event => {
      if (
        event.target.value === undefined ||
        event.target.value === null ||
        event.target.value === ""
      ) {
        this.props.onDeleteFilter(column);
        onChange();
        return;
      } else {
        this.props.onHandleFilter(event, column);
      }
      onChange();
    };
  };

  render() {
    const dep_data = this.props.data;
    const isLoading = this.props.loading;
    const pages = this.props.pages;
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
                    this.props.filterState.deptid
                      ? this.props.filterState.deptid
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
                    this.props.filterState.deptname
                      ? this.props.filterState.deptname
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
                    this.props.filterState["depthead.name"]
                      ? this.props.filterState["depthead.name"]
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
const mapStateToProps = state => {
  return {
    data: state.depSearch.dep_data,
    loading: state.depSearch.isLoading,
    filterState: state.depSearch.filterState,
    pages: state.depSearch.pages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHandleFilter: (event, column) => dispatch({
      type: actionTypes.HANDLE_FILTERS,
      payload: { identifier: column.id, value: event.target.value }
    }),
    onDeleteFilter: (column) => dispatch({
      type: actionTypes.DELETE_FILTER,
      payload: { identifier: column.id }
    }),
    onFetchingData: (newData, pages) => dispatch({
      type: actionTypes.FETCH_DATA,
      payload: { newData: newData, isLoading: false, pages: pages }
    }),
    onLoadChange: () => dispatch({
      type: actionTypes.LOAD_CHANGE
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Department);

