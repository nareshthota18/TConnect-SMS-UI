import React, { useState, useEffect } from "react";
import { Table, Tag, Input, DatePicker, Button, Space, Flex } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs"; // <-- add this import


interface Attendance {
  id: number;
  name: string;
  date: string;
  status: "Present" | "Absent" | "Late";
}

const { RangePicker } = DatePicker;

const StudentReports = () => {
    const [data, setData] = useState<Attendance[]>([]);
    const [filteredData, setFilteredData] = useState<Attendance[]>([]);
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null); // <-- fix type
  

  useEffect(() => {
    const attendanceData: Attendance[] = [
      { id: 1, name: "John Doe", date: "2025-09-05", status: "Present" },
      { id: 2, name: "Jane Smith", date: "2025-09-05", status: "Absent" },
      { id: 3, name: "Sam Wilson", date: "2025-09-05", status: "Late" },
      { id: 4, name: "Alice Brown", date: "2025-09-05", status: "Present" },
      { id: 5, name: "David Lee", date: "2025-09-05", status: "Present" },
    ];
    setData(attendanceData);
    setFilteredData(attendanceData);
  }, []);

  const columns: ColumnsType<Attendance> = [
    {
      title: "Student ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const handleDateChange = (dates: any) => {
    setDateRange(dates);
    if (!dates || dates.length !== 2) {
      setFilteredData(data);
      return;
    }
    const [start, end] = dates;
    const filtered = data.filter((d) => {
      const current = new Date(d.date);
      return current >= start.toDate() && current <= end.toDate();
    });
    setFilteredData(filtered);
  };

  const handleDownload = () => {
    // Simple CSV download
    const header = ["ID", "Name", "Date", "Status"];
    const rows = filteredData.map((d) => [d.id, d.name, d.date, d.status]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "student_attendance_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
        <Flex justify="end">
      <Space style={{ marginBottom: 16 }}>
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
      />
    </div>
  );
};

export default StudentReports;
