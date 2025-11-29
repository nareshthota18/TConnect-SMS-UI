import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Row,
  Col,
  Space,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchStudentsApi } from "../../store/Student/StudentActions";
import { fetchInventoryApi } from "../../store/Inventory/InventoryActions";
import { addAssetApi, fetchAssetsApi } from "../../store/Assets/AssetsActions";
import dayjs from "dayjs";

const { Option } = Select;

interface Student {
  id: string;
  firstName: string;
  lastName: string;
}

interface Inventory {
  itemId: string;
  itemName: string;
}

const AddAsset: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  interface StudentState { studentData: Student[]; studentDataLoading: boolean; studentDataError: boolean; } 
  interface InventoryState { inventoryData: Inventory[]; inventoryDataLoading: boolean; inventoryDataError: boolean; }

  const [studentOptions, setStudentOptions] = useState<{ label: string; value: string }[]>([]);
  const [inventoryOptions, setInventoryOptions] = useState<{ label: string; value: string }[]>([]);

  const { inventoryData, inventoryDataLoading } = useSelector( (state: RootState) => state.inventory as InventoryState ); 
  const { studentData, studentDataLoading } = useSelector( (state: RootState) => state.student as StudentState );

  // Fetch students and inventory on load
  useEffect(() => {
    dispatch(fetchStudentsApi());
    dispatch(fetchInventoryApi());
  }, [dispatch]);

  // Map student options
  useEffect(() => {
    if (studentData?.length) {
      const options = studentData.map((item: Student) => ({
        label: `${item.firstName} ${item.lastName}`,
        value: item.id,
      }));
      setStudentOptions(options);
    }
  }, [studentData]);

  // Map inventory options
  useEffect(() => {
    if (inventoryData?.length) {
      const options = inventoryData.map((item: Inventory) => ({
        label: item.itemName,
        value: item.itemId,
      }));
      setInventoryOptions(options);
    }
  }, [inventoryData]);

  /**
   * Form submission handler
   */
  const onFinish = async (values: any) => {
    try {
      // Transform form data to API payload
      const payloadList = values.assets.map((asset: any) => ({
        id: crypto.randomUUID(), // generate unique ID for new asset
        studentId: asset.studentId,
        itemId: asset.itemId,
        quantity: Number(asset.assetValue), // mapping to quantity
        issueDate: asset.purchaseDate
          ? dayjs(asset.purchaseDate).toISOString()
          : null,
        remarks: asset.assignedTo || "",
        studentName: studentOptions.find((s) => s.value === asset.studentId)?.label || "",
        itemName: inventoryOptions.find((i) => i.value === asset.itemId)?.label || "",
      }));

      console.log("Submitting payload:", payloadList);

      // Call API for each asset (or you can send all at once if backend supports it)
      for (const payload of payloadList) {
        await dispatch(addAssetApi(payload));
      }

      message.success("Assets added successfully!");
      dispatch(fetchAssetsApi());
      form.resetFields();
      form.setFieldsValue({ assets: [{}] });
    } catch (error: any) {
      message.error(error?.message || "Failed to add asset(s)");
    }
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
                  {/* Student Name */}
                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "studentId"]}
                      label="Student Name"
                      rules={[{ required: true, message: "Please select student" }]}
                    >
                      <Select
                        placeholder="Select Student"
                        loading={studentDataLoading}
                        options={studentOptions}
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  {/* Asset Type */}
                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "itemId"]}
                      label="Asset Type"
                      rules={[{ required: true, message: "Please select asset type" }]}
                    >
                      <Select
                        placeholder="Select Asset"
                        loading={inventoryDataLoading}
                        options={inventoryOptions}
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  {/* Issue Date */}
                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "purchaseDate"]}
                      label="Issue Date"
                      rules={[{ required: true, message: "Please select issue date" }]}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  {/* Quantity */}
                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "assetValue"]}
                      label="Quantity"
                      rules={[{ required: true, message: "Please enter quantity" }]}
                    >
                      <Input type="number" placeholder="Enter quantity" />
                    </Form.Item>
                  </Col>

                  {/* Remarks */}
                  <Col xs={24} sm={12} md={12} lg={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "assignedTo"]}
                      label="Remarks"
                    >
                      <Input placeholder="Enter remarks" />
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
