import React, { useState } from "react";
import {
  Table,
  Tag,
  Input,
  Popconfirm,
  Grid,
  Modal,
  Descriptions,
  Button,
} from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
const { useBreakpoint } = Grid;

interface SubjectDetail {
  subject: string;
  date: string;
  totalMarks: number;
  passMarks: number;
}

interface Exam {
  id: number;
  name: string; // Quarterly | Half-Yearly | Annual
  category: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  subjects: SubjectDetail[];
}

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const modalStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
  padding: "16px 24px",
};


const AllExams: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [data, setData] = useState<Exam[]>([
    {
      id: 1,
      name: "Quarterly Exam",
      category: "Quarterly",
      startDate: "2025-07-01",
      endDate: "2025-07-07",
      isActive: true,
      subjects: [
        { subject: "Telugu", date: "2025-07-01", totalMarks: 50, passMarks: 20 },
        { subject: "English", date: "2025-07-02", totalMarks: 50, passMarks: 20 },
        { subject: "Maths", date: "2025-07-03", totalMarks: 50, passMarks: 20 },
      ],
    },
    {
      id: 2,
      name: "Half Yearly Exam",
      category: "Half-Yearly",
      startDate: "2025-11-10",
      endDate: "2025-11-18",
      isActive: true,
      subjects: [
        { subject: "Science", date: "2025-11-11", totalMarks: 80, passMarks: 30 },
        { subject: "Social", date: "2025-11-12", totalMarks: 80, passMarks: 28 },
      ],
    },
    {
      id: 3,
      name: "Annual Exam",
      category: "Annual",
      startDate: "2026-03-05",
      endDate: "2026-03-20",
      isActive: false,
      subjects: [
        { subject: "Hindi", date: "2026-03-08", totalMarks: 100, passMarks: 35 },
        { subject: "Maths", date: "2026-03-10", totalMarks: 100, passMarks: 35 },
      ],
    },
  ]);

  // 🔍 Search Function
  const getColumnSearchProps = (dataIndex: keyof Exam): ColumnType<Exam> => ({
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
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      (record[dataIndex] ?? "")
        .toString()
        .toLowerCase()
        .includes(String(value).toLowerCase()),
  });

  // 📘 Table Columns
  const columns: ColumnsType<Exam> = [
    {
      title: "Exam Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setSelectedExam(record);
            setOpenModal(true);
          }}
        >
          More Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10, hideOnSinglePage: true }}
        bordered
        scroll={{ x: "max-content" }}
      />

      {/* 🎯 Exam Details Modal */}
      <Modal
  title={selectedExam?.name}
  open={openModal}
  onCancel={() => setOpenModal(false)}
  footer={null}
  width={isMobile ? "95%" : "60%"}
  styles={{
    header: modalStyle,
  }}
  bodyStyle={{ padding: 0 }}
  maskClosable={false}
>
  {/* Main Container */}
  <div style={{ padding: 20 }}>
    {selectedExam && (
      <Descriptions
        title="Exam Details"
        bordered
        column={1}
        size="small"
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="Category">
          {selectedExam.category}
        </Descriptions.Item>
        <Descriptions.Item label="Start Date">
          {selectedExam.startDate}
        </Descriptions.Item>
        <Descriptions.Item label="End Date">
          {selectedExam.endDate}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {selectedExam.isActive ? "Active" : "Inactive"}
        </Descriptions.Item>
      </Descriptions>
    )}

<Descriptions
  title="Subjects & Exam Schedule"
  bordered
  column={2}
  size="small"
>
  {selectedExam?.subjects.map((sub, index) => (
    <>
      <Descriptions.Item label="Subject" key={`subject-${index}`}>
        {sub.subject}
      </Descriptions.Item>

      <Descriptions.Item label="Date" key={`date-${index}`}>
        {sub.date}
      </Descriptions.Item>

      <Descriptions.Item
        label="Total Marks"
        key={`total-${index}`}
      >
        {sub.totalMarks}
      </Descriptions.Item>

      <Descriptions.Item
        label="Pass Marks"
        key={`pass-${index}`}
      >
        {sub.passMarks}
      </Descriptions.Item>
    </>
  ))}
</Descriptions>

  </div>
</Modal>

    </>
  );
};

export default AllExams;
