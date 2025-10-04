import React, { useState, useEffect } from "react";
import { Table, Tag, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchSchoolsApi } from "../../store/Schools/SchoolsActions";

interface School {
  id: string;                 // id from API is string
  name: string;
  address: string;
  phone: string;
  status: "Active" | "Inactive";
}

const AllSchools: React.FC = () => {
  const [data, setData] = useState<School[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  // ✅ Define the state interface for schools
  interface SchoolsState {
    schoolsData: any[];
    schoolsDataLoading: boolean;
    schoolsDataError: boolean;
  }

  // ✅ Extract data from Redux store
  const { schoolsData, schoolsDataLoading } = useSelector(
    (state: RootState) => state.schools as SchoolsState
  );

  // ✅ Fetch schools on component mount
  useEffect(() => {
    dispatch(fetchSchoolsApi());
  }, [dispatch]);

  // ✅ Map API response to table data
  useEffect(() => {
    if (schoolsData && schoolsData.length > 0) {
      const mappedData: School[] = schoolsData.map((item: any) => ({
        id: item.id,
        name: item.name,
        address: item.address,
        phone: item.phone,
        status: item.isActive ? "Active" : "Inactive",
      }));
      setData(mappedData);
    }
  }, [schoolsData]);

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

  // ✅ Table Columns
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
