import React, { useState, useEffect } from "react";
import { Table, Tag, Input, DatePicker, Button, Space, Flex } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

interface StaffAttendance {
  id: number;
  name: string;
  department: string;
  date: string;
  status: "Present" | "Absent" | "Late";
}

const { RangePicker } = DatePicker;

const StaffReports: React.FC = () => {
  const [data, setData] = useState<StaffAttendance[]>([]);
  const [filteredData, setFilteredData] = useState<StaffAttendance[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  useEffect(() => {
    const attendanceData: StaffAttendance[] = [
      { id: 1, name: "Robert Brown", department: "Admin", date: "2025-09-05", status: "Present" },
      { id: 2, name: "Emily Johnson", department: "Finance", date: "2025-09-05", status: "Absent" },
      { id: 3, name: "Michael Smith", department: "HR", date: "2025-09-05", status: "Late" },
      { id: 4, name: "Sarah Davis", department: "Teaching", date: "2025-09-05", status: "Present" },
      { id: 5, name: "Daniel Wilson", department: "Support", date: "2025-09-05", status: "Present" },
    ];
    setData(attendanceData);
    setFilteredData(attendanceData);
  }, []);

  // Staff Name search in table header
  const getColumnSearchProps = (dataIndex: keyof StaffAttendance): ColumnType<StaffAttendance> => ({
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

  const columns: ColumnsType<StaffAttendance> = [
    { title: "Staff ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id },
    { title: "Staff Name", dataIndex: "name", key: "name", ...getColumnSearchProps("name") },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Date", dataIndex: "date", key: "date" },
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
      render: (status: StaffAttendance["status"]) => {
        let color = status === "Present" ? "green" : status === "Absent" ? "red" : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
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
    const header = ["ID", "Name", "Department", "Date", "Status"];
    const rows = filteredData.map((d) => [d.id, d.name, d.department, d.date, d.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "staff_attendance_report.csv");
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
      <Table<StaffAttendance>
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default StaffReports;
