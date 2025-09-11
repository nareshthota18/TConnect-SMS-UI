import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Select,
  Button,
  Space,
  Radio,
  Row,
  Col,
  Divider,
  Table,
} from "antd";

const { Content } = Layout;
const { Option } = Select;

interface Student {
  id: number;
  name: string;
  class: string;
}

interface Staff {
  id: number;
  name: string;
  department: string;
}

const AddAttendance = () => {
  const [attendanceType, setAttendanceType] = useState<"student" | "staff">(
    "student"
  );
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [studentStatus, setStudentStatus] = useState<
    Record<number, "Present" | "Absent">
  >({});
  const [staffStatus, setStaffStatus] = useState<
    Record<number, "Present" | "Absent">
  >({});

  const allStudents: Student[] = [
    { id: 1, name: "John Doe", class: "10th" },
    { id: 2, name: "Jane Smith", class: "10th" },
    { id: 3, name: "Sam Wilson", class: "9th" },
    { id: 4, name: "Alice Brown", class: "10th" },
    { id: 5, name: "Chris Evans", class: "9th" },
    { id: 6, name: "Emma Watson", class: "10th" },
  ];

  const allStaff: Staff[] = [
    { id: 1, name: "Robert Brown", department: "Admin" },
    { id: 2, name: "Emily Johnson", department: "Finance" },
    { id: 3, name: "Michael Smith", department: "HR" },
    { id: 4, name: "Laura Adams", department: "Library" },
  ];

  useEffect(() => {
    if (selectedClass) {
      const filtered = allStudents.filter((s) => s.class === selectedClass);
      setStudents(filtered);

      // Default student status = Present
      const initialStatus: Record<number, "Present" | "Absent"> = {};
      filtered.forEach((s) => {
        initialStatus[s.id] = "Present";
      });
      setStudentStatus(initialStatus);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (attendanceType === "staff") {
      setStaff(allStaff);

      // Default staff status = Present
      const initialStatus: Record<number, "Present" | "Absent"> = {};
      allStaff.forEach((s) => {
        initialStatus[s.id] = "Present";
      });
      setStaffStatus(initialStatus);
    }
  }, [attendanceType]);

  const handleSubmit = () => {
    if (attendanceType === "student") {
      console.log("Student Attendance:", studentStatus);
    } else {
      console.log("Staff Attendance:", staffStatus);
    }
  };

  // Table columns for Students
  const studentColumns = [
    {
      title: "Roll No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: Student) => (
        <Radio.Group
          value={studentStatus[record.id]}
          onChange={(e) =>
            setStudentStatus((prev) => ({
              ...prev,
              [record.id]: e.target.value,
            }))
          }
        >
          <Radio value="Present">Present</Radio>
          <Radio value="Absent">Absent</Radio>
        </Radio.Group>
      ),
    },
  ];

  // Table columns for Staff
  const staffColumns = [
    {
      title: "Staff ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Staff Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: Staff) => (
        <Radio.Group
          value={staffStatus[record.id]}
          onChange={(e) =>
            setStaffStatus((prev) => ({
              ...prev,
              [record.id]: e.target.value,
            }))
          }
        >
          <Radio value="Present">Present</Radio>
          <Radio value="Absent">Absent</Radio>
        </Radio.Group>
      ),
    },
  ];

  return (
    <Layout style={{ padding: "24px" }}>
      <Content>
        {/* Select Attendance Type */}
        <Radio.Group
          onChange={(e) => setAttendanceType(e.target.value)}
          value={attendanceType}
          style={{ marginBottom: 16 }}
        >
          <Radio value="student">Student Attendance</Radio>
          <Radio value="staff">Staff Attendance</Radio>
        </Radio.Group>

        {/* Select Class if Student Attendance */}
        {attendanceType === "student" && (
          <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Select
                placeholder="Select Class"
                style={{ width: 200 }}
                onChange={(value) => setSelectedClass(value)}
              >
                <Option value="10th">10th</Option>
                <Option value="9th">9th</Option>
              </Select>
            </Col>
          </Row>
        )}

        {/* Table for Students */}
        {attendanceType === "student" && selectedClass && (
          <Table
            rowKey="id"
            bordered
            columns={studentColumns}
            dataSource={students}
            pagination={false}
          />
        )}

        {/* Table for Staff */}
        {attendanceType === "staff" && (
          <Table
            rowKey="id"
            bordered
            columns={staffColumns}
            dataSource={staff}
            pagination={false}
          />
        )}

        <Space style={{ marginTop: 16 }}>
          <Button type="primary" onClick={handleSubmit}>
            Submit Attendance
          </Button>
        </Space>
      </Content>
    </Layout>
  );
};

export default AddAttendance;
