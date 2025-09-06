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
import { CloseOutlined } from "@ant-design/icons";
import SideNav from "../../components/SideNav";
import AddInventory from "./AddInventory";
import AllInventory from "./AllInventory";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

// Tabs for Inventory
const items = [
  {
    label: "All Inventory",
    key: "1",
    children: <AllInventory />
  },
  {
    label: "Inventory Reports",
    key: "2",
    children: "Inventory reports will go here.",
  },
  {
    label: "Categories",
    key: "3",
    children: "Inventory categories will go here.",
  },
  {
    label: "Suppliers",
    key: "4",
    children: "Inventory suppliers will go here.",
  },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const drawerHeaderStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
};

const Inventory = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);

  // Drawer State
  const [openDrawer, setOpenDrawer] = useState(false);

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
        <Content style={{ padding: "18px 24px", minHeight: 360 }}>
          <Flex justify="space-between">
            <Title
              level={3}
              style={{ fontWeight: 700, margin: 0, color: "#1F2937" }}
            >
              Inventory Management
            </Title>
            <Button type="primary" onClick={showDrawer}>
              Add Inventory
            </Button>
          </Flex>

          <Tabs items={items} />

          {/* Drawer Component */}
          <Drawer
            title="Add New Inventory Item"
            width="80%"
            onClose={onCloseDrawer}
            open={openDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            headerStyle={drawerHeaderStyle}
            maskClosable={false}
            keyboard={false}
            closeIcon={<CloseOutlined style={{ color: "#000", fontSize: "18px" }} />}
          >
            <AddInventory />
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Inventory;
