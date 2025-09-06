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
  ShoppingCartOutlined,
  AppleOutlined,
  CoffeeOutlined,
  GiftOutlined,
  ShopOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import SideNav from "../../components/SideNav";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Text } = Typography;

const GroceriesDashboard = () => {
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
    <Row gutter={[16, 16]}>
      {/* Main Grocery Info Cards */}
      <Col xs={24} md={14}>
        <Row gutter={[16, 16]}>
          {[
            {
              name: "Total Grocery Items",
              account: "350",
              icon: (
                <ShoppingCartOutlined
                  style={{ fontSize: 18, color: "#FF9145" }}
                />
              ),
              link: "/groceries",
            },
            {
              name: "Fruits & Vegetables",
              account: "120",
              icon: (
                <AppleOutlined style={{ fontSize: 18, color: "#FF9145" }} />
              ),
              link: "/groceries/fruits",
            },
            {
              name: "Beverages",
              account: "80",
              icon: (
                <CoffeeOutlined style={{ fontSize: 18, color: "#FF9145" }} />
              ),
              link: "/groceries/beverages",
            },
            {
              name: "Snacks",
              account: "50",
              icon: <GiftOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
              link: "/groceries/snacks",
            },
            {
              name: "Dairy & Bakery",
              account: "60",
              icon: <HomeOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
              link: "/groceries/dairy",
            },
            {
              name: "Household Essentials",
              account: "40",
              icon: <ShopOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
              link: "/groceries/household",
            },
          ].map((item, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                title={item.icon}
                style={cardStyle}
                headStyle={cardHeaderStyle}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text strong >
                    {item.account}
                  </Text>
                  <Text type="secondary">{item.name}</Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>

      {/* Overview Section */}
      <Col xs={24} md={10}>
        <Card title="Overview" style={cardStyle} headStyle={cardHeaderStyle}>
          <Flex vertical gap="middle">
            <Flex vertical>
              <Text strong>Stock Available:</Text>
              <Progress percent={85} />
            </Flex>
            <Flex vertical>
              <Text strong>Orders Fulfilled:</Text>
              <Progress percent={70} />
            </Flex>
            <Flex vertical>
              <Text strong>Pending Orders:</Text>
              <Progress percent={40} status="exception" />
            </Flex>
            <Flex vertical>
              <Text strong>Suppliers:</Text>
              <Progress percent={90} />
            </Flex>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default GroceriesDashboard;
