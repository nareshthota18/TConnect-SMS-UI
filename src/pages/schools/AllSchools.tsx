import React, { useState, useEffect } from "react";
import { Table, Tag, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

interface School {
  id: number;
  name: string;
  code: string;
  type: "Public" | "Private" | "Government";
  principal: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending";
}

const AllSchools: React.FC = () => {
  const [data, setData] = useState<School[]>([]);

  useEffect(() => {
    const schoolData: School[] = [
      {
        id: 1,
        name: "Green Valley Public School",
        code: "GVPS001",
        type: "Public",
        principal: "Mr. Ramesh Sharma",
        phone: "9876543210",
        status: "Active",
      },
      {
        id: 2,
        name: "Sunshine International School",
        code: "SIS002",
        type: "Private",
        principal: "Ms. Neha Verma",
        phone: "9123456780",
        status: "Pending",
      },
      {
        id: 3,
        name: "National Govt. School",
        code: "NGS003",
        type: "Government",
        principal: "Mr. Ajay Kumar",
        phone: "9988776655",
        status: "Inactive",
      },
      {
        id: 4,
        name: "Bright Future Academy",
        code: "BFA004",
        type: "Private",
        principal: "Mrs. Kavita Joshi",
        phone: "9876001234",
        status: "Active",
      },
    ];
    setData(schoolData);
  }, []);

  // 🔍 Search functionality
  const getColumnSearchProps = (
    dataIndex: keyof School
  ): ColumnType<School> => ({
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
          style={{ display: "block" }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
  });

  const columns: ColumnsType<School> = [
    {
      title: "School ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "School Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "School Code",
      dataIndex: "code",
      key: "code",
      ...getColumnSearchProps("code"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Public", value: "Public" },
        { text: "Private", value: "Private" },
        { text: "Government", value: "Government" },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Principal",
      dataIndex: "principal",
      key: "principal",
      ...getColumnSearchProps("principal"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
        { text: "Pending", value: "Pending" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: School["status"]) => {
        let color = "blue";
        if (status === "Active") color = "green";
        else if (status === "Inactive") color = "red";
        else if (status === "Pending") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <Table<School>
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default AllSchools;
