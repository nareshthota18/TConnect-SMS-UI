import React, { useState } from "react";
import {
  Layout,
  Tabs,
  Grid,
  Typography,
  Button,
  Flex,
  Modal,
} from "antd";
import SideNav from "../../components/SideNav";
import { CloseOutlined } from "@ant-design/icons";
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
  // { label: "Current Activities", key: "3", children: <CurrentActivities /> },
  // { label: "Upcoming Activities", key: "4", children: <UpcomingActivities /> },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

// 🎨 Modal Header Styles (same as Holidays)
const modalStyles = {
  header: {
    backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
    padding: 16,
  },
  title: {
    color: isDarkMode ? "#ffffff" : "#000000",
    margin: 0,
    fontWeight: 700,
    fontSize: "18px",
  },
};

const Activities: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed] = useState(false);
  const role = localStorage.getItem("userRole");

  const [openModal, setOpenModal] = useState(false);

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

            {(role === "SuperAdmin" || role === "Admin") && (
              <Button type="primary" onClick={() => setOpenModal(true)}>
                Add Activity
              </Button>
            )}
          </Flex>

          <Tabs items={items} />

          {/* Modal Section (Same Styling as Holidays) */}
          <Modal
            title={<div style={modalStyles.title}>Add New Activity</div>}
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null}
            centered
            destroyOnClose
            width={isMobile ? "100%" : "60%"}

            // Same header style
            closeIcon={<CloseOutlined style={{ color: "#000", fontSize: 18 }} />}
            styles={{ header: modalStyles.header }}
          >
            <AddActivity closeModal={() => setOpenModal(false)} />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Activities;
