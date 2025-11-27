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
import { CloseOutlined } from "@ant-design/icons";
import SideNav from "../../components/SideNav";
import AddInventory from "./AddInventory";
import AllInventory from "./AllInventory";
import InventoryDashboard from "./InventoryDashboard";
import AddItem from "./AddItem";
import AllItems from "./AllItems";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

// Tabs
const items = [
  {
    label: "Inventory Dashboard",
    key: "1",
    children: <InventoryDashboard />,
  },
  {
    label: "All Inventory",
    key: "2",
    children: <AllInventory />,
  },
  {
    label: "All Items",
    key: "3",
    children: <AllItems />,
  }
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Reusable modal header style (same as User page)
const modalStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
  padding: "16px 24px",
};

const Inventory = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);

  // Modal States
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [openAddInventoryModal, setOpenAddInventoryModal] = useState(false);

  // Modal handlers
  const showAddItemModal = () => setOpenAddItemModal(true);
  const closeAddItemModal = () => setOpenAddItemModal(false);

  const showAddInventoryModal = () => setOpenAddInventoryModal(true);
  const closeAddInventoryModal = () => setOpenAddInventoryModal(false);

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
              style={{
                fontWeight: 700,
                margin: 0,
                color: "#1F2937",
              }}
            >
              Inventory
            </Title>

            <Flex gap="middle">
              <Button type="primary" onClick={showAddItemModal}>
                Add Item
              </Button>

              <Button type="primary" onClick={showAddInventoryModal}>
                Add Inventory
              </Button>
            </Flex>
          </Flex>

          {/* Tabs */}
          <Tabs items={items} />

          {/* Add Item Modal */}
          <Modal
            title="Add New Item"
            open={openAddItemModal}
            onCancel={closeAddItemModal}
            footer={null}
            width={isMobile ? "95%" : "60%"}
            styles={{
              header: modalStyle,
            }}
            bodyStyle={{ padding: 0 }}
            closeIcon={<CloseOutlined />}
            maskClosable={false}
          >
            <AddItem />
          </Modal>

          {/* Add Inventory Modal */}
          <Modal
            title="Add New Inventory"
            open={openAddInventoryModal}
            onCancel={closeAddInventoryModal}
            footer={null}
            width={isMobile ? "95%" : "60%"}
            styles={{
              header: modalStyle,
            }}
            bodyStyle={{ padding: 0 }}
            closeIcon={<CloseOutlined />}
            maskClosable={false}
          >
            <AddInventory />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Inventory;