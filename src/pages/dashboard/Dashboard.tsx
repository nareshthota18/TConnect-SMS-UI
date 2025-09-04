import { useState } from "react";
import {
  Layout,
  Grid,
  Row,
  Col,
  Card,
  Typography,
  Space,
  Flex,
  Progress,
  Table,
  Tag,
} from "antd";
import {
  AppstoreOutlined,
  DeploymentUnitOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SideNav from "../../components/SideNav";
import type { TableProps } from "antd";

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Text, Link } = Typography;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Class",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>View More</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["First"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["Fifth"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["10th"],
  },
];

const Dashboard = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      {!isMobile && (
        <SideNav
          isMobile={false}
          collapsed={collapsed}
          onClose={() => {}}
          open={false}
        />
      )}
      <Layout style={{ padding: "2px" }}>
        <Content style={{ padding: "8px", minHeight: 360 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={18}>
              <Row gutter={[16, 16]}>
                {[
                  {
                    name: "Total Hostels",
                    account: "230",
                    icon: <HomeOutlined style={{ fontSize: 18 }} />,
                  },
                  {
                    name: "Total Students",
                    account: "16700",
                    icon: <UserOutlined style={{ fontSize: 18 }} />,
                  },
                  {
                    name: "Inventory",
                    account: "564",
                    icon: <AppstoreOutlined style={{ fontSize: 18 }} />,
                  },
                  {
                    name: "Grocery",
                    account: "122",
                    icon: <ShoppingCartOutlined style={{ fontSize: 18 }} />,
                  },
                  {
                    name: "Asset",
                    account: "234",
                    icon: <DeploymentUnitOutlined style={{ fontSize: 18 }} />,
                  },
                  {
                    name: "Staff",
                    account: "135",
                    icon: <TeamOutlined style={{ fontSize: 18 }} />,
                  },
                ].map((item, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <Card title={item.icon} extra={<Link>View More</Link>}>
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Text strong>{item.account}</Text>
                        <Text type="secondary">{item.name}</Text>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>

            <Col xs={24} md={6}>
              <Card title="Overview">
                <Flex vertical gap="middle">
                  <Flex vertical>
                    <Text strong>Attendance:</Text>
                    <Progress percent={90} />
                  </Flex>
                  <Flex vertical>
                    <Text strong>Meal:</Text>
                    <Progress percent={100} />
                  </Flex>
                  <Flex vertical>
                    <Text strong>Hostel Occupancy:</Text>
                    <Progress percent={70} />
                  </Flex>
                  <Flex vertical>
                    <Text strong>Inventory:</Text>
                    <Progress percent={30} status="exception" />
                  </Flex>
                </Flex>
              </Card>
            </Col>
            <Col xs={24} md={24}>
              <Table<DataType>
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
