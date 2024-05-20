import { configureStore } from "@reduxjs/toolkit";

import travelReducer from "./features/travel/travelSlice";

const store = configureStore({
  reducer: {
    travel: travelReducer,
  },
});

export default store;
