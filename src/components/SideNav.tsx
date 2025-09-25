import React, { useState } from "react";
import {
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  CheckSquareOutlined,
  DeploymentUnitOutlined,
  BarChartOutlined,
  SettingOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
  CalendarOutlined,
  BankOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Drawer, Button } from "antd";
import type { MenuProps } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/Login/LoginActions";

const { Sider } = Layout;

type SideNavProps = {
  isMobile: boolean;
  collapsed: boolean;
  onClose: () => void;
  open: boolean;
};

const SideNav: React.FC<SideNavProps> = ({
  isMobile,
  collapsed,
  onClose,
  open,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("userRole"); 

  const handleLogout = () => {
    (dispatch as any)(logout());
    navigate("/");
  };

  const items: MenuProps["items"] = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
  ...(role === "SuperAdmin"
  ? [
      {
        key: "/schools",
        icon: <BankOutlined />,
        label: <Link to="/schools">Schools</Link>,
      },
    ]
  : []),
    {
      key: "/student",
      icon: <UserOutlined />,
      label: <Link to="/student">Student</Link>,
    },
    {
      key: "/activities",
      icon: <CalendarOutlined />,
      label: <Link to="/activities">Activities</Link>,
    },
    {
      key: "/staff",
      icon: <TeamOutlined />,
      label: <Link to="/staff">Staff</Link>,
    },
    {
      key: "/inventory",
      icon: <AppstoreOutlined />,
      label: <Link to="/inventory">Inventory</Link>,
    },
    {
      key: "/suppliers",
      icon: <ApartmentOutlined />,
      label: <Link to="/suppliers">Suppliers</Link>,
    },
    {
      key: "/grocery",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/grocery">Grocery</Link>,
    },
    {
      key: "/attendance",
      icon: <CheckSquareOutlined />,
      label: <Link to="/attendance">Attendance</Link>,
    },
    {
      key: "/asset",
      icon: <DeploymentUnitOutlined />,
      label: <Link to="/asset">Asset</Link>,
    },
    {
      key: "/reports",
      icon: <BarChartOutlined />,
      label: <Link to="/reports">Reports</Link>,
    },
    {
      key: "/user",
      icon: <SettingOutlined />,
      label: <Link to="/user">User</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  if (isMobile) {
    return (
      <Drawer
        title="Menu"
        placement="left"
        open={open}
        onClose={onClose}
        // bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ height: "100%", borderInlineEnd: 0 }}
          items={items}
          onClick={() => {
            onClose();
          }}
        />
      </Drawer>
    );
  }

  return (
    <Sider
      width={200}
      style={{ height: "calc(100vh - 64px)", position: "sticky", top: 64 }}
      collapsed={collapsed}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: "100%", borderInlineEnd: 0 }}
        items={items}
      />
    </Sider>
  );
};

export default SideNav;
