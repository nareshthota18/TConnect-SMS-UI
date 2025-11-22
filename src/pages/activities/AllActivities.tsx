import React, { useEffect } from "react";
import { Table, Input, Tag } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityApi } from "../../store/Activities/ActivitiesActions";
import { AppDispatch, RootState } from "../../store/store";

interface Activity {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
  status: "Upcoming" | "Completed";
}

const AllActivities: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const schoolId = localStorage.getItem("schoolId");

  interface ActivitiesState {
    activityData: any;
    activityDataLoading: boolean;
    activityDataError: boolean;
  }

  const { activityData, activityDataLoading } = useSelector(
    (state: RootState) => state.activity as ActivitiesState
  );

  // 🔹 Fetch activities on component mount
  useEffect(() => {
    dispatch(fetchActivityApi(schoolId));
  }, [dispatch]);

  // 🔎 Column search props
  const getColumnSearchProps = (
    dataIndex: keyof Activity
  ): ColumnType<Activity> => ({
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

  // 🟢 Table columns
  const columns: ColumnsType<Activity> = [
    {
      title: "Activity Title",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type"),
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Upcoming", value: "Upcoming" },
        { text: "Completed", value: "Completed" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: Activity["status"]) => (
        <Tag color={status === "Upcoming" ? "green" : "volcano"}>
          {status}
        </Tag>
      ),
    },
  ];

  // ✅ Format API data for table
  const tableData = (activityData || []).map((item: any) => ({
    id: item.id,
    title: item.title || "N/A",
    type: item.type || "N/A",
    date: item.date,
    description: item.description || "-",
    status: item.status === true ? "Completed" : "Upcoming", // Adjust based on your API
  }));

  return (
    <Table<Activity>
      columns={columns}
      dataSource={tableData}
      rowKey="id"
      pagination={{ pageSize: 10, hideOnSinglePage: true }}
      bordered
      scroll={{ x: "max-content" }}
      loading={activityDataLoading}
    />
  );
};

export default AllActivities;
