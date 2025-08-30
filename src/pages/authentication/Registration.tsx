import { Row, Col, Form, Input, Button, Typography, Select } from "antd"
import real from "../../assets/real-time.svg";
import AuthLayout from "./AuthLayout";
const { Title, Text, Link } = Typography

// const { Option } = Select;
// const prefixSelector = (
//   <Form.Item name="countryCode" noStyle initialValue="+91">
//     <Select style={{ width: 90 }}>
//       <Option value="+91">+91 (IN)</Option>
//       <Option value="+1">+1 (US)</Option>
//       <Option value="+44">+44 (UK)</Option>
//       <Option value="+61">+61 (AUS)</Option>
//       {/* Add more as needed */}
//     </Select>
//   </Form.Item>
// );

const Registration = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values)
  }

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
        style={{ padding: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <Title level={2} style={{ marginBottom: 0 }}>
            Create Account
          </Title>
          <Text type="secondary">Sign up for your new account</Text>

          <Form layout="vertical" onFinish={onFinish} style={{ marginTop: "24px" }}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, message: "Please enter your first name!" }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    { required: true, message: "Please enter your phone number!" },
                    { pattern: /^\d{10}$/, message: "Phone number must be 10 digits!" },
                  ]}
                >
                  <Input placeholder="Phone Number" maxLength={10} />
                </Form.Item>

              </Col>
            </Row>
            {/* <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input
                addonBefore={prefixSelector}
                placeholder="Phone number"
                style={{ width: '100%' }}
              />
            </Form.Item> */}

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="email@domain.com" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter your password!" },
                    { min: 6, message: "Password must be at least 6 characters!" },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error("Passwords do not match!"))
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm password" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Account
              </Button>
            </Form.Item>

            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <Text>Already have an account?</Text> <Link href="/">Sign In</Link>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  )
}

export default Registration;
