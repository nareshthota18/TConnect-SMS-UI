import React, { useState, useEffect } from "react";
import { Table, Tag, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

interface Grocery {
  id: number;
  name: string;
  category: string;
  price: number;
  status: "Available" | "Out of Stock" | "Limited Stock";
}

const AllGrocery: React.FC = () => {
  const [data, setData] = useState<Grocery[]>([]);

  useEffect(() => {
    const groceryData: Grocery[] = [
      { id: 1, name: "Rice", category: "Grains", price: 45, status: "Available" },
      { id: 2, name: "Sugar", category: "Grocery", price: 40, status: "Limited Stock" },
      { id: 3, name: "Milk", category: "Dairy", price: 30, status: "Out of Stock" },
      { id: 4, name: "Bread", category: "Bakery", price: 25, status: "Limited Stock" },
      { id: 5, name: "Salt", category: "Grocery", price: 20, status: "Available" },
    ];
    setData(groceryData);
  }, []);

  // Search functionality
  const getColumnSearchProps = (dataIndex: keyof Grocery): ColumnType<Grocery> => ({
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

  const columns: ColumnsType<Grocery> = [
    {
      title: "Item ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Grains", value: "Grains" },
        { text: "Grocery", value: "Grocery" },
        { text: "Dairy", value: "Dairy" },
        { text: "Bakery", value: "Bakery" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Price (₹)",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => `₹${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Available", value: "Available" },
        { text: "Limited Stock", value: "Limited Stock" },
        { text: "Out of Stock", value: "Out of Stock" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: Grocery["status"]) => {
        let color = "blue";
        if (status === "Available") color = "green";
        else if (status === "Limited Stock") color = "orange";
        else if (status === "Out of Stock") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <Table<Grocery>
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default AllGrocery;
