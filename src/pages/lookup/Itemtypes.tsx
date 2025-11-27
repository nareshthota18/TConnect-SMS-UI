import React from "react";
import { Row, Col, Form, Input, Button, message } from "antd";
import type { FormProps } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addItemTypesApi, fetchItemTypesApi } from "../../store/Dropdowns/DropdownActions";

interface ItemTypeFormValues {
  itemTypeName: string;
}

const Itemtypes: React.FC = () => {
  const [form] = Form.useForm<ItemTypeFormValues>();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish: FormProps<ItemTypeFormValues>["onFinish"] = async (values) => {
    const payload = {
      value: values.itemTypeName, // API expects { value: "string" }
    };

    const response = await dispatch<any>(addItemTypesApi(payload));

    if (response) {
      message.success("Item Type added successfully!");
      form.resetFields();
      dispatch(fetchItemTypesApi    ());
    } else {
      message.error("Failed to add Item Type");
    }
  };

  return (
    <Form<ItemTypeFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 24 }}
    >
      <Row gutter={[16, 0]}>
        {/* Item Type Field */}
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Item Type"
            name="itemTypeName"
            rules={[{ required: true, message: "Please enter item type" }]}
          >
            <Input placeholder="Enter item type" />
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

export default Itemtypes;
