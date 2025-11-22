import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchGradesApi } from "../../store/Dropdowns/DropdownActions";

const GradesList = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface GradeType {
    key: string;
    value: string;
    description?: string;
  }

  interface GradesState {
    gradesData: GradeType[];
    gradesDataLoading: boolean;
    gradesDataError: boolean;
  }

  const { gradesData, gradesDataLoading } = useSelector(
    (state: RootState) => state.departments as GradesState
  );

  // Fetch Grades API
  useEffect(() => {
    dispatch(fetchGradesApi());
  }, [dispatch]);

  // Match response to table format
  const dataSource =
    gradesData?.map((item, index) => ({
      key: item.key || index,
      name: item.value,                      // API returns "value"
      description: item.description || "-",  // Handle missing description
    })) || [];

  // Table Columns
  const columns = [
    {
      title: "Grade Name",
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
        spinning: gradesDataLoading,
        indicator: <Spin indicator={<LoadingOutlined spin />} />,
      }}
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 10, hideOnSinglePage: true }}
    />
  );
};

export default GradesList;
