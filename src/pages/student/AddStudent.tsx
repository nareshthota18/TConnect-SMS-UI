import React from "react";
import { Form, Input, Button, Row, Col, Select, DatePicker, Flex } from "antd";

const { Option } = Select;

const AddStudent = () => {
  const [form] = Form.useForm();

  const onFinish = ( ) => {
  };

  return (
    <div style={{ padding: 24}}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: "100%" }}
      >
        {/* Row 1 */}
        <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="admissionNumber"
              label="Admission Number"
              rules={[{ required: true, message: "Please enter admission number" }]}
            >
              <Input placeholder="Enter admission number" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="name"
              label="Student Name"
              rules={[{ required: true, message: "Please enter student name" }]}
            >
              <Input placeholder="Enter student name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="rollNumber"
              label="Roll Number"
              rules={[{ required: true, message: "Please enter roll number" }]}
            >
              <Input placeholder="Enter roll number" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row 2 */}
        <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="dob"
              label="Date of Birth"
              rules={[{ required: true, message: "Please select date of birth" }]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="Select date" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="age"
              label="Age"
              rules={[
                { required: true, message: "Please enter age" },
                { pattern: /^[0-9]+$/, message: "Age must be a number" },
              ]}
            >
              <Input placeholder="Enter age" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Row 3 */}
        <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="class"
              label="Class"
              rules={[{ required: true, message: "Please enter class" }]}
            >
              <Input placeholder="Enter class" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="section"
              label="Section"
              rules={[{ required: true, message: "Please enter section" }]}
            >
              <Input placeholder="Enter section" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="bloodGroup"
              label="Blood Group"
              rules={[{ required: true, message: "Please enter blood group" }]}
            >
              <Input placeholder="Enter blood group" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row 4 */}
        <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} >
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
          <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter phone number" },
                { pattern: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row 5 */}
        <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="fatherName"
              label="Father Name"
              rules={[{ required: true, message: "Please enter father name" }]}
            >
              <Input placeholder="Enter father name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="motherName"
              label="Mother Name"
              rules={[{ required: true, message: "Please enter mother name" }]}
            >
              <Input placeholder="Enter mother name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="guardianName"
              label="Guardian Name"
            >
              <Input placeholder="Enter guardian name" />
            </Form.Item>
          </Col>
        </Row>

        {/* Row 6 */}
        <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="guardianPhone"
              label="Guardian Contact Number"
            >
              <Input placeholder="Enter guardian phone" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="caste"
              label="Caste"
            >
              <Input placeholder="Enter caste" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} >
            <Form.Item
              name="aadhar"
              label="Aadhar Number"
            >
              <Input placeholder="Enter Aadhar number" />
            </Form.Item>
          </Col>
        </Row>

        <Flex justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Student
          </Button>
        </Form.Item>
      </Flex>
      </Form>
    </div>
  );
};

export default AddStudent;
