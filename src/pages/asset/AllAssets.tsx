import React, { useState, useEffect } from "react";
import { Table, Tag, Input } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

interface Asset {
  id: number;
  name: string;
  category: string;
  purchaseDate: string;
  status: "Active" | "Damaged" | "Theft";
}

const AllAssets: React.FC = () => {
  const [data, setData] = useState<Asset[]>([]);

  useEffect(() => {
    const assetData: Asset[] = [
      { id: 1, name: "Laptop Dell XPS", category: "Electronics", purchaseDate: "2024-01-15", status: "Active" },
      { id: 2, name: "Office Chair", category: "Furniture", purchaseDate: "2023-12-05", status: "Damaged" },
      { id: 3, name: "Projector Epson", category: "Electronics", purchaseDate: "2024-02-10", status: "Active" },
      { id: 4, name: "AC Unit", category: "Appliances", purchaseDate: "2023-11-20", status: "Theft" },
      { id: 5, name: "Printer HP", category: "Electronics", purchaseDate: "2024-03-01", status: "Active" },
    ];
    setData(assetData);
  }, []);

  // Search for Asset Name
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
      record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase()),
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
      sorter: (a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime(),
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
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      bordered
    />
  );
};

export default AllAssets;
