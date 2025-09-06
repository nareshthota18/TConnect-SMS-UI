import React from "react";
import { Table, Tag } from "antd";

const StudentHealth = () => {
  // Sample health data
  const dataSource = [
    {
      key: "1",
      name: "John Doe",
      height: "5.9 ft",
      weight: "70 kg",
      bloodGroup: "O+",
      healthStatus: "Good",
    },
    {
      key: "2",
      name: "Jane Smith",
      height: "5.6 ft",
      weight: "60 kg",
      bloodGroup: "A+",
      healthStatus: "Average",
    },
    {
      key: "3",
      name: "Sam Wilson",
      height: "6.0 ft",
      weight: "80 kg",
      bloodGroup: "B+",
      healthStatus: "Excellent",
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
      title: "Height",
      dataIndex: "height",
      key: "height",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      key: "bloodGroup",
    },
    {
      title: "Health Status",
      dataIndex: "healthStatus",
      key: "healthStatus",
      render: (status: string) => {
        let color = "green";
        if (status === "Average") {
          color = "orange";
        } else if (status === "Excellent") {
          color = "blue";
        }
        return <Tag color={color}>{status}</Tag>;
      },
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

export default StudentHealth;
