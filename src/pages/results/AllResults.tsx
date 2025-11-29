import React from "react";
import { Table, Tag } from "antd";

const AllResults: React.FC = () => {
  const columns = [
    {
      title: "Student",
      dataIndex: "student",
    },
    {
      title: "Exam",
      dataIndex: "exam",
    },
    {
      title: "Marks",
      dataIndex: "marks",
    },
    {
      title: "Grade",
      dataIndex: "grade",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) =>
        text === "Pass" ? (
          <Tag color="green">PASS</Tag>
        ) : (
          <Tag color="red">FAIL</Tag>
        ),
    },
  ];

  const data = [
    {
      key: 1,
      student: "John Doe",
      exam: "Math Final",
      marks: 85,
      grade: "A",
      status: "Pass",
    },
    {
      key: 2,
      student: "Riya Sharma",
      exam: "Science Midterm",
      marks: 42,
      grade: "C",
      status: "Pass",
    },
    {
      key: 3,
      student: "Mark Lee",
      exam: "English Test",
      marks: 28,
      grade: "D",
      status: "Fail",
    },
  ];

  return (
      <Table columns={columns} dataSource={data} bordered />
  );
};

export default AllResults;
