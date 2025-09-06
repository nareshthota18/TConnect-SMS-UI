import React, { useState, useEffect } from "react";
import { Table, Tag, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

interface Attendance {
  id: number;
  name: string;
  date: string;
  status: "Present" | "Absent" | "Late";
}

const StudentAttendance: React.FC = () => {
  const [data, setData] = useState<Attendance[]>([]);

  useEffect(() => {
    const attendanceData: Attendance[] = [
      { id: 1, name: "John Doe", date: "2025-09-05", status: "Present" },
      { id: 2, name: "Jane Smith", date: "2025-09-05", status: "Absent" },
      { id: 3, name: "Sam Wilson", date: "2025-09-05", status: "Late" },
      { id: 4, name: "Alice Brown", date: "2025-09-05", status: "Present" },
      { id: 5, name: "David Lee", date: "2025-09-05", status: "Present" },
    ];
    setData(attendanceData);
  }, []);

  // Search for Student Name
  const getColumnSearchProps = (dataIndex: keyof Attendance): ColumnType<Attendance> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input.Search
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          autoFocus
          onChange={(e) => {
            const value = e.target.value;
            setSelectedKeys(value ? [value] : []);
            confirm({ closeDropdown: false }); // live filtering
          }}
          onSearch={() => confirm()} // Press Enter triggers search
          style={{display: "block" }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase()),
  });

  const columns: ColumnsType<Attendance> = [
    {
      title: "Student ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
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
      filterMultiple: true, // allow multiple selections
      filterMode: "menu", // standard menu mode
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

  return (
    <Table<Attendance>
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
    />
  );
};

export default StudentAttendance;
