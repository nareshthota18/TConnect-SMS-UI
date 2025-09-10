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
} from "@ant-design/icons";

const { Text } = Typography;

const InventoryDashboard = () => {
  // ✅ Function to determine colors based on stock count
  const getCardColors = (count: number) => {
    if (count === 0) {
      return {
        background: "rgba(255, 77, 79, 0.2)",
        border: "#ff4d4f",
        icon: "#ff4d4f", // red
      };
    }
    if (count < 100) {
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

  const inventoryItems = [
    { name: "Total Inventory Items", account: 1200, icon: AppstoreOutlined, link: "/inventory" },
    { name: "Electronics", account: 300, icon: HddOutlined, link: "/inventory/electronics" },
    { name: "Furniture", account: 250, icon: DeploymentUnitOutlined, link: "/inventory/furniture" },
    { name: "Tools & Hardware", account: 0, icon: ToolOutlined, link: "/inventory/tools" },
    { name: "Office Supplies", account: 75, icon: BuildOutlined, link: "/inventory/office" },
    { name: "Maintenance Items", account: 200, icon: SettingOutlined, link: "/inventory/maintenance" },
    { name: "Laptops", account: 100, icon: LaptopOutlined, link: "/inventory/laptops" },
    { name: "Mobile Devices", account: 80, icon: MobileOutlined, link: "/inventory/mobiles" },
    { name: "Storage Devices", account: 60, icon: DatabaseOutlined, link: "/inventory/storage" },
    { name: "Containers & Boxes", account: 90, icon: ContainerOutlined, link: "/inventory/containers" },
    { name: "Retail Stock", account: 150, icon: ShopOutlined, link: "/inventory/retail" },
    { name: "Barcode & Labels", account: 0, icon: BarcodeOutlined, link: "/inventory/barcodes" },
  ];

  return (
    <div>
      {/* ✅ Legend Top Right */}
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

      {/* ✅ Inventory Cards */}
      <Row gutter={[16, 16]}>
        {inventoryItems.map((item, index) => {
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
                <Space direction="vertical" style={{ width: "100%" }}>
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

export default InventoryDashboard;
