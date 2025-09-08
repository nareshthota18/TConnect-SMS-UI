import React from "react";
import { Form, Input, Button, DatePicker, Select, Row, Col } from "antd";

const { Option } = Select;

const AddAsset: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form Values:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 24 }}
    >
      <Row gutter={16}>
        {/* Asset Name */}
        <Col xs={24} sm={12} md={8} lg={8} >
          <Form.Item
            name="assetName"
            label="Asset Name"
            rules={[{ required: true, message: "Please enter asset name" }]}
          >
            <Input placeholder="Enter asset name" />
          </Form.Item>
        </Col>

        {/* Asset Type */}
        <Col xs={24} sm={12} md={8} lg={8} >
          <Form.Item
            name="assetType"
            label="Asset Type"
            rules={[{ required: true, message: "Please select asset type" }]}
          >
            <Select placeholder="Select asset type">
              <Option value="electronic">Electronic</Option>
              <Option value="furniture">Furniture</Option>
              <Option value="vehicle">Vehicle</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* Purchase Date */}
        <Col xs={24} sm={12} md={8} lg={8} >
          <Form.Item
            name="purchaseDate"
            label="Purchase Date"
            rules={[{ required: true, message: "Please select purchase date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Asset Value */}
        <Col xs={24} sm={12} md={8} lg={8} >
          <Form.Item
            name="assetValue"
            label="Asset Value"
            rules={[{ required: true, message: "Please enter asset value" }]}
          >
            <Input type="number" placeholder="Enter asset value" />
          </Form.Item>
        </Col>

        {/* Assigned To */}
        <Col xs={24} sm={12} md={8} lg={8} >
          <Form.Item name="assignedTo" label="Assigned To">
            <Input placeholder="Enter person or department name" />
          </Form.Item>
        </Col>

        {/* Status */}
        <Col xs={24} sm={12} md={8} lg={8} >
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select status">
              <Option value="available">Available</Option>
              <Option value="allocated">Allocated</Option>
              <Option value="maintenance">Maintenance</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddAsset;
