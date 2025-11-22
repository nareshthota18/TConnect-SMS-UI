import React from "react";
import { Row, Col, Form, Input, Button, message } from "antd";
import type { FormProps } from "antd";
import { useDispatch } from "react-redux";
import { addGradesApi, fetchGradesApi } from "../../store/Dropdowns/DropdownActions";
import { AppDispatch } from "../../store/store";

interface GradeFormValues {
  gradeName: string;
}

const Grades: React.FC = () => {
  const [form] = Form.useForm<GradeFormValues>();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish: FormProps<GradeFormValues>["onFinish"] = async (values) => {
    const payload = {
      value: values.gradeName,
    };

    const response = await dispatch<any>(addGradesApi(payload));

    if (response) {
      message.success("Grade added successfully!");
      form.resetFields();
      dispatch(fetchGradesApi());
    } else {
      message.error("Failed to add grade");
    }
  };

  return (
    <Form<GradeFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 24 }}
    >
      <Row gutter={[16, 0]}>
        {/* Grade Field */}
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Grade"
            name="gradeName"
            rules={[{ required: true, message: "Please enter grade" }]}
          >
            <Input placeholder="Enter grade" />
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

export default Grades;
