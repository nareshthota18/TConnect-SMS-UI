import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Descriptions } from "antd";
import type { ColumnsType } from "antd/es/table";
import { fetchStudentsApi } from "../../store/Student/StudentActions";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";

// Match JSONPlaceholder structure
interface Student {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const AllStudents = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  interface StudentState {
    studentData: any;
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

  // Flatten nested fields for table
  const columns: ColumnsType<Student> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Username",
    //   dataIndex: "username",
    //   key: "username",
    // },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "City",
      key: "city",
      render: (_, record) => {
        const fullAddress = `${record.address.street}, ${record.address.suite}, ${record.address.city}, ${record.address.zipcode}`;
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
        return (
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
            {record.address.city}
          </a>
        );
      },
    },
    // {
    //   title: "Company",
    //   key: "company",
    //   render: (_, record) => record.company?.name,
    // },
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
        dataSource={studentData?.data || studentData || []}
        columns={columns}
        bordered
        pagination={false}
        loading={studentDataLoading}
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
            <Descriptions.Item label="Name">{selectedStudent.name}</Descriptions.Item>
            <Descriptions.Item label="Username">{selectedStudent.username}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedStudent.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedStudent.phone}</Descriptions.Item>
            <Descriptions.Item label="Website">{selectedStudent.website}</Descriptions.Item>

            <Descriptions.Item label="Address">
              {`${selectedStudent.address.street}, ${selectedStudent.address.suite}, ${selectedStudent.address.city}, ${selectedStudent.address.zipcode}`}
            </Descriptions.Item>

            <Descriptions.Item label="Geo Location">
              {`Lat: ${selectedStudent.address.geo.lat}, Lng: ${selectedStudent.address.geo.lng}`}
            </Descriptions.Item>

            <Descriptions.Item label="Company Name">
              {selectedStudent.company.name}
            </Descriptions.Item>
            <Descriptions.Item label="Catch Phrase">
              {selectedStudent.company.catchPhrase}
            </Descriptions.Item>
            <Descriptions.Item label="Business">
              {selectedStudent.company.bs}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default AllStudents;
