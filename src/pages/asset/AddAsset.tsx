import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Row,
  Col,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddAsset: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Asset Data:", values);
    // Reset form with one empty record after submit
    form.resetFields();
    form.setFieldsValue({ assets: [{}] });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 24 }}
      initialValues={{ assets: [{}] }}
    >
      <Form.List name="assets">
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
                  {/* Asset Name */}
                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "assetName"]}
                      label="Asset Name"
                      rules={[{ required: true, message: "Please enter asset name" }]}
                    >
                      <Input placeholder="Enter asset name" />
                    </Form.Item>
                  </Col>

                  {/* Asset Type */}
                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "assetType"]}
                      label="Asset Type"
                      rules={[{ required: true, message: "Please select asset type" }]}
                    >
                      <Select placeholder="Select asset type">
                        <Option value="electronic">Electronic</Option>
                        <Option value="furniture">Furniture</Option>
                        <Option value="vehicle">Vehicle</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Purchase Date */}
                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "purchaseDate"]}
                      label="Purchase Date"
                      rules={[{ required: true, message: "Please select purchase date" }]}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  {/* Asset Value */}
                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "assetValue"]}
                      label="Asset Value"
                      rules={[{ required: true, message: "Please enter asset value" }]}
                    >
                      <Input type="number" placeholder="Enter asset value" />
                    </Form.Item>
                  </Col>

                  {/* Assigned To */}
                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "assignedTo"]}
                      label="Assigned To"
                    >
                      <Input placeholder="Enter person or department name" />
                    </Form.Item>
                  </Col>

                  {/* Status */}
                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "status"]}
                      label="Status"
                      rules={[{ required: true, message: "Please select status" }]}
                    >
                      <Select placeholder="Select status">
                        <Option value="available">Available</Option>
                        <Option value="allocated">Allocated</Option>
                        <Option value="maintenance">Maintenance</Option>
                      </Select>
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
                  Submit All Assets
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default AddAsset;
