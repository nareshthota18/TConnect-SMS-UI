// src/redux/reducers/holidayReducer.js
import { produce } from "immer";
import { ADD_HOLIDAY, DELETE_HOLIDAY, HOLIDAY_LIST } from "./HolidaysType";

const initialState = {
  holidayData: [],
  holidayDataLoading: false,
  holidayDataError: false,

  addHolidayData: [],
  addHolidayLoading: false,
  addHolidayError: false,

  deleteHolidayData: [],
  deleteHolidayLoading: false,
  deleteHolidayError: false,
};

export const holidayReducer = produce((draft, action) => {
  switch (action.type) {
    
    // 🔹 GET Holidays
    case HOLIDAY_LIST.HOLIDAY_LIST_START:
      draft.holidayDataLoading = true;
      draft.holidayDataError = false;
      break;

    case HOLIDAY_LIST.HOLIDAY_LIST_SUCCESS:
      draft.holidayDataLoading = false;
      draft.holidayData = action.payload;
      draft.holidayDataError = false;
      break;

    case HOLIDAY_LIST.HOLIDAY_LIST_FAIL:
      draft.holidayDataLoading = false;
      draft.holidayData = [];
      draft.holidayDataError = action.payload;
      break;


    // 🔹 ADD Holiday
    case ADD_HOLIDAY.ADD_HOLIDAY_START:
      draft.addHolidayLoading = true;
      draft.addHolidayError = false;
      break;

    case ADD_HOLIDAY.ADD_HOLIDAY_SUCCESS:
      draft.addHolidayLoading = false;
      draft.addHolidayData = action.payload;
      draft.addHolidayError = false;
      break;

    case ADD_HOLIDAY.ADD_HOLIDAY_FAIL:
      draft.addHolidayLoading = false;
      draft.addHolidayData = null;
      draft.addHolidayError = action.payload;
      break;


    // 🔹 DELETE Holiday
    case DELETE_HOLIDAY.DELETE_HOLIDAY_START:
      draft.deleteHolidayLoading = true;
      draft.deleteHolidayError = false;
      break;

    case DELETE_HOLIDAY.DELETE_HOLIDAY_SUCCESS:
      draft.deleteHolidayLoading = false;
      draft.deleteHolidayData = action.payload;
      draft.deleteHolidayError = false;
      break;

    case DELETE_HOLIDAY.DELETE_HOLIDAY_FAIL:
      draft.deleteHolidayLoading = false;
      draft.deleteHolidayData = null;
      draft.deleteHolidayError = action.payload;
      break;


    default:
      return draft;
  }
}, initialState);
