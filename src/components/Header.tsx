import React, { useEffect, useState } from "react";
import { Button, Layout, Grid, Badge, Avatar, Flex, Typography, Popover } from "antd";
import {
  BellOutlined,
  MoonOutlined,
  SunOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo-hms.png";
import { useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
import NotificationsPopover from "./NotificationsPopover";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchNotificationsApi } from "../store/Notifications/NotificationsActions";

const { Header } = Layout;
const { useBreakpoint } = Grid;
const { Text } = Typography;

type HeaderProps = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const HeaderComponent = ({ darkMode, toggleTheme }: HeaderProps) => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = !screens.md;
  const role = localStorage.getItem("userRole");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

    /* 🔔 Notifications state */
    interface NotificationsState {
      notificationsData: any[];
      notificationsDataLoading: boolean;
      notificationsDataError: boolean;
    }
  
    const { notificationsData } = useSelector(
      (state: RootState) => state.notification as NotificationsState
    );
  
    const unreadCount =
      notificationsData?.filter((n) => !n.isRead).length || 0;

      // 🔹 Fetch notifications on component mount
  useEffect(() => {
    dispatch(fetchNotificationsApi());
  }, [dispatch]);

  return (
    <>
      <Header style={{ position: "sticky", top: 0, zIndex: 999 }}>
        <Flex justify="space-between" align="center" style={{ height: 64 }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: 32, marginRight: 32, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          <Flex align="center" gap="middle">
          <Popover
      content={<NotificationsPopover />}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
      overlayStyle={{ width: '30%' }}
    >
            <Badge count={unreadCount} style={{ fontSize: 10, cursor: 'pointer' }} size="small">
              <BellOutlined style={{ color: "white", cursor: 'pointer' }} />
            </Badge>
            </Popover>
            <Button
              type="text"
              icon={
                darkMode ? (
                  <SunOutlined style={{ color: "white" }} />
                ) : (
                  <MoonOutlined style={{ color: "white" }} />
                )
              }
              onClick={toggleTheme}
              style={{ fontSize: 14 }}
            />
            <Flex align="center" gap="small">
              <Avatar>{(role || "User").charAt(0).toUpperCase()}</Avatar>
              {!isMobile && (
                <Text strong style={{ color: "white" }}>
                  {role?.toUpperCase() === "SUPERADMIN"
                    ? "SUPER ADMIN"
                    : (role || "User").toUpperCase()}
                </Text>
              )}
            </Flex>
          </Flex>
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined style={{ color: "white", fontSize: 18 }} />}
              onClick={() => setDrawerOpen(true)}
            />
          )}
        </Flex>
      </Header>

      {/* Drawer for mobile menu */}
      {isMobile && (
        <SideNav
          isMobile={isMobile}
          collapsed={false}
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
        />
      )}
    </>
  );
};

export default HeaderComponent;
