import React from "react";
import { Form, Input, DatePicker, Select, Button, Row, Col } from "antd";

const { Option } = Select;

const AddActivity: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form Values:", values);
    // 🚀 API call to save activity
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ status: "Upcoming" }}
      style={{ padding: "24px" }}
    >
      <Row gutter={[16, 0]}>
        {/* Activity Title */}
        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item
            label="Activity Title"
            name="title"
            rules={[{ required: true, message: "Please enter activity title" }]}
          >
            <Input placeholder="Enter activity title" />
          </Form.Item>
        </Col>

        {/* Type */}
        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select activity type" }]}
          >
            <Select placeholder="Select type">
              <Option value="Sports">Sports</Option>
              <Option value="Education">Education</Option>
              <Option value="Cultural">Cultural</Option>
              <Option value="Medical">Medical</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* Date */}
        <Col xs={24} sm={24} md={12} lg={8}>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        {/* Description (full width) */}
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea placeholder="Enter activity description" rows={3} />
          </Form.Item>
        </Col>

        {/* Submit Button */}
        <Col xs={24} sm={24} md={12} lg={8}>
            <Button type="primary" htmlType="submit" >
              Add Activity
            </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddActivity;
