import React from "react";
import { Form, Input, Button, Select, DatePicker, Row, Col } from "antd";

const { Option } = Select;

const SubmitAsset: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Submitted Asset Details:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 24 }}
    >
      <Row gutter={16}>
        {/* Asset ID */}
        <Col span={8}>
          <Form.Item
            name="assetId"
            label="Asset ID"
            rules={[{ required: true, message: "Please enter asset ID" }]}
          >
            <Input placeholder="Enter asset ID" />
          </Form.Item>
        </Col>

        {/* Submitted By */}
        <Col span={8}>
          <Form.Item
            name="submittedBy"
            label="Submitted By"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
        </Col>

        {/* Submission Date */}
        <Col span={8}>
          <Form.Item
            name="submissionDate"
            label="Submission Date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Status Dropdown */}
        <Col span={8}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select status">
              <Option value="damage">Damage</Option>
              <Option value="theft">Theft</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* Reason */}
        <Col span={16}>
          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: "Please provide reason" }]}
          >
            <Input.TextArea rows={1} placeholder="Enter reason for damage or theft" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Submit Asset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SubmitAsset;
