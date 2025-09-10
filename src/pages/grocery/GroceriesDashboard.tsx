import { useState } from "react";
import { Layout, Grid, Row, Col, Card, Typography, Space } from "antd";
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

  // ✅ Function for dynamic colors
  const getCardColors = (count: number) => {
    if (count === 0) {
      return {
        background: "rgba(255, 77, 79, 0.2)",
        border: "#ff4d4f",
        icon: "#ff4d4f", // red
      };
    }
    if (count < 50) {
      return {
        background: "rgba(255, 255, 102, 0.3)",
        border: "#d4b106",
        icon: "#d4b106", // yellow
      };
    }
    return {
      background: "rgba(82, 196, 26, 0.2)",
      border: "#389e0d",
      icon: "#389e0d", // green
    };
  };

  const groceryStats = [
    { name: "Total Grocery Items", account: 350, icon: ShoppingCartOutlined, link: "/groceries" },
    { name: "Personal Care", account: 30, icon: SkinOutlined, link: "/groceries/personal-care" },
    { name: "Fruits & Vegetables", account: 120, icon: AppleOutlined, link: "/groceries/fruits" },
    { name: "Safety & Hygiene", account: 20, icon: SafetyOutlined, link: "/groceries/safety" },
    { name: "Beverages", account: 80, icon: CoffeeOutlined, link: "/groceries/beverages" },
    { name: "Snacks", account: 50, icon: GiftOutlined, link: "/groceries/snacks" },
    { name: "Dairy & Bakery", account: 60, icon: HomeOutlined, link: "/groceries/dairy" },
    { name: "Household Essentials", account: 40, icon: ShopOutlined, link: "/groceries/household" },
    { name: "Health & Medicine", account: 25, icon: MedicineBoxOutlined, link: "/groceries/health" },
    { name: "Automotive Essentials", account: 0, icon: CarOutlined, link: "/groceries/automotive" },
    { name: "Tools & Hardware", account: 15, icon: ToolOutlined, link: "/groceries/tools" },
    { name: "Pet Supplies", account: 18, icon: ExperimentOutlined, link: "/groceries/pet-supplies" },
  ];

  return (
    <div>
      {/* ✅ Legend on Top Right */}
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Space size="large">
          <Space>
            <span style={{ width: 14, height: 14, background: "rgba(82,196,26,0.6)", border: "1px solid #389e0d", display: "inline-block", borderRadius: 4 }} />
            <Text>Full Stock</Text>
          </Space>
          <Space>
            <span style={{ width: 14, height: 14, background: "rgba(255,255,102,0.6)", border: "1px solid #d4b106", display: "inline-block", borderRadius: 4 }} />
            <Text>Low Stock</Text>
          </Space>
          <Space>
            <span style={{ width: 14, height: 14, background: "rgba(255,77,79,0.4)", border: "1px solid #ff4d4f", display: "inline-block", borderRadius: 4 }} />
            <Text>Out of Stock</Text>
          </Space>
        </Space>
      </Row>

      {/* ✅ Grocery Cards */}
      <Row gutter={[16, 16]}>
        {groceryStats.map((item, index) => {
          const { background, border, icon } = getCardColors(Number(item.account));
          const IconComponent = item.icon;

          return (
            <Col xs={12} sm={12} md={8} lg={4} key={index}>
              <Card
                title={<IconComponent style={{ fontSize: 18, color: icon }} />}
                style={{
                  textAlign: "center",
                  backgroundColor: background,
                  border: `1px solid ${border}`,
                }}
                headStyle={{
                  borderBottom: `1px solid ${border}`,
                  textAlign: "center",
                }}
              >
                <Space direction="vertical" style={{ width: "100%", textAlign: "center" }}>
                  <Text strong style={{ fontSize: 18 }}>{item.account}</Text>
                  <Text type="secondary">{item.name}</Text>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default GroceriesDashboard;
