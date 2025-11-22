import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAttendanceTypesApi } from "../../store/Dropdowns/DropdownActions";

const AttendanceTypesList = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface AttendanceType {
    key: string;
    value: string;
    description?: string;
  }

  interface AttendanceTypesState {
    attendanceTypesData: AttendanceType[];
    attendanceTypesDataLoading: boolean;
    attendanceTypesDataError: boolean;
  }

  const { attendanceTypesData, attendanceTypesDataLoading } = useSelector(
    (state: RootState) => state.departments as AttendanceTypesState
  );

  console.log("attendanceTypesData", attendanceTypesData)

  // Fetch Attendance Types API
  useEffect(() => {
    dispatch(fetchAttendanceTypesApi());
  }, [dispatch]);

  // Match response to table format
  const dataSource =
    attendanceTypesData?.map((item, index) => ({
      key: item.key || index,
      name: item.value,                     // API returns "value"
      description: item.description || "-", // handle missing description
    })) || [];

  // Table Columns
  const columns = [
    {
      title: "Attendance Type",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      bordered
      loading={{
        spinning: attendanceTypesDataLoading,
        indicator: <Spin indicator={<LoadingOutlined spin />} />,
      }}
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 10, hideOnSinglePage: true }}
    />
  );
};

export default AttendanceTypesList;
