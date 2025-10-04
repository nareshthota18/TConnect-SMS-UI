import React, { useState } from "react";
import { Radio, Space } from "antd";
import AddStaffAttendance from "./AddStaffAttendance";
import AddStudentAttendance from "./AddStudentAttendance";

const AddAttendance = () => {
  const role = localStorage.getItem("userRole");

  // Default attendance type based on role
  const [attendanceType, setAttendanceType] = useState<
    "" | "student" | "staff"
  >(role === "Staff" ? "student" : role === "Admin" ? "staff" : "");

  return (
    <div style={{ padding: 24 }}>
      {/* Attendance Type Selector */}
      <Radio.Group
        onChange={(e) => setAttendanceType(e.target.value)}
        value={attendanceType}
        style={{ marginBottom: 16 }}
      >
        {role === "Staff" && <Radio value="student">Student Attendance</Radio>}
        {role === "Admin" && <Radio value="staff">Staff Attendance</Radio>}
      </Radio.Group>

      {/* Render appropriate component */}
      {attendanceType === "staff" && <AddStaffAttendance />}
      {attendanceType === "student" && <AddStudentAttendance />}
    </div>
  );
};

export default AddAttendance;
