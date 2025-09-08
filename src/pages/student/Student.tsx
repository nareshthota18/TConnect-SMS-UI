import React, { useState } from "react";
import {
  Layout,
  Tabs,
  Grid,
  Typography,
  Button,
  Flex,
  Drawer,
  Form,
  Input,
} from "antd";
import SideNav from "../../components/SideNav";
import AllStudents from "./AllStudents";
import AddStudent from "./AddStudent";
import { CloseOutlined } from "@ant-design/icons";
import StudentHealth from "./StudentHealth";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

const items = [
  {
    label: "All Students",
    key: "1",
    children: <AllStudents />,
  },
  {
    label: "Student Health",
    key: "2",
    children: <StudentHealth />,
  },
  {
    label: "Profile",
    key: "3",
    children: "Profile information will go here.",
  },
  {
    label: "Student Assets",
    key: "4",
    children: "Student Assets will go here.",
  },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const drawerHeaderStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
};

const Student = () => {
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
        <Content style={{ padding: isMobile ? "12px" : "18px 24px", minHeight: 360 }}>
          <Flex justify="space-between">
            <Title
              level={3}
              style={{ fontWeight: 700, margin: 0, color: "#1F2937" }}
            >
              Student
            </Title>
            <Button type="primary" onClick={showDrawer}>
              Add Student
            </Button>
          </Flex>

          <Tabs items={items} />

          {/* Drawer Component */}
          <Drawer
            title="Add New Student"
            width= {isMobile ? '100%' : '80%' }
            onClose={onCloseDrawer}
            open={openDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            headerStyle={drawerHeaderStyle}
            maskClosable={false}
            keyboard={false} 
            closeIcon={<CloseOutlined style={{ color: "#000", fontSize: "18px" }} />}
          >
           <AddStudent />
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Student;
