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
  DatePicker,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddInventory: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Inventory Data:", values);
    // Reset form with one empty record after submit
    form.resetFields();
    form.setFieldsValue({ inventories: [{}] });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 24 }}
      initialValues={{ inventories: [{}] }}
    >
      <Form.List name="inventories">
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
                      <Input placeholder="Enter inventory item name" />
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
                        <Option value="electronics">Electronics</Option>
                        <Option value="furniture">Furniture</Option>
                        <Option value="stationery">Stationery</Option>
                        <Option value="kitchen">Kitchen</Option>
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
                      <InputNumber min={1} style={{ width: "100%" }} placeholder="Enter quantity" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "unitPrice"]}
                      label="Unit Price"
                      rules={[{ required: true, message: "Please enter unit price" }]}
                    >
                      <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="Enter price per unit"
                        prefix="₹"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "location"]}
                      label="Location"
                      rules={[{ required: true, message: "Please enter storage location" }]}
                    >
                      <Input placeholder="Enter storage location" />
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
                      name={[name, "purchaseDate"]}
                      label="Purchase Date"
                      rules={[{ required: true, message: "Please select purchase date" }]}
                    >
                      <DatePicker style={{ width: '100%'}} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "status"]}
                      label="Status"
                      rules={[{ required: true, message: "Please select status" }]}
                    >
                      <Select placeholder="Select status">
                        <Option value="available">Available</Option>
                        <Option value="in-use">In Use</Option>
                        <Option value="damaged">Damaged</Option>
                        <Option value="discarded">Discarded</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "remarks"]}
                      label="Remarks"
                    >
                      <Input placeholder="Enter remarks (optional)" />
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

            {/* Buttons Row */}
            <Row justify="end" gutter={8}>
              <Col>
                <Button onClick={() => add()} icon={<PlusOutlined />}>
                  Add Item
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  Submit All Inventory
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default AddInventory;
