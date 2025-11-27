import React, { useEffect } from "react";
import { Table, Tag, Input, Spin } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAttendanceStudentApi } from "../../store/Attendance/AttendanceActions";

interface Attendance {
  id: number;
  name: string;
  date: string;
  status: "Present" | "Absent" | "Late";
}

const StudentAttendance: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface AttendanceState {
    attendanceStudentData: Attendance[];
    attendanceStudentDataLoading: boolean;
    attendanceStudentDataError: boolean;
  }

  const {
    attendanceStudentData,
    attendanceStudentDataLoading,
    attendanceStudentDataError,
  } = useSelector(
    (state: RootState) => state.attendanceStudent as AttendanceState
  );

  useEffect(() => {
    dispatch(fetchAttendanceStudentApi());
  }, [dispatch]);

  // ⭐ Search for Student Name
  const getColumnSearchProps = (
    dataIndex: keyof Attendance
  ): ColumnType<Attendance> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input.Search
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          autoFocus
          onChange={(e) => {
            const value = e.target.value;
            setSelectedKeys(value ? [value] : []);
            confirm({ closeDropdown: false });
          }}
          onSearch={() => confirm()}
          style={{ display: "block" }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
  });

  // ⭐ Map API response into table format
  const mappedAttendance: Attendance[] =
  attendanceStudentData?.map((item: any) => ({
    id: item.id, // <-- FIXED (unique per record)
    name: item.studentName || "N/A",
    date: item.attendanceDate?.split("T")[0],
    status: item.status,
  })) || [];


  // ⭐ Table Columns (NO 7 DAYS FILTER)
  const columns: ColumnsType<Attendance> = [
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Present", value: "Present" },
        { text: "Absent", value: "Absent" },
        { text: "Late", value: "Late" },
      ],
      filterMultiple: true,
      onFilter: (value, record) => record.status === value,
      render: (status: Attendance["status"]) => {
        let color = "blue";
        if (status === "Present") color = "green";
        else if (status === "Absent") color = "red";
        else if (status === "Late") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  if (attendanceStudentDataLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (attendanceStudentDataError) {
    return <p style={{ color: "red" }}>Error: {attendanceStudentDataError}</p>;
  }

  return (
    <Table<Attendance>
      columns={columns}
      dataSource={mappedAttendance}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default StudentAttendance;
