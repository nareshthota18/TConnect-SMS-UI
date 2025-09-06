import React from "react";
import { Form, Input, Button, Row, Col, Select, InputNumber } from "antd";

const { Option } = Select;

const AddInventory = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Inventory Data:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 24 }}
    >
      {/* Row 1 */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="itemName"
            label="Item Name"
            rules={[{ required: true, message: "Please enter item name" }]}
          >
            <Input placeholder="Enter inventory item name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select category">
              <Option value="electronics">Electronics</Option>
              <Option value="furniture">Furniture</Option>
              <Option value="stationery">Stationery</Option>
              <Option value="kitchen">Kitchen</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} placeholder="Enter quantity" />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 2 */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="unitPrice"
            label="Unit Price"
            rules={[{ required: true, message: "Please enter unit price" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Enter price per unit"
              prefix="₹"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please enter storage location" }]}
          >
            <Input placeholder="Enter storage location" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="supplier"
            label="Supplier"
            rules={[{ required: true, message: "Please enter supplier name" }]}
          >
            <Input placeholder="Enter supplier name" />
          </Form.Item>
        </Col>
      </Row>

      {/* Row 3 */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="purchaseDate"
            label="Purchase Date"
            rules={[{ required: true, message: "Please select purchase date" }]}
          >
            <Input type="date" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select status">
              <Option value="available">Available</Option>
              <Option value="in-use">In Use</Option>
              <Option value="damaged">Damaged</Option>
              <Option value="discarded">Discarded</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="remarks"
            label="Remarks"
          >
            <Input placeholder="Enter remarks (optional)" />
          </Form.Item>
        </Col>
      </Row>

      {/* Submit Button */}
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Add Inventory
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddInventory;
