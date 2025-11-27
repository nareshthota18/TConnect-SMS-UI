import React, { useEffect } from "react";
import { Table, Tag, Popconfirm, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchItemsListApi } from "../../store/Inventory/InventoryActions";

const AllItems = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Match API response
  interface Item {
    id: string;
    itemCode: string;
    name: string;
    itemTypeName: string;
    uom: string;
    reorderLevel: number;
    isActive: boolean;
  }

  interface ItemState {
    getItemsListData: Item[];
    getItemsListLoading: boolean;
    getItemsListError: boolean;
  }

  const { getItemsListData, getItemsListLoading } = useSelector(
    (state: RootState) => state.inventory as ItemState
  );

  // Fetch items on mount
  useEffect(() => {
    dispatch(fetchItemsListApi());
  }, [dispatch]);

  // Delete handler (optional)
  const handleDelete = async (itemId: string) => {
    try {
      message.success("Item deleted successfully");
      dispatch(fetchItemsListApi());
    } catch (error) {
      message.error("Failed to delete item");
    }
  };

  const columns = [
    {
      title: "Item Code",
      dataIndex: "itemCode",
      key: "itemCode",
    },
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Item Type",
      dataIndex: "itemTypeName",
      key: "itemTypeName",
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
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Item) => (
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
    <Table<Item>
      columns={columns}
      dataSource={getItemsListData || []}
      loading={getItemsListLoading}
      rowKey={(record) => record.id}
      pagination={{ pageSize: 10, hideOnSinglePage: true }}
      bordered
      scroll={{ x: "max-content" }}
    />
  );
};

export default AllItems;
