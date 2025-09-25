import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Descriptions } from "antd";
import type { ColumnsType } from "antd/es/table";
import { fetchStudentsApi } from "../../store/Student/StudentActions";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { LoadingOutlined } from "@ant-design/icons";

interface Student {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  categoryId: string;
  rsHostelId: string;
  gradeId: string;
  status: string;
  parentName: string;
  parentContact: string;
  healthInfo: string | null;
  categoryName: string | null;
  rsHostelName: string;
  gradeName: string;
}

const AllStudents = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  interface StudentState {
    studentData: Student[];
    studentDataLoading: boolean;
    studentDataError: boolean;
  }

  const { studentData, studentDataLoading } = useSelector(
    (state: RootState) => state.student as StudentState
  );

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

  // Updated columns for new API structure
  const columns: ColumnsType<Student> = [
    {
      title: "Admission Number",
      dataIndex: "admissionNumber",
      key: "admissionNumber",
    },
    {
      title: "Name",
      key: "name",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Grade",
      dataIndex: "gradeName",
      key: "gradeName",
    },
    {
      title: "Hostel",
      dataIndex: "rsHostelName",
      key: "rsHostelName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Parent Name",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "Parent Contact",
      dataIndex: "parentContact",
      key: "parentContact",
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
        loading={{
          spinning: studentDataLoading,
          indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />,
        }}
        rowKey={(record) => record.id}
        scroll={{ x: "max-content" }}
      />

      <Modal
        title="Student Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        destroyOnClose
      >
        {selectedStudent && (
          <Descriptions bordered column={3} size="middle" layout="vertical">
            <Descriptions.Item label="Admission Number">
              {selectedStudent.admissionNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {`${selectedStudent.firstName} ${selectedStudent.lastName}`}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Grade">
              {selectedStudent.gradeName}
            </Descriptions.Item>
            <Descriptions.Item label="Hostel">
              {selectedStudent.rsHostelName}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {selectedStudent.status}
            </Descriptions.Item>
            <Descriptions.Item label="Parent Name">
              {selectedStudent.parentName}
            </Descriptions.Item>
            <Descriptions.Item label="Parent Contact">
              {selectedStudent.parentContact}
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {selectedStudent.categoryName || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Health Info">
              {selectedStudent.healthInfo || "-"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default AllStudents;
