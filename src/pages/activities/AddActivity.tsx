import React from "react";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  Select,
  message,
} from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addActivityApi, fetchActivityApi } from "../../store/Activities/ActivitiesActions";

const { Option } = Select;

interface ActivitiesState {
  addActivityData: [];
  addActivityLoading: boolean;
  addActivityError: boolean;
}

const AddActivity: React.FC<{ closeModal?: () => void }> = ({ closeModal }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const rsHostelId = localStorage.getItem("schoolId");

  // Redux selector
  const { addActivityLoading } = useSelector(
    (state: RootState) => state.activity as ActivitiesState
  );

  // Submit handler
  const handleSubmit = async (values: any) => {
    const payload = {
      rsHostelId,
      title: values.title,
      description: values.description || "",
      activityDate: values.activityDate
        ? values.activityDate.toISOString()
        : null,
      category: values.category,
    };

    try {
      await dispatch(addActivityApi(payload)); // API call
      message.success("Activity added successfully!");
      dispatch(fetchActivityApi(rsHostelId)); // Refresh list
      form.resetFields();
      closeModal?.(); // Close modal
    } catch (error: any) {
      message.error(error?.message || "Failed to add activity");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ padding: 24 }}
    >
      <Row gutter={16}>
        {/* Activity Title */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Activity Title"
            name="title"
            rules={[{ required: true, message: "Please enter activity title" }]}
          >
            <Input placeholder="Enter activity title" />
          </Form.Item>
        </Col>

        {/* Category */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select category">
              <Option value="Sports">Sports</Option>
              <Option value="Education">Education</Option>
              <Option value="Cultural">Cultural</Option>
              <Option value="Medical">Medical</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* Activity Date */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Activity Date"
            name="activityDate"
            rules={[{ required: true, message: "Please select activity date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Description */}
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={2} placeholder="Enter activity description" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ textAlign: "left" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={addActivityLoading}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddActivity;
