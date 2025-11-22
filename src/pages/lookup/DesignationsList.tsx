import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchDesignationsApi } from "../../store/Dropdowns/DropdownActions";

const DesignationsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface DesignationType {
    key: string;
    value: string;
    description?: string;
  }

  interface DesignationsState {
    designationsData: DesignationType[];
    designationsDataLoading: boolean;
    designationsDataError: boolean;
  }

  const { designationsData, designationsDataLoading } = useSelector(
    (state: RootState) => state.departments as DesignationsState
  );

  // Fetch Designations API
  useEffect(() => {
    dispatch(fetchDesignationsApi());
  }, [dispatch]);

  // Match response to table format
  const dataSource =
    designationsData?.map((item, index) => ({
      key: item.key || index,
      name: item.value,                     // API returns "value"
      description: item.description || "-", // handle missing description
    })) || [];

  // Table Columns
  const columns = [
    {
      title: "Designation Name",
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
        spinning: designationsDataLoading,
        indicator: <Spin indicator={<LoadingOutlined spin />} />,
      }}
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 10, hideOnSinglePage: true }}
    />
  );
};

export default DesignationsList;
