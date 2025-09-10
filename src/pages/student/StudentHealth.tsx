import React, { useState } from "react";
import { Table, Tag, Select } from "antd";

const { Option } = Select;

// Define the type for a student record
interface Student {
  key: string;
  name: string;
  height: string;
  weight: string;
  bloodGroup: string;
  healthStatus: "Under Treatment" | "Recovering" | "Good";
}

const StudentHealth: React.FC = () => {
  const [dataSource, setDataSource] = useState<Student[]>([
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
      healthStatus: "Under Treatment",
    },
    {
      key: "3",
      name: "Sam Wilson",
      height: "6.0 ft",
      weight: "80 kg",
      bloodGroup: "B+",
      healthStatus: "Recovering",
    },
  ]);

  // Type the parameters
  const handleStatusChange = (recordKey: string, newStatus: Student["healthStatus"]) => {
    setDataSource((prevData) =>
      prevData.map((item) =>
        item.key === recordKey ? { ...item, healthStatus: newStatus } : item
      )
    );

    // TODO: call backend API here
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Height", dataIndex: "height", key: "height" },
    { title: "Weight", dataIndex: "weight", key: "weight" },
    { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
    {
      title: "Current Status",
      dataIndex: "healthStatus",
      key: "currentStatus",
      render: (status: Student["healthStatus"]) => {
        let color = "green";
        if (status === "Under Treatment") color = "red";
        else if (status === "Recovering") color = "purple";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Update Status",
      key: "updateStatus",
      render: (_text: any, record: Student) => (
        <Select
          value={record.healthStatus}
          style={{ width: 160 }}
          onChange={(value: Student["healthStatus"]) => handleStatusChange(record.key, value)}
        >
          <Option value="Under Treatment">Under Treatment</Option>
          <Option value="Recovering">Recovering</Option>
          <Option value="Good">Good</Option>
        </Select>
      ),
    },
  ];

  return (
    <Table<Student>
      dataSource={dataSource}
      columns={columns}
      bordered
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
};

export default StudentHealth;
