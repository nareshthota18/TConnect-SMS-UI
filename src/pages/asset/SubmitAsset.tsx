import React, { useState } from "react";
import {
  Form,
  Select,
  Button,
  Row,
  Col,
  Checkbox,
  List,
  Typography,
  Card,
  Space
} from "antd";

const { Option } = Select;
const { Title } = Typography;

const SubmitAsset: React.FC = () => {
  const [form] = Form.useForm();
  const [students, setStudents] = useState<string[]>([]);
  const [assets, setAssets] = useState<string[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const studentData: Record<number, string[]> = {
    1: ["Student A1", "Student A2"],
    2: ["Student B1", "Student B2"],
    3: ["Student C1", "Student C2"],
    4: ["Student D1", "Student D2"],
    5: ["Student E1", "Student E2"],
    6: ["Student F1", "Student F2"],
    7: ["Student G1", "Student G2"],
    8: ["Student H1", "Student H2"],
    9: ["Student I1", "Student I2"],
    10: ["Student J1", "Student J2"],
  };

  const studentAssets: Record<string, string[]> = {
    "Student A1": ["Book", "Bag", "Pen"],
    "Student A2": ["Pencil", "Notebook"],
    "Student B1": ["Bag", "Geometry Box"],
    "Student B2": ["Book", "Laptop"],
  };

  const handleClassChange = (value: number) => {
    setStudents(studentData[value] || []);
    setAssets([]);
    setSelectedAssets([]);
    form.setFieldsValue({ studentId: undefined, status: undefined });
  };

  const handleStudentChange = (value: string) => {
    setAssets(studentAssets[value] || []);
    setSelectedAssets([]);
    form.setFieldsValue({ status: undefined });
  };

  const handleAssetChange = (checkedValues: any) => {
    setSelectedAssets(checkedValues);
    if (!checkedValues.length) {
      form.setFieldsValue({ status: undefined });
    }
  };

  const onFinish = (values: any) => {
    console.log("Submitted Data:", {
      ...values,
      selectedAssets,
    });
  };

  return (
      <Form form={form} layout="vertical" onFinish={onFinish} style={{ padding: 24 }}>
        <Row gutter={16}>
          {/* Class Dropdown */}
          <Col xs={24} sm={12}>
            <Form.Item
              name="classId"
              label="Class"
              rules={[{ required: true, message: "Please select a class" }]}
            >
              <Select placeholder="Select class" onChange={handleClassChange}>
                {[...Array(10)].map((_, i) => (
                  <Option key={i + 1} value={i + 1}>
                    {i + 1}th
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Student Dropdown */}
          <Col xs={24} sm={12}>
            <Form.Item
              name="studentId"
              label="Student"
              rules={[{ required: true, message: "Please select a student" }]}
            >
              <Select
                placeholder="Select student"
                onChange={handleStudentChange}
                disabled={!students.length}
              >
                {students.map((student) => (
                  <Option key={student} value={student}>
                    {student}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Assets List */}
        {assets.length > 0 && (
          <Card
            title="Select Assets"
            style={{
              marginTop: 5,
              borderRadius: 10,
              background: "#fafafa",
            }}
          >
            <Checkbox.Group
              style={{ width: "100%" }}
              onChange={handleAssetChange}
              value={selectedAssets}
            >
              <Space wrap size="large">
                {assets.map((item) => (
                  <Checkbox key={item} value={item}>
                    {item}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Card>
        )}

        {/* Status Dropdown */}
        {selectedAssets.length > 0 && (
          <Row gutter={16} style={{ marginTop: 20 }}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select placeholder="Select status">
                  <Option value="damage">Damage</Option>
                  <Option value="theft">Theft</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}

        {/* Submit Button */}
        <Row style={{ marginTop: 20 }}>
          <Col span={24}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={!selectedAssets.length}
            >
              Submit Asset
            </Button>
          </Col>
        </Row>
      </Form>
  );
};

export default SubmitAsset;
