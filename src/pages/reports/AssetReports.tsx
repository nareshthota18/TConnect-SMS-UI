import React, { useState, useEffect } from "react";
import { Table, Tag, DatePicker, Button, Space, Select, Flex } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DownloadOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

interface Asset {
  id: number;
  name: string;
  category: string;
  assignedTo: string;
  dateAssigned: string;
  status: "Active" | "Inactive" | "Maintenance";
}

const { RangePicker } = DatePicker;
const { Option } = Select;

const AssetReports: React.FC = () => {
  const [data, setData] = useState<Asset[]>([]);
  const [filteredData, setFilteredData] = useState<Asset[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  useEffect(() => {
    const assetData: Asset[] = [
      { id: 1, name: "Laptop", category: "Electronics", assignedTo: "John Doe", dateAssigned: "2025-09-01", status: "Active" },
      { id: 2, name: "Projector", category: "Electronics", assignedTo: "Jane Smith", dateAssigned: "2025-09-03", status: "Maintenance" },
      { id: 3, name: "Chair", category: "Furniture", assignedTo: "Sam Wilson", dateAssigned: "2025-09-05", status: "Active" },
      { id: 4, name: "Table", category: "Furniture", assignedTo: "Alice Brown", dateAssigned: "2025-09-02", status: "Inactive" },
      { id: 5, name: "Whiteboard", category: "Furniture", assignedTo: "David Lee", dateAssigned: "2025-09-04", status: "Active" },
    ];
    setData(assetData);
    setFilteredData(assetData);
  }, []);

  const columns: ColumnsType<Asset> = [
    { title: "ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id },
    { title: "Asset Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Assigned To", dataIndex: "assignedTo", key: "assignedTo" },
    { title: "Date Assigned", dataIndex: "dateAssigned", key: "dateAssigned", sorter: (a, b) => new Date(a.dateAssigned).getTime() - new Date(b.dateAssigned).getTime() },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status", 
      render: (status: Asset["status"]) => {
        let color = "blue";
        if (status === "Active") color = "green";
        else if (status === "Inactive") color = "red";
        else if (status === "Maintenance") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      } 
    },
  ];

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setDateRange(dates);
    let filtered = [...data];

    if (dates && dates[0] && dates[1]) {
      const [start, end] = dates;
      filtered = filtered.filter((d) => {
        const current = new Date(d.dateAssigned);
        return current >= start.toDate() && current <= end.toDate();
      });
    }

    if (filterCategory !== "All") {
      filtered = filtered.filter((d) => d.category === filterCategory);
    }

    setFilteredData(filtered);
  };

  const handleCategoryChange = (value: string) => {
    setFilterCategory(value);
    let filtered = [...data];

    if (dateRange && dateRange[0] && dateRange[1]) {
      const [start, end] = dateRange;
      filtered = filtered.filter((d) => {
        const current = new Date(d.dateAssigned);
        return current >= start.toDate() && current <= end.toDate();
      });
    }

    if (value !== "All") {
      filtered = filtered.filter((d) => d.category === value);
    }

    setFilteredData(filtered);
  };

  const handleDownload = () => {
    const header = ["ID", "Asset Name", "Category", "Assigned To", "Date Assigned", "Status"];
    const rows = filteredData.map((d) => [d.id, d.name, d.category, d.assignedTo, d.dateAssigned, d.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "asset_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Flex justify="end">
        <Space style={{ marginBottom: 16 }}>
          <Select value={filterCategory} onChange={handleCategoryChange} style={{ width: 150 }}>
            <Option value="All">All Categories</Option>
            <Option value="Electronics">Electronics</Option>
            <Option value="Furniture">Furniture</Option>
          </Select>
          <RangePicker onChange={handleDateChange} />
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownload}>
            Download
          </Button>
        </Space>
      </Flex>

      <Table<Asset>
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

export default AssetReports;
