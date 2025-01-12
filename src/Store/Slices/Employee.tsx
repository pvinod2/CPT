import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  market: [],
  role: [],
  resourceType: [],
  status: [],
  data: [],
  currentPage: "1",
  pageSize: "10",
  toggle: false,
};
const employeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {
    changeData(state, action) {
      state.data = action.payload;
    },
    changeMarket(state, action) {
      state.market = action.payload;
    },
    changeRole(state, action) {
      state.role = action.payload;
    },
    changeResourceType(state, action) {
      state.resourceType = action.payload;
    },
    changeStatus(state, action) {
      state.status = action.payload;
    },
    changeCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    changePageSize(state, action) {
      state.pageSize = action.payload;
    },
    changeToggle(state) {
      state.toggle = !state.toggle;
    },
  },
});

export const employeeActions = employeeSlice.actions;
export default employeeSlice.reducer;
