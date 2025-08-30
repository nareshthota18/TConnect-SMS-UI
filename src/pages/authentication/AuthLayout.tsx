import { Typography } from "antd";
import logo from "../../assets/hostel.png";

const { Title, Text } = Typography;

const AuthLayout = () => {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
          <img
            src={logo}
            alt="Illustration"
            style={{ maxWidth: "20%", height: "auto" }}
          />
          <Title level={3} style={{ marginTop: "20px" }}>Digitize Your School & Hostel Management</Title>
          <Text>A complete solution for modern school & hostel management. <br /> Simplify operations, track resources, and boost transparency.</Text>
        </div>
  )
}

export default AuthLayout