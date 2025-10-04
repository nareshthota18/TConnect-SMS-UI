import React, { useEffect } from "react";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchRolesApi } from "../../store/Roles/RoleActions";

// Match API response shape
interface Role {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

const AllRoles: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface RolesState {
    rolesData: [];
    rolesDataLoading: boolean;
    rolesDataError: boolean;
  }

  const { rolesData, rolesDataLoading } = useSelector(
    (state: RootState) => state.roles as RolesState
  );

  // Fetch roles on mount
  useEffect(() => {
    dispatch(fetchRolesApi());
  }, [dispatch]);

  // Define columns (plain, no filters or search)
  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
  ];

  return (
    <Table<Role>
      columns={columns}
      dataSource={rolesData || []}
      loading={rolesDataLoading}
      rowKey={(record) => record.id}
      pagination={{ pageSize: 10, hideOnSinglePage: true }}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default AllRoles;
