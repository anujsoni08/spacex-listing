import * as actionTypes from "./actionTypes";
import { updateObject } from "./utility";

const initialState = {
  dataList: [],
  currentPageNumber: 1,
  totalPages: 1,
  currentPageData: [],
  searchText: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATALIST:
      return updateObject(state, { dataList: action.value });
    case actionTypes.SET_CURRENT_PAGE_NUMBER:
      return updateObject(state, {
        currentPageNumber: action.value,
      });
    case actionTypes.SET_TOTAL_PAGES:
      return updateObject(state, { totalPages: action.value });
    case actionTypes.SET_CURRENT_PAGE_DATA:
      return updateObject(state, {
        currentPageData: action.value,
      });
    case actionTypes.SET_SEARCH_TEXT:
      return updateObject(state, { searchText: action.value });
    case actionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
