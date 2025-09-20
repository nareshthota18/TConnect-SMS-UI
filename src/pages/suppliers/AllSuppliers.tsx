import React, { useState, useEffect } from "react";
import { Table, Tag, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

interface Supplier {
  id: number;
  name: string;
  code: string;
  category: "Raw Material" | "Services" | "Equipment";
  contactPerson: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending";
}

const AllSuppliers: React.FC = () => {
  const [data, setData] = useState<Supplier[]>([]);

  useEffect(() => {
    const supplierData: Supplier[] = [
      {
        id: 1,
        name: "Global Traders Pvt Ltd",
        code: "SUP001",
        category: "Raw Material",
        contactPerson: "Mr. Rajesh Mehta",
        phone: "9876543210",
        status: "Active",
      },
      {
        id: 2,
        name: "Techno Equipments",
        code: "SUP002",
        category: "Equipment",
        contactPerson: "Ms. Anjali Gupta",
        phone: "9123456780",
        status: "Pending",
      },
      {
        id: 3,
        name: "Fast Logistics Ltd",
        code: "SUP003",
        category: "Services",
        contactPerson: "Mr. Arvind Nair",
        phone: "9988776655",
        status: "Inactive",
      },
      {
        id: 4,
        name: "Fresh Foods Supplier",
        code: "SUP004",
        category: "Raw Material",
        contactPerson: "Mrs. Kavita Rao",
        phone: "9876001234",
        status: "Active",
      },
    ];
    setData(supplierData);
  }, []);

  // 🔍 Search functionality
  const getColumnSearchProps = (
    dataIndex: keyof Supplier
  ): ColumnType<Supplier> => ({
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

  const columns: ColumnsType<Supplier> = [
    {
      title: "Supplier ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Supplier Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Supplier Code",
      dataIndex: "code",
      key: "code",
      ...getColumnSearchProps("code"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Raw Material", value: "Raw Material" },
        { text: "Services", value: "Services" },
        { text: "Equipment", value: "Equipment" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
      ...getColumnSearchProps("contactPerson"),
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
      render: (status: Supplier["status"]) => {
        let color = "blue";
        if (status === "Active") color = "green";
        else if (status === "Inactive") color = "red";
        else if (status === "Pending") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <Table<Supplier>
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default AllSuppliers;
