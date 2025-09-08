import { useState } from "react";
import { Row, Col, Card, Typography, Space } from "antd";
import {
  AppstoreOutlined,
  ToolOutlined,
  DeploymentUnitOutlined,
  BuildOutlined,
  SettingOutlined,
  HddOutlined,
  LaptopOutlined,
  MobileOutlined,
  DatabaseOutlined,
  ContainerOutlined,
  ShopOutlined,
  BarcodeOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text } = Typography;

const InventoryDashboard = () => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const cardStyle = {
    border: `1px solid ${isDarkMode ? "#ff4d4f" : "#ffbe91"}`,
    textAlign: "center" as const,
  };

  const cardHeaderStyle = {
    borderBottom: `1px solid #ffbe91`,
    textAlign: "center" as const,
  };

  const inventoryItems = [
    {
      name: "Total Inventory Items",
      account: "1200",
      icon: <AppstoreOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/inventory",
    },
    {
      name: "Electronics",
      account: "300",
      icon: <HddOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/inventory/electronics",
    },
    {
      name: "Furniture",
      account: "250",
      icon: (
        <DeploymentUnitOutlined style={{ fontSize: 18, color: "#FF9145" }} />
      ),
      link: "/inventory/furniture",
    },
    {
      name: "Tools & Hardware",
      account: "150",
      icon: <ToolOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/inventory/tools",
    },
    {
      name: "Office Supplies",
      account: "300",
      icon: <BuildOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/inventory/office",
    },
    {
      name: "Maintenance Items",
      account: "200",
      icon: <SettingOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/inventory/maintenance",
    },
    // ✅ Additional 6 items
    {
      name: "Laptops",
      account: "100",
      icon: <LaptopOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/inventory/laptops",
    },
    {
      name: "Mobile Devices",
      account: "80",
      icon: <MobileOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/inventory/mobiles",
    },
    {
      name: "Storage Devices",
      account: "60",
      icon: <DatabaseOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/inventory/storage",
    },
    {
      name: "Containers & Boxes",
      account: "90",
      icon: <ContainerOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/inventory/containers",
    },
    {
      name: "Retail Stock",
      account: "150",
      icon: <ShopOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/inventory/retail",
    },
    {
      name: "Barcode & Labels",
      account: "70",
      icon: <BarcodeOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
      link: "/inventory/barcodes",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={24}>
        <Row gutter={[16, 16]}>
          {inventoryItems.map((item, index) => (
            <Col xs={12} sm={12} md={4} key={index}>
              <Card
                title={item.icon}
                style={cardStyle}
                headStyle={cardHeaderStyle}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
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

export default InventoryDashboard;
