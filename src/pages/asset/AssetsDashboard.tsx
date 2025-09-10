import { useState } from "react";
import { Layout, Grid, Row, Col, Card, Typography, Space } from "antd";
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
const { Content } = Layout;
const { Text } = Typography;

const AssetsDashboard = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);

  // ✅ Dynamic card color logic
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

  const assetItems = [
    { name: "Total Assets", count: 500, icon: DatabaseOutlined },
    { name: "Desktops", count: 120, icon: DesktopOutlined },
    { name: "Laptops", count: 150, icon: LaptopOutlined },
    { name: "Mobile Devices", count: 80, icon: MobileOutlined },
    { name: "Printers & Scanners", count: 40, icon: PrinterOutlined },
    { name: "Storage Devices", count: 60, icon: HddOutlined },

    // Additional items
    { name: "Servers", count: 30, icon: CloudServerOutlined },
    { name: "Cloud Accounts", count: 25, icon: CloudOutlined },
    { name: "APIs", count: 18, icon: ApiOutlined },
    { name: "Network Devices", count: 0, icon: WifiOutlined },
    { name: "USB Devices", count: 75, icon: UsbOutlined },
    { name: "Power Equipment", count: 40, icon: ThunderboltOutlined },
  ];

  return (
    <div>
      {/* ✅ Legend */}
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

      {/* ✅ Asset Cards */}
      <Row gutter={[16, 16]}>
        {assetItems.map((item, index) => {
          const { background, border, icon } = getCardColors(item.count);
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
                <Space
                  direction="vertical"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  <Text strong style={{ fontSize: 18 }}>
                    {item.count}
                  </Text>
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

export default AssetsDashboard;
