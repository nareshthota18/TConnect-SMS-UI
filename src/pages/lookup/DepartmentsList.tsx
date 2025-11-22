import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchDepartmentsApi } from "../../store/Dropdowns/DropdownActions";

const DepartmentsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface DepartmentType {
    key: string;
    value: string;
    description?: string;
  }

  interface DepartmentsState {
    departmentsData: DepartmentType[];
    departmentsDataLoading: boolean;
    departmentsDataError: boolean;
  }

  const { departmentsData, departmentsDataLoading } = useSelector(
    (state: RootState) => state.departments as DepartmentsState
  );

  // Fetch Departments API
  useEffect(() => {
    dispatch(fetchDepartmentsApi());
  }, [dispatch]);

  // Match response to table format
  const dataSource =
    departmentsData?.map((item, index) => ({
      key: item.key || index,
      name: item.value,                   // ✔ Using value from API
      description: item.description || "-", // ✔ Handle missing description
    })) || [];

  // Table Columns
  const columns = [
    {
      title: "Department Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      bordered
      loading={{
        spinning: departmentsDataLoading,
        indicator: <Spin indicator={<LoadingOutlined spin />} />,
      }}
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 5, hideOnSinglePage: true }}
    />
  );
};

export default DepartmentsList;
