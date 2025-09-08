import React, { useState, useEffect } from "react";
import { Table, Tag, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Inactive";
}

const AllUsers: React.FC = () => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const userData: User[] = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Inactive" },
      { id: 3, name: "Sam Wilson", email: "sam@example.com", role: "Viewer", status: "Active" },
      { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
      { id: 5, name: "David Lee", email: "david@example.com", role: "Viewer", status: "Inactive" },
    ];
    setData(userData);
  }, []);

  // Search Functionality for Name and Email
  const getColumnSearchProps = (dataIndex: keyof User): ColumnType<User> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input.Search
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          autoFocus
          onChange={(e) => {
            const value = e.target.value;
            setSelectedKeys(value ? [value] : []);
            confirm({ closeDropdown: false }); // Live filtering
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

  const columns: ColumnsType<User> = [
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "Editor", value: "Editor" },
        { text: "Viewer", value: "Viewer" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: User["status"]) => {
        let color = status === "Active" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <Table<User>
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default AllUsers;
