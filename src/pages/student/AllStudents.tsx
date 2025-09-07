import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Descriptions } from "antd";
import type { ColumnsType } from "antd/es/table";
import { fetchStudentsApi } from "../../store/Student/StudentActions";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store"; // Adjust based on your store setup

interface Student {
  key: string;
  name: string;
  age: number;
  grade: string;
  email: string;
  address: string;
  phone: string;
  parentName: string;
  parentContact: string;
  admissionDate: string;
  rollNumber: string;
}

const AllStudents = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  interface StudentState {
    studentData: any[];
    studentDataLoading: boolean;
    studentDataError: boolean;
  }

  const { studentData, studentDataLoading } = useSelector(
    (state: RootState) => state.student as StudentState
  );

  console.log('Student state structure:', studentData);

  useEffect(() => {
    dispatch(fetchStudentsApi());
  }, [dispatch]);

  const showModal = (student: Student) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedStudent(null);
  };

  const columns: ColumnsType<Student> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          View More
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table<Student>
        dataSource={studentData || []}
        columns={columns}
        bordered
        pagination={false}
        loading={studentDataLoading}
        rowKey="key"
      />

      <Modal
        title="Student Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="80%"
      >
        {selectedStudent && (
          <Descriptions bordered column={3} size="middle" layout="vertical">
            <Descriptions.Item label="Name">{selectedStudent.name}</Descriptions.Item>
            <Descriptions.Item label="Age">{selectedStudent.age}</Descriptions.Item>
            <Descriptions.Item label="Grade">{selectedStudent.grade}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedStudent.email}</Descriptions.Item>
            <Descriptions.Item label="Address">{selectedStudent.address}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedStudent.phone}</Descriptions.Item>
            <Descriptions.Item label="Parent Name">{selectedStudent.parentName}</Descriptions.Item>
            <Descriptions.Item label="Parent Contact">{selectedStudent.parentContact}</Descriptions.Item>
            <Descriptions.Item label="Admission Date">{selectedStudent.admissionDate}</Descriptions.Item>
            <Descriptions.Item label="Roll Number">{selectedStudent.rollNumber}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default AllStudents;
