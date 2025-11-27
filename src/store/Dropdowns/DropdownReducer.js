// src/redux/reducers/departmentsReducer.js
import { produce } from "immer";
import { ADD_ATTENDANCE_TYPES, ADD_CATEGORIES, ADD_DEPARTMENTS, ADD_DESIGNATIONS, ADD_GRADES, ADD_ITEM_TYPES, ATTENDANCE_TYPES_LIST, CATEGORIES_LIST, DEPARTMENTS_LIST, DESIGNATIONS_LIST, GRADES_LIST, ITEM_TYPES_LIST } from "./DropdownType";

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

  categoriesData: [],
  categoriesDataLoading: false,
  categoriesDataError: false,

  attendanceTypesData: [],
  attendanceTypesDataLoading: false,
  attendanceTypesDataError: false,

  addDepartmentsData: [],
  addDepartmentsDataLoading: false,
  addDepartmentsDataError: false,

  addDesignationsData: [],
  addDesignationsDataLoading: false,
  addDesignationsDataError: false,

  addGradesData: [],
  addGradesDataLoading: false,
  addGradesDataError: false,

  addCategoriesData: [],
  addCategoriesDataLoading: false,
  addCategoriesDataError: false,

  addAttendanceTypesData: [],
  addAttendanceTypesDataLoading: false,
  addAttendanceTypesDataError: false,

  itemTypesData: [], 
  itemTypesDataLoading: false,
  itemTypesDataError: false, 

  addItemTypesData: [],           
  addItemTypesDataLoading: false, 
  addItemTypesDataError: false,

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
    
    // Attendance Types Cases
    case ATTENDANCE_TYPES_LIST.ATTENDANCE_TYPES_LIST_START:
      draft.attendanceTypesDataLoading = true;
      draft.attendanceTypesDataError = false;
      break;

    case ATTENDANCE_TYPES_LIST.ATTENDANCE_TYPES_LIST_SUCCESS:
      draft.attendanceTypesDataLoading = false;
      draft.attendanceTypesData = action.payload;
      draft.attendanceTypesDataError = false;
      break;

    case ATTENDANCE_TYPES_LIST.ATTENDANCE_TYPES_LIST_FAIL:
      draft.attendanceTypesDataLoading = false;
      draft.attendanceTypesData = [];
      draft.attendanceTypesDataError = action.payload;
      break;

      /** Add Departments */
    case ADD_DEPARTMENTS.ADD_DEPARTMENTS_START:
      draft.addDepartmentsDataLoading = true;
      draft.addDepartmentsDataError = false;
      break;

    case ADD_DEPARTMENTS.ADD_DEPARTMENTS_SUCCESS:
      draft.addDepartmentsDataLoading = false;
      draft.addDepartmentsDataError = false;
      draft.addDepartmentsData = action.payload;
      break;

    case ADD_DEPARTMENTS.ADD_DEPARTMENTS_FAIL:
      draft.addDepartmentsDataLoading = false;
      draft.addDepartmentsData = [];
      draft.addDepartmentsDataError = action.payload;
      break;

      /** Add Designations */
case ADD_DESIGNATIONS.ADD_DESIGNATIONS_START:
  draft.addDesignationsDataLoading = true;
  draft.addDesignationsDataError = false;
  break;

case ADD_DESIGNATIONS.ADD_DESIGNATIONS_SUCCESS:
  draft.addDesignationsDataLoading = false;
  draft.addDesignationsDataError = false;
  draft.addDesignationsData = action.payload;
  break;

case ADD_DESIGNATIONS.ADD_DESIGNATIONS_FAIL:
  draft.addDesignationsDataLoading = false;
  draft.addDesignationsData = [];
  draft.addDesignationsDataError = action.payload;
  break;


  /** Add Grades */
case ADD_GRADES.ADD_GRADES_START:
  draft.addGradesDataLoading = true;
  draft.addGradesDataError = false;
  break;

case ADD_GRADES.ADD_GRADES_SUCCESS:
  draft.addGradesDataLoading = false;
  draft.addGradesDataError = false;
  draft.addGradesData = action.payload;
  break;

case ADD_GRADES.ADD_GRADES_FAIL:
  draft.addGradesDataLoading = false;
  draft.addGradesData = [];
  draft.addGradesDataError = action.payload;
  break;


  /** Add Categories */
case ADD_CATEGORIES.ADD_CATEGORIES_START:
  draft.addCategoriesDataLoading = true;
  draft.addCategoriesDataError = false;
  break;

case ADD_CATEGORIES.ADD_CATEGORIES_SUCCESS:
  draft.addCategoriesDataLoading = false;
  draft.addCategoriesDataError = false;
  draft.addCategoriesData = action.payload;
  break;

case ADD_CATEGORIES.ADD_CATEGORIES_FAIL:
  draft.addCategoriesDataLoading = false;
  draft.addCategoriesData = [];
  draft.addCategoriesDataError = action.payload;
  break;


  /** Add Attendance Types */
case ADD_ATTENDANCE_TYPES.ADD_ATTENDANCE_TYPES_START:
  draft.addAttendanceTypesDataLoading = true;
  draft.addAttendanceTypesDataError = false;
  break;

case ADD_ATTENDANCE_TYPES.ADD_ATTENDANCE_TYPES_SUCCESS:
  draft.addAttendanceTypesDataLoading = false;
  draft.addAttendanceTypesDataError = false;
  draft.addAttendanceTypesData = action.payload;
  break;

case ADD_ATTENDANCE_TYPES.ADD_ATTENDANCE_TYPES_FAIL:
  draft.addAttendanceTypesDataLoading = false;
  draft.addAttendanceTypesData = [];
  draft.addAttendanceTypesDataError = action.payload;
  break;


  case ITEM_TYPES_LIST.ITEM_TYPES_LIST_START:
      draft.itemTypesDataLoading = true;
      draft.itemTypesDataError = false;
      break;
    case ITEM_TYPES_LIST.ITEM_TYPES_LIST_SUCCESS:
      draft.itemTypesDataLoading = false;
      draft.itemTypesData = action.payload;
      draft.itemTypesDataError = false;
      break;
    case ITEM_TYPES_LIST.ITEM_TYPES_LIST_FAIL:
      draft.itemTypesDataLoading = false;
      draft.itemTypesData = [];
      draft.itemTypesDataError = action.payload;
      break;


        /** ✅ Add Item Types */
    case ADD_ITEM_TYPES.ADD_ITEM_TYPES_START:
      draft.addItemTypesDataLoading = true;
      draft.addItemTypesDataError = false;
      break;
    case ADD_ITEM_TYPES.ADD_ITEM_TYPES_SUCCESS:
      draft.addItemTypesDataLoading = false;
      draft.addItemTypesData = action.payload;
      draft.addItemTypesDataError = false;
      break;
    case ADD_ITEM_TYPES.ADD_ITEM_TYPES_FAIL:
      draft.addItemTypesDataLoading = false;
      draft.addItemTypesData = [];
      draft.addItemTypesDataError = action.payload;
      break;


    default:
      return draft;
  }
}, initialState);
