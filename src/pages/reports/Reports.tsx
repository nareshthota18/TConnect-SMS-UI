import React, { useState } from "react";
import { Layout, Tabs, Grid, Typography, Flex } from "antd";
import SideNav from "../../components/SideNav";
import StudentReports from "./StudentReports";
import StaffReports from "./StaffReports";
import InventoryReports from "./InventoryReports";
import GroceryReports from "./GroceryReports";
import AttendanceReports from "./AttendanceReports";
import AssetReports from "./AssetReports";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

// Tabs for Reports
const items = [
  {
    label: "Student",
    key: "1",
    children: <StudentReports />,
  },
  {
    label: "Staff",
    key: "2",
    children: <StaffReports />
  },
  {
    label: "Inventory",
    key: "3",
    children: <InventoryReports />
  },
  {
    label: "Grocery",
    key: "4",
    children: <GroceryReports />
  },
  {
    label: "Attendance",
    key: "5",
    children: <AttendanceReports />
  },
  {
    label: "Asset",
    key: "6",
    children: <AssetReports />
  }
];

const Reports: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);

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
        <Content style={{ padding: "18px 24px", minHeight: 360 }}>
          <Flex justify="space-between">
            <Title
              level={3}
              style={{ fontWeight: 700, margin: 0, color: "#1F2937" }}
            >
              Reports
            </Title>
          </Flex>

          <Tabs items={items} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Reports;
