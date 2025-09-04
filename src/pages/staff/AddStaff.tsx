import React from "react";
import { Form, Input, Button, Select, DatePicker, Row, Col, Flex } from "antd";

const { Option } = Select;

const AddStaff = () => {
  const [form] = Form.useForm();

  const handleFinish = ( ) => {
    console.log("Staff Details:",  );
  };

  return (
    <div  style={{ padding: 24}}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Row gutter={[16, 16]}>
          {/* Full Name */}
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please enter staff name" }]}
            >
              <Input placeholder="Enter staff name" />
            </Form.Item>
          </Col>

          {/* Role */}
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select role" }]}
            >
              <Select placeholder="Select staff role">
                <Option value="Teacher">Teacher</Option>
                <Option value="Administrator">Administrator</Option>
                <Option value="Clerk">Clerk</Option>
                <Option value="Accountant">Accountant</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Department */}
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="department"
              label="Department"
              rules={[{ required: true, message: "Please enter department" }]}
            >
              <Input placeholder="Enter department name" />
            </Form.Item>
          </Col>

          {/* Email */}
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>

          {/* Phone */}
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>

          {/* Joining Date */}
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="joiningDate"
              label="Joining Date"
              rules={[{ required: true, message: "Please select joining date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* Address - Full Width */}
          <Col span={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input.TextArea rows={3} placeholder="Enter staff address" />
            </Form.Item>
          </Col>

          
        </Row>
        <Flex justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Staff
          </Button>
        </Form.Item>
      </Flex>
      </Form>
    </div>
  );
};

export default AddStaff;
