import React, { useState, useEffect } from "react";
import { Table, Tag, Input, Popconfirm, message } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchSchoolsApi, deleteSchoolApi } from "../../store/Schools/SchoolsActions";

interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  status: "Active" | "Inactive";
}

const AllSchools: React.FC = () => {
  const [data, setData] = useState<School[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  interface SchoolsState {
    schoolsData: any[];
    schoolsDataLoading: boolean;
    schoolsDataError: boolean;
  }

  const { schoolsData, schoolsDataLoading } = useSelector(
    (state: RootState) => state.schools as SchoolsState
  );

  // Fetch schools on mount
  useEffect(() => {
    dispatch(fetchSchoolsApi());
  }, [dispatch]);

  // Map API response to table data
  useEffect(() => {
    if (schoolsData && schoolsData.length > 0) {
      const mappedData: School[] = schoolsData.map((item: any) => ({
        id: item.schoolId,
        name: item.schoolName,
        address: item.address,
        phone: item.phone,
        status: item.isActive ? "Active" : "Active",
      }));
      setData(mappedData);
    }
  }, [schoolsData]);

  // Search functionality
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

  // Delete school handler
  const handleDelete = async (schoolId: string) => {
    try {
      await dispatch(deleteSchoolApi(schoolId));
      message.success("School deleted successfully");
      dispatch(fetchSchoolsApi()); // refresh list after deletion
    } catch (error) {
      message.error("Failed to delete school");
    }
  };

  // Table columns
  const columns: ColumnsType<School> = [
    {
      title: "School Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
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
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: School["status"]) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: School) => (
        <Popconfirm
          title="Are you sure to delete this school?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Tag color="red" style={{ cursor: "pointer" }}>
            Delete
          </Tag>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table<School>
      columns={columns}
      dataSource={data}
      loading={schoolsDataLoading}
      rowKey="id"
      pagination={{ pageSize: 10, hideOnSinglePage: true }}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default AllSchools;
