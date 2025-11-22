import React from "react";
import { Row, Col, Form, Input, Button, message } from "antd";
import type { FormProps } from "antd";
import { useDispatch } from "react-redux";
import { addDepartmentsApi, fetchDepartmentsApi } from "../../store/Dropdowns/DropdownActions";
import { AppDispatch } from "../../store/store";

interface DepartmentFormValues {
  name: string;
}

const Departments: React.FC = () => {
  const [form] = Form.useForm<DepartmentFormValues>();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish: FormProps<DepartmentFormValues>["onFinish"] = async (values) => {
    const payload = {
      value: values.name,
    };

    const response = await dispatch<any>(addDepartmentsApi(payload));

    if (response) {
      message.success("Department added successfully!");
      form.resetFields();
      dispatch(fetchDepartmentsApi());
    } else {
      message.error("Failed to add department");
    }
  };

  return (
    <Form<DepartmentFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 24 }}
    >
      <Row gutter={[16, 0]}>
        {/* Department Name */}
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Department Name"
            name="name"
            rules={[{ required: true, message: "Please enter department name" }]}
          >
            <Input placeholder="Enter department name" />
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

export default Departments;
