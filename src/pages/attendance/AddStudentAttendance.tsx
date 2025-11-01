import React, { useState, useEffect } from "react";
import { Layout, Table, Radio, Select, Button, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchGradesApi } from "../../store/Dropdowns/DropdownActions";
import { fetchStudentByGradeApi } from "../../store/Student/StudentActions";
const { Content } = Layout;
const { Option } = Select;

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  class: string;
}

const allStudents: Student[] = [
  { id: 1, firstName: "John", lastName: "Doe", class: "10th" },
  { id: 2, firstName: "Jane", lastName: "Smith", class: "10th" },
  { id: 3, firstName: "Sam", lastName: "Wilson", class: "9th" },
  { id: 4, firstName: "Alice", lastName: "Brown", class: "10th" },
  { id: 5, firstName: "Chris", lastName: "Evans", class: "9th" },
  { id: 6, firstName: "Emma", lastName: "Watson", class: "10th" },
];

const AddStudentAttendance = () => {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [studentStatus, setStudentStatus] = useState<
    Record<number, "Present" | "Absent">
  >({});
  const dispatch = useDispatch<AppDispatch>();
  const [gradesOptions, setgradesOptions] = useState<
    { label: string; value: string }[]
  >([]);

  interface GradesState {
    gradesData: [];
    gradesDataLoading: boolean;
    gradesDataError: boolean;
  }

  interface StudentByGradeState {
    studentByGradeData: any[]; 
    studentByGradeDataLoading: boolean;
    studentByGradeDataError: boolean;
  }

  const { gradesData, gradesDataLoading } = useSelector(
    (state: RootState) => state.departments as GradesState
  );
  
  const { studentByGradeData, studentByGradeDataLoading } = useSelector(
    (state: RootState) => state.student as StudentByGradeState
  );
  
  // ✅ Fetch grades on component mount
  useEffect(() => {
    dispatch(fetchGradesApi());
  }, [dispatch]);

  // Handle grade selection
const handleGradeChange = (value: string) => {
  setSelectedClass(value); // Save grade ID
  dispatch(fetchStudentByGradeApi(value)); // Fetch students dynamically
};


  useEffect(() => {
    if (gradesData?.length) {
      const options = gradesData.map(
        (item: { key: string; value: string }) => ({
          label: item.value,
          value: item.key,
        })
      );
      setgradesOptions(options);
    }
  }, [gradesData]);

  useEffect(() => {
    if (selectedClass) {
      const filtered = allStudents.filter((s) => s.class === selectedClass);
      setStudents(filtered);

      const initialStatus: Record<number, "Present" | "Absent"> = {};
      filtered.forEach((s) => (initialStatus[s.id] = "Present"));
      setStudentStatus(initialStatus);
    }
  }, [selectedClass]);

  const handleSubmit = () => {
    console.log("Student Attendance:", studentStatus);
  };

  const studentColumns = [
    { title: "Roll No", dataIndex: "id", key: "id" },
    {
      title: "Student Name",
      key: "studentName",
      render: (_: any, record: Student) =>
        `${record.firstName} ${record.lastName}`,
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

  return (
    <Row gutter={[16, 16]}>
  <Col span={24}>
    <Select
      placeholder="Select Class"
      loading={gradesDataLoading}
      options={gradesOptions}
      allowClear
      style={{ width: 200, marginBottom: 16 }}
      onChange={handleGradeChange}
    />
  </Col>

  {students.length > 0 && (
    <Col span={24}>
      <Table
        rowKey="id"
        bordered
        columns={studentColumns}
        dataSource={students}
        pagination={false}
      />
    </Col>
  )}

  {students.length > 0 && (
    <Col span={24}>
      <Button type="primary" style={{ marginTop: 16 }} onClick={handleSubmit}>
        Submit Attendance
      </Button>
    </Col>
  )}
</Row>

  );
};

export default AddStudentAttendance;
