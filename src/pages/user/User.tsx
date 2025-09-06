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
import AddUser from "./AddUser";
import AllUsers from "./AllUsers";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

// Tabs for User Roles
const items = [
  {
    label: "All Users",
    key: "1",
    children: <AllUsers />
  },
  {
    label: "User Roles",
    key: "2",
    children: "User role details will go here.",
  },
  {
    label: "Permissions",
    key: "3",
    children: "Permissions management will go here.",
  },
  {
    label: "Activity Logs",
    key: "4",
    children: "User activity logs will go here.",
  },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const drawerHeaderStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
};

const User: React.FC = () => {
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
          <Flex justify="space-between" align="center">
            <Title
              level={3}
              style={{ fontWeight: 700, margin: 0, color: "#1F2937" }}
            >
              User Management
            </Title>
            <Button type="primary" onClick={showDrawer}>
              Add User
            </Button>
          </Flex>

          <Tabs items={items} />

          {/* Drawer Component */}
          <Drawer
            title="Add New User"
            width="80%"
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
            <AddUser />
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default User;
