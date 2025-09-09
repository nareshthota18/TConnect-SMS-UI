import React, { useState, useEffect } from "react";
import { Layout, Typography, Select, Checkbox, Button, Space, Radio, Row, Col, Divider, Flex } from "antd";

const { Content } = Layout;
const { Title } = Typography;
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
  const [attendanceType, setAttendanceType] = useState<"student" | "staff">("student");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [checkedStudentIds, setCheckedStudentIds] = useState<number[]>([]);
  const [checkedStaffIds, setCheckedStaffIds] = useState<number[]>([]);

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
      setCheckedStudentIds(filtered.map((s) => s.id)); // default checked
    }
  }, [selectedClass]);

  useEffect(() => {
    if (attendanceType === "staff") {
      setStaff(allStaff);
      setCheckedStaffIds(allStaff.map((s) => s.id)); // default checked
    }
  }, [attendanceType]);

  const toggleStudentCheck = (id: number) => {
    setCheckedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleStaffCheck = (id: number) => {
    setCheckedStaffIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (attendanceType === "student") {
      console.log("Marked Students:", checkedStudentIds);
    } else {
      console.log("Marked Staff:", checkedStaffIds);
    }
  };

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
        <Row gutter={[16, 16]}>
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

        <Divider style={{ margin: '20px 0'}} />

        {/* Grid for Students */}
        {attendanceType === "student" && selectedClass && (
          <Row gutter={[16, 16]}>
            {students.map((student) => (
              <Col key={student.id} xs={24} sm={12} md={12} lg={8}>
                <Checkbox
                  checked={checkedStudentIds.includes(student.id)}
                  onChange={() => toggleStudentCheck(student.id)}
                >
                  {student.name} - {student.class}
                </Checkbox>
              </Col>
            ))}
          </Row>
        )}

        {/* Grid for Staff */}
        {attendanceType === "staff" && (
          <Row gutter={[16, 16]}>
            {staff.map((member) => (
              <Col key={member.id} xs={24} sm={12} md={8}>
                <Checkbox
                  checked={checkedStaffIds.includes(member.id)}
                  onChange={() => toggleStaffCheck(member.id)}
                >
                  {member.name} - {member.department}
                </Checkbox>
              </Col>
            ))}
          </Row>
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
