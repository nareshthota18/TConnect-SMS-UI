import React, { useState, useEffect } from "react";
import { Table, Input, DatePicker, Button, Space, Select, Flex } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

interface GroceryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  date: string;
}

const { RangePicker } = DatePicker;
const { Option } = Select;

const GroceryReports: React.FC = () => {
  const [data, setData] = useState<GroceryItem[]>([]);
  const [filteredData, setFilteredData] = useState<GroceryItem[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  useEffect(() => {
    const groceryData: GroceryItem[] = [
      { id: 1, name: "Apples", category: "Fruits", quantity: 50, date: "2025-09-01" },
      { id: 2, name: "Bananas", category: "Fruits", quantity: 30, date: "2025-09-03" },
      { id: 3, name: "Tomatoes", category: "Vegetables", quantity: 100, date: "2025-09-02" },
      { id: 4, name: "Potatoes", category: "Vegetables", quantity: 200, date: "2025-09-04" },
      { id: 5, name: "Milk", category: "Dairy", quantity: 75, date: "2025-09-05" },
    ];
    setData(groceryData);
    setFilteredData(groceryData);
  }, []);

  const getColumnSearchProps = (dataIndex: keyof GroceryItem): ColumnType<GroceryItem> => ({
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

  const columns: ColumnsType<GroceryItem> = [
    { title: "ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id },
    { title: "Name", dataIndex: "name", key: "name", ...getColumnSearchProps("name") },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity", sorter: (a, b) => a.quantity - b.quantity },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  const applyFilters = (
    dates: [Dayjs | null, Dayjs | null] | null,
    category: string
  ) => {
    let filtered = [...data];
  
    // Date filter
    if (dates && dates[0] && dates[1]) {
      const [start, end] = dates;
      filtered = filtered.filter((d) => {
        const current = new Date(d.date);
        return current >= start!.toDate() && current <= end!.toDate();
      });
    }
  
    // Category filter
    if (category && category !== "All") {
      filtered = filtered.filter((d) => d.category === category);
    }
  
    setFilteredData(filtered);
  };
  

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setDateRange(dates);
    applyFilters(dates, filterCategory);
  };
  
  const handleCategoryChange = (value: string) => {
    setFilterCategory(value);
    applyFilters(dateRange, value);
  };
  

  const handleDownload = () => {
    const header = ["ID", "Name", "Category", "Quantity", "Date"];
    const rows = filteredData.map((d) => [d.id, d.name, d.category, d.quantity, d.date]);
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "grocery_report.csv");
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
            <Option value="Fruits">Fruits</Option>
            <Option value="Vegetables">Vegetables</Option>
            <Option value="Dairy">Dairy</Option>
          </Select>
          <RangePicker onChange={handleDateChange} />
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownload}>
            Download
          </Button>
        </Space>
      </Flex>

      <Table<GroceryItem>
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

export default GroceryReports;
