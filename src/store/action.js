import * as actionTypes from "./actionTypes";

export const setDataList = (value) => {
  return {
    type: actionTypes.SET_DATALIST,
    value: value,
  };
};

export const setCurrentPageNumber = (value) => {
  return {
    type: actionTypes.SET_CURRENT_PAGE_NUMBER,
    value,
  };
};

export const setTotalPages = (value) => {
  return {
    type: actionTypes.SET_TOTAL_PAGES,
    value: value,
  };
};

export const setCurrentPageData = (value) => {
  return {
    type: actionTypes.SET_CURRENT_PAGE_DATA,
    value,
  };
};

export const setSearchText = (value) => {
  return {
    type: actionTypes.SET_SEARCH_TEXT,
    value: value,
  };
};

export const resetState = () => {
  return {
    type: actionTypes.RESET_STATE,
  };
};
