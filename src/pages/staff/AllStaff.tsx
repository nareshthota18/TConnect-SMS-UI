import React from "react";
import { Table } from "antd";

const AllStaff = () => {
  // Sample staff data
  const dataSource = [
    {
      key: "1",
      name: "John Carter",
      role: "Teacher",
      department: "Mathematics",
      email: "john.carter@example.com",
      phone: "9876543210",
    },
    {
      key: "2",
      name: "Emily Smith",
      role: "Administrator",
      department: "Administration",
      email: "emily.smith@example.com",
      phone: "9123456789",
    },
    {
      key: "3",
      name: "Michael Brown",
      role: "Accountant",
      department: "Finance",
      email: "michael.brown@example.com",
      phone: "9012345678",
    },
  ];

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      bordered
      pagination={false}
    />
  );
};

export default AllStaff;
