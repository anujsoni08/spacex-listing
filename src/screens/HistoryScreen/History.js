import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ITEMS_PER_PAGE } from "../../utils/constants";
import { handleHistoryListing } from "../../utils/public.api.helper";
import * as actions from "../../store/action";

const History = (props) => {
  const {
    dataList,
    setDataList,
    currentPageNumber,
    setCurrentPageNumber,
    totalPages,
    setTotalPages,
    currentPageData,
    setCurrentPageData,
    searchText,
    setSearchText,
    resetState,
  } = props;

  const [localSearchText, setLocalSearchText] = useState(searchText); // HistoryList Initial set empty
  const [loadingState, setLoadingState] = useState(false); // HistoryList Initial set empty

  useEffect(() => {
    async function getHistoryListing() {
      setLoadingState(true);
      const res = await handleHistoryListing();
      setDataList(res);
      setTotalPages(Math.ceil(res.length / ITEMS_PER_PAGE));
      setCurrentPageData(res.slice(0, ITEMS_PER_PAGE));
      setLoadingState(false);
    }
    getHistoryListing();
    return () => {
      resetState();
    };
  }, [resetState, setCurrentPageData, setDataList, setTotalPages]);

  const getSelectedPageData = (pageNumber = currentPageNumber) => {
    onSearch(pageNumber);
  };

  const onSearch = (pageNumber = 1) => {
    setCurrentPageNumber(pageNumber);
    setSearchText(localSearchText);
    let filteredData;
    if (localSearchText.length) {
      filteredData = dataList.filter(
        (data) =>
          (data.title + "" + data.details + "")
            .toLowerCase()
            .indexOf(localSearchText.toLowerCase()) > -1
      );
    } else {
      filteredData = dataList;
    }
    const currentPageDataFiltered = filteredData.slice(
      (pageNumber - 1) * ITEMS_PER_PAGE,
      pageNumber * ITEMS_PER_PAGE
    );
    setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
    setCurrentPageData(currentPageDataFiltered);
  };

  const handleLocalSearchText = (event) => {
    setLocalSearchText(event.target.value);
  };

  const isEqual = (first, second) => {
    return Number(first) === Number(second);
  };

  const getNextRoute = () => {
    return window.location.href.includes("payloads") ? "history" : "payloads";
  };

  const renderPagination = () => {
    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className={
                "page-item " + (isEqual(currentPageNumber, 1) ? "disabled" : "")
              }
            >
              <button
                className={"page-link"}
                disabled={isEqual(currentPageNumber, 1)}
                style={{
                  cursor: isEqual(currentPageNumber, 1)
                    ? "not-allowed"
                    : "pointer",
                }}
                onClick={() => getSelectedPageData(currentPageNumber - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <li
                  className={
                    "page-item " +
                    (isEqual(currentPageNumber, pageNumber) ? "disabled" : "")
                  }
                  key={pageNumber}
                >
                  <button
                    className="page-link"
                    disabled={isEqual(currentPageNumber, pageNumber)}
                    style={{
                      cursor: isEqual(currentPageNumber, pageNumber)
                        ? "not-allowed"
                        : "pointer",
                    }}
                    onClick={() => getSelectedPageData(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </li>
              )
            )}
            <li
              className={
                "page-item " +
                (isEqual(currentPageNumber, totalPages) ? "disabled" : "")
              }
            >
              <button
                className="page-link"
                disabled={isEqual(currentPageNumber, totalPages)}
                style={{
                  cursor: isEqual(currentPageNumber, totalPages)
                    ? "not-allowed"
                    : "pointer",
                }}
                onClick={() => getSelectedPageData(currentPageNumber - 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  const renderTable = () => {
    if (Boolean(dataList.length)) {
      return (
        <div>
          <table className="table table-bordered w-auto">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Flight No.</th>
                <th>Details</th>
                <th>Event Date</th>
                <th>Article Link</th>
                <th>Wikipedia Link</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((data) => (
                <tr key={data.id}>
                  <th>{data.id}</th>
                  <td>{data.title}</td>
                  <td>{data.flight_number}</td>
                  <td>{data.details}</td>
                  <td>{data.event_date_unix}</td>
                  <td>
                    <a
                      href={data.links.article}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {Boolean(data.links.article) ? "Click here" : ""}
                    </a>
                  </td>
                  <td>
                    <a
                      href={data.links.wikipedia}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {Boolean(data.links.wikipedia) ? "Click here" : ""}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  };

  const renderSearchBar = () => {
    return (
      <div className="d-flex justify-content-between">
        <p>History Listing</p>
        <div className="form-inline">
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="search" className="sr-only">
              Enter text to search
            </label>
            <input
              type="text"
              className="form-control"
              id="search"
              value={localSearchText}
              onChange={handleLocalSearchText}
              placeholder="Enter text to search"
            />
          </div>
          <button
            type="button"
            onClick={() => onSearch()}
            className="btn btn-primary mb-2"
          >
            Search
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      {!loadingState ? (
        <>
          <div>
            <Link to={`/${getNextRoute()}`}>Go to {getNextRoute()}</Link>
          </div>
          {renderSearchBar()}
          {renderTable()}
          {renderPagination()}
        </>
      ) : (
        <h1>...Loading</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataList: state.dataList,
    currentPageNumber: state.currentPageNumber,
    totalPages: state.totalPages,
    currentPageData: state.currentPageData,
    searchText: state.searchText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataList: (value) => dispatch(actions.setDataList(value)),
    setCurrentPageNumber: (value) =>
      dispatch(actions.setCurrentPageNumber(value)),
    setTotalPages: (value) => dispatch(actions.setTotalPages(value)),
    setCurrentPageData: (value) => dispatch(actions.setCurrentPageData(value)),
    setSearchText: (value) => dispatch(actions.setSearchText(value)),
    resetState: () => dispatch(actions.resetState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);