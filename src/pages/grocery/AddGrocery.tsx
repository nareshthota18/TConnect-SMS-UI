import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  InputNumber,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddGrocery: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Grocery Data:", values);
    // Reset form with one empty record after submit
    form.resetFields();
    form.setFieldsValue({ groceries: [{}] });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 24 }}
      initialValues={{ groceries: [{}] }}
    >
      <Form.List name="groceries">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                style={{
                  border: "1px solid #f0f0f0",
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 16,
                  background: "#fafafa",
                }}
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "itemName"]}
                      label="Item Name"
                      rules={[{ required: true, message: "Please enter item name" }]}
                    >
                      <Input placeholder="Enter grocery item name" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "category"]}
                      label="Category"
                      rules={[{ required: true, message: "Please select category" }]}
                    >
                      <Select placeholder="Select category">
                        <Option value="vegetable">Vegetable</Option>
                        <Option value="fruit">Fruit</Option>
                        <Option value="dairy">Dairy</Option>
                        <Option value="beverage">Beverage</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      label="Quantity"
                      rules={[{ required: true, message: "Please enter quantity" }]}
                    >
                      <InputNumber
                        min={1}
                        style={{ width: "100%" }}
                        placeholder="Enter quantity"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "price"]}
                      label="Price"
                      rules={[{ required: true, message: "Please enter price" }]}
                    >
                      <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="Enter price"
                        prefix="₹"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "supplier"]}
                      label="Supplier"
                      rules={[{ required: true, message: "Please enter supplier name" }]}
                    >
                      <Input placeholder="Enter supplier name" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "expiryDate"]}
                      label="Expiry Date"
                      rules={[{ required: true, message: "Please select expiry date" }]}
                    >
                      <Input type="date" />
                    </Form.Item>
                  </Col>
                </Row>

                {fields.length > 1 && (
                  <Space style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                    >
                      Remove Item
                    </Button>
                  </Space>
                )}
              </div>
            ))}

            {/* Buttons row */}
            <Row justify="end" gutter={8}>
              <Col>
                <Button onClick={() => add()} icon={<PlusOutlined />}>
                  Add Item
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  Submit All Groceries
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default AddGrocery;
