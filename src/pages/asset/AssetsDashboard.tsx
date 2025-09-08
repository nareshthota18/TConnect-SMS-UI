import { useState } from "react";
import {
  Grid,
  Row,
  Col,
  Card,
  Typography,
  Space,
} from "antd";
import {
  DesktopOutlined,
  LaptopOutlined,
  MobileOutlined,
  PrinterOutlined,
  HddOutlined,
  DatabaseOutlined,
  CloudServerOutlined,
  CloudOutlined,
  ApiOutlined,
  WifiOutlined,
  UsbOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  SecurityScanOutlined,
  CodeOutlined,
  CameraOutlined,
  BulbOutlined,
  RobotOutlined,
  CarOutlined,
} from "@ant-design/icons";

const { useBreakpoint } = Grid;
const { Text } = Typography;

const AssetsDashboard = () => {
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

  const assetItems = [
    { name: "Total Assets", count: "500", icon: <DatabaseOutlined style={{ fontSize: 18, color: "#FF9145" }} /> },
    { name: "Desktops", count: "120", icon: <DesktopOutlined style={{ fontSize: 18, color: "#FF9145" }} /> },
    { name: "Laptops", count: "150", icon: <LaptopOutlined style={{ fontSize: 18, color: "#FF9145" }} /> },
    { name: "Mobile Devices", count: "80", icon: <MobileOutlined style={{ fontSize: 18, color: "#FF9145" }} /> },
    { name: "Printers & Scanners", count: "40", icon: <PrinterOutlined style={{ fontSize: 18, color: "#FF9145" }} /> },
    { name: "Storage Devices", count: "60", icon: <HddOutlined style={{ fontSize: 18, color: "#FF9145" }} /> },

    // Additional 12 items
    { name: "Servers", count: "30", icon: <CloudServerOutlined style={{ fontSize: 18, color: "#FF9145" }} /> },
    { name: "Cloud Accounts", count: "25", icon: <CloudOutlined style={{ fontSize: 18, color: "#FF9145" }} /> },
    { name: "APIs", count: "18", icon: <ApiOutlined style={{ fontSize: 18, color: "#FF9145" }} /> },
    { name: "Network Devices", count: "50", icon: <WifiOutlined style={{ fontSize: 18, color: "#FF9145" }} /> },
    { name: "USB Devices", count: "75", icon: <UsbOutlined style={{ fontSize: 18, color: "#FF9145" }} /> },
    { name: "Power Equipment", count: "40", icon: <ThunderboltOutlined style={{ fontSize: 18, color: "#FF9145" }} /> },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={24}>
        <Row gutter={[16, 16]}>
          {assetItems.map((item, index) => (
            <Col xs={12} sm={12} md={4} key={index}>
              <Card
                title={item.icon}
                style={cardStyle}
                headStyle={cardHeaderStyle}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text strong style={{ fontSize: 18 }}>{item.count}</Text>
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

export default AssetsDashboard;
