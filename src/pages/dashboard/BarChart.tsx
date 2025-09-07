// src/components/SimpleBarChart.tsx
import React from 'react';
import { Card, Typography, Space } from 'antd';
import { Column } from '@ant-design/charts';
import { BarChartOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ChartDataItem {
  month: string;
  students: number;
}

interface SimpleBarChartProps {
  height?: number;
  data?: ChartDataItem[];
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  height = 300, 
  data 
}) => {
  // Sample data for the bar chart
  const defaultData: ChartDataItem[] = [
    { month: 'January', students: 1200 },
    { month: 'February', students: 1900 },
    { month: 'March', students: 1400 },
    { month: 'April', students: 2200 },
    { month: 'May', students: 2500 },
    { month: 'June', students: 1800 },
    { month: 'July', students: 2100 },
    { month: 'August', students: 2800 },
    { month: 'September', students: 3200 },
    { month: 'October', students: 3000 },
    { month: 'November', students: 2700 },
    { month: 'December', students: 2400 },
  ];

  const chartData = data || defaultData;

  // Basic bar chart configuration
  const config = {
    data: chartData,
    xField: 'month',
    yField: 'students',
    color: '#3ab4f2',
    columnWidthRatio: 0.1,
    label: {
      position: 'middle',
      style: {
        fill: '#fff',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    height: height - 60,
  };

  return (
    <Card 
      title={
        <Space>
          <BarChartOutlined style={{ color: '#3ab4f2' }} />
          <Text strong>Student Enrollment by Month</Text>
        </Space>
      }
      style={{ 
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        height: '100%',
      }}
      headStyle={{ 
        borderBottom: '1px solid #f0f0f0',
        fontSize: '16px',
      }}
      bodyStyle={{ padding: '16px' }}
    >
      <Column {...config} />
    </Card>
  );
};

export default SimpleBarChart;