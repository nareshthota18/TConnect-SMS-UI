import React, { useEffect } from "react";
import { Table, Tag, Input, Button, Popconfirm, message } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchInventoryApi, deleteInventoryItemApi } from "../../store/Inventory/InventoryActions";

interface Inventory {
  id: string;
  itemId: string;
  openingBalance: number;
  quantityReceived: number;
  quantityIssued: number;
  quantityInHand: number;
}


const AllInventory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface InventoryState {
    inventoryData: Inventory[];
    inventoryDataLoading: boolean;
    inventoryDataError: boolean;
  }

  const { inventoryData, inventoryDataLoading } = useSelector(
    (state: RootState) => state.inventory as InventoryState
  );

  useEffect(() => {
    dispatch(fetchInventoryApi());
  }, [dispatch]);

  // 🔍 Search functionality
  const getColumnSearchProps = (
    dataIndex: keyof Inventory
  ): ColumnType<Inventory> => ({
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

  // ✅ Handle Delete
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteInventoryItemApi(id));
      message.success("Inventory item deleted successfully");
      dispatch(fetchInventoryApi()); // Refresh table after deletion
    } catch (error) {
      message.error("Failed to delete inventory item");
    }
  };

  // ✅ Match API fields
  const columns: ColumnsType<Inventory> = [
    {
      title: "Item ID",
      dataIndex: "itemId",
      key: "itemId",
      ...getColumnSearchProps("itemId"),
    },
    {
      title: "Opening Balance",
      dataIndex: "openingBalance",
      key: "openingBalance",
      sorter: (a, b) => a.openingBalance - b.openingBalance,
    },
    {
      title: "Quantity Received",
      dataIndex: "quantityReceived",
      key: "quantityReceived",
      sorter: (a, b) => a.quantityReceived - b.quantityReceived,
    },
    {
      title: "Quantity Issued",
      dataIndex: "quantityIssued",
      key: "quantityIssued",
      sorter: (a, b) => a.quantityIssued - b.quantityIssued,
    },
    {
      title: "Quantity In Hand",
      dataIndex: "quantityInHand",
      key: "quantityInHand",
      sorter: (a, b) => a.quantityInHand - b.quantityInHand,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Tag color="red" style={{ cursor: "pointer" }}>
            Delete
          </Tag>
        </Popconfirm>
      ),
    },
  ];
  

  return (
    <Table<Inventory>
      columns={columns}
      dataSource={inventoryData || []} 
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
      loading={inventoryDataLoading}
      scroll={{ x: "max-content" }}
    />
  );
};

export default AllInventory;
