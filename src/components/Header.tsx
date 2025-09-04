import React, { useState } from "react";
import { Button, Layout, Grid, Badge, Avatar, Flex, Typography } from "antd";
import { BellOutlined, MoonOutlined, SunOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "../assets/logo-hms.png";
import { useNavigate } from "react-router-dom";
import SideNav from "./SideNav";

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
  const isMobile = !screens.md;

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Header style={{ position: 'sticky', top: 0, zIndex: 999 }}>
        <Flex justify="space-between" align="center" style={{ height: 64 }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: 32, marginRight: 32, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          <Flex align="center" gap="middle">
            
            <Badge count={5} style={{ fontSize: 10 }} size="small">
              <BellOutlined style={{ color: "white" }} />
            </Badge>
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
              <Avatar>N</Avatar>
              {!isMobile && <Text strong style={{ color: "white" }}>NARESH</Text>}
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
