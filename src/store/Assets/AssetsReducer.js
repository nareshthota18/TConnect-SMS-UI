// src/redux/reducers/assetsReducer.js
import { produce } from "immer";
import { ASSETS_LIST } from "./AssetsType";

const initialState = {
  assetsData: [],
  assetsDataLoading: false,
  assetsDataError: false,
};

export const assetsReducer = produce((draft, action) => {
  switch (action.type) {
    case ASSETS_LIST.ASSETS_LIST_START:
      draft.assetsDataLoading = true;
      draft.assetsDataError = false;
      break;

    case ASSETS_LIST.ASSETS_LIST_SUCCESS:
      draft.assetsDataLoading = false;
      draft.assetsData = action.payload;
      draft.assetsDataError = false;
      break;

    case ASSETS_LIST.ASSETS_LIST_FAIL:
      draft.assetsDataLoading = false;
      draft.assetsData = [];
      draft.assetsDataError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
