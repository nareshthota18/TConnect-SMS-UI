import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Consumption {
  item: string;
  quantity: string;
}

const GroceryConsumptionConfig: React.FC = () => {
  const [data, setData] = useState<Consumption[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Consumption | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const consumptionData: Consumption[] = [
      { item: "Rice", quantity: "200g" },
      { item: "Dal", quantity: "50g" },
      { item: "Vegetables", quantity: "100g" },
      { item: "Oil", quantity: "10ml" },
    ];
    setData(consumptionData);
  }, []);

  // Show modal for Add/Edit
  const showModal = (record?: Consumption) => {
    if (record) {
      setEditingItem(record);
      form.setFieldsValue(record);
    } else {
      setEditingItem(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingItem) {
          // Update existing record
          setData((prev) =>
            prev.map((item) =>
              item.item === editingItem.item ? { ...item, ...values } : item
            )
          );
        } else {
          // Add new record
          setData((prev) => [...prev, values]);
        }
        setIsModalVisible(false);
      })
      .catch((info) => console.log("Validate Failed:", info));
  };

  const handleDelete = (item: string) => {
    setData((prev) => prev.filter((record) => record.item !== item));
  };

  const columns: ColumnsType<Consumption> = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Quantity Per Student Per Day",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => handleDelete(record.item)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => showModal()}>
        Add New Item
      </Button>

      <Table<Consumption>
        columns={columns}
        dataSource={data}
        rowKey="item"
        pagination={false}
        bordered
      />

      {/* Modal for Add/Edit */}
      <Modal
        title={editingItem ? "Edit Item" : "Add New Item"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editingItem ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="item"
            label="Item"
            rules={[{ required: true, message: "Please enter item name" }]}
          >
            <Input disabled={!!editingItem} />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity Per Student Per Day"
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default GroceryConsumptionConfig;
