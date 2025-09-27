import React, { useEffect } from "react";
import { Table, Tag, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchUserApi } from "../../store/Users/UserActions";

// Match API response shape
interface User {
  username: string;
  email: string;
  phone: string;
  staffId: string | null;
  roleId: string;
  externalId: string | null;
  isActive: boolean;
}

const AllUsers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface UserState {
    userData: any;
    userDataLoading: boolean;
    userDataError: boolean;
  }

  const { userData, userDataLoading } = useSelector(
    (state: RootState) => state.user as UserState
  );

  // ✅ Fetch data on mount
  useEffect(() => {
    dispatch(fetchUserApi());
  }, [dispatch]);

  // 🔎 Search functionality
  const getColumnSearchProps = (dataIndex: keyof User): ColumnType<User> => ({
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
    (record[dataIndex] ?? "")
      .toString()
      .toLowerCase()
      .includes(String(value).toLowerCase()),
  
  });

  // ✅ Define columns for API fields
  const columns: ColumnsType<User> = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.isActive === (value as boolean),
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    }    
  ];

  return (
    <Table<User>
      columns={columns}
      dataSource={userData || []}
      loading={userDataLoading}
      rowKey={(record) => record.username} // Use username as unique key
      pagination={{ pageSize: 10 }}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default AllUsers;
