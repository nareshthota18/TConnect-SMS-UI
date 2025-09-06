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
import AddStaff from "./AddStaff";
import AllStaff from "./AllStaff";
import { CloseOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

// Tabs for Staff
const items = [
  {
    label: "All Staff",
    key: "1",
    children: <AllStaff />,
  },
  {
    label: "Staff Attendance",
    key: "2",
    children: "Staff attendance details will go here.",
  },
  {
    label: "Profile",
    key: "3",
    children: "Profile information will go here.",
  },
  {
    label: "Staff Assets",
    key: "4",
    children: "Staff assets will go here.",
  },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const drawerHeaderStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
};


const Staff = () => {
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
              Staff
            </Title>
            <Button type="primary" onClick={showDrawer}>
              Add Staff
            </Button>
          </Flex>

          <Tabs items={items} />

          {/* Drawer Component */}
          <Drawer
            title="Add New Staff"
            width="80%"
            onClose={onCloseDrawer}
            open={openDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            headerStyle={drawerHeaderStyle}
            maskClosable={false}
            keyboard={false} 
            closeIcon={<CloseOutlined style={{ color: "#000", fontSize: "18px" }} />}
          >
            <AddStaff />
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Staff;
