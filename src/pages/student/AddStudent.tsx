import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  message,
  Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { addStudentApi, fetchStudentsApi } from "../../store/Student/StudentActions";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCategoriesApi, fetchGradesApi } from "../../store/Dropdowns/DropdownActions";

const { Option } = Select;

const AddStudent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const [gradesOptions, setgradesOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [categoriesOptions, setCategoriesOptions] = useState<
  { label: string; value: string }[]
>([]);

  interface GradesState {
    gradesData: [];
    gradesDataLoading: boolean;
    gradesDataError: boolean;
  }

  interface CategoriesState {
    categoriesData: [];
    categoriesDataLoading: boolean;
    categoriesDataError: boolean;
  }

  const { gradesData, gradesDataLoading } = useSelector(
    (state: RootState) => state.departments as GradesState
  );

  const { categoriesData, categoriesDataLoading } = useSelector(
    (state: RootState) => state.departments as CategoriesState
  );

  useEffect(() => {
    dispatch(fetchGradesApi());
    dispatch(fetchCategoriesApi());
  }, [dispatch]);

  useEffect(() => {
    if (gradesData?.length) {
      const options = gradesData.map(
        (item: { key: string; value: string }) => ({
          label: item.value,
          value: item.key,
        })
      );
      setgradesOptions(options);
    }
  }, [gradesData]);

  useEffect(() => {
    if (categoriesData?.length) {
      const options = categoriesData.map(
        (item: { key: string; value: string }) => ({
          label: item.value,
          value: item.key,
        })
      );
      setCategoriesOptions(options);
    }
  }, [categoriesData]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const schoolId = localStorage.getItem("schoolId");

      // Map form values to API payload
      const payload = {
          admissionNumber: values.admissionNumber || "",
          firstName: values.firstname || "",
          lastName: values.lastname || "",
          dateOfBirth: values.dob ? dayjs(values.dob).toISOString() : "",
          categoryId: values.categoryId || "",
          rsHostelId: schoolId || "",
          gradeId: values.gradeId || "",
          status: "active",
          parentName: values.fatherName || "",
          parentContact: values.phone || "",
          healthInfo: values.healthinfo,
          rsHostelName: values.rsHostelName || "",
          gradeName: gradesOptions.find(opt => opt.value === values.gradeId)?.label || "",
          categoryName: categoriesOptions.find(opt => opt.value === values.categoryId)?.label || "",
      };

      const response = await dispatch(addStudentApi(payload));

      if (response) {
        message.success("Student added successfully!");
        form.resetFields();
        dispatch(fetchStudentsApi());
      }
    } catch (error: any) {
      message.error("Failed to add student. " + (error.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: "100%" }}
      >
        <Row gutter={16}>
          {/* Admission Number */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="admissionNumber"
              label="Admission Number"
              rules={[
                { required: true, message: "Please enter admission number" },
              ]}
            >
              <Input placeholder="Enter admission number" />
            </Form.Item>
          </Col>

          {/* Student Name */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="firstname"
              label="Student First Name"
              rules={[{ required: true, message: "Please enter student name" }]}
            >
              <Input placeholder="Enter student name" />
            </Form.Item>
          </Col>

          {/* Student Name */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="lastname"
              label="Student Last Name"
              rules={[{ required: true, message: "Please enter student name" }]}
            >
              <Input placeholder="Enter student name" />
            </Form.Item>
          </Col>

          {/* Date of Birth */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="dob"
              label="Date of Birth"
              rules={[
                { required: true, message: "Please select date of birth" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="Select date" />
            </Form.Item>
          </Col>

          {/* Class */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="gradeId"
              label="Grade ID"
              rules={[{ required: true, message: "Please enter class" }]}
            >
              <Select
                placeholder="Select Class"
                loading={gradesDataLoading}
                options={gradesOptions}
                allowClear
                // onChange={handleGradeChange}
              />
            </Form.Item>
          </Col>

          {/* Category ID */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="categoryId"
              label="Category ID"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select Class"
                loading={categoriesDataLoading}
                options={categoriesOptions}
                allowClear
                // onChange={handleGradeChange}
              />
            </Form.Item>
          </Col>

          {/* Section */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please enter status" }]}
            >
              <Input placeholder="Enter section" />
            </Form.Item>
          </Col>

          {/* Father's Name */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="fatherName"
              label="Father Name"
              rules={[{ required: true, message: "Please enter father name" }]}
            >
              <Input placeholder="Enter father name" />
            </Form.Item>
          </Col>

          {/* Phone */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter phone number" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Enter valid 10-digit number",
                },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>

          {/* Email */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="healthinfo"
              label="HealthInfo"
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}
        >
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              {loading ? <Spin size="small" /> : "Add Student"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddStudent;
