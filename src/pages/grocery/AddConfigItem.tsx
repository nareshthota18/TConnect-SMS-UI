import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Button,
  Row,
  Col,
  message
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { addGroceryConsumptionApi, fetchGroceryConsumptionListApi } from "../../store/Grocery/GroceryActions";
import { fetchGradesApi } from "../../store/Dropdowns/DropdownActions";
import { AppDispatch, RootState } from "../../store/store";
import { fetchItemsListApi } from "../../store/Inventory/InventoryActions";

const { Option } = Select;

interface AddConfigItemProps {
  closeModal?: () => void;
}

interface FormValues {
  rsHostelId: string;
  gradeId: string;
  itemId: string;
  quantity: number;
  frequency: string;
  effectiveFrom: Dayjs;
  effectiveTo: Dayjs;
  isActive: boolean;
}

const AddConfigItem: React.FC<AddConfigItemProps> = ({ closeModal }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [form] = Form.useForm<FormValues>();
  const schoolId = localStorage.getItem("schoolId");

  const [gradesOptions, setGradesOptions] = useState<
  { label: string; value: string }[]
>([]);

const [itemOptions, setItemOptions] = useState<
{ label: string; value: string }[]
>([]);

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

  // Redux State
  const { getItemsListData, getItemsListLoading } = useSelector(
    (state: RootState) => state.inventory as ItemState
  );

interface GradesState {
  gradesData: any[];
  gradesDataLoading: boolean;
}

const { gradesData, gradesDataLoading } = useSelector(
  (state: RootState) => state.departments as GradesState
);

// Fetch grades
useEffect(() => {
  dispatch(fetchGradesApi());
}, [dispatch]);

useEffect(() => {
    dispatch(fetchItemsListApi());
  }, [dispatch]);

// Convert grades to dropdown options
useEffect(() => {
  if (gradesData?.length) {
    const options = gradesData.map((item: { key: string; value: string }) => ({
      label: item.value,
      value: item.key,
    }));
    setGradesOptions(options);
  }
}, [gradesData]);

  const onFinish = async (values: FormValues) => {
    const payload = {
      rsHostelId: schoolId,
      gradeId: values.gradeId,
      itemId: values.itemId,
      quantity: values.quantity,
      frequency: values.frequency,
      effectiveFrom: values.effectiveFrom?.toISOString(),
      effectiveTo: values.effectiveTo?.toISOString(),
      isActive: values.isActive
    };

    try {
      const res = await dispatch<any>(addGroceryConsumptionApi(payload));
      if (res) {
        message.success("Grocery consumption added successfully");
        form.resetFields();
        dispatch(fetchGroceryConsumptionListApi(schoolId));
        closeModal && closeModal();
      }
    } catch (error) {
      message.error("Failed to add consumption");
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Row gutter={16}>

        {/* gradeId */}
        <Col span={8}>
          <Form.Item
            label="Grade"
            name="gradeId"
            rules={[{ required: true, message: "Please select grade" }]}
          >
            <Select
          placeholder="Select Grade"
          loading={gradesDataLoading}
          options={gradesOptions}
          allowClear
        />
          </Form.Item>
        </Col>

        {/* itemId */}
        <Col span={8}>
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

        {/* quantity */}
        <Col span={8}>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <InputNumber min={0} placeholder="0" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        {/* frequency */}
        <Col span={8}>
          <Form.Item
            label="Frequency"
            name="frequency"
            rules={[{ required: true, message: "Please enter frequency" }]}
          >
            <Input placeholder="Eg: Daily, Weekly" />
          </Form.Item>
        </Col>

        {/* effectiveFrom */}
        <Col span={8}>
          <Form.Item
            label="Effective From"
            name="effectiveFrom"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        {/* effectiveTo */}
        <Col span={8}>
          <Form.Item
            label="Effective To"
            name="effectiveTo"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        {/* isActive */}
        <Col span={8}>
          <Form.Item
            label="Active Status"
            name="isActive"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Col>

        {/* Submit */}
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Col>

      </Row>
    </Form>
  );
};

export default AddConfigItem;
