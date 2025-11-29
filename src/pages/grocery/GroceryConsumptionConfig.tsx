import React, { useEffect } from "react";
import { Table, Popconfirm, message, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { ColumnsType } from "antd/es/table";
import { fetchGroceryConsumptionListApi, deleteGroceryConsumptionApi } from "../../store/Grocery/GroceryActions";
import { AppDispatch, RootState } from "../../store/store";
import { DeleteOutlined } from "@ant-design/icons";

interface Consumption {
  id: string;
  itemName: string;
  quantity: string;
  frequency: string;
  gradeName: string;
  hostelName: string;
}

const GroceryConsumptionConfig: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const schoolId = localStorage.getItem("schoolId");

  interface groceryConsumptionListState {
    groceryConsumptionListData: any[];
    groceryConsumptionListLoading: boolean;
  }

  const { groceryConsumptionListData, groceryConsumptionListLoading } =
    useSelector((state: RootState) => state.grocery as groceryConsumptionListState);

  useEffect(() => {
    dispatch(fetchGroceryConsumptionListApi(schoolId));
  }, [dispatch]);


  // 👉 Transform API data before passing to table
  const mappedConsumption = groceryConsumptionListData?.map((item: any) => ({
    id: item.id,
    itemName: item.itemName || "N/A",
    quantity: item.quantity,
    frequency: item.frequency,
    gradeName: item.gradeName || item.gradeName,
    hostelName: item.hostelName || item.rsHostelId,
  }));


  // 👉 Delete handler
  const handleDelete = async (id: string) => {
    try {
      const res = await dispatch(deleteGroceryConsumptionApi(id));

      if (res) {
        message.success("Deleted successfully");
        dispatch(fetchGroceryConsumptionListApi(schoolId)); // refresh list
      }
    } catch (error) {
      message.error("Failed to delete consumption");
    }
  };


  const columns: ColumnsType<Consumption> = [
    {
      title: "Item",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Quantity Per Student Per Day",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
    },
    {
      title: "Grade",
      dataIndex: "gradeName",
      key: "gradeName",
    },
    // {
    //   title: "Hostel",
    //   dataIndex: "hostelName",
    //   key: "hostelName",
    // },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this item?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDelete(record.id)}
        >
          {/* <DeleteOutlined style={{ color: "red", cursor: "pointer" }} /> */}
          <Tag color={"red"} style={{ cursor: 'pointer'}}>
          Delete
          </Tag>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Table<Consumption>
        columns={columns}
        dataSource={mappedConsumption}
        loading={groceryConsumptionListLoading}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default GroceryConsumptionConfig;
