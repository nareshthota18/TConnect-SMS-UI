import React from "react";
import { Row, Col, Form, Input, Button, message } from "antd";
import type { FormProps } from "antd";
import { useDispatch } from "react-redux";
import { addDesignationsApi, fetchDesignationsApi } from "../../store/Dropdowns/DropdownActions";
import { AppDispatch } from "../../store/store";

interface DesignationFormValues {
  designationName: string;
}

const Designations: React.FC = () => {
  const [form] = Form.useForm<DesignationFormValues>();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish: FormProps<DesignationFormValues>["onFinish"] = async (values) => {
    const payload = {
      value: values.designationName, // ✅ API expects "name"
    };

    const response = await dispatch<any>(addDesignationsApi(payload));

    if (response) {
      message.success("Designation added successfully!");
      form.resetFields();
      dispatch(fetchDesignationsApi());
    } else {
      message.error("Failed to add designation");
    }
  };

  return (
    <Form<DesignationFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 24 }}
    >
      <Row gutter={[16, 0]}>
        
        {/* Designation Field */}
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Designation"
            name="designationName"
            rules={[
              { required: true, message: "Please enter designation" },
            ]}
          >
            <Input placeholder="Enter designation" />
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

export default Designations;
