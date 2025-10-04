// src/redux/reducers/assetsReducer.js
import { produce } from "immer";
import { ADD_ASSET, ASSETS_LIST } from "./AssetsType";

const initialState = {
  assetsData: [],
  assetsDataLoading: false,
  assetsDataError: false,

  addAssetData: [],
  addAssetLoading: false,
  addAssetError: false,
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


      case ADD_ASSET.ADD_ASSET_START:
        draft.addAssetLoading = true;
        draft.addAssetError = false;
        break;
  
      case ADD_ASSET.ADD_ASSET_SUCCESS:
        draft.addAssetLoading = false;
        draft.addAssetError = false;
  
        // 👉 Store the added asset data separately
        draft.addAssetData = action.payload;
        break;
  
      case ADD_ASSET.ADD_ASSET_FAIL:
        draft.addAssetLoading = false;
        draft.addAssetError = action.payload;
        break;

    default:
      return draft;
  }
}, initialState);
