import React, { useEffect } from "react";
import { Table, Button, Popconfirm, message, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchStaffApi, deleteStaffApi } from "../../store/Staff/StaffActions";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";

const AllStaff = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface StaffState {
    staffData: any[];
    staffDataLoading: boolean;
    staffDataError: boolean;
  }

  const { staffData, staffDataLoading } = useSelector(
    (state: RootState) => state.staff as StaffState
  );

  useEffect(() => {
    dispatch(fetchStaffApi());
  }, [dispatch]);

  // Handle Delete
  const handleDelete = async (staffId: string | number) => {
    try {
      await dispatch(deleteStaffApi(staffId));
      message.success("Staff deleted successfully");
      // Refresh the list
      dispatch(fetchStaffApi());
    } catch (error) {
      message.error("Failed to delete staff");
    }
  };

  const dataSource = staffData?.map((staff: any, index: number) => ({
    key: staff.id || staff.staffId || index, // ✅ unique key
    id: staff.id || staff.staffId || index,
    name: staff.fullName,
    designation: staff.designationName || "",
    department: staff.departmentName || "",
    email: staff.email,
    phone: staff.phone,
  }));

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Are you sure to delete this staff?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
         <Tag color={"red"} style={{ cursor: 'pointer'}}>
          Delete
          </Tag>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      loading={{
        spinning: staffDataLoading,
        indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />,
      }}
      columns={columns}
      bordered
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 10, hideOnSinglePage: true }}
    />
  );
};

export default AllStaff;
