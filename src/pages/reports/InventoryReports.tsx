import React, { useState, useEffect } from "react";
import { Table, Input, DatePicker, Button, Space, Flex } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  date: string;
}

const { RangePicker } = DatePicker;

const InventoryReports: React.FC = () => {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [filteredData, setFilteredData] = useState<InventoryItem[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  useEffect(() => {
    const inventoryData: InventoryItem[] = [
      { id: 1, name: "Laptop", category: "Electronics", quantity: 10, date: "2025-09-01" },
      { id: 2, name: "Desk Chair", category: "Furniture", quantity: 25, date: "2025-09-03" },
      { id: 3, name: "Projector", category: "Electronics", quantity: 5, date: "2025-09-04" },
      { id: 4, name: "Notebook", category: "Stationery", quantity: 100, date: "2025-09-02" },
      { id: 5, name: "Pen", category: "Stationery", quantity: 200, date: "2025-09-05" },
    ];
    setData(inventoryData);
    setFilteredData(inventoryData);
  }, []);

  // Search for Inventory Name
  const getColumnSearchProps = (dataIndex: keyof InventoryItem): ColumnType<InventoryItem> => ({
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

  const columns: ColumnsType<InventoryItem> = [
    { title: "ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id },
    { title: "Name", dataIndex: "name", key: "name", ...getColumnSearchProps("name") },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity", sorter: (a, b) => a.quantity - b.quantity },
    { title: "Date", dataIndex: "date", key: "date" },
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
    const header = ["ID", "Name", "Category", "Quantity", "Date"];
    const rows = filteredData.map((d) => [d.id, d.name, d.category, d.quantity, d.date]);
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventory_report.csv");
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
      <Table<InventoryItem>
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default InventoryReports;
