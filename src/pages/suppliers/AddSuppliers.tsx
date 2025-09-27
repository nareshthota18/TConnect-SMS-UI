import React from "react";
import { Form, Input, Button, Row, Col, Flex, message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addSupplierApi, fetchSupplierApi } from "../../store/Suppliers/SuppliersActions";

const AddSuppliers: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (values: any) => {
    // Map form data to API schema
    const payload = {
      name: values.supplierName,
      gstNumber: values.gstnumber,
      email: values.email,
      phone: values.phone,
      address: values.address,
      isActive: true, // default active
    };

    try {
      await dispatch(addSupplierApi(payload));
      message.success("Supplier added successfully!");
      dispatch(fetchSupplierApi());
      form.resetFields();
    } catch (error: any) {
      message.error(error.message || "Failed to add supplier");
    }
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

          {/* GST Number */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="gstnumber"
              label="GST Number"
              rules={[{ required: true, message: "Please enter GST Number" }]}
            >
              <Input placeholder="Enter GST Number" />
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
            <Button type="primary" htmlType="submit">
              Add Supplier
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
};

export default AddSuppliers;
