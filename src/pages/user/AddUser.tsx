import React, { useEffect, useState } from "react";
import { Form, Input, Select, Row, Col, Button, DatePicker, Switch, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchStaffApi } from "../../store/Staff/StaffActions";
import { fetchRolesApi } from "../../store/Roles/RoleActions";
import { addUserApi, fetchUserApi } from "../../store/Users/UserActions";
import { fetchSchoolsApi } from "../../store/Schools/SchoolsActions";

const { Option } = Select;

const AddUser = () => {
  const [form] = Form.useForm();
  const [schoolOptions, setSchoolOptions] = useState<{ label: string; value: string }[]>([]);
  const [rollOptions, setRollOptions] = useState<{ label: string; value: string }[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const role = localStorage.getItem("userRole"); 

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

interface SchoolsState {
  schoolsData: any[];
  schoolsDataLoading: boolean;
  schoolsDataError: boolean;
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

const { schoolsData, schoolsDataLoading } = useSelector(
  (state: RootState) => state.schools as SchoolsState
);

useEffect(() => {
  dispatch(fetchStaffApi());
  dispatch(fetchRolesApi());
  dispatch(fetchSchoolsApi());
}, [dispatch]);

useEffect(() => {
  if (schoolsData?.length) {
    const options = schoolsData.map((item: { schoolId: string; schoolName: string }) => ({
      label: item.schoolName,
      value: item.schoolId,
    }));
    setSchoolOptions(options);
  }
}, [schoolsData]);

// Role dropdown - filter based on logged-in role
useEffect(() => {
  if (rolesData?.length) {
    let filteredRoles: any[] = rolesData;

    if (role === "SuperAdmin") {
      filteredRoles = rolesData.filter(
        (r: { name: string }) => r.name === "Admin" || r.name === "Staff"
      );
    } else if (role === "Admin") {
      filteredRoles = rolesData.filter((r: { name: string }) => r.name === "Staff");
    }

    const options = filteredRoles.map((item: { id: string; name: string }) => ({
      label: item.name,
      value: item.id,
    }));
    setRollOptions(options);
  }
}, [rolesData, role]);

const handleSubmit = async (values: any) => {
  const payload = {
    username: values.username,
    email: values.email,
    phone: values.phone,
    roleId: values.role,
    rsHostelId: values.school,
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
            label="Select School"
            name="school"
            rules={[{ required: true, message: "Please select Staff" }]}
          >
             <Select
                        placeholder="Select Item Type"
                        loading={schoolsDataLoading}
                        options={schoolOptions}
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
