import { useState } from "react";
import {
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
  ToolOutlined,
  DeploymentUnitOutlined,
  BuildOutlined,
  SettingOutlined,
  HddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text } = Typography;

const InventoryDashboard = () => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const cardStyle = {
    border: `1px solid ${isDarkMode ? "#ff4d4f" : "#ffbe91"}`,
  };

  const cardHeaderStyle = {
    borderBottom: `1px solid #ffbe91`,
  };

  return (
    <Row gutter={[16, 16]}>
      {/* Main Inventory Info Cards */}
      <Col xs={24} md={14}>
        <Row gutter={[16, 16]}>
          {[
            {
              name: "Total Inventory Items",
              account: "1200",
              icon: (
                <AppstoreOutlined
                  style={{ fontSize: 18, color: "#FF9145" }}
                />
              ),
              link: "/inventory",
            },
            {
              name: "Electronics",
              account: "300",
              icon: (
                <HddOutlined style={{ fontSize: 18, color: "#FF9145" }} />
              ),
              link: "/inventory/electronics",
            },
            {
              name: "Furniture",
              account: "250",
              icon: (
                <DeploymentUnitOutlined
                  style={{ fontSize: 18, color: "#FF9145" }}
                />
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
              icon: (
                <BuildOutlined style={{ fontSize: 18, color: "#FF9145" }} />
              ),
              link: "/inventory/office",
            },
            {
              name: "Maintenance Items",
              account: "200",
              icon: (
                <SettingOutlined style={{ fontSize: 18, color: "#FF9145" }} />
              ),
              link: "/inventory/maintenance",
            },
          ].map((item, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                title={item.icon}
                style={cardStyle}
                headStyle={cardHeaderStyle}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text strong>{item.account}</Text>
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
              <Progress percent={80} />
            </Flex>
            <Flex vertical>
              <Text strong>Issued Items:</Text>
              <Progress percent={60} />
            </Flex>
            <Flex vertical>
              <Text strong>Under Maintenance:</Text>
              <Progress percent={25} status="exception" />
            </Flex>
            <Flex vertical>
              <Text strong>Requests Pending:</Text>
              <Progress percent={50} />
            </Flex>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default InventoryDashboard;
