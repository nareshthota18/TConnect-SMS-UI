import React from 'react';
import { Table } from 'antd';

const AllStudents = () => {
  // Sample student data
  const dataSource = [
    {
      key: '1',
      name: 'John Doe',
      age: 20,
      grade: 'A',
      email: 'john@example.com',
    },
    {
      key: '2',
      name: 'Jane Smith',
      age: 22,
      grade: 'B',
      email: 'jane@example.com',
    },
    {
      key: '3',
      name: 'Sam Wilson',
      age: 21,
      grade: 'A',
      email: 'sam@example.com',
    },
  ];

  // Table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  return (
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={ false }
      />
  );
};

export default AllStudents;
