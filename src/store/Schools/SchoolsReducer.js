// src/redux/reducers/schoolsReducer.js
import { produce } from "immer";
import { ADD_SCHOOLS, SCHOOLS_LIST } from "./SchoolsType";

const initialState = {
  schoolsData: [],                
  schoolsDataLoading: false,
  schoolsDataError: false,

  addSchoolData: [],             
  addSchoolDataLoading: false,
  addSchoolDataError: false,
};

export const schoolsReducer = produce((draft, action) => {
  switch (action.type) {
    /**  Schools List */
    case SCHOOLS_LIST.SCHOOLS_LIST_START:
      draft.schoolsDataLoading = true;
      draft.schoolsDataError = false;
      break;

    case SCHOOLS_LIST.SCHOOLS_LIST_SUCCESS:
      draft.schoolsDataLoading = false;
      draft.schoolsData = action.payload;
      draft.schoolsDataError = false;
      break;

    case SCHOOLS_LIST.SCHOOLS_LIST_FAIL:
      draft.schoolsDataLoading = false;
      draft.schoolsData = [];
      draft.schoolsDataError = action.payload;
      break;

    /**  ✅ Add Schools */
    case ADD_SCHOOLS.ADD_SCHOOLS_START:
      draft.addSchoolDataLoading = true;
      draft.addSchoolDataError = false;
      break;

    case ADD_SCHOOLS.ADD_SCHOOLS_SUCCESS:
      draft.addSchoolDataLoading = false;
      draft.addSchoolDataError = false;
      draft.addSchoolData = action.payload; // store response
      break;

    case ADD_SCHOOLS.ADD_SCHOOLS_FAIL:
      draft.addSchoolDataLoading = false;
      draft.addSchoolData = [];
      draft.addSchoolDataError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
