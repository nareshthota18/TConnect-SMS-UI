import React, { useEffect } from "react";
import { Table, Tag, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchInventoryApi } from "../../store/Inventory/InventoryActions";

interface Inventory {
  id: string;
  itemCode: string;
  name: string;
  itemTypeId: string;
  uom: string;
  reorderLevel: number;
  isActive: boolean;
  itemTypeName: string;
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

  // ✅ Match API fields
  const columns: ColumnsType<Inventory> = [
    {
      title: "Item Code",
      dataIndex: "itemCode",
      key: "itemCode",
      ...getColumnSearchProps("itemCode"),
    },
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "itemTypeName",
      key: "itemTypeName",
      filters: Array.from(
        new Set(inventoryData?.map((item) => item.itemTypeName))
      ).map((cat) => ({ text: cat, value: cat })),
      onFilter: (value, record) => record.itemTypeName === value,
    },
    {
      title: "UOM",
      dataIndex: "uom",
      key: "uom",
    },
    {
      title: "Reorder Level",
      dataIndex: "reorderLevel",
      key: "reorderLevel",
      sorter: (a, b) => a.reorderLevel - b.reorderLevel,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
      render: (isActive: boolean) =>
        isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
  ];

  return (
    <Table<Inventory>
      columns={columns}
      dataSource={inventoryData || []} // ✅ API data
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
      loading={inventoryDataLoading}
      scroll={{ x: "max-content" }}
    />
  );
};

export default AllInventory;
