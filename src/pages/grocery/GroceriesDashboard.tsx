import { useState } from "react";
import {
  Layout,
  Grid,
  Row,
  Col,
  Card,
  Typography,
  Space,
} from "antd";
import {
  ShoppingCartOutlined,
  AppleOutlined,
  CoffeeOutlined,
  GiftOutlined,
  ShopOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  SkinOutlined,
  ToolOutlined,
  SafetyOutlined,
  ExperimentOutlined,
  CarOutlined,
} from "@ant-design/icons";

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
    textAlign: "center" as const,
  };

  const cardHeaderStyle = {
    borderBottom: `1px solid #ffbe91`,
    textAlign: "center" as const,
  };

  const groceryStats = [
    {
      name: "Total Grocery Items",
      account: "350",
      icon: <ShoppingCartOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/groceries",
    },
    {
      name: "Fruits & Vegetables",
      account: "120",
      icon: <AppleOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/groceries/fruits",
    },
    {
      name: "Beverages",
      account: "80",
      icon: <CoffeeOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
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
    {
      name: "Health & Medicine",
      account: "25",
      icon: <MedicineBoxOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/groceries/health",
    },
    {
      name: "Personal Care",
      account: "30",
      icon: <SkinOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/groceries/personal-care",
    },
    {
      name: "Tools & Hardware",
      account: "15",
      icon: <ToolOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/groceries/tools",
    },
    {
      name: "Safety & Hygiene",
      account: "20",
      icon: <SafetyOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/groceries/safety",
    },
    {
      name: "Pet Supplies",
      account: "18",
      icon: <ExperimentOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/groceries/pet-supplies",
    },
    {
      name: "Automotive Essentials",
      account: "12",
      icon: <CarOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/groceries/automotive",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={24}>
        <Row gutter={[16, 16]}>
          {groceryStats.map((item, index) => (
            <Col xs={12} sm={12} md={8} lg={4} key={index}>
              <Card
                title={item.icon}
                style={cardStyle}
                headStyle={cardHeaderStyle}
              >
                <Space direction="vertical" style={{ width: "100%", textAlign: "center" }}>
                  <Text strong style={{ fontSize: 18 }}>{item.account}</Text>
                  <Text type="secondary">{item.name}</Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default GroceriesDashboard;
