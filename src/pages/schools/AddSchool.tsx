import React from "react";
import { Form, Input, Button, Row, Col, Flex, message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addSchoolApi, fetchSchoolsApi } from "../../store/Schools/SchoolsActions";

const AddSchool: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (values: any) => {
    // Map form data to API schema
    const payload = {
      name: values.schoolName,
      address: values.address,
      phone: values.phone,
      isActive: true, // default active
    };

    try {
      await dispatch(addSchoolApi(payload));
      message.success("School added successfully!");
      dispatch(fetchSchoolsApi()); 
      form.resetFields();
    } catch (error: any) {
      message.error(error.message || "Failed to add school");
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
          {/* School Name */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="schoolName"
              label="School Name"
              rules={[{ required: true, message: "Please enter school name" }]}
            >
              <Input placeholder="Enter school name" />
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
          <Col xs={24} sm={12} md={12} lg={8}>
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
              Add School
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
};

export default AddSchool;
