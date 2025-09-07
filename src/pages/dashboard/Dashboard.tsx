import { useState } from "react";
import {
  Layout,
  Grid,
  Row,
  Col,
  Card,
  Typography,
  Space,
  Flex,
  Progress,
} from "antd";
import {
  AppstoreOutlined,
  DeploymentUnitOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SideNav from "../../components/SideNav";
import { Link } from "react-router-dom";
import school from "../../assets/school.png";
import SimpleBarChart from "./BarChart";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Text, Title } = Typography;

const Dashboard = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Define different colors for each card
  const cardColors = [
    "linear-gradient(135deg, #ffbe91, #ff7e5f)", // Orange gradient
    "linear-gradient(135deg, #a1c4fd, #c2e9fb)", // Blue gradient
    "linear-gradient(135deg, #84fab0, #8fd3f4)", // Green gradient
    "linear-gradient(135deg, #d4fc79, #96e6a1)", // Lime gradient
  ];

  const cardStyle = (index: number) => ({
    border: "none",
    borderRadius: "12px",
    background: cardColors[index],
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    height: "100%",
  });

  const cardHeaderStyle = {
    borderBottom: "0px solid transparent",
    padding: "16px 16px 0",
  };

  const cardBodyStyle = {
    padding: "16px",
  };

  const overviewCardStyle = {
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #fdfcfb, #e2d1c3)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    height: "100%",
  };

  return (
    <Layout>
      {!isMobile && (
        <SideNav
          isMobile={false}
          collapsed={collapsed}
          onClose={() => {}}
          open={false}
        />
      )}
      <Layout style={{ padding: "16px" }}>
        <Content style={{ padding: "8px", minHeight: 360 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24}>
              <Card
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  padding: "24px",
                  background: "linear-gradient(90deg, #3ab4f2, #f2c94c)",
                  color: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
                bodyStyle={{ padding: 0 }}
              >
                <Row align="middle" justify="space-between">
                  {/* Left Content */}
                  <Col>
                    <Title
                      level={3}
                      style={{ color: "#fff", margin: 0, fontWeight: 700 }}
                    >
                      Pratibha Vidya Academy
                    </Title>
                    <div style={{ marginTop: 12 }}>
                      <Space direction="vertical" size={4}>
                        <Text style={{ color: "#fff" }} strong>
                          <EnvironmentOutlined style={{ paddingRight: 8 }} />{" "}
                          Chapainawabganj-6300
                        </Text>
                        <Text style={{ color: "#fff" }} strong>
                          <MailOutlined style={{ paddingRight: 8 }} />{" "}
                          Schoolofulkuri@gmail.com
                        </Text>
                        <Text style={{ color: "#fff" }} strong>
                          <PhoneOutlined style={{ paddingRight: 8 }} />{" "}
                          01309124497
                        </Text>
                      </Space>
                    </div>
                  </Col>

                  {/* Right Logo */}
                  <Col>
                    <img
                      src={school}
                      alt="logo"
                      style={{ width: 100, height: 100, borderRadius: "50%" }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            
            <Col xs={24} md={24}>
              <Row gutter={[16, 16]}>
                {[
                  {
                    name: "Total Hostels",
                    account: "230",
                    icon: (
                      <HomeOutlined
                        style={{ fontSize: 22, color: "#fff" }}
                      />
                    ),
                    link: "/hostels",
                  },
                  {
                    name: "Total Students",
                    account: "16,700",
                    icon: (
                      <UserOutlined
                        style={{ fontSize: 22, color: "#fff" }}
                      />
                    ),
                    link: "/student",
                  },
                  {
                    name: "Inventory",
                    account: "564",
                    icon: (
                      <AppstoreOutlined
                        style={{ fontSize: 22, color: "#fff" }}
                      />
                    ),
                    link: "/inventory",
                  },
                  {
                    name: "Grocery",
                    account: "122",
                    icon: (
                      <ShoppingCartOutlined
                        style={{ fontSize: 22, color: "#fff" }}
                      />
                    ),
                    link: "/grocery",
                  }
                ].map((item, index) => (
                  <Col xs={24} sm={12} md={6} key={index}>
                    <Card
                      style={cardStyle(index)}
                      headStyle={cardHeaderStyle}
                      bodyStyle={cardBodyStyle}
                    >
                      <Flex vertical gap="middle">
                        <Flex justify="space-between" align="flex-start">
                          <div style={{
                            // background: "rgba(255, 255, 255, 0.3)",
                            borderRadius: "12px",
                            padding: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "40px",
                            height: "40px"
                          }}>
                            {item.icon}
                          </div>
                          <Text strong style={{ 
                            color: "#000", 
                            fontSize: "15px",
                            // background: "rgba(0, 0, 0, 0.2)",
                            padding: "4px 8px",
                            borderRadius: "12px"
                          }}>
                            {item.name}
                          </Text>
                        </Flex>
                        <Flex justify="space-between" align="flex-end">
                          <Title
                            level={2}
                            style={{
                              fontWeight: 700,
                              margin: 0,
                              color: "#000",
                            }}
                          >
                            {item.account}
                          </Title>
                          <Link 
                            to={item.link} 
                            style={{ 
                              color: "#000", 
                              fontWeight: 400,
                              fontSize: 12
                            }}
                          >
                            View More
                          </Link>
                        </Flex>
                      </Flex>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>

            <Col xs={24} md={18}>
              <SimpleBarChart />
            </Col>
            
            <Col xs={24} md={6}>
              <Card
                title={
                  <Text strong style={{ color: "#5a4a42" }}>
                    Overview
                  </Text>
                }
                style={overviewCardStyle}
                headStyle={{
                  borderBottom: "1px solid #e8e8e8",
                  padding: "16px"
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <Flex vertical gap="middle">
                  <Flex vertical>
                    <Text strong style={{ color: "#5a4a42" }}>Attendance:</Text>
                    <Progress 
                      percent={90} 
                      strokeColor={{
                        "0%": "#108ee9",
                        "100%": "#87d068",
                      }}
                    />
                  </Flex>
                  <Flex vertical>
                    <Text strong style={{ color: "#5a4a42" }}>Meal:</Text>
                    <Progress 
                      percent={100} 
                      strokeColor={{
                        "0%": "#87d068",
                        "100%": "#87d068",
                      }}
                    />
                  </Flex>
                  <Flex vertical>
                    <Text strong style={{ color: "#5a4a42" }}>Hostel Occupancy:</Text>
                    <Progress 
                      percent={70} 
                      strokeColor={{
                        "0%": "#ffc53d",
                        "100%": "#ff7a45",
                      }}
                    />
                  </Flex>
                  <Flex vertical>
                    <Text strong style={{ color: "#5a4a42" }}>Inventory:</Text>
                    <Progress 
                      percent={30} 
                      status="active" 
                      strokeColor={{
                        "0%": "#ff4d4f",
                        "100%": "#ff4d4f",
                      }}
                    />
                  </Flex>
                </Flex>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;