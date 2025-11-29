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
import AddUser from "./AddUser";
import AllUsers from "./AllUsers";
import AllRoles from "./AllRoles";
import AddRole from "./AddRole";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

// Tabs for User Roles
const items = [
  {
    label: "All Users",
    key: "1",
    children: <AllUsers />,
  },
  {
    label: "User Roles",
    key: "2",
    children: <AllRoles />,
  },
  {
    label: "Permissions",
    key: "3",
    children: "Permissions management will go here.",
  },
  // {
  //   label: "Activity Logs",
  //   key: "4",
  //   children: "User activity logs will go here.",
  // },
];

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const modalStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
  padding: '16px 24px'
};

const User: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const role = localStorage.getItem("userRole"); 
  const filteredItems = role === "Admin"
  ? items.filter(tab => tab.key !== "2")
  : items;

  // Modal States
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);

  // Handlers for Modals
  const showUserModal = () => setOpenUserModal(true);
  const closeUserModal = () => setOpenUserModal(false);

  const showRoleModal = () => setOpenRoleModal(true);
  const closeRoleModal = () => setOpenRoleModal(false);

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
          <Flex justify="space-between" align={isMobile ? 'start' : 'center'} vertical={isMobile} gap='small'>
            <Title
              level={3}
              style={{ fontWeight: 700, margin: 0, color: "#1F2937" }}
            >
              User Management
            </Title>

            <Flex gap="middle">
              {/* Add User Button */}
              <Button
                type="primary"
                onClick={showUserModal}
                disabled={activeKey !== "1"}
              >
                Add User
              </Button>

              {/* Add Role Button */}
              {role !== "Admin" && (
                <Button
                  type="primary"
                  onClick={showRoleModal}
                  disabled={activeKey !== "2"}
                >
                  Add Role
                </Button>
              )}
            </Flex>
          </Flex>

          {/* Tabs */}
          <Tabs
            items={filteredItems}
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
          />

          {/* Modal for Add User */}
          <Modal
            title="Add New User"
            open={openUserModal}
            onCancel={closeUserModal}
            footer={null}
            width={isMobile ? "95%" : "60%"}
            styles={{
              header: modalStyle,
            }}
            bodyStyle={{ padding: 0 }}
            maskClosable={false}
          >
            <AddUser />
          </Modal>

          {/* Modal for Add Role */}
          <Modal
            title="Add New Role"
            open={openRoleModal}
            onCancel={closeRoleModal}
            footer={null}
            width={isMobile ? "95%" : "50%"}
            styles={{
              header: modalStyle,
            }}
            maskClosable={false}
          >
            <AddRole />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default User;
