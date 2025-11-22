import React from "react";
import { Row, Col, Form, Input, Button, message } from "antd";
import type { FormProps } from "antd";
import { useDispatch } from "react-redux";
import { addAttendanceTypesApi, fetchAttendanceTypesApi } from "../../store/Dropdowns/DropdownActions";
import { AppDispatch } from "../../store/store";

interface AttendanceFormValues {
  attendanceType: string;
}

const AttendanceTypes: React.FC = () => {
  const [form] = Form.useForm<AttendanceFormValues>();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish: FormProps<AttendanceFormValues>["onFinish"] = async (values) => {
    const payload = {
      value: values.attendanceType, // ✅ API expects "name"
    };

    const response = await dispatch<any>(addAttendanceTypesApi(payload));

    if (response) {
      message.success("Attendance type added successfully!");
      form.resetFields();
      dispatch(fetchAttendanceTypesApi());
    } else {
      message.error("Failed to add attendance type");
    }
  };

  return (
    <Form<AttendanceFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 24 }}
    >
      <Row gutter={[16, 0]}>
        
        {/* Attendance Type Field */}
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Attendance Type"
            name="attendanceType"
            rules={[
              { required: true, message: "Please enter attendance type" },
            ]}
          >
            <Input placeholder="Enter attendance type" />
          </Form.Item>
        </Col>

        {/* Submit Button */}
        <Col xs={24} sm={24} md={24}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>

      </Row>
    </Form>
  );
};

export default AttendanceTypes;
