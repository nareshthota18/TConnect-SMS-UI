import { Button, Drawer, Layout, Menu, Grid, Badge, Row, Col, Flex, Typography } from 'antd';
import {
  BellOutlined,
  MenuOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import logo from '../assets/logo.png';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;
// const { Title, Text } = Typography;

type HeaderProps = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const HeaderComponent = ({ darkMode, toggleTheme }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const isMobile = !screens.md;

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
    setDrawerVisible(false);
  };

  const items: MenuProps['items'] = [
    { key: '0', label: 'Dashboard' },
    { key: '1', label: 'Admin' },
    { key: '2', label: 'Employee', 
      children: [
        { label: 'Option 1', key: 'setting:1' },
        { type: 'divider' },
        { label: 'Option 2', key: 'setting:2' },
      ],
    },
    { key: '3', label: 'Leave' },
    { key: '4', label: 'Payroll' },
    { key: '5', label: 'Attendance' },
    { key: '6', label: 'Settings' },
    { key: '7', label: 'Reports' },
    { key: '8', label: 'Help' },
  ];

  return (
    <>
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={logo}
        alt="Logo"
        style={{ height: 18, marginRight: 32, cursor: 'pointer' }}
        onClick={() => navigate('/')}
      />

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Theme Toggle Button */}
        <Badge count={5} style={{ fontSize: 10 }} size='small'>
        <BellOutlined style={{ color: 'white' }} />
        </Badge>
        <Button
          type="text"
          icon={darkMode ? <SunOutlined style={{ color: 'white' }} /> : <MoonOutlined style={{ color: 'white' }} />}
          onClick={toggleTheme}
          style={{ fontSize: 14 }}
        />
      </div>
    </Header>
    </>
  );
};

export default HeaderComponent;
