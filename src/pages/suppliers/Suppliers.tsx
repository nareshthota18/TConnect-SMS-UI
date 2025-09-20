import React, { useState } from "react";
import {
  Layout,
  Tabs,
  Grid,
  Typography,
  Button,
  Flex,
  Drawer,
} from "antd";
import SideNav from "../../components/SideNav";
import { CloseOutlined } from "@ant-design/icons";
import AllSuppliers from "./AllSuppliers";
import AddSuppliers from "./AddSuppliers";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

const items = [
  {
    label: "All Suppliers",
    key: "1",
    children: <AllSuppliers />,
  },
  {
    label: "Supplier Assets",
    key: "2",
    children: "Supplier assets list will go here.",
  },
  {
    label: "Profile",
    key: "3",
    children: "Supplier profile information will go here.",
  },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const drawerHeaderStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
};

const Suppliers: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);

  // Drawer state
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
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
        <Content
          style={{
            padding: isMobile ? "12px" : "18px 24px",
            minHeight: 360,
          }}
        >
          <Flex justify="space-between">
            <Title
              level={3}
              style={{ fontWeight: 700, margin: 0, color: "#1F2937" }}
            >
              Suppliers
            </Title>
            <Flex gap="middle">
              <Button
                type="primary"
                onClick={showDrawer}
                disabled={activeKey !== "1"}
              >
                Add Supplier
              </Button>
            </Flex>
          </Flex>

          <Tabs
            items={items}
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
          />

          {/* Drawer: Add Supplier */}
          <Drawer
            title="Add New Supplier"
            width={isMobile ? "100%" : "80%"}
            onClose={onCloseDrawer}
            open={openDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            headerStyle={drawerHeaderStyle}
            maskClosable={false}
            keyboard={false}
            closeIcon={
              <CloseOutlined style={{ color: "#000", fontSize: "18px" }} />
            }
          >
            <AddSuppliers />
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Suppliers;
