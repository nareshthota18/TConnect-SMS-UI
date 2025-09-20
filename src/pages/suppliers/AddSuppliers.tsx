import React from "react";
import { Form, Input, Button, Row, Col, Select, DatePicker, Flex } from "antd";

const { Option } = Select;

const AddSuppliers: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Supplier Form Values:", values);
  };

  return (
    <div style={{ padding: 24 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: "100%" }}
      >
        <Row gutter={16}>
          {/* Supplier Name */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="supplierName"
              label="Supplier Name"
              rules={[{ required: true, message: "Please enter supplier name" }]}
            >
              <Input placeholder="Enter supplier name" />
            </Form.Item>
          </Col>

          {/* Supplier Code */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="supplierCode"
              label="Supplier Code"
              rules={[{ required: true, message: "Please enter supplier code" }]}
            >
              <Input placeholder="Enter supplier code" />
            </Form.Item>
          </Col>

          {/* Category */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select placeholder="Select category">
                <Option value="Raw Material">Raw Material</Option>
                <Option value="Services">Services</Option>
                <Option value="Equipment">Equipment</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Contact Person */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="contactPerson"
              label="Contact Person"
              rules={[{ required: true, message: "Please enter contact person" }]}
            >
              <Input placeholder="Enter contact person name" />
            </Form.Item>
          </Col>

          {/* Email */}
          <Col xs={24} sm={12} md={12} lg={8}>
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
          <Col xs={24} sm={12} md={12} lg={8}>
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

           {/* Website */}
           <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="website" label="Website">
              <Input placeholder="Enter website URL" />
            </Form.Item>
          </Col>

          {/* Address */}
          <Col xs={24} sm={12} md={12} lg={16}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>
          </Col>

        </Row>

        <Flex justify="end">
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Supplier
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
};

export default AddSuppliers;
