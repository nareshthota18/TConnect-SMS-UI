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
import AllExams from "./AllExams";
import AddExam from "./AddExam";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

// Tabs for Exams
const items = [
  {
    label: "All Exams",
    key: "1",
    children: <AllExams />,
  },
  {
    label: "Exam Categories",
    key: "2",
    children: "Exam category management section.",
  },
  {
    label: "Schedules",
    key: "3",
    children: "Exam schedules will go here.",
  },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const modalStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
  padding: "16px 24px",
};

const Exams: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  // Modal State
  const [openExamModal, setOpenExamModal] = useState(false);

  const showExamModal = () => setOpenExamModal(true);
  const closeExamModal = () => setOpenExamModal(false);

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
          {/* Header */}
          <Flex
            justify="space-between"
            align={isMobile ? "start" : "center"}
            vertical={isMobile}
            gap="small"
          >
            <Title
              level={3}
              style={{ fontWeight: 700, margin: 0, color: "#1F2937" }}
            >
              Exams Management
            </Title>

            <Flex gap="middle">
              <Button
                type="primary"
                onClick={showExamModal}
                disabled={activeKey !== "1"}
              >
                Add Exam
              </Button>
            </Flex>
          </Flex>

          {/* Tabs */}
          <Tabs
            items={items}
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
          />

          {/* Add Exam Modal */}
          <Modal
            title="Add New Exam"
            open={openExamModal}
            onCancel={closeExamModal}
            footer={null}
            width={isMobile ? "95%" : "60%"}
            styles={{
              header: modalStyle,
            }}
            maskClosable={false}
            bodyStyle={{ padding: 0 }}
          >
            <AddExam />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Exams;
