import React from "react";
import { Row, Col, Form, Input, Button, Typography, Flex } from "antd";
import real from "../../assets/real-time.svg";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router-dom";


const { Title, Text, Link } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    navigate("/dashboard");
  };

  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col xs={0} sm={0} md={12} lg={12} xl={15} xxl={15} style={{ backgroundColor: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <AuthLayout />
      </Col>

      <Col xs={24} sm={24} md={12} lg={12} xl={9} xxl={9} style={{ padding: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <Title level={2} style={{ marginBottom: 0}}>Welcome</Title>
          <Text type="secondary">Sign in to your account</Text>

          <Form layout="vertical" onFinish={onFinish} style={{ marginTop: "24px" }}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input placeholder="email@domain.com" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

              <Flex align="center" justify="end">
              <Link href="forgot">Forgot Password?</Link>
              </Flex>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>

            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <Text>Not registered yet?</Text> <Link href="registration">Sign Up Now</Link>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
