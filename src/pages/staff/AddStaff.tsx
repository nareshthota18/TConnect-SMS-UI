import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, Row, Col, Flex, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchDepartmentsApi, fetchDesignationsApi } from "../../store/Dropdowns/DropdownActions";
import { addStaffApi, fetchStaffApi } from "../../store/Staff/StaffActions";

const { Option } = Select;

const AddStaff = () => {
  const [form] = Form.useForm();
  const [departmentOptions, setdepartmentOptions] = useState<{ label: string; value: string }[]>([]);
  const [designationsOptions, setdesignationsOptions] = useState<{ label: string; value: string }[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  interface DepartmentsState {
    departmentsData: [];
    departmentsDataLoading: boolean;
    departmentsDataError: boolean;
  }

  interface DesignationsState {
    designationsData: [];
    designationsDataLoading: boolean;
    designationsDataError: boolean;
  }

  const { designationsData, designationsDataLoading } = useSelector(
    (state: RootState) => state.departments as DesignationsState
  );

  const { departmentsData, departmentsDataLoading } = useSelector(
    (state: RootState) => state.departments as DepartmentsState
  );

  // Fetch departments on component mount
  useEffect(() => {
    dispatch(fetchDepartmentsApi());
    dispatch(fetchDesignationsApi());

  }, [dispatch]);

  useEffect(() => {
    if (departmentsData?.length) {
      const options = departmentsData.map((item: { key: string; value: string }) => ({
        label: item.value,
        value: item.key,
      }));
      setdepartmentOptions(options);
    }
  }, [departmentsData]);

  useEffect(() => {
    if (designationsData?.length) {
      const options = designationsData.map((item: { key: string; value: string }) => ({
        label: item.value,
        value: item.key,
      }));
      setdesignationsOptions(options);
    }
  }, [designationsData]);
  

  const handleFinish = async (values: any) => {
    try {
      // Get department and designation labels based on selected IDs
      const selectedDepartment = departmentOptions.find(
        (item) => item.value === values.department
      );
      const selectedDesignation = designationsOptions.find(
        (item) => item.value === values.designation
      );
  
      // Prepare payload exactly matching the API schema
      const payload = {
        staffCode: values.staffCode, 
        fullName: values.name,
        email: values.email,
        phone: values.phone,
        departmentId: values.department,
        designationId: values.designation,
        departmentName: selectedDepartment?.label || "",
        designationName: selectedDesignation?.label || "",
        isTeaching: true, // or dynamic based on form
        status: "Active",  // default or dynamic
      };
  
      const response = await dispatch(addStaffApi(payload));
      message.success("Staff added successfully!");
      dispatch(fetchStaffApi());
      form.resetFields();
      console.log("Add staff response:", response);
    } catch (error) {
      message.error("Failed to add staff. Please try again.");
      console.error("Add staff error:", error);
    }
  };
  

  return (
    <div  style={{ padding: 24}}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Row gutter={[16, 0]}>
          {/* Full Name */}
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please enter staff name" }]}
            >
              <Input placeholder="Enter staff name" />
            </Form.Item>
          </Col>

            {/* Email */}
            <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>

          {/* Phone */}
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>

          {/* Staff Code */}
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="staffCode"
              label="Staff Code"
              rules={[{ required: true, message: "Please enter staff code" }]}
            >
              <Input placeholder="Enter staff code" />
            </Form.Item>
          </Col>

          {/* Role */}
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="department"
              label="Department"
              rules={[{ required: true, message: "Please select department" }]}
            >
              <Select
                        placeholder="Select Item Type"
                        loading={departmentsDataLoading}
                        options={departmentOptions}
                        allowClear
                      />
            </Form.Item>
          </Col>

          {/* Role */}
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="designation"
              label="Designation"
              rules={[{ required: true, message: "Please select designation" }]}
            >
              <Select
                        placeholder="Select Item Type"
                        loading={designationsDataLoading}
                        options={designationsOptions}
                        allowClear
                      />
            </Form.Item>
          </Col>

          
        </Row>
        <Flex justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Staff
          </Button>
        </Form.Item>
      </Flex>
      </Form>
    </div>
  );
};

export default AddStaff;
