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
import AllActivities from "./AllActivities";
import ActivitiesDashboard from "./ActivitiesDashboard";
import CurrentActivities from "./CurrentActivities";
import UpcomingActivities from "./UpcomingActivities";
import AddActivity from "./AddActivity";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

const items = [
  { label: "Activity Dashboard", key: "1", children: <ActivitiesDashboard /> },
  { label: "All Activities", key: "2", children: <AllActivities /> },
  { label: "Current Activities", key: "3", children: <CurrentActivities /> },
  { label: "Upcoming Activities", key: "4", children: <UpcomingActivities /> },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const drawerHeaderStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
};

const Activities: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);

  // Drawer states
  const [openAddDrawer, setOpenAddDrawer] = useState(false);

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
              Activities
            </Title>
            <Flex gap="8px">
              <Button type="primary" onClick={() => setOpenAddDrawer(true)}>
                Add Activity
              </Button>
            </Flex>
          </Flex>

          <Tabs items={items} />

          {/* Add Activity Drawer */}
          <Drawer
            title="Add New Activity"
            width={isMobile ? "100%" : "80%"}
            onClose={() => setOpenAddDrawer(false)}
            open={openAddDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            headerStyle={drawerHeaderStyle}
            maskClosable={false}
            keyboard={false}
            closeIcon={
              <CloseOutlined style={{ color: "#000", fontSize: "18px" }} />
            }
          >
            <AddActivity />
          </Drawer>

        </Content>
      </Layout>
    </Layout>
  );
};

export default Activities;
