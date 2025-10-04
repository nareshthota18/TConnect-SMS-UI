// src/redux/reducers/assetsReducer.js
import { produce } from "immer";
import { ADD_ASSET, ASSETS_LIST, DELETE_ASSET } from "./AssetsType";

const initialState = {
  assetsData: [],
  assetsDataLoading: false,
  assetsDataError: false,

  addAssetData: [],
  addAssetLoading: false,
  addAssetError: false,

  deleteAssetData: [],
  deleteAssetLoading: false,
  deleteAssetError: false,
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

    // 👉 Add Asset
    case ADD_ASSET.ADD_ASSET_START:
      draft.addAssetLoading = true;
      draft.addAssetError = false;
      break;

    case ADD_ASSET.ADD_ASSET_SUCCESS:
      draft.addAssetLoading = false;
      draft.addAssetError = false;
      draft.addAssetData = action.payload;
      break;

    case ADD_ASSET.ADD_ASSET_FAIL:
      draft.addAssetLoading = false;
      draft.addAssetError = action.payload;
      break;

    // 👉 Delete Asset
    case DELETE_ASSET.DELETE_ASSET_START:
      draft.deleteAssetLoading = true;
      draft.deleteAssetError = false;
      break;

    case DELETE_ASSET.DELETE_ASSET_SUCCESS:
      draft.deleteAssetLoading = false;
      draft.deleteAssetError = false;
      draft.deleteAssetData = action.payload;
      draft.assetsData = draft.assetsData.filter(
        (asset) => asset.id !== action.payload.id
      );
      break;

    case DELETE_ASSET.DELETE_ASSET_FAIL:
      draft.deleteAssetLoading = false;
      draft.deleteAssetError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
