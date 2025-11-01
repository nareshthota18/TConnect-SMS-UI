import React, { useEffect } from "react";
import { Table, Tag, Popconfirm, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchRolesApi, deleteRoleApi } from "../../store/Roles/RoleActions";

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
    rolesData: Role[];
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

  // Delete role handler
  const handleDelete = async (roleId: string) => {
    try {
      await dispatch(deleteRoleApi(roleId));
      message.success("Role deleted successfully");
      dispatch(fetchRolesApi()); // refresh list after deletion
    } catch (error) {
      message.error("Failed to delete role");
    }
  };

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
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Role) => {
        const isSuperAdmin = record.name === "SuperAdmin";

        return isSuperAdmin ? (
          <Tag color="gray" style={{ cursor: "not-allowed", opacity: 0.6 }}>
            Delete
          </Tag>
        ) : (
          <Popconfirm
            title="Are you sure to delete this role?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tag color="red" style={{ cursor: "pointer" }}>
              Delete
            </Tag>
          </Popconfirm>
        );
      },
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
