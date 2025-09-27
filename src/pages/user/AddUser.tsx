import React, { useEffect, useState } from "react";
import { Form, Input, Select, Row, Col, Button, DatePicker, Switch, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchStaffApi } from "../../store/Staff/StaffActions";
import { fetchRolesApi } from "../../store/Roles/RoleActions";
import { addUserApi, fetchUserApi } from "../../store/Users/UserActions";

const { Option } = Select;

const AddUser = () => {
  const [form] = Form.useForm();
  const [staffOptions, setStaffOptions] = useState<{ label: string; value: string }[]>([]);
  const [rollOptions, setRollOptions] = useState<{ label: string; value: string }[]>([]);
  const dispatch = useDispatch<AppDispatch>();

interface StaffState {
  staffData: any;
  staffDataLoading: boolean;
  staffDataError: boolean;
}

interface RolesState {
  rolesData: [];
  rolesDataLoading: boolean;
  rolesDataError: boolean;
}

interface UserState {
  addUserData: [],
  addUserLoading: false,
  addUserError: false,
}

const { addUserData, addUserLoading } = useSelector(
  (state: RootState) => state.user as UserState
);

const { rolesData, rolesDataLoading } = useSelector(
  (state: RootState) => state.roles as RolesState
);

const { staffData, staffDataLoading } = useSelector(
  (state: RootState) => state.staff as StaffState
);

useEffect(() => {
  dispatch(fetchStaffApi());
  dispatch(fetchRolesApi());
}, [dispatch]);

useEffect(() => {
  if (staffData?.length) {
    const options = staffData.map((item: { id: string; fullName: string }) => ({
      label: item.fullName,
      value: item.id,
    }));
    setStaffOptions(options);
  }
}, [staffData]);

useEffect(() => {
  if (rolesData?.length) {
    const options = rolesData.map((item: { id: string; name: string }) => ({
      label: item.name,
      value: item.id,
    }));
    setRollOptions(options);
  }
}, [rolesData]);

const handleSubmit = async (values: any) => {
  const payload = {
    username: values.username,
    email: values.email,
    phone: values.phone,
    staffId: values.staff,
    roleId: values.role,
    externalId: values.externalId || "",
    isActive: values.isActive ?? true,
  };

  try {
    await dispatch(addUserApi(payload));
    message.success("User added successfully!");
    dispatch(fetchUserApi());
    form.resetFields();
  } catch (error: any) {
    message.error(error?.message || "Failed to add user");
  }
};

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ padding: 24 }}
    >
      <Row gutter={16}>
      <Col xs={24} sm={12} md={12} lg={8} >
          <Form.Item
            label="User Name"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input placeholder="Enter User Name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} >
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Enter Phone Number" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} >
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select
                        placeholder="Select Item Type"
                        loading={rolesDataLoading}
                        options={rollOptions}
                        allowClear
                      />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} >
          <Form.Item
            label="Staff"
            name="staff"
            rules={[{ required: true, message: "Please select Staff" }]}
          >
             <Select
                        placeholder="Select Item Type"
                        loading={staffDataLoading}
                        options={staffOptions}
                        allowClear
                      />
          </Form.Item>
        </Col>

      </Row>

      <Row>
        <Col span={24} style={{ textAlign: "left" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddUser;
