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
  HomeOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SideNav from "../../components/SideNav";
import { Link } from "react-router-dom";
import AllStudents from "../student/AllStudents";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Text } = Typography;

const Dashboard = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const cardStyle = {
    border: `1px solid ${isDarkMode ? "#ff4d4f" : "#ffbe91"}`,
  };
  
    const cardHeaderStyle = {
    borderBottom: `1px solid #ffbe91`,
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
      <Layout style={{ padding: "2px" }}>
        <Content style={{ padding: "8px", minHeight: 360 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={18}>
              <Row gutter={[16, 16]}>
                {[
                  {
                    name: "Total Hostels",
                    account: "230",
                    icon: <HomeOutlined style={{ fontSize: 18, color: '#FF9145' }} />,
                    link: "/hostels",
                  },
                  {
                    name: "Total Students",
                    account: "16700",
                    icon: <UserOutlined style={{ fontSize: 18, color: '#FF9145' }} />,
                    link: "/student",
                  },
                  {
                    name: "Inventory",
                    account: "564",
                    icon: <AppstoreOutlined style={{ fontSize: 18, color: '#FF9145' }} />,
                    link: "/students",
                  },
                  {
                    name: "Grocery",
                    account: "122",
                    icon: <ShoppingCartOutlined style={{ fontSize: 18, color: '#FF9145' }} />,
                    link: "/students",
                  },
                  {
                    name: "Asset",
                    account: "234",
                    icon: <DeploymentUnitOutlined style={{ fontSize: 18, color: '#FF9145' }} />,
                    link: "/students",
                  },
                  {
                    name: "Staff",
                    account: "135",
                    icon: <TeamOutlined style={{ fontSize: 18, color: '#FF9145' }} />,
                    link: "/staff",
                  },
                ].map((item, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <Card title={item.icon} extra={<Link to={item.link}>View More</Link>} style={cardStyle} headStyle={cardHeaderStyle}>
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Text strong>{item.account}</Text>
                        <Text type="secondary">{item.name}</Text>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>

            <Col xs={24} md={6}>
              <Card title="Overview" style={cardStyle} headStyle={cardHeaderStyle}>
                <Flex vertical gap="middle">
                  <Flex vertical>
                    <Text strong>Attendance:</Text>
                    <Progress percent={90} />
                  </Flex>
                  <Flex vertical>
                    <Text strong>Meal:</Text>
                    <Progress percent={100} />
                  </Flex>
                  <Flex vertical>
                    <Text strong>Hostel Occupancy:</Text>
                    <Progress percent={70} />
                  </Flex>
                  <Flex vertical>
                    <Text strong>Inventory:</Text>
                    <Progress percent={30} status="exception" />
                  </Flex>
                </Flex>
              </Card>
            </Col>
            <Col xs={24} md={24}>
                <AllStudents />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
