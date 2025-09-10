import React from "react";
import { Form, Input, InputNumber, DatePicker, Button, Select, Row, Col } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const AddStudentHealth = ({   }) => {
  const [form] = Form.useForm();

  const handleFinish = ( ) => {
    console.log("Form Submitted:",  );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ padding: 24 }}
    >
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item label="Student ID" name="student_id" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item label="Height (cm)" name="height_cm">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item label="Weight (kg)" name="weight_kg">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item label="Blood Group" name="blood_group">
            <Select placeholder="Select Blood Group">
              <Option value="A+">A+</Option>
              <Option value="A-">A-</Option>
              <Option value="B+">B+</Option>
              <Option value="B-">B-</Option>
              <Option value="O+">O+</Option>
              <Option value="O-">O-</Option>
              <Option value="AB+">AB+</Option>
              <Option value="AB-">AB-</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item label="Allergies" name="allergies">
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item label="Chronic Conditions" name="chronic_conditions">
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item label="Medications" name="medications">
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item label="Emergency Contact Name" name="emergency_contact_name">
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item label="Emergency Contact Number" name="emergency_contact_number">
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item label="Last Checkup Date" name="last_checkup_date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item label="Doctor Notes" name="doctor_notes">
            <TextArea rows={3} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" >
          Save Health Record
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddStudentHealth;
