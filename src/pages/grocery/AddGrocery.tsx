import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

import {
  fetchItemsListApi,
  addInventoryItemDetailsApi,
} from "../../store/Inventory/InventoryActions";

const { Option } = Select;

interface AddGroceryProps {
  closeModal: () => void;
}

const AddGrocery: React.FC<AddGroceryProps> = ({ closeModal }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const schoolId = localStorage.getItem("schoolId");

  interface Item {
    id: string;
    itemCode: string;
    name: string;
    itemTypeName: string;
    uom: string;
    reorderLevel: number;
    isActive: boolean;
  }

  interface ItemState {
    getItemsListData: Item[];
    getItemsListLoading: boolean;
  }

  interface AddInventoryDetailsState {
    addInventoryItemDetailsLoading: boolean;
  }

  // Redux State
  const { getItemsListData, getItemsListLoading } = useSelector(
    (state: RootState) => state.inventory as ItemState
  );

  const { addInventoryItemDetailsLoading } = useSelector(
    (state: RootState) => state.inventory as AddInventoryDetailsState
  );

  // Fetch Items for dropdown
  useEffect(() => {
    dispatch(fetchItemsListApi());
  }, [dispatch]);

  // Submit
  const onFinish = async (values: any) => {
    const payload = {
      rsHostelId: schoolId,
      itemId: values.itemId,
      openingBalance: values.openingBalance,
      quantityReceived: values.quantityReceived,
      quantityIssued: values.quantityIssued,
      quantityInHand: values.quantityInHand,
    };

    console.log("Final Payload →", payload);

    await dispatch(addInventoryItemDetailsApi(payload));

    form.resetFields();
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      // style={{ padding: 24 }}
    >
      <Row gutter={16}>
        {/* HOSTEL ID */}
        {/* <Col xs={24} sm={12}>
          <Form.Item
            name="rsHostelId"
            label="Hostel ID"
            rules={[{ required: true, message: "Please enter Hostel ID" }]}
          >
            <Input placeholder="Enter Hostel ID" />
          </Form.Item>
        </Col> */}

        {/* ITEM ID DROPDOWN */}
        <Col xs={24} sm={12}>
          <Form.Item
            name="itemId"
            label="Item"
            rules={[{ required: true, message: "Please select item" }]}
          >
            <Select
              placeholder="Select Item"
              loading={getItemsListLoading}
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={getItemsListData.map((item) => ({
                label: `${item.itemCode} - ${item.name}`,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Col>

        {/* OPENING BALANCE */}
        <Col xs={24} sm={12}>
          <Form.Item
            name="openingBalance"
            label="Opening Balance"
            rules={[{ required: true, message: "Enter Opening Balance" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Opening Balance"
            />
          </Form.Item>
        </Col>

        {/* QUANTITY RECEIVED */}
        <Col xs={24} sm={12}>
          <Form.Item
            name="quantityReceived"
            label="Quantity Received"
            rules={[{ required: true, message: "Enter Quantity Received" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Quantity Received"
            />
          </Form.Item>
        </Col>

        {/* QUANTITY ISSUED */}
        <Col xs={24} sm={12}>
          <Form.Item
            name="quantityIssued"
            label="Quantity Issued"
            rules={[{ required: true, message: "Enter Quantity Issued" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Quantity Issued"
            />
          </Form.Item>
        </Col>

        {/* QUANTITY IN HAND */}
        <Col xs={24} sm={12}>
          <Form.Item
            name="quantityInHand"
            label="Quantity In Hand"
            rules={[{ required: true, message: "Enter Quantity In Hand" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Quantity In Hand"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end">
        <Button
          type="primary"
          htmlType="submit"
          loading={addInventoryItemDetailsLoading}
        >
          Submit Inventory Details
        </Button>
      </Row>
    </Form>
  );
};

export default AddGrocery;
