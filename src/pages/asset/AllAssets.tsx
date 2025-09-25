import React, { useState, useEffect } from "react";
import { Table, Tag, Input, Spin } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAssetsApi } from "../../store/Assets/AssetsActions";

interface Asset {
  id: number;
  name: string;
  category: string;
  purchaseDate: string;
  status: "Active" | "Damaged" | "Theft";
}

const AllAssets: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface AssetsState {
    assetsData: any;
    assetsDataLoading: boolean;
    assetsDataError: boolean;
  }

  const { assetsData, assetsDataLoading } = useSelector(
    (state: RootState) => state.asset as AssetsState
  );

  useEffect(() => {
    dispatch(fetchAssetsApi());
  }, [dispatch]);

  // 🔎 Column search for Asset Name
  const getColumnSearchProps = (dataIndex: keyof Asset): ColumnType<Asset> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input.Search
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          autoFocus
          onChange={(e) => {
            const value = e.target.value;
            setSelectedKeys(value ? [value] : []);
            confirm({ closeDropdown: false });
          }}
          onSearch={() => confirm()}
          style={{ display: "block" }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
  });

  const columns: ColumnsType<Asset> = [
    {
      title: "Asset ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Asset Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Electronics", value: "Electronics" },
        { text: "Furniture", value: "Furniture" },
        { text: "Appliances", value: "Appliances" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      sorter: (a, b) =>
        new Date(a.purchaseDate).getTime() -
        new Date(b.purchaseDate).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Damaged", value: "Damaged" },
        { text: "Theft", value: "Theft" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: Asset["status"]) => {
        let color = "blue";
        if (status === "Active") color = "green";
        else if (status === "Damaged") color = "orange";
        else if (status === "Theft") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
      <Table<Asset>
        columns={columns}
        dataSource={assetsData || []} // ✅ API data here
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: "max-content" }}
        loading={assetsDataLoading}
      />
  );
};

export default AllAssets;
