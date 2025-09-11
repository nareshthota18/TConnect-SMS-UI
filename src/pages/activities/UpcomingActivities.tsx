import React, { useState } from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Activity {
  key: string;
  title: string;
  type: string;
  date: string;
  description: string;
  status: "Upcoming" | "Completed";
}

const UpcomingActivities: React.FC = () => {
  const [activities] = useState<Activity[]>([
    {
      key: "1",
      title: "Sports Day",
      type: "Sports",
      date: "2025-09-15",
      description: "Annual sports event for all students.",
      status: "Upcoming",
    },
    {
      key: "2",
      title: "Science Fair",
      type: "Education",
      date: "2025-09-20",
      description: "Exhibition of science projects and models.",
      status: "Upcoming",
    },
    {
      key: "3",
      title: "Music Concert",
      type: "Cultural",
      date: "2025-09-05",
      description: "School-level music and dance performances.",
      status: "Completed",
    },
    {
      key: "4",
      title: "Health Checkup",
      type: "Medical",
      date: "2025-09-12",
      description: "Free health checkup camp for students.",
      status: "Upcoming",
    },
  ]);

  // Filter only Upcoming
  const upcomingActivities = activities.filter((a) => a.status === "Upcoming");

  const columns: ColumnsType<Activity> = [
    {
      title: "Activity Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Activity["status"]) => (
        <Tag color={status === "Upcoming" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
  ];

  return <Table bordered columns={columns} dataSource={upcomingActivities} />;
};

export default UpcomingActivities;
