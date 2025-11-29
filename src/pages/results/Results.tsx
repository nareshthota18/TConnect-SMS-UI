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
import AllResults from "./AllResults";
import AddResult from "./AddResult";
// import AllResults from "./AllResults";
// import AddResult from "./AddResult";
// import ResultsList from "./ResultsList"; 

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

// Tabs for Results
const items = [
  {
    label: "All Results",
    key: "1",
    children: <AllResults />,
  },
  {
    label: "Latest Results",
    key: "2",
    // children: <ResultsList />,
  },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const modalStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
  padding: "16px 24px",
};

const Results: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  // Modal State
  const [openResultModal, setOpenResultModal] = useState(false);

  const showResultModal = () => setOpenResultModal(true);
  const closeResultModal = () => setOpenResultModal(false);

  return (
    <Layout>
      {/* Side Navigation */}
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
              Results Management
            </Title>

            <Flex gap="middle">
              <Button
                type="primary"
                onClick={showResultModal}
                disabled={activeKey !== "1"}
              >
                Add Result
              </Button>
            </Flex>
          </Flex>

          {/* Tabs */}
          <Tabs
            items={items}
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
          />

          {/* Add Result Modal */}
          <Modal
            title="Add New Result"
            open={openResultModal}
            onCancel={closeResultModal}
            footer={null}
            width={isMobile ? "95%" : "60%"}
            styles={{
              header: modalStyle,
            }}
            maskClosable={false}
            bodyStyle={{ padding: 0 }}
          >
            <AddResult />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Results;
