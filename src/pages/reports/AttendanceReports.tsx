import React, { useState, useEffect } from "react";
import { Table, Input, DatePicker, Button, Space, Select, Flex, Tag } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface Attendance {
  id: number;
  name: string;
  type: "Student" | "Staff";
  date: string;
  status: "Present" | "Absent" | "Late";
}

const AttendanceReports: React.FC = () => {
  const [data, setData] = useState<Attendance[]>([]);
  const [filteredData, setFilteredData] = useState<Attendance[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [typeFilter, setTypeFilter] = useState<"Student" | "Staff" | "All">("All");

  // Mock attendance data
  useEffect(() => {
    const attendanceData: Attendance[] = [
      { id: 1, name: "John Doe", type: "Student", date: "2025-09-01", status: "Present" },
      { id: 2, name: "Jane Smith", type: "Student", date: "2025-09-02", status: "Absent" },
      { id: 3, name: "Robert Brown", type: "Staff", date: "2025-09-03", status: "Late" },
      { id: 4, name: "Alice Davis", type: "Staff", date: "2025-09-04", status: "Present" },
      { id: 5, name: "Michael Lee", type: "Student", date: "2025-09-05", status: "Present" },
    ];
    setData(attendanceData);
    setFilteredData(attendanceData);
  }, []);

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
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase()),
  });

  const columns: ColumnsType<Attendance> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name", ...getColumnSearchProps("name") },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Attendance["status"]) => {
        let color = "blue";
        if (status === "Present") color = "green";
        else if (status === "Absent") color = "red";
        else if (status === "Late") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const handleDateChange = (dates: any) => {
    setDateRange(dates);
    applyFilters(dates, typeFilter);
  };

  const handleTypeChange = (value: "Student" | "Staff" | "All") => {
    setTypeFilter(value);
    applyFilters(dateRange, value);
  };

  const applyFilters = (dates: [Dayjs | null, Dayjs | null] | null, type: "Student" | "Staff" | "All") => {
    let filtered = [...data];
  
    if (dates && dates[0] && dates[1]) {
      const [start, end] = dates;
      filtered = filtered.filter((d) => {
        const current = new Date(d.date);
        return current >= start.toDate() && current <= end.toDate();
      });
    }
  
    if (type !== "All") {
      filtered = filtered.filter((d) => d.type === type);
    }
  
    setFilteredData(filtered);
  };
  

  const handleDownload = () => {
    const header = ["ID", "Name", "Type", "Date", "Status"];
    const rows = filteredData.map((d) => [d.id, d.name, d.type, d.date, d.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Flex justify="end">
        <Space style={{ marginBottom: 16 }}>
          <Select value={typeFilter} onChange={handleTypeChange} style={{ width: 120 }}>
            <Option value="All">All</Option>
            <Option value="Student">Student</Option>
            <Option value="Staff">Staff</Option>
          </Select>
          <RangePicker onChange={handleDateChange} />
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownload}>
            Download
          </Button>
        </Space>
      </Flex>

      <Table<Attendance>
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default AttendanceReports;
