import React, { useState, useEffect } from "react";
import { Table, Tag, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";

interface StaffAttendanceType {
  id: number;
  name: string;
  department: string;
  date: string;
  status: "Present" | "Absent" | "Late";
}

const StaffAttendance: React.FC = () => {
  const [data, setData] = useState<StaffAttendanceType[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const attendanceData: StaffAttendanceType[] = [
      { id: 1, name: "Robert Brown", department: "Admin", date: "2025-09-05", status: "Present" },
      { id: 2, name: "Emily Johnson", department: "Finance", date: "2025-09-05", status: "Absent" },
      { id: 3, name: "Michael Smith", department: "HR", date: "2025-09-05", status: "Late" },
      { id: 4, name: "Sarah Davis", department: "Teaching", date: "2025-09-05", status: "Present" },
      { id: 5, name: "Daniel Wilson", department: "Support", date: "2025-09-05", status: "Present" },
    ];
    setData(attendanceData);
  }, []);

  const getColumnSearchProps = (dataIndex: keyof StaffAttendanceType): ColumnType<StaffAttendanceType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input.Search
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => {
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

  const columns: ColumnsType<StaffAttendanceType> = [
    {
      title: "Staff ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
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

  return (
    <Table<StaffAttendanceType>
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default StaffAttendance;
