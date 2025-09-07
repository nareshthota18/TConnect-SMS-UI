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
import AddGrocery from "./AddGrocery";
import AllGrocery from "./AllGrocery";
import GroceriesDashboard from "./GroceriesDashboard";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

// Tabs for Grocery
const items = [
  {
    label: "Groceries Dashboard",
    key: "1",
    children: <GroceriesDashboard />
  },
  {
    label: "All Groceries",
    key: "2",
    children: <AllGrocery />
  },
  {
    label: "Stock Management",
    key: "3",
    children: "Stock management details will go here.",
  },
  {
    label: "Suppliers",
    key: "4",
    children: "Supplier details will go here.",
  },
  {
    label: "Reports",
    key: "5",
    children: "Reports and analytics will go here.",
  },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const drawerHeaderStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
};

const Grocery = () => {
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
              Grocery
            </Title>
            <Button type="primary" onClick={showDrawer}>
              Add Grocery
            </Button>
          </Flex>

          <Tabs items={items} />

          {/* Drawer Component */}
          <Drawer
            title="Add New Grocery Item"
            width="80%"
            onClose={onCloseDrawer}
            open={openDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            headerStyle={drawerHeaderStyle}
            maskClosable={false}
            keyboard={false}
            closeIcon={<CloseOutlined style={{ color: "#000", fontSize: "18px" }} />}
          >
           <AddGrocery />
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Grocery;
