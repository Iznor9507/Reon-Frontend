// import { applyMiddleware } from "redux";
import todosReducer from "../features/todoSlice.js";
// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension.js";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore(
  {
    reducer: todosReducer,
  },
  // composeWithDevTools(applyMiddleware())
);
