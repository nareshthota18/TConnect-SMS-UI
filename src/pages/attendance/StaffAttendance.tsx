import React, { useEffect } from "react";
import { Table, Tag, Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAttendanceStaffApi } from "../../store/Attendance/AttendanceActions";

interface StaffAttendanceType {
  id: number;
  name: string;
  department: string;
  date: string;
  status: "Present" | "Absent" | "Late";
}

interface ApiAttendanceResponse {
  staffAttendanceId: string;
  staffId: string;
  staffName: string;
  attendanceDate: string;
  status: string;
  remarks: string;
}


const StaffAttendance: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux state type
  interface AttendanceStaffState {
    attendanceStaffData: ApiAttendanceResponse[];
    attendanceStaffDataLoading: boolean;
    attendanceStaffDataError: boolean;
  }

  const {
    attendanceStaffData,
    attendanceStaffDataLoading,
    attendanceStaffDataError,
  } = useSelector(
    (state: RootState) => state.attendanceStudent as AttendanceStaffState
  );

  // Fetch staff attendance data on mount
  useEffect(() => {
    dispatch(fetchAttendanceStaffApi());
  }, [dispatch]);

  // Search for staff
  const getColumnSearchProps = (
    dataIndex: keyof StaffAttendanceType
  ): ColumnType<StaffAttendanceType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input.Search
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          autoFocus
          onChange={(e) => {
            const value = e.target.value;
            setSelectedKeys(value ? [value] : []);
            confirm({ closeDropdown: false }); // live search
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
      record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase()),
  });

  const mappedAttendance: StaffAttendanceType[] = attendanceStaffData
  ? attendanceStaffData.map((item, index) => ({
      id: index + 1,
      name: item.staffName,
      department: "N/A",
      date: item.attendanceDate?.split("T")[0],
      status: item.status as "Present" | "Absent" | "Late",
    }))
  : [];


  
  const columns: ColumnsType<StaffAttendanceType> = [
    {
      title: "Staff Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "Finance", value: "Finance" },
        { text: "HR", value: "HR" },
        { text: "Teaching", value: "Teaching" },
        { text: "Support", value: "Support" },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
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
      onFilter: (value, record) => record.status === value,
      render: (status: StaffAttendanceType["status"]) => {
        let color = "blue";
        if (status === "Present") color = "green";
        else if (status === "Absent") color = "red";
        else if (status === "Late") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  if (attendanceStaffDataLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (attendanceStaffDataError) {
    return <p style={{ color: "red" }}>Error: {attendanceStaffDataError}</p>;
  }

  return (
    <Table<StaffAttendanceType>
      columns={columns}
      dataSource={mappedAttendance || []}
      rowKey="id"
      pagination={mappedAttendance.length > 10 ? { pageSize: 10 } : false}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default StaffAttendance;
