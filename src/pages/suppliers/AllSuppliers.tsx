import React, { useEffect, useState } from "react";
import { Table, Tag, Input, Button, Popconfirm, message } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchSupplierApi, deleteSupplierApi } from "../../store/Suppliers/SuppliersActions";

interface Supplier {
  id: string;
  name: string;
  code: string;
  category: string;
  contactPerson: string;
  phone: string;
  status: "Active" | "Inactive";
}

const AllSuppliers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [tableData, setTableData] = useState<Supplier[]>([]);

  interface SupplierState {
    supplierData: any[];
    supplierDataLoading: boolean;
    supplierDataError: boolean;
  }

  const { supplierData, supplierDataLoading } = useSelector(
    (state: RootState) => state.supplier as SupplierState
  );

  useEffect(() => {
    dispatch(fetchSupplierApi());
  }, [dispatch]);

  // Map API response to table format
  useEffect(() => {
    if (supplierData && supplierData.length > 0) {
      const mappedData: Supplier[] = supplierData.map((item) => ({
        id: item.id,
        name: item.name,
        code: item.gstNumber || "",
        category: "Raw Material", // default or based on other logic
        contactPerson: item.email || "",
        phone: item.phone || "",
        status: item.isActive ? "Active" : "Inactive",
      }));
      setTableData(mappedData);
    }
  }, [supplierData]);

  // Delete handler
  const handleDelete = async (supplierId: string) => {
    try {
      await dispatch(deleteSupplierApi(supplierId));
      message.success("Supplier deleted successfully");
      // Refresh the list
      dispatch(fetchSupplierApi());
    } catch (error) {
      message.error("Failed to delete supplier");
    }
  };

  const getColumnSearchProps = (dataIndex: keyof Supplier): ColumnType<Supplier> => ({
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

  const columns: ColumnsType<Supplier> = [
    { title: "Supplier Name", dataIndex: "name", key: "name", ...getColumnSearchProps("name") },
    { title: "Supplier Code", dataIndex: "code", key: "code", ...getColumnSearchProps("code") },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Contact Person", dataIndex: "contactPerson", key: "contactPerson", ...getColumnSearchProps("contactPerson") },
    { title: "Phone", dataIndex: "phone", key: "phone", ...getColumnSearchProps("phone") },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: Supplier["status"]) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Supplier) => (
        <Popconfirm
          title="Are you sure to delete this supplier?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Tag color={"red"} style={{ cursor: 'pointer'}}>
          Delete
          </Tag>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table<Supplier>
      columns={columns}
      dataSource={tableData}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
      scroll={{ x: "max-content" }}
      loading={supplierDataLoading}
    />
  );
};

export default AllSuppliers;
