import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select, DatePicker, message, Spin } from "antd";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { addStudentApi } from "../../store/Student/StudentActions";
import { AppDispatch } from "../../store/store";

const { Option } = Select;

const AddStudent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      // Map form values to API payload
      const payload = {
        student: {
          id: values.id || "",
          admissionNumber: values.admissionNumber || "",
          firstName: values.name?.split(" ")[0] || "",
          lastName: values.name?.split(" ")[1] || "",
          dateOfBirth: values.dob ? dayjs(values.dob).toISOString() : "",
          gradeId: values.gradeId || "", // must be GUID
          status: "active",
          parentName: values.fatherName || "",
          parentContact: values.phone || "",
          healthInfo: `Blood Group: ${values.bloodGroup || ""}, Age: ${values.age || ""}`,
          categoryId: values.categoryId || "", // must be GUID
          rsHostelId: values.rsHostelId || "",
          categoryName: values.section || "",
          rsHostelName: values.rsHostelName || "",
          gradeName: values.class || "",
          motherName: values.motherName || "",
          guardianName: values.guardianName || "",
          guardianContact: values.guardianPhone || "",
          email: values.email || "",
          aadhar: values.aadhar || "",
          caste: values.caste || "",
        },
      };

      const response = await dispatch(addStudentApi(payload));

      if (response) {
        message.success("Student added successfully!");
        form.resetFields();
      }
    } catch (error: any) {
      message.error("Failed to add student. " + (error.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: "100%" }}>
        <Row gutter={16}>
          {/* Admission Number */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="admissionNumber"
              label="Admission Number"
              rules={[{ required: true, message: "Please enter admission number" }]}
            >
              <Input placeholder="Enter admission number" />
            </Form.Item>
          </Col>

          {/* Student Name */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="name"
              label="Student Name"
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
              rules={[{ required: true, message: "Please select date of birth" }]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="Select date" />
            </Form.Item>
          </Col>

          {/* Age */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                { required: true, message: "Please enter age" },
                { pattern: /^[0-9]+$/, message: "Age must be a number" },
              ]}
            >
              <Input placeholder="Enter age" />
            </Form.Item>
          </Col>

          {/* Gender */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Class */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="class"
              label="Class"
              rules={[{ required: true, message: "Please enter class" }]}
            >
              <Input placeholder="Enter class" />
            </Form.Item>
          </Col>

          {/* Section */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="section"
              label="Section"
              rules={[{ required: true, message: "Please enter section" }]}
            >
              <Input placeholder="Enter section" />
            </Form.Item>
          </Col>

          {/* Blood Group */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="bloodGroup"
              label="Blood Group"
              rules={[{ required: true, message: "Please enter blood group" }]}
            >
              <Input placeholder="Enter blood group" />
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

          {/* Mother's Name */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="motherName" label="Mother Name">
              <Input placeholder="Enter mother name" />
            </Form.Item>
          </Col>

          {/* Phone */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter phone number" },
                { pattern: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>

          {/* Guardian Name */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="guardianName" label="Guardian Name">
              <Input placeholder="Enter guardian name" />
            </Form.Item>
          </Col>

          {/* Guardian Phone */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="guardianPhone" label="Guardian Contact Number">
              <Input placeholder="Enter guardian phone" />
            </Form.Item>
          </Col>

          {/* Email */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ type: "email", message: "Please enter a valid email" }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>

          {/* Aadhar */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="aadhar" label="Aadhar Number">
              <Input placeholder="Enter Aadhar number" />
            </Form.Item>
          </Col>

          {/* Caste */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="caste" label="Caste">
              <Input placeholder="Enter caste" />
            </Form.Item>
          </Col>

          {/* Grade ID */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="gradeId" label="Grade ID" rules={[{ required: true }]}>
              <Input placeholder="Enter grade GUID" />
            </Form.Item>
          </Col>

          {/* Category ID */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="categoryId" label="Category ID" rules={[{ required: true }]}>
              <Input placeholder="Enter category GUID" />
            </Form.Item>
          </Col>

          {/* Hostel ID */}
          <Col xs={24} sm={12} md={12} lg={8}>
            <Form.Item name="rsHostelId" label="Hostel ID">
              <Input placeholder="Enter hostel GUID" />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
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
