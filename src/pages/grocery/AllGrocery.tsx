import React, { useEffect } from "react";
import { Table, Tag, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchGroceryListApi } from "../../store/Grocery/GroceryActions";

// ⬅️ Interface for each Grocery item
interface Grocery {
  id: number;
  name: string;
  category: string;
  price: number;
  status: string;
}

const AllGrocery: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rsHostelId = localStorage.getItem("rsHostelId");

  interface groceryListState {
    groceryListData: any[];
    groceryListLoading: boolean;
  }

  const { groceryListData, groceryListLoading } = useSelector(
    (state: RootState) => state.grocery as groceryListState
  );

  // 👉 Fetch grocery list on mount
  useEffect(() => {
    dispatch(fetchGroceryListApi());
  }, [dispatch]);


  // 👉 Transform API data before passing to table
  const mappedGrocery = groceryListData?.map((item: any) => ({
    id: item.id,
    name: item.name || item.itemName || "N/A",
    category: item.category || "N/A",
    price: item.price || 0,
    status: item.status || "Available",
  }));


  // 🔎 Search logic (same functional behavior)
  const getColumnSearchProps = (dataIndex: keyof Grocery): ColumnType<Grocery> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input.Search
          placeholder={`Search ${dataIndex}`}
          autoFocus
          value={selectedKeys[0]}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedKeys(value ? [value] : []);
            confirm({ closeDropdown: false });
          }}
          onSearch={() => confirm()}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes((value as string).toLowerCase()),
  });


  // 👉 Table Columns (same format style)
  const columns: ColumnsType<Grocery> = [
    {
      title: "Item ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
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
      title: "Price (₹)",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `₹${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Available", value: "Available" },
        { text: "Limited Stock", value: "Limited Stock" },
        { text: "Out of Stock", value: "Out of Stock" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color =
          status === "Available"
            ? "green"
            : status === "Limited Stock"
            ? "orange"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];


  return (
    <>
      <Table<Grocery>
        columns={columns}
        dataSource={mappedGrocery}
        loading={groceryListLoading}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default AllGrocery;
