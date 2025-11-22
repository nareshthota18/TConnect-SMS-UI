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
import AllHolidays from "./AllHolidays";
import AddHolidays from "./AddHolidays";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

// Tabs for Holidays
const items = [
  {
    label: "All Holidays",
    key: "1",
    children: <AllHolidays />,
  },
  {
    label: "Holiday Calendar",
    key: "2",
    children: "Holiday Calendar view will go here.",
  },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const modalStyles = {
  header: {
    backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
    padding: 16,
  },
  title: {
    color: isDarkMode ? "#ffffff" : "#000000",
    margin: 0,
  },
};

const Holidays = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed] = useState(false);

  // Modal State
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

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
            <Title level={3} style={{ fontWeight: 700, margin: 0, color: "#1F2937" }}>
              Holidays
            </Title>
            <Button type="primary" onClick={showModal}>
              Add Holiday
            </Button>
          </Flex>

          {/* Tabs Section */}
          <Tabs items={items} />

          {/* Modal Section */}
          <Modal
            title={<div style={modalStyles.title}>Add New Holiday</div>}
            open={openModal}
            onCancel={onCloseModal}
            footer={null}
            width={isMobile ? "100%" : "60%"}
            closeIcon={<CloseOutlined style={{ color: "#000", fontSize: 18 }} />}
            styles={{ header: modalStyles.header }}
          >
            {/* Replace this with your AddHoliday form component */}
           <AddHolidays />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Holidays;
