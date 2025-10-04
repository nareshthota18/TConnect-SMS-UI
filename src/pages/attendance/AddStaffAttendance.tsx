import React, { useState, useEffect } from "react";
import { Layout, Table, Radio, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchStaffApi } from "../../store/Staff/StaffActions";
import { addStaffAttendanceApi } from "../../store/Attendance/AttendanceActions";

const { Content } = Layout;

interface Staff {
  id: number;
  name: string;
  department: string;
}

const AddStaffAttendance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [staffStatus, setStaffStatus] = useState<Record<number, "Present" | "Absent">>({});

  interface StaffState {
    staffData: any;
    staffDataLoading: boolean;
    staffDataError: boolean;
  }

  const { staffData, staffDataLoading } = useSelector(
    (state: RootState) => state.staff as StaffState
  );

  useEffect(() => {
    dispatch(fetchStaffApi());
  }, [dispatch]);

  const formattedStaffData: Staff[] =
    staffData?.map((item: any) => {
      const id = item.staffId || item.id;

      // Initialize default status if not set
      if (!staffStatus[id]) staffStatus[id] = item.status || "Present";

      return {
        id,
        name: item.staffName || item.fullName,
        department: item.department || item.departmentName || "-",
      };
    }) || [];

  const handleSubmit = async () => {
    if (!formattedStaffData || formattedStaffData.length === 0) return;

    const attendanceArray = formattedStaffData.map((staff) => ({
      staffAttendanceId: crypto.randomUUID(),
      staffId: staff.id,
      staffName: staff.name,
      status: staffStatus[staff.id],
      attendanceDate: new Date().toISOString(),
      remarks: "",
    }));

    try {
      await dispatch(addStaffAttendanceApi({ att: attendanceArray }));
      message.success("Staff attendance submitted successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to submit staff attendance.");
    }
  };

  const staffColumns = [
    { title: "Staff Name", dataIndex: "name", key: "name" },
    { title: "Department", dataIndex: "department", key: "department" },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: Staff) => (
        <Radio.Group
          value={staffStatus[record.id]}
          onChange={(e) =>
            setStaffStatus((prev) => ({ ...prev, [record.id]: e.target.value }))
          }
        >
          <Radio value="Present">Present</Radio>
          <Radio value="Absent">Absent</Radio>
        </Radio.Group>
      ),
    },
  ];

  return (
    <>
        <Table
          rowKey="id"
          bordered
          columns={staffColumns}
          dataSource={formattedStaffData}
          loading={staffDataLoading}
          pagination={false}
        />

        <Button type="primary" style={{ marginTop: 16 }} onClick={handleSubmit}>
          Submit Attendance
        </Button>
    </>
  );
};

export default AddStaffAttendance;
