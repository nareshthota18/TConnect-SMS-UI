import React, { useEffect } from "react";
import { List, Typography, Spin, Empty, Badge, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsApi } from "../store/Notifications/NotificationsActions";
import { AppDispatch, RootState } from "../store/store";
import Title from "antd/es/typography/Title";

const { Text } = Typography;

/* 🔔 Notification interface */
interface Notification {
  id: string;
  title: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

const NotificationsPopover: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const schoolId = localStorage.getItem("schoolId");

  /* 🔹 Local reducer state typing (same as Activities) */
  interface NotificationsState {
    notificationsData: Notification[];
    notificationsDataLoading: boolean;
    notificationsDataError: boolean;
  }

  const { notificationsData, notificationsDataLoading } = useSelector(
    (state: RootState) => state.notification as NotificationsState
  );

  // 🔹 Fetch notifications on component mount
  useEffect(() => {
    dispatch(fetchNotificationsApi());
  }, [dispatch, schoolId]);

  // 🔄 Loading state
  if (notificationsDataLoading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <Spin />
      </div>
    );
  }

  // 📭 Empty state
  if (!notificationsData?.length) {
    return <Empty description="No notifications" />;
  }

  return (
    <List<Notification>
  size="small"
  dataSource={notificationsData}
  renderItem={(item) => {
    const isUnread = !item.isRead;
    const firstLetter = item.title?.charAt(0).toUpperCase();

    return (
      <List.Item style={{ padding: 0 }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            width: "100%",
            padding: "12px 14px",
            borderRadius: 8,
            background: isUnread ? "#f6faff" : "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            cursor: "pointer",
          }}
        >
          {/* 🔹 Avatar */}
          <Badge dot={isUnread}>
            <Avatar
              size={36}
              style={{
                backgroundColor: "#1677ff",
                fontWeight: 600,
              }}
            >
              {firstLetter}
            </Avatar>
          </Badge>

          {/* 🔹 Content */}
          <div style={{ flex: 1 }}>
            <Title
              level={5}
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: "18px",
              }}
            >
              {item.title}
            </Title>

            <Text
              type="secondary"
              style={{
                fontSize: 12,
                display: "block",
                marginTop: 4,
                lineHeight: "16px",
              }}
            >
              {item.message}
            </Text>
          </div>
        </div>
      </List.Item>
    );
  }}
/>
  );
};

export default NotificationsPopover;
