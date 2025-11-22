import React from "react";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Button,
  message,
} from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addHolidayApi, fetchHolidayApi } from "../../store/Holidays/HolidaysActions";

interface HolidaysState {
  addHolidayData: [];
  addHolidayLoading: boolean;
  addHolidayError: boolean;
}

const AddHolidays = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const rsHostelId = localStorage.getItem("schoolId");
  const hostelName = localStorage.getItem("schoolName");

  // Redux selector
  const { addHolidayLoading } = useSelector(
    (state: RootState) => state.holidays as HolidaysState
  );

  // Auto-calc number of days
  const handleDateChange = () => {
    const start = form.getFieldValue("startDate");
    const end = form.getFieldValue("endDate");

    if (start && end) {
      const diff = dayjs(end).diff(dayjs(start), "day") + 1;
      form.setFieldsValue({ numberOfDays: diff > 0 ? diff : 0 });
    }
  };

  const handleSubmit = async (values: any) => {
    const payload = {
      rsHostelId,
      HostelName: values.hostelName || hostelName, // <-- API expects "HostelName"
      name: values.name,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
      numberOfDays: values.numberOfDays || 0,
      description: values.description || "",
    };

    try {
      await dispatch(addHolidayApi(payload));
      message.success("Holiday added successfully!");
      dispatch(fetchHolidayApi(rsHostelId));
      form.resetFields();
    } catch (error: any) {
      message.error(error?.message || "Failed to add holiday");
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
        {/* Hostel Name */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Hostel Name"
            name="hostelName"
            initialValue={hostelName}
          >
            <Input disabled />
          </Form.Item>
        </Col>

        {/* Holiday Name */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Holiday Name"
            name="name"
            rules={[{ required: true, message: "Please enter holiday name" }]}
          >
            <Input placeholder="Enter holiday name" />
          </Form.Item>
        </Col>

        {/* Number of Days */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item label="Number of Days" name="numberOfDays">
            <Input disabled placeholder="Auto calculated" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Start Date */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker style={{ width: "100%" }} onChange={handleDateChange} />
          </Form.Item>
        </Col>

        {/* End Date */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Please select end date" }]}
          >
            <DatePicker style={{ width: "100%" }} onChange={handleDateChange} />
          </Form.Item>
        </Col>

        {/* Description */}
        <Col xs={24} sm={24} md={24} lg={8}>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={1} placeholder="Enter holiday description" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ textAlign: "left" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={addHolidayLoading}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddHolidays;
