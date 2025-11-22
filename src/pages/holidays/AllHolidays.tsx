import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchHolidayApi } from "../../store/Holidays/HolidaysActions";

interface HolidayItem {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  description: string;
}

interface HolidaysState {
  holidayData: HolidayItem[];
  holidayDataLoading: boolean;
  holidayDataError: boolean;
}

const AllHolidays = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { holidayData, holidayDataLoading } = useSelector(
    (state: RootState) => state.holidays as HolidaysState
  );

  const schoolId = localStorage.getItem("schoolId");

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchHolidayApi(schoolId));
    }
  }, [dispatch, schoolId]);

  // Mapping response → table format
  const mappedHolidays = holidayData?.map((item) => ({
    id: item.id,
    holidayName: item.name,
    holidayDate: `${new Date(item.startDate).toLocaleDateString()} - ${new Date(
      item.endDate
    ).toLocaleDateString()}`,
    numberOfDays: item.numberOfDays,
    description: item.description,
  }));

  // Table columns
  const columns = [
    {
      title: "Holiday Name",
      dataIndex: "holidayName",
      key: "holidayName",
    },
    {
      title: "Date Range",
      dataIndex: "holidayDate",
      key: "holidayDate",
    },
    {
      title: "Number Of Days",
      dataIndex: "numberOfDays",
      key: "numberOfDays",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div>
      <Spin
        spinning={holidayDataLoading}
        indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      >
        <Table
          columns={columns}
          dataSource={mappedHolidays}
          bordered
          rowKey="id"
          pagination={
            mappedHolidays.length > 10
              ? { pageSize: 10 }
              : false
          }
        />
      </Spin>
    </div>
  );
};

export default AllHolidays;
