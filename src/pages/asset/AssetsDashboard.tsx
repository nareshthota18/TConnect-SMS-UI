import { useState } from "react";
import {
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
  DesktopOutlined,
  LaptopOutlined,
  MobileOutlined,
  PrinterOutlined,
  HddOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const { useBreakpoint } = Grid;
const { Text } = Typography;

const AssetsDashboard = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // ✅ Match same border colors as groceries dashboard
  const cardStyle = {
    border: `1px solid ${isDarkMode ? "#ff4d4f" : "#ffbe91"}`,
  };

  const cardHeaderStyle = {
    borderBottom: `1px solid #ffbe91`,
  };

  return (
    <Row gutter={[16, 16]}>
      {/* Main Asset Info Cards */}
      <Col xs={24} md={14}>
        <Row gutter={[16, 16]}>
          {[
            {
              name: "Total Assets",
              count: "500",
              icon: (
                <DatabaseOutlined style={{ fontSize: 18, color: "#FF9145" }} />
              ),
            },
            {
              name: "Desktops",
              count: "120",
              icon: (
                <DesktopOutlined style={{ fontSize: 18, color: "#FF9145" }} />
              ),
            },
            {
              name: "Laptops",
              count: "150",
              icon: (
                <LaptopOutlined style={{ fontSize: 18, color: "#FF9145" }} />
              ),
            },
            {
              name: "Mobile Devices",
              count: "80",
              icon: (
                <MobileOutlined style={{ fontSize: 18, color: "#FF9145" }} />
              ),
            },
            {
              name: "Printers & Scanners",
              count: "40",
              icon: (
                <PrinterOutlined style={{ fontSize: 18, color: "#FF9145" }} />
              ),
            },
            {
              name: "Storage Devices",
              count: "60",
              icon: <HddOutlined style={{ fontSize: 18, color: "#FF9145" }} />,
            },
          ].map((item, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                title={item.icon}
                style={cardStyle}
                headStyle={cardHeaderStyle}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text strong>{item.count}</Text>
                  <Text type="secondary">{item.name}</Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>

      {/* Overview Section */}
      <Col xs={24} md={10}>
        <Card title="Asset Overview" style={cardStyle} headStyle={cardHeaderStyle}>
          <Flex vertical gap="middle">
            <Flex vertical>
              <Text strong>Assets in Use:</Text>
              <Progress percent={75} />
            </Flex>
            <Flex vertical>
              <Text strong>Available Assets:</Text>
              <Progress percent={20} />
            </Flex>
            <Flex vertical>
              <Text strong>Under Maintenance:</Text>
              <Progress percent={5} status="exception" />
            </Flex>
            <Flex vertical>
              <Text strong>Vendors Linked:</Text>
              <Progress percent={80} />
            </Flex>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default AssetsDashboard;
