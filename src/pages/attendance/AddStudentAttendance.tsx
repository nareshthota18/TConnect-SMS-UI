import React, { useState, useEffect } from "react";
import { Layout, Table, Radio, Select, Button, Row, Col, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchGradesApi } from "../../store/Dropdowns/DropdownActions";
import { fetchStudentByGradeApi } from "../../store/Student/StudentActions";
import { addStudentAttendanceApi, fetchAttendanceStudentApi } from "../../store/Attendance/AttendanceActions";

const { Content } = Layout;

const AddStudentAttendance = () => {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [studentStatus, setStudentStatus] = useState<
    Record<string, "Present" | "Absent">
  >({});

  const dispatch = useDispatch<AppDispatch>();

  const [gradesOptions, setGradesOptions] = useState<
    { label: string; value: string }[]
  >([]);

  interface GradesState {
    gradesData: any[];
    gradesDataLoading: boolean;
  }

  interface StudentByGradeState {
    studentByGradeData: any[];
    studentByGradeDataLoading: boolean;
  }

  const { gradesData, gradesDataLoading } = useSelector(
    (state: RootState) => state.departments as GradesState
  );

  const { studentByGradeData, studentByGradeDataLoading } = useSelector(
    (state: RootState) => state.student as StudentByGradeState
  );

  // Fetch grades
  useEffect(() => {
    dispatch(fetchGradesApi());
  }, [dispatch]);

  // Convert grades to dropdown options
  useEffect(() => {
    if (gradesData?.length) {
      const options = gradesData.map((item: { key: string; value: string }) => ({
        label: item.value,
        value: item.key,
      }));
      setGradesOptions(options);
    }
  }, [gradesData]);

  // When grade is selected → fetch students
  const handleGradeChange = (value: string) => {
    setSelectedClass(value);
    dispatch(fetchStudentByGradeApi(value));
  };

  // Set default attendance = Present
  useEffect(() => {
    if (studentByGradeData?.length) {
      const initialStatus: Record<string, "Present" | "Absent"> = {};
      studentByGradeData.forEach((s: any) => {
        initialStatus[s.id] = "Present";
      });
      setStudentStatus(initialStatus);
    }
  }, [studentByGradeData]);

  const handleSubmit = () => {
    if (!studentByGradeData?.length) return;
  
    const attendancePayload = studentByGradeData.map((student: any) => ({
      id: student.id, // or "" if backend generates
      studentId: student.id,
      attendanceDate: new Date().toISOString(),
      session: "Morning", // or dynamic
      status: studentStatus[student.id],
      remarks: "",
      studentName: `${student.firstName} ${student.lastName}`,
      admissionNumber: student.admissionNumber,
    }));
  
    console.log("Final Payload:", attendancePayload);
  
    dispatch(addStudentAttendanceApi(attendancePayload));
    message.success("Attendance submitted successfully!");
    dispatch(fetchAttendanceStudentApi());
  };
  

  const studentColumns = [
    { title: "Roll No", dataIndex: "admissionNumber", key: "admissionNumber" },

    {
      title: "Student Name",
      key: "studentName",
      render: (_: any, record: any) =>
        `${record.firstName} ${record.lastName}`,
    },

    {
      title: "Status",
      key: "status",
      render: (_: any, record: any) => (
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
          placeholder="Select Grade"
          loading={gradesDataLoading}
          options={gradesOptions}
          allowClear
          style={{ width: 250 }}
          onChange={handleGradeChange}
        />
      </Col>

      {studentByGradeData?.length > 0 && (
        <Col span={24}>
          <Table
            rowKey="id"
            bordered
            loading={studentByGradeDataLoading}
            columns={studentColumns}
            dataSource={studentByGradeData}
            pagination={false}
          />
        </Col>
      )}

      {studentByGradeData?.length > 0 && (
        <Col span={24}>
          <Button type="primary" onClick={handleSubmit}>
            Submit Attendance
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default AddStudentAttendance;
