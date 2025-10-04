import React, { useState, useEffect } from "react";
import { Table, Input, Button, Popconfirm, message, Tag } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchAssetsApi, deleteAssetApi } from "../../store/Assets/AssetsActions";

interface Asset {
  id: string;
  studentName: string;
  itemName: string;
  quantity: number;
  issueDate: string;
  remarks: string;
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

  // Fetch assets on mount
  useEffect(() => {
    dispatch(fetchAssetsApi());
  }, [dispatch]);

  // 🔎 Column search props
  const getColumnSearchProps = (
    dataIndex: keyof Asset
  ): ColumnType<Asset> => ({
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

  // 🗑️ Handle delete action
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteAssetApi(id));
      message.success("Asset deleted successfully!");
      dispatch(fetchAssetsApi()); // Refresh list
    } catch (error) {
      console.error("Delete asset failed:", error);
      message.error("Failed to delete asset.");
    }
  };

  // 🟢 Table columns
  const columns: ColumnsType<Asset> = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      ...getColumnSearchProps("studentName"),
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      ...getColumnSearchProps("itemName"),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Issue Date",
      dataIndex: "issueDate",
      key: "issueDate",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) =>
        new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime(),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this asset?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDelete(record.id)}
        >
          <Tag color={"red"} style={{ cursor: 'pointer'}}>
          Delete
          </Tag>
        </Popconfirm>
      ),
    },
  ];

  // ✅ Format API data for table
  const tableData = (assetsData || []).map((item: any) => ({
    id: item.id,
    studentName: item.studentName || "N/A",
    itemName: item.itemName || "N/A",
    quantity: item.quantity,
    issueDate: item.issueDate,
    remarks: item.remarks,
  }));

  return (
    <Table<Asset>
      columns={columns}
      dataSource={tableData}
      rowKey="id"
      pagination={{ pageSize: 10, hideOnSinglePage: true }}
      bordered
      scroll={{ x: "max-content" }}
      loading={assetsDataLoading}
    />
  );
};

export default AllAssets;
