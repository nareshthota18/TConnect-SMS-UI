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
      { id: 2, name: "Jane Smith", date: "2025-09-04", status: "Absent" },
      { id: 3, name: "Sam Wilson", date: "2025-09-03", status: "Late" },
      { id: 4, name: "Alice Brown", date: "2025-08-30", status: "Present" },
      { id: 5, name: "David Lee", date: "2025-09-01", status: "Present" },
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
      record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase()),
  });

  // Generate last 7 days filters
  const getLast7DaysFilters = () => {
    const filters = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
      filters.push({ text: formattedDate, value: formattedDate });
    }
    return filters;
  };

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
      filters: getLast7DaysFilters(),
      onFilter: (value, record) => record.date === value,
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
