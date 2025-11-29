import React from "react";
import { Form, Input, Row, Col, Button, Select, InputNumber, message } from "antd";

const { Option } = Select;

const AddResult: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log(values);
    message.success("Result added successfully!");
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ padding: 24 }}>
      <Row gutter={16}>

        {/* Student Name */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Student Name"
            name="studentName"
            rules={[{ required: true, message: "Please enter student name" }]}
          >
            <Input placeholder="Enter Student Name" />
          </Form.Item>
        </Col>

        {/* Exam Name */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Exam"
            name="exam"
            rules={[{ required: true, message: "Please select exam" }]}
          >
            <Select placeholder="Select Exam">
              <Option value="Math Final">Math Final</Option>
              <Option value="Science Midterm">Science Midterm</Option>
              <Option value="English Test">English Test</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* Marks Obtained */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Marks Obtained"
            name="marks"
            rules={[{ required: true, message: "Enter marks" }]}
          >
            <InputNumber placeholder="Marks" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        {/* Grade */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Grade"
            name="grade"
            rules={[{ required: true, message: "Select grade" }]}
          >
            <Select placeholder="Select Grade">
              <Option value="A+">A+</Option>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* Status */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Select result status" }]}
          >
            <Select placeholder="Select Status">
              <Option value="Pass">Pass</Option>
              <Option value="Fail">Fail</Option>
            </Select>
          </Form.Item>
        </Col>

      </Row>

      <Row>
        <Col span={24}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddResult;
