// src/redux/actions/assetsActions.js
import axios from "axios";
import { assetUrl } from "../utils";
import { ASSETS_LIST } from "./AssetsType";

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
