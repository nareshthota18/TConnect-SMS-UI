import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchItemTypeApi, addInventoryItemApi } from "../../store/Inventory/InventoryActions";

const { Option } = Select;

const AddInventory: React.FC = () => {
  const [form] = Form.useForm();
  const [itemOptions, setItemOptions] = useState<{ label: string; value: string }[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  interface ItemTypeState {
    itemTypeData: any;
    itemTypeDataLoading: boolean;
    itemTypeDataError: boolean;
  }

  interface AddInventoryState {
    addInventoryItemData: any;
    addInventoryItemLoading: boolean;
    addInventoryItemError: boolean;
  }

  const { itemTypeData, itemTypeDataLoading } = useSelector(
    (state: RootState) => state.inventory as ItemTypeState
  );

  const { addInventoryItemLoading } = useSelector(
    (state: RootState) => state.inventory as AddInventoryState
  );

  // Fetch Item Types
  useEffect(() => {
    dispatch(fetchItemTypeApi());
  }, [dispatch]);

  useEffect(() => {
    if (itemTypeData?.length) {
      const options = itemTypeData.map((item: { id: string; name: string }) => ({
        label: item.name,
        value: item.id,
      }));
      setItemOptions(options);
    }
  }, [itemTypeData]);

  // Form Submit
  const onFinish = async (values: any) => {
    try {
      for (const item of values.inventories) {
        const payload = {
          itemCode: item.itemCode,
          name: item.itemName, // must match schema
          itemTypeId: item.category,
          uom: item.uom?.toString(), // convert number to string
          reorderLevel: item.reorderlevel,
          isActive: item.status === "available", // map status to boolean
          itemTypeName: itemTypeData.find((i: any) => i.id === item.category)?.name || ""
        };
  
        await dispatch(addInventoryItemApi(payload));
      }
  
      form.resetFields();
      form.setFieldsValue({ inventories: [{}] });
    } catch (error) {
      console.error("Error adding inventory item:", error);
    }
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
                      name={[name, "itemCode"]}
                      label="Item Code"
                      rules={[{ required: true, message: "Please enter item code" }]}
                    >
                      <Input placeholder="Enter inventory item code" />
                    </Form.Item>
                  </Col>

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
                      <Select
                        placeholder="Select Item Type"
                        loading={itemTypeDataLoading}
                        options={itemOptions}
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "uom"]}
                      label="UOM"
                      rules={[{ required: true, message: "Please enter UOM" }]}
                    >
                      <InputNumber min={1} style={{ width: "100%" }} placeholder="Enter UOM" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "reorderlevel"]}
                      label="Reorder Level"
                      rules={[{ required: true, message: "Please enter Reorder Level" }]}
                    >
                      <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="Enter Reorder Level"
                      />
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
                <Button type="primary" htmlType="submit" loading={addInventoryItemLoading}>
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
