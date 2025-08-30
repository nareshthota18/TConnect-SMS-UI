"use client";

import { Row, Col, Form, Input, Button, Typography, message } from "antd";
import {
  SendOutlined,
} from "@ant-design/icons";
import real from "../../assets/real-time.svg";
import AuthLayout from "./AuthLayout";

const { Title, Text, Link } = Typography;

const Forgot = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Password reset with:", values);
    message.success("Password reset successful!");
  };

  const handleSendClick = () => {
    message.info("Suffix icon clicked!");
  };

  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col
        xs={0}
        sm={0}
        md={12}
        lg={12}
        xl={15}
        xxl={15}
        style={{
          backgroundColor: "#f0f4ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <AuthLayout />
      </Col>

      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={9}
        xxl={9}
        style={{
          padding: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <Title level={2} style={{ marginBottom: 0 }}>
            Forgot Password
          </Title>
          <Text type="secondary">
          Verify with email and code
          </Text>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ marginTop: "32px" }}
          >
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter your email address!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                placeholder="email@domain.com"
                suffix={
                  <span onClick={handleSendClick} style={{ cursor: "pointer" }}>
                    <SendOutlined />
                  </span>
                }
              />
            </Form.Item>

            <Form.Item
              name="code"
              label="Verification Code"
              rules={[
                {
                  required: true,
                  message: "Please enter the verification code!",
                },
                { len: 6, message: "Verification code must be 6 digits!" },
              ]}
            >
              <Input.OTP formatter={(str) => str.toUpperCase()} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ marginTop: "16px" }}
              >
                Reset Password
              </Button>
            </Form.Item>

            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <Text>Already have an account? </Text>{" "}
              <Link href="/">Sign In</Link>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Forgot;
