// src/redux/reducers/departmentsReducer.js
import { produce } from "immer";
import { CATEGORIES_LIST, DEPARTMENTS_LIST, DESIGNATIONS_LIST, GRADES_LIST } from "./DropdownType";

const initialState = {
  departmentsData: [],
  departmentsDataLoading: false,
  departmentsDataError: false,

  designationsData: [],
  designationsDataLoading: false,
  designationsDataError: false,

  gradesData: [],
  gradesDataLoading: false,
  gradesDataError: false,

  // ✅ Added Categories
  categoriesData: [],
  categoriesDataLoading: false,
  categoriesDataError: false,
};

export const departmentsReducer = produce((draft, action) => {
  switch (action.type) {
    case DEPARTMENTS_LIST.DEPARTMENTS_LIST_START:
      draft.departmentsDataLoading = true;
      draft.departmentsDataError = false;
      break;

    case DEPARTMENTS_LIST.DEPARTMENTS_LIST_SUCCESS:
      draft.departmentsDataLoading = false;
      draft.departmentsData = action.payload;
      draft.departmentsDataError = false;
      break;

    case DEPARTMENTS_LIST.DEPARTMENTS_LIST_FAIL:
      draft.departmentsDataLoading = false;
      draft.departmentsData = [];
      draft.departmentsDataError = action.payload;
      break;

    // Designations Cases
    case DESIGNATIONS_LIST.DESIGNATIONS_LIST_START:
      draft.designationsDataLoading = true;
      draft.designationsDataError = false;
      break;

    case DESIGNATIONS_LIST.DESIGNATIONS_LIST_SUCCESS:
      draft.designationsDataLoading = false;
      draft.designationsData = action.payload;
      draft.designationsDataError = false;
      break;

    case DESIGNATIONS_LIST.DESIGNATIONS_LIST_FAIL:
      draft.designationsDataLoading = false;
      draft.designationsData = [];
      draft.designationsDataError = action.payload;
      break;

    // Grades Cases
    case GRADES_LIST.GRADES_LIST_START:
      draft.gradesDataLoading = true;
      draft.gradesDataError = false;
      break;

    case GRADES_LIST.GRADES_LIST_SUCCESS:
      draft.gradesDataLoading = false;
      draft.gradesData = action.payload;
      draft.gradesDataError = false;
      break;

    case GRADES_LIST.GRADES_LIST_FAIL:
      draft.gradesDataLoading = false;
      draft.gradesData = [];
      draft.gradesDataError = action.payload;
      break;

    // ✅ Categories Cases
    case CATEGORIES_LIST.CATEGORIES_LIST_START:
      draft.categoriesDataLoading = true;
      draft.categoriesDataError = false;
      break;

    case CATEGORIES_LIST.CATEGORIES_LIST_SUCCESS:
      draft.categoriesDataLoading = false;
      draft.categoriesData = action.payload;
      draft.categoriesDataError = false;
      break;

    case CATEGORIES_LIST.CATEGORIES_LIST_FAIL:
      draft.categoriesDataLoading = false;
      draft.categoriesData = [];
      draft.categoriesDataError = action.payload;
      break;

    default:
      return draft;
  }
}, initialState);
