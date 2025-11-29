import React from "react";
import { Form, Input, Select, Row, Col, Button, DatePicker, Switch, message, InputNumber } from "antd";

const { Option } = Select;

const AddExam: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
    message.success("Exam added successfully!");
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ padding: 24 }}
    >
      <Row gutter={16}>

        {/* Exam Name */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Exam Name"
            name="examName"
            rules={[{ required: true, message: "Please enter exam name" }]}
          >
            <Input placeholder="Enter Exam Name" />
          </Form.Item>
        </Col>

        {/* Category */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select Category">
              <Option value="Mathematics">Mathematics</Option>
              <Option value="Science">Science</Option>
              <Option value="Language">Language</Option>
              <Option value="General">General</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* Exam Date */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Exam Date"
            name="examDate"
            rules={[{ required: true, message: "Please select exam date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        {/* Total Marks */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Total Marks"
            name="totalMarks"
            rules={[{ required: true, message: "Please enter total marks" }]}
          >
            <InputNumber placeholder="Total Marks" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        {/* Pass Marks */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Pass Marks"
            name="passMarks"
            rules={[{ required: true, message: "Please enter pass marks" }]}
          >
            <InputNumber placeholder="Pass Marks" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        {/* Active/Inactive */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Status"
            name="isActive"
            initialValue={true}
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Col>
      </Row>

      {/* Submit button */}
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

export default AddExam;
