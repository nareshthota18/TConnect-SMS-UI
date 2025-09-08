import React from "react";
import { Form, Input, Button, Row, Col, Select, InputNumber } from "antd";

const { Option } = Select;

const AddGrocery = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Grocery Data:", values);
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
        <Col xs={24} sm={12} md={8} lg={8} >
          <Form.Item
            name="itemName"
            label="Item Name"
            rules={[{ required: true, message: "Please enter item name" }]}
          >
            <Input placeholder="Enter grocery item name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} >
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select category">
              <Option value="vegetable">Vegetable</Option>
              <Option value="fruit">Fruit</Option>
              <Option value="dairy">Dairy</Option>
              <Option value="beverage">Beverage</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} >
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
      <Col xs={24} sm={12} md={8} lg={8} >
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Enter price"
              prefix="₹"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} >
          <Form.Item
            name="unit"
            label="Unit"
            rules={[{ required: true, message: "Please select unit" }]}
          >
            <Select placeholder="Select unit">
              <Option value="kg">Kg</Option>
              <Option value="litre">Litre</Option>
              <Option value="piece">Piece</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} >
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
      <Col xs={24} sm={12} md={8} lg={8} >
          <Form.Item
            name="expiryDate"
            label="Expiry Date"
            rules={[{ required: true, message: "Please select expiry date" }]}
          >
            <Input type="date" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} >
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: "Please enter brand name" }]}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} >
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
            Add Grocery
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddGrocery;
