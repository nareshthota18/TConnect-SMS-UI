import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesApi } from "../../store/Dropdowns/DropdownActions";
import { AppDispatch, RootState } from "../../store/store";

const CategoriesList = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface CategoryType {
    key: string;
    value: string;
    description?: string;
  }

  interface CategoriesState {
    categoriesData: CategoryType[];
    categoriesDataLoading: boolean;
    categoriesDataError: boolean;
  }

  const { categoriesData, categoriesDataLoading } = useSelector(
    (state: RootState) => state.departments as CategoriesState
  );

  // Fetch Categories API
  useEffect(() => {
    dispatch(fetchCategoriesApi());
  }, [dispatch]);

  // Match response to table format
  const dataSource =
    categoriesData?.map((item, index) => ({
      key: item.key || index,
      name: item.value,        // ✔ RESPONSE key: "value"
      description: item.description || "-", // ✔ your API has NO description
    })) || [];

  // Table Columns
  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      bordered
      loading={{
        spinning: categoriesDataLoading,
        indicator: <Spin indicator={<LoadingOutlined spin />} />,
      }}
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 5, hideOnSinglePage: true }}
    />
  );
};

export default CategoriesList;
