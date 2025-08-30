import { Layout } from 'antd';
import SideNav from '../../components/SideNav';

const { Content } = Layout;



const AdminDashboard = () => {
 
  return (
      <Layout>
        <SideNav />
        <Layout style={{ padding: '16px' }}>
          <Content>
            Content
          </Content>
        </Layout>
      </Layout>
  )
}

export default AdminDashboard