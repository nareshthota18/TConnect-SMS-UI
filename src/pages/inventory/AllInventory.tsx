import React, { useState, useEffect } from "react";
import { Table, Tag, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchInventoryApi } from "../../store/Inventory/InventoryActions";

interface Inventory {
  id: number;
  itemName: string;
  category: string;
  quantity: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const AllInventory: React.FC = () => {
  const [data, setData] = useState<Inventory[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  interface InventoryState {
    inventoryData: any;
    inventoryDataLoading: boolean;
    inventoryDataError: boolean;
  }

  const { inventoryData, inventoryDataLoading } = useSelector(
    (state: RootState) => state.inventory as InventoryState
  );

  useEffect(() => {
    dispatch(fetchInventoryApi());
  }, [dispatch]);

  useEffect(() => {
    const inventoryData: Inventory[] = [
      {
        id: 1,
        itemName: "Rice",
        category: "Grains",
        quantity: 50,
        status: "In Stock",
      },
      {
        id: 2,
        itemName: "Sugar",
        category: "Grocery",
        quantity: 10,
        status: "Low Stock",
      },
      {
        id: 3,
        itemName: "Milk",
        category: "Dairy",
        quantity: 0,
        status: "Out of Stock",
      },
      {
        id: 4,
        itemName: "Bread",
        category: "Bakery",
        quantity: 15,
        status: "Low Stock",
      },
      {
        id: 5,
        itemName: "Salt",
        category: "Grocery",
        quantity: 100,
        status: "In Stock",
      },
    ];
    setData(inventoryData);
  }, []);

  // Search functionality
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
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
  });

  const columns: ColumnsType<Inventory> = [
    {
      title: "Item ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      ...getColumnSearchProps("itemName"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Grains", value: "Grains" },
        { text: "Grocery", value: "Grocery" },
        { text: "Dairy", value: "Dairy" },
        { text: "Bakery", value: "Bakery" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "In Stock", value: "In Stock" },
        { text: "Low Stock", value: "Low Stock" },
        { text: "Out of Stock", value: "Out of Stock" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: Inventory["status"]) => {
        let color = "blue";
        if (status === "In Stock") color = "green";
        else if (status === "Low Stock") color = "orange";
        else if (status === "Out of Stock") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <Table<Inventory>
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default AllInventory;
