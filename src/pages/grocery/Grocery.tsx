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
import AddGrocery from "./AddGrocery";
import AllGrocery from "./AllGrocery";
import GroceriesDashboard from "./GroceriesDashboard";
import GroceryConsumptionConfig from "./GroceryConsumptionConfig";
import AddConfigItem from "./AddConfigItem";
// 👉 If you have a component for Config Item Form, import it here
// import AddConfigItem from "./AddConfigItem";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

const items = [
  {
    label: "Groceries Dashboard",
    key: "1",
    children: <GroceriesDashboard />,
  },
  {
    label: "All Groceries",
    key: "2",
    children: <AllGrocery />,
  },
  {
    label: "Grocery Consumption Config",
    key: "5",
    children: <GroceryConsumptionConfig />,
  },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const headerStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  padding: "12px 20px",
  fontSize: 16,
  // fontWeight: 700,
  margin: 0,
};

const Grocery = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);

  // Grocery Modal
  const [openModal, setOpenModal] = useState(false);

  // Config Modal
  const [openConfigModal, setOpenConfigModal] = useState(false);

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
              Grocery
            </Title>

            <Flex gap={10}>
              <Button type="primary" onClick={() => setOpenModal(true)}>
                Add Grocery
              </Button>

              {/* NEW BUTTON */}
              <Button type="default" onClick={() => setOpenConfigModal(true)}>
                Add Config Item
              </Button>
            </Flex>
          </Flex>

          <Tabs items={items} />

          {/* Grocery Add Modal */}
          <Modal
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null}
            width={isMobile ? "100%" : "70%"}
            style={{ top: isMobile ? 0 : 40 }}
            bodyStyle={{ padding: 0, borderRadius: 12 }}
            styles={{
              content: {
                borderRadius: 12,
                overflow: "hidden",
              },
            }}
            destroyOnClose
          >
            <div style={headerStyle}>Add New Grocery Item</div>
            <div style={{ padding: 24 }}>
              <AddGrocery closeModal={() => setOpenModal(false)} />
            </div>
          </Modal>

          {/* NEW CONFIG ITEM MODAL */}
          <Modal
            open={openConfigModal}
            onCancel={() => setOpenConfigModal(false)}
            footer={null}
            width={isMobile ? "100%" : "60%"}
            style={{ top: isMobile ? 0 : 40 }}
            bodyStyle={{ padding: 0, borderRadius: 12 }}
            styles={{
              content: { borderRadius: 12, overflow: "hidden" },
            }}
            destroyOnClose
          >
            <div style={headerStyle}>Add Config Item</div>

            <div style={{ padding: 24 }}>
              {/* Replace this with your actual form */}
              {/* Example: <AddConfigItem close={() => setOpenConfigModal(false)} /> */}
              <AddConfigItem />
            </div>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Grocery;
