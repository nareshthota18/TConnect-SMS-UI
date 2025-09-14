import React from "react";
import { Form, Input, Button, Row, Col, Select, DatePicker, Flex } from "antd";

const { Option } = Select;

const AddSchool: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("School Form Values:", values);
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

          {/* School Code */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="schoolCode"
              label="School Code"
              rules={[{ required: true, message: "Please enter school code" }]}
            >
              <Input placeholder="Enter school code" />
            </Form.Item>
          </Col>

          {/* Affiliation Number */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="affiliationNumber"
              label="Affiliation Number"
              rules={[
                { required: true, message: "Please enter affiliation number" },
              ]}
            >
              <Input placeholder="Enter affiliation number" />
            </Form.Item>
          </Col>

          {/* Established Date */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="establishedDate"
              label="Established Date"
              rules={[{ required: true, message: "Please select established date" }]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="Select date" />
            </Form.Item>
          </Col>

          {/* Type of School */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="schoolType"
              label="School Type"
              rules={[{ required: true, message: "Please select school type" }]}
            >
              <Select placeholder="Select school type">
                <Option value="public">Public</Option>
                <Option value="private">Private</Option>
                <Option value="government">Government</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Principal Name */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="principalName"
              label="Principal Name"
              rules={[{ required: true, message: "Please enter principal name" }]}
            >
              <Input placeholder="Enter principal name" />
            </Form.Item>
          </Col>

          {/* Contact Email */}
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

          {/* Contact Phone */}
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
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input.TextArea rows={3} placeholder="Enter address" />
            </Form.Item>
          </Col>

        </Row>

        <Flex justify="end">
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add School
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
};

export default AddSchool;
