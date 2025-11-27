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
import Grades from "./Grades";
import Designations from "./Designations";
import AttendanceTypes from "./AttendanceTypes";
import Categories from "./Categories";
import Departments from "./Departments";
import CategoriesList from "./CategoriesList";
import DepartmentsList from "./DepartmentsList";
import GradesList from "./GradesList";
import DesignationsList from "./DesignationsList";
import AttendanceTypesList from "./AttendanceTypesList";
import Itemtypes from "./Itemtypes";
import ItemtypesList from "./ItemtypesList";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title } = Typography;

// Tab Config
const items = [
  { label: "Categories", key: "1", children: <CategoriesList /> },
  { label: "Departments", key: "2", children: <DepartmentsList /> },
  { label: "Grades", key: "3", children: <GradesList /> },
  { label: "Designations", key: "4", children: <DesignationsList /> },
  { label: "Attendance Types", key: "5", children: <AttendanceTypesList /> },
  { label: "Item Types", key: "6", children: <ItemtypesList /> },
];

// Dynamic button name map
const buttonLabels: Record<string, string> = {
    "1": "Add Category",
    "2": "Add Department",
    "3": "Add Grade",
    "4": "Add Designation",
    "5": "Add Attendance Type",
    "6": "Add Item Type",
  };  

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const modalStyle = {
  backgroundColor: isDarkMode ? "#1F2937" : "#ffbe91",
  color: isDarkMode ? "#fff" : "#000",
  fontWeight: 700,
  padding: "16px 24px",
  margin: 0,
};

const LookUp: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  const [openModal, setOpenModal] = useState(false);

  const showModal = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);

  // Modal content for all tabs
  const getActiveForm = () => {
    switch (activeKey) {
      case "1":
        return <Categories />;
      case "2":
        return <Departments />;
      case "3":
        return <Grades />;
      case "4":
        return <Designations />;
      case "5":
        return <AttendanceTypes />;
      case "6":
      return <Itemtypes />;
      default:
        return <p>No form available.</p>;
    }
  };

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
          <Flex justify="space-between" align="center">
            <Title
              level={3}
              style={{ fontWeight: 700, margin: 0, color: "#1F2937" }}
            >
              Look Up
            </Title>

            <Button type="primary" onClick={showModal}>
                {buttonLabels[activeKey]}
            </Button>
          </Flex>

          {/* Tabs */}
          <Tabs
            items={items}
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
          />

          {/* Modal */}
          <Modal
            title="Add New"
            open={openModal}
            onCancel={closeModal}
            footer={null}
            width={isMobile ? "95%" : "35%"}
            styles={{
              header: modalStyle,
            }}
            maskClosable={false}
          >
            {getActiveForm()}
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LookUp;
