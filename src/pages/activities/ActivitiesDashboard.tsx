import React from "react";
import { Row, Col, Card, Typography, Space } from "antd";
import {
  ReadOutlined,
  TeamOutlined,
  CalendarOutlined,
  TrophyOutlined,
  SmileOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text } = Typography;

// ✅ Primary color constant
const lightPrimary = "#FF9145";

const ActivitiesDashboard: React.FC = () => {
  const activities = [
    { name: "Reading Club", count: 25, icon: ReadOutlined, link: "/activities/reading" },
    { name: "Sports", count: 40, icon: TrophyOutlined, link: "/activities/sports" },
    { name: "Events", count: 12, icon: CalendarOutlined, link: "/activities/events" },
    { name: "Volunteering", count: 18, icon: TeamOutlined, link: "/activities/volunteering" },
    { name: "Fun & Games", count: 30, icon: SmileOutlined, link: "/activities/fun" },
    { name: "Innovation Club", count: 10, icon: RocketOutlined, link: "/activities/innovation" },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        {activities.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <Col xs={12} sm={12} md={8} lg={4} key={index}>
                <Card
                  title={<IconComponent style={{ fontSize: 18, color: lightPrimary }} />}
                  style={{
                    textAlign: "center",
                    backgroundColor: "rgba(255, 145, 69, 0.15)", // light shade of primary
                    border: `1px solid ${lightPrimary}`,
                  }}
                  headStyle={{
                    borderBottom: `1px solid ${lightPrimary}`,
                    textAlign: "center",
                  }}
                  // hoverable
                >
                  <Space
                    direction="vertical"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    <Text strong style={{ fontSize: 18, color: lightPrimary }}>
                      {item.count}
                    </Text>
                    <Text type="secondary">{item.name}</Text>
                  </Space>
                </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ActivitiesDashboard;
