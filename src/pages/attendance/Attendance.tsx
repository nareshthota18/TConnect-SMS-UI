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
import StudentAttendance from "./StudentAttendance";
import StaffAttendance from "./StaffAttendance";
import AddAttendance from "./AddAttendance";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

// Tabs for Attendance
const items = [
  {
    label: "Student Attendance",
    key: "1",
    children: <StudentAttendance />,
  },
  {
    label: "Staff Attendance",
    key: "2",
    children: <StaffAttendance />
  },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const drawerHeaderStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
};

const Attendance = () => {
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
              Attendance
            </Title>
            <Button type="primary" onClick={showDrawer}>
              Add Attendance
            </Button>
          </Flex>

          {/* Tabs for Attendance */}
          <Tabs items={items} />

          {/* Drawer Component */}
          <Drawer
            title="Add Attendance"
            width="80%"
            onClose={onCloseDrawer}
            open={openDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            headerStyle={drawerHeaderStyle}
            maskClosable={false}
            keyboard={false}
            closeIcon={<CloseOutlined style={{ color: "#000", fontSize: "18px" }} />}
          >
            <AddAttendance />
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Attendance;
