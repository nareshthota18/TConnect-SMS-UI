import React from "react";
import { Form, Input, Select, Row, Col, Button, DatePicker, Switch } from "antd";

const { Option } = Select;

const AddUser = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("User Data Submitted:", values);
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
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="Enter Full Name" />
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
            <Select placeholder="Select Role">
              <Option value="admin">Admin</Option>
              <Option value="manager">Manager</Option>
              <Option value="staff">Staff</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} >
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select Status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="blocked">Blocked</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} >
          <Form.Item
            label="Joining Date"
            name="joiningDate"
            rules={[{ required: true, message: "Please select joining date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} >
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} >
          <Form.Item label="Confirm Password" name="confirmPassword" dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} >
          <Form.Item
            label="Two Factor Authentication"
            name="twoFA"
            valuePropName="checked"
          >
            <Switch />
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
