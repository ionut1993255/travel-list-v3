import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  travelItems: [],
};

const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    addTravelItems(state, action) {
      state.travelItems = [...state.travelItems, action.payload];
    },
    toggleTravelItem(state, action) {
      state.travelItems = state.travelItems.map((item) =>
        item.id === action.payload ? { ...item, packed: !item.packed } : item
      );
    },
    deleteTravelItem(state, action) {
      state.travelItems = state.travelItems.filter(
        (item) => item.id !== action.payload
      );
    },
    setLocalStorageTravelItems(state, action) {
      state.travelItems = action.payload;
    },
    clearTravelItemsList(state) {
      state.travelItems = [];
    },
  },
});

export const addTravelItems = (item) => (dispatch) => {
  dispatch({
    type: "travel/addTravelItems",
    payload: item,
  });
  toast.success("The travel item was successfully added !");
};

export const toggleTravelItem = (id) => (dispatch) => {
  dispatch({
    type: "travel/toggleTravelItem",
    payload: id,
  });
  toast.success("The travel item status was successfully changed !");
};

export const deleteTravelItem = (id) => (dispatch) => {
  const confirm = window.confirm(
    "Are you sure you want to delete this travel item?"
  );

  if (confirm) {
    dispatch({
      type: "travel/deleteTravelItem",
      payload: id,
    });
    toast.success("The travel item was successfully deleted !");
  }
};

export const clearTravelItemsList = () => (dispatch, getState) => {
  const travelItems = getState().travel.travelItems;

  if (!travelItems.length) return;

  const confirm = window.confirm(
    "Are you sure you want to delete all travel items?"
  );

  if (confirm) {
    dispatch({
      type: "travel/clearTravelItemsList",
    });
    toast.success("The travel packing list was successfully cleared !");
  }
};

export default travelSlice.reducer;

export const getTravelItems = (store) => store.travel.travelItems;
