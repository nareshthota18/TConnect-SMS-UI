// src/redux/reducers/supplierReducer.js
import { produce } from "immer";
import { ADD_SUPPLIER, SUPPLIER_LIST } from "./SuppliersType";

const initialState = {
  supplierData: [],
  supplierDataLoading: false,
  supplierDataError: false,

  addSupplierData: [],
  addSupplierLoading: false,
  addSupplierError: false,
};

export const supplierReducer = produce((draft, action) => {
  switch (action.type) {
    case SUPPLIER_LIST.SUPPLIER_LIST_START:
      draft.supplierDataLoading = true;
      draft.supplierDataError = false;
      break;

    case SUPPLIER_LIST.SUPPLIER_LIST_SUCCESS:
      draft.supplierDataLoading = false;
      draft.supplierData = action.payload;
      draft.supplierDataError = false;
      break;

    case SUPPLIER_LIST.SUPPLIER_LIST_FAIL:
      draft.supplierDataLoading = false;
      draft.supplierData = [];
      draft.supplierDataError = action.payload;
      break;

    
    // 🔹 Add Supplier Cases
    case ADD_SUPPLIER.ADD_SUPPLIER_START:
      draft.addSupplierLoading = true;
      draft.addSupplierError = false;
      break;

    case ADD_SUPPLIER.ADD_SUPPLIER_SUCCESS:
      draft.addSupplierLoading = false;
      draft.addSupplierData = action.payload;
      draft.addSupplierError = false;
      break;

    case ADD_SUPPLIER.ADD_SUPPLIER_FAIL:
      draft.addSupplierLoading = false;
      draft.addSupplierData = null;
      draft.addSupplierError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
