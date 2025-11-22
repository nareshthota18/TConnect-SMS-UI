import React from "react";
import { Row, Col, Form, Input, Button, message } from "antd";
import type { FormProps } from "antd";
import { useDispatch } from "react-redux";
import { addCategoriesApi, fetchCategoriesApi } from "../../store/Dropdowns/DropdownActions";
import { AppDispatch, RootState } from "../../store/store";

interface CategoryFormValues {
  categoryName: string;
}

const Categories: React.FC = () => {
  const [form] = Form.useForm<CategoryFormValues>();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish: FormProps<CategoryFormValues>["onFinish"] = async (values) => {

    const payload = {
      value: values.categoryName,
    };

    const response = await dispatch<any>(addCategoriesApi(payload));

    if (response) {
      message.success("Category added successfully!");
      form.resetFields();
      dispatch(fetchCategoriesApi());
    } else {
      message.error("Failed to add category");
    }
  };

  return (
    <Form<CategoryFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 24 }}
    >
      <Row gutter={[16, 0]}>
        {/* Category Name */}
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder="Enter category name" />
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

export default Categories;
