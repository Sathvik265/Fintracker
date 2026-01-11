import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
import { Download, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedRange, setSelectedRange] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [formType, setFormType] = useState("income");

  // Minimalist table columns - removed Reference
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => (
        <span style={{ color: "#737373", fontSize: "0.875rem" }}>
          {moment(text).format("DD MMM")}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          {record.type === "income" ? (
            <ArrowUpRight size={14} style={{ color: "#22c55e" }} />
          ) : (
            <ArrowDownRight size={14} style={{ color: "#ef4444" }} />
          )}
          <span
            style={{
              color: record.type === "income" ? "#22c55e" : "#ef4444",
              fontWeight: 500,
              fontSize: "1rem",
            }}
          >
            ₹{text.toLocaleString("en-IN")}
          </span>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text) => (
        <span
          className="capitalize"
          style={{ color: "#ffffff", fontSize: "0.875rem" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => (
        <span style={{ color: "#525252", fontSize: "0.875rem" }}>
          {text || "—"}
        </span>
      ),
    },
    {
      title: "",
      width: 80,
      render: (text, record) => (
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#525252",
              padding: 4,
            }}
            className="hover:opacity-70"
          >
            <EditOutlined style={{ fontSize: 14 }} />
          </button>
          <button
            onClick={() => handleDelete(record)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#525252",
              padding: 4,
            }}
            className="hover:opacity-70"
          >
            <DeleteOutlined style={{ fontSize: 14 }} />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/api/v1/transactions/get-transaction", {
          userid: user._id,
          frequency,
          selectedRange,
          type,
        });
        setLoading(false);
        setAllTransection(res.data);
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch transactions");
      }
    };
    getAllTransactions();
  }, [frequency, selectedRange, type]);

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transactions/delete-transaction", {
        transactionId: record._id,
      });
      setLoading(false);
      message.success("Deleted");
      setAllTransection((prev) =>
        prev.filter((item) => item._id !== record._id)
      );
    } catch (error) {
      setLoading(false);
      message.error("Failed to delete");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/api/v1/transactions/edit-transaction", {
          payload: { ...values, userid: user._id },
          transactionId: editable._id,
        });
        message.success("Updated");
      } else {
        await axios.post("/api/v1/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        message.success("Added");
      }
      setLoading(false);
      setShowModal(false);
      setEditable(null);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      message.error("Failed");
    }
  };

  const handleExport = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(
        "/api/v1/transactions/export-transaction",
        { userid: user._id, frequency, selectedRange, type },
        { responseType: "blob" }
      );
      setLoading(false);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setLoading(false);
      message.error("Export failed");
    }
  };

  // Calculate totals
  const totalIncome = allTransection
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = allTransection
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <Layout>
      {loading && <Spinner />}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
          className="glass-panel p-6 rounded-2xl"
          style={{ borderLeft: "3px solid #22c55e" }}
        >
          <p
            style={{
              color: "#525252",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: 0,
            }}
          >
            Total Income
          </p>
          <h2
            style={{
              color: "#22c55e",
              fontSize: "2rem",
              fontWeight: 600,
              margin: "8px 0 0 0",
            }}
          >
            ₹{totalIncome.toLocaleString("en-IN")}
          </h2>
        </div>
        <div
          className="glass-panel p-6 rounded-2xl"
          style={{ borderLeft: "3px solid #ef4444" }}
        >
          <p
            style={{
              color: "#525252",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: 0,
            }}
          >
            Total Expense
          </p>
          <h2
            style={{
              color: "#ef4444",
              fontSize: "2rem",
              fontWeight: 600,
              margin: "8px 0 0 0",
            }}
          >
            ₹{totalExpense.toLocaleString("en-IN")}
          </h2>
        </div>
        <div
          className="glass-panel p-6 rounded-2xl"
          style={{ borderLeft: "3px solid #ffffff" }}
        >
          <p
            style={{
              color: "#525252",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: 0,
            }}
          >
            Balance
          </p>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "2rem",
              fontWeight: 600,
              margin: "8px 0 0 0",
            }}
          >
            ₹{(totalIncome - totalExpense).toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/* Filters Section */}
      <div className="glass-panel p-5 rounded-2xl flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex gap-4 items-center">
          <Select
            value={frequency}
            onChange={(values) => setFrequency(values)}
            style={{ width: 140 }}
            variant="borderless"
          >
            <Select.Option value="7">Last 7 days</Select.Option>
            <Select.Option value="30">Last 30 days</Select.Option>
            <Select.Option value="365">This Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>

          {frequency === "custom" && (
            <RangePicker
              value={selectedRange}
              onChange={(values) => setSelectedRange(values)}
              variant="borderless"
            />
          )}

          <div
            style={{
              width: 1,
              height: 24,
              background: "rgba(255,255,255,0.1)",
            }}
          />

          <Select
            value={type}
            onChange={(values) => setType(values)}
            style={{ width: 110 }}
            variant="borderless"
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>

        <div className="flex gap-3 items-center">
          {/* Export */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#737373",
            }}
          >
            <Download size={16} />
            <span className="text-sm">Export</span>
          </button>

          {/* View Toggle */}
          <div
            className="flex items-center rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <button
              className="p-2.5 transition-all"
              style={{
                background: viewData === "table" ? "#ffffff" : "transparent",
                color: viewData === "table" ? "#000000" : "#525252",
                border: "none",
              }}
              onClick={() => setViewData("table")}
            >
              <UnorderedListOutlined style={{ fontSize: 16 }} />
            </button>
            <button
              className="p-2.5 transition-all"
              style={{
                background:
                  viewData === "analytics" ? "#ffffff" : "transparent",
                color: viewData === "analytics" ? "#000000" : "#525252",
                border: "none",
              }}
              onClick={() => setViewData("analytics")}
            >
              <AreaChartOutlined style={{ fontSize: 16 }} />
            </button>
          </div>

          {/* Add Buttons */}
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all"
            style={{
              background: "#ffffff",
              color: "#000000",
              border: "none",
            }}
            onClick={() => {
              setEditable(null);
              setFormType("income");
              setShowModal(true);
            }}
          >
            <Plus size={16} />
            Income
          </button>

          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all"
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
            }}
            onClick={() => {
              setEditable(null);
              setFormType("expense");
              setShowModal(true);
            }}
          >
            <Plus size={16} />
            Expense
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        {viewData === "table" ? (
          <div className="glass-panel rounded-2xl overflow-hidden">
            <Table
              columns={columns}
              dataSource={allTransection}
              rowKey="_id"
              pagination={{
                pageSize: 10,
                style: { padding: "16px 24px", margin: 0 },
              }}
            />
          </div>
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>

      {/* Modal */}
      <Modal
        title={
          editable
            ? "Edit"
            : `New ${formType === "income" ? "Income" : "Expense"}`
        }
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        destroyOnHidden={true}
        width={420}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable || { type: formType }}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input
              type="number"
              prefix="₹"
              placeholder="0"
              size="large"
              style={{ fontSize: "1.25rem" }}
            />
          </Form.Item>

          <Form.Item label="Type" name="type" hidden={!editable}>
            <Select disabled={!editable} size="large">
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Required" }]}
          >
            <Select placeholder="Select" size="large">
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="transport">Transport</Select.Option>
              <Select.Option value="shopping">Shopping</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="health">Health</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input type="date" size="large" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input placeholder="Optional note..." size="large" />
          </Form.Item>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 py-3 rounded-xl font-medium"
              style={{
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#737373",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl font-medium"
              style={{
                background: "#ffffff",
                color: "#000000",
                border: "none",
              }}
            >
              {editable ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
