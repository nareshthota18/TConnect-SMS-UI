// src/redux/actions/assetsActions.js
import axios from "axios";
import { addAssetUrl, assetUrl, deleteAssetUrl } from "../utils";
import { ADD_ASSET, ASSETS_LIST, DELETE_ASSET } from "./AssetsType";

export const assetsStart = () => ({
  type: ASSETS_LIST.ASSETS_LIST_START,
});

export const assetsSuccess = (data) => ({
  type: ASSETS_LIST.ASSETS_LIST_SUCCESS,
  payload: data,
});

export const assetsFail = (payload) => ({
  type: ASSETS_LIST.ASSETS_LIST_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

export const fetchAssetsApi = () => async (dispatch) => {
  dispatch(assetsStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(assetUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(assetsSuccess(response.data));
    console.log(response.data, "assets response");
    return response.data;
  } catch (error) {
    dispatch(assetsFail(error.message));
  }
};



export const addAssetStart = () => ({
  type: ADD_ASSET.ADD_ASSET_START,
});

export const addAssetSuccess = (data) => ({
  type: ADD_ASSET.ADD_ASSET_SUCCESS,
  payload: data,
});

export const addAssetFail = (payload) => ({
  type: ADD_ASSET.ADD_ASSET_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

export const addAssetApi = (assetData) => async (dispatch) => {
  dispatch(addAssetStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(addAssetUrl, assetData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(addAssetSuccess(response.data));
    console.log("Add asset response:", response.data);
    return response.data;
  } catch (error) {
    dispatch(addAssetFail(error.message));
  }
};


// 👉 Delete Asset
export const deleteAssetStart = () => ({
  type: DELETE_ASSET.DELETE_ASSET_START,
});

export const deleteAssetSuccess = (data) => ({
  type: DELETE_ASSET.DELETE_ASSET_SUCCESS,
  payload: data,
});

export const deleteAssetFail = (payload) => ({
  type: DELETE_ASSET.DELETE_ASSET_FAIL,
  payload: typeof payload === "string" ? payload : payload.message || "An error occurred",
});

export const deleteAssetApi = (assetId) => async (dispatch) => {
  dispatch(deleteAssetStart());
  try {
    const token = localStorage.getItem("authToken");

    // ✅ Using the provided dynamic URL
    const response = await axios.delete(deleteAssetUrl(assetId), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch(deleteAssetSuccess({ id: assetId, ...response.data }));
    console.log("Delete asset response:", response.data);
    return response.data;
  } catch (error) {
    dispatch(deleteAssetFail(error.message));
  }
};
