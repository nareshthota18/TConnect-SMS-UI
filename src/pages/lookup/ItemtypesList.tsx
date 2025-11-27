import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchItemTypesApi } from "../../store/Dropdowns/DropdownActions";

const ItemtypesList = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface ItemType {
    key: string;
    value: string;
    description?: string;
  }

  interface ItemTypesState {
    itemTypesData: ItemType[];
    itemTypesDataLoading: boolean;
    itemTypesDataError: boolean;
  }

  const { itemTypesData, itemTypesDataLoading } = useSelector(
    (state: RootState) => state.departments as ItemTypesState
  );

  // Fetch Item Types API
  useEffect(() => {
    dispatch(fetchItemTypesApi());
  }, [dispatch]);

  // Prepare table data
  const dataSource =
    itemTypesData?.map((item, index) => ({
      key: item.key || index,
      name: item.value,                      // API returns "value"
      description: item.description || "-",  // fallback
    })) || [];

  // Table Columns
  const columns = [
    {
      title: "Item Type",
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
        spinning: itemTypesDataLoading,
        indicator: <Spin indicator={<LoadingOutlined spin />} />,
      }}
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 10, hideOnSinglePage: true }}
    />
  );
};

export default ItemtypesList;
