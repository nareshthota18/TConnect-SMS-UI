import { Typography } from "antd";
import logo from "../../assets/hostel.png";
import banner from "../../assets/banner.jpg";

const { Title, Text } = Typography;

const AuthLayout = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
          backdropFilter: "blur(6px)", // Blur effect
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px",
          color: "#fff",
        }}
      >
        <div>
          {/* <img
            src={logo}
            alt="Illustration"
            style={{ maxWidth: "150px", marginBottom: "20px" }}
          /> */}
          <Title level={2} style={{ color: "#fff", marginBottom: "16px" }}>
          Smart School & Hostel Management, Digitized
          </Title>
          <Text style={{ color: "#fff", fontSize: "16px" }}>
          A unified solution to streamline operations, monitor resources, <br /> and ensure complete transparency.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
