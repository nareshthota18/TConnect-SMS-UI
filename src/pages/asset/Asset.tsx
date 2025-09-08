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
import { CloseOutlined } from "@ant-design/icons";
import AddAsset from "./AddAsset";
import SubmitAsset from "./SubmitAsset";
import AllAssets from "./AllAssets";
import AssetsDashboard from "./AssetsDashboard";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

const items = [
  { label: "Assets Dashboard", key: "1", children: <AssetsDashboard /> },
  { label: "All Assets", key: "2", children: <AllAssets /> },
  { label: "Asset History", key: "3", children: "" },
  { label: "Profile", key: "4", children: "Asset profile information will go here." },
  { label: "Asset Allocation", key: "5", children: "Asset allocation details will go here." },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const drawerHeaderStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
};

const Asset: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);

  // First Drawer (Add Asset)
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const showAddDrawer = () => setOpenAddDrawer(true);
  const closeAddDrawer = () => setOpenAddDrawer(false);

  // Second Drawer (Submit Asset)
  const [openSubmitDrawer, setOpenSubmitDrawer] = useState(false);
  const showSubmitDrawer = () => setOpenSubmitDrawer(true);
  const closeSubmitDrawer = () => setOpenSubmitDrawer(false);

  return (
    <Layout>
      {!isMobile && (
        <SideNav isMobile={false} collapsed={collapsed} onClose={() => {}} open={false} />
      )}
      <Layout style={{ padding: "2px" }}>
        <Content style={{ padding: isMobile ? "12px" : "18px 24px", minHeight: 360 }}>
          <Flex justify="space-between">
            <Title level={3} style={{ fontWeight: 700, margin: 0, color: "#1F2937" }}>
              Assets
            </Title>
            <Flex gap="8px">
              <Button type="primary" onClick={showAddDrawer}>
                Add Asset
              </Button>
              <Button type="default" onClick={showSubmitDrawer}>
                Submit Asset
              </Button>
            </Flex>
          </Flex>

          <Tabs items={items} />

          {/* Add Asset Drawer */}
          <Drawer
            title="Add New Asset"
            width= {isMobile ? '100%' : '80%' }
            onClose={closeAddDrawer}
            open={openAddDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            headerStyle={drawerHeaderStyle}
            maskClosable={false}
            keyboard={false}
            closeIcon={<CloseOutlined style={{ color: "#000", fontSize: "18px" }} />}
          >
            <AddAsset />
          </Drawer>

          {/* Submit Asset Drawer */}
          <Drawer
            title="Submit Asset"
            width= {isMobile ? '100%' : '80%' }
            onClose={closeSubmitDrawer}
            open={openSubmitDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            headerStyle={drawerHeaderStyle}
            maskClosable={false}
            keyboard={false}
            closeIcon={<CloseOutlined style={{ color: "#000", fontSize: "18px" }} />}
          >
            <SubmitAsset />
          </Drawer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Asset;
