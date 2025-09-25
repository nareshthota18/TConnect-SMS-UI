import React from "react";
import { Row, Col, Form, Input, Button, Typography, Flex, message } from "antd";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginApi } from "../../store/Login/LoginActions";

const { Title, Text, Link } = Typography;

interface LoginResponse {
  token: string;
  expires: string;
  role: string;
}

interface LoginState {
  user: LoginResponse | null;
  loginLoading: boolean;
  loginError: string | null;
  isAuthenticated: boolean;
}

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginPayload {
  clientId: string;
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [messageApi, contextHolder] = message.useMessage();

  const { user, loginLoading, loginError, isAuthenticated } = useSelector(
    (state: RootState) => state.login as LoginState
  );

  const onFinish = async (values: LoginFormValues) => {
    try {
      const payload: LoginPayload = {
        clientId: "client1",
        username: values.email,
        password: values.password,
      };

      const response = await dispatch(loginApi(payload));
      
      if (response?.token) {
        messageApi.success("Login successful!");
        navigate("/dashboard");
      } else {
        messageApi.error("Invalid credentials or missing token");
      }
    } catch (err: any) {
      const errorMessage = err?.message || "Login failed, please try again.";
      messageApi.error(errorMessage);
    }
  };

  // Show error message if loginError exists
  React.useEffect(() => {
    if (loginError) {
      messageApi.error(loginError);
    }
  }, [loginError, messageApi]);

  React.useEffect(() => {
    const token = user?.token || localStorage.getItem("authToken");
    if (isAuthenticated || token) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Row style={{ minHeight: "100vh" }}>
      {contextHolder}
      
      {/* Left Side Layout */}
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

      {/* Right Side Form */}
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
            Welcome
          </Title>
          <Text type="secondary">Sign in to your account</Text>

          <Form<LoginFormValues>
            layout="vertical"
            onFinish={onFinish}
            style={{ marginTop: "24px" }}
            disabled={loginLoading}
          >
            {/* Email */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email!" },
              ]}
            >
              <Input 
                placeholder="email@domain.com" 
                autoComplete="email"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
                { min: 6, message: "Password must be at least 6 characters!" }
              ]}
            >
              <Input.Password 
                placeholder="Enter your password" 
                autoComplete="current-password"
              />
            </Form.Item>

            <Flex align="center" justify="end">
              <Link href="forgot">Forgot Password?</Link>
            </Flex>

            {/* Submit */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loginLoading}
                disabled={loginLoading}
              >
                {loginLoading ? "Signing in..." : "Sign In"}
              </Button>
            </Form.Item>

            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <Text>Not registered yet?</Text>{" "}
              <Link href="registration">Sign Up Now</Link>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;