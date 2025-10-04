import React, { useState } from "react";
import { Form, Input, Row, Col, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addRoleApi, fetchRolesApi } from "../../store/Roles/RoleActions";

const AddRole: React.FC = ({ }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  // Handle form submission
  const handleSubmit = async (values: any) => {
    const payload = {
      name: values.name,
      description: values.description,
    };

    try {
      await dispatch(addRoleApi(payload));
      message.success("Role added successfully!");
      dispatch(fetchRolesApi());
      form.resetFields();
    } catch (error: any) {
      message.error(error?.message || "Failed to add role");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ padding: 24 }} // ✅ Matches AddUser design
    >
      <Row gutter={16}>
        {/* Role Name */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item
            label="Role Name"
            name="name"
            rules={[{ required: true, message: "Please enter role name" }]}
          >
            <Input placeholder="Enter Role Name" />
          </Form.Item>
        </Col>

        {/* Role Description */}
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input placeholder="Enter Description" />
          </Form.Item>
        </Col>
      </Row>

      {/* Submit Button */}
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

export default AddRole;
