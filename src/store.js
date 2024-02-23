import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import listingSlice from "./redux/slice";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  listing_model: listingSlice,
});
const persitedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persitedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
