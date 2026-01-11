import React, { useState, useEffect } from "react";
import { Form, Input, Select, message, Modal, Progress } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Layout from "../components/Layout/Layout";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Wallet,
} from "lucide-react";

const BudgetPage = () => {
  const [loading, setLoading] = useState(false);
  const [budgetStatus, setBudgetStatus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [form] = Form.useForm();

  const categories = [
    "salary",
    "freelance",
    "investment",
    "food",
    "transport",
    "shopping",
    "bills",
    "entertainment",
    "health",
    "other",
  ];

  // Fetch budget status
  const fetchBudgetStatus = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await api.post("/api/v1/budgets/budget-status", {
        userid: user._id,
      });
      setLoading(false);
      setBudgetStatus(res.data);

      // Show warnings for budgets that are close to or exceeded
      res.data.forEach((budget) => {
        if (budget.status === "exceeded") {
          message.error({
            content: `${budget.category.toUpperCase()}: ${budget.message}`,
            duration: 5,
          });
        } else if (budget.status === "warning") {
          message.warning({
            content: `${budget.category.toUpperCase()}: ${budget.message}`,
            duration: 4,
          });
        }
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBudgetStatus();
  }, []);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await api.post("/api/v1/budgets/set-budget", {
        userid: user._id,
        ...values,
      });
      setLoading(false);
      message.success(editingBudget ? "Budget updated" : "Budget created");
      setShowModal(false);
      setEditingBudget(null);
      form.resetFields();
      fetchBudgetStatus();
    } catch (error) {
      setLoading(false);
      message.error("Failed to save budget");
    }
  };

  // Handle delete
  const handleDelete = async (budgetId) => {
    try {
      setLoading(true);
      await api.post("/api/v1/budgets/delete-budget", { budgetId });
      setLoading(false);
      message.success("Budget deleted");
      fetchBudgetStatus();
    } catch (error) {
      setLoading(false);
      message.error("Failed to delete budget");
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "exceeded":
        return <XCircle size={20} style={{ color: "#ef4444" }} />;
      case "warning":
        return <AlertTriangle size={20} style={{ color: "#eab308" }} />;
      case "caution":
        return <AlertTriangle size={20} style={{ color: "#f97316" }} />;
      default:
        return <CheckCircle size={20} style={{ color: "#22c55e" }} />;
    }
  };

  // Get progress color
  const getProgressColor = (status) => {
    switch (status) {
      case "exceeded":
        return "#ef4444";
      case "warning":
        return "#eab308";
      case "caution":
        return "#f97316";
      default:
        return "#22c55e";
    }
  };

  // Calculate totals
  const totalBudget = budgetStatus.reduce((acc, b) => acc + b.budgetAmount, 0);
  const totalSpent = budgetStatus.reduce((acc, b) => acc + b.spent, 0);
  const overallPercent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <Layout>
      {loading && <Spinner />}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "1.75rem",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Budget Manager
          </h1>
          <p style={{ color: "#525252", marginTop: 4 }}>
            Set spending limits and track your expenses
          </p>
        </div>
        <button
          onClick={() => {
            setEditingBudget(null);
            form.resetFields();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium"
          style={{
            background: "#ffffff",
            color: "#000000",
            border: "none",
          }}
        >
          <PlusOutlined />
          Add Budget
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-2 rounded-lg"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <Wallet size={20} style={{ color: "#a3a3a3" }} />
            </div>
            <span
              style={{
                color: "#525252",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Total Budget
            </span>
          </div>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "2rem",
              fontWeight: 600,
              margin: 0,
            }}
          >
            ₹{totalBudget.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-2 rounded-lg"
              style={{ background: "rgba(239, 68, 68, 0.1)" }}
            >
              <TrendingUp size={20} style={{ color: "#ef4444" }} />
            </div>
            <span
              style={{
                color: "#525252",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Total Spent
            </span>
          </div>
          <h2
            style={{
              color: "#ef4444",
              fontSize: "2rem",
              fontWeight: 600,
              margin: 0,
            }}
          >
            ₹{totalSpent.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span
              style={{
                color: "#525252",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Overall Usage
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Progress
              type="circle"
              percent={Math.min(overallPercent, 100)}
              size={60}
              strokeColor={
                overallPercent > 80
                  ? "#ef4444"
                  : overallPercent > 50
                  ? "#eab308"
                  : "#22c55e"
              }
              trailColor="#1a1a1a"
              format={(percent) => (
                <span style={{ color: "#ffffff", fontSize: "0.875rem" }}>
                  {percent.toFixed(0)}%
                </span>
              )}
            />
            <div>
              <p style={{ color: "#ffffff", margin: 0, fontWeight: 500 }}>
                ₹{(totalBudget - totalSpent).toLocaleString("en-IN")}
              </p>
              <p style={{ color: "#525252", margin: 0, fontSize: "0.75rem" }}>
                remaining this month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Cards */}
      {budgetStatus.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center">
          <Wallet
            size={48}
            style={{ color: "#525252", margin: "0 auto 16px" }}
          />
          <h3 style={{ color: "#a3a3a3", margin: 0 }}>No budgets set</h3>
          <p style={{ color: "#525252", marginTop: 8 }}>
            Create your first budget to start tracking expenses
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgetStatus.map((budget) => (
            <div
              key={budget._id}
              className="glass-panel p-5 rounded-2xl relative overflow-hidden"
              style={{
                borderLeft: `3px solid ${getProgressColor(budget.status)}`,
              }}
            >
              {/* Status indicator */}
              {budget.status !== "safe" && (
                <div className="absolute top-3 right-3" title={budget.message}>
                  {getStatusIcon(budget.status)}
                </div>
              )}

              {/* Category */}
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="capitalize"
                  style={{
                    color: "#ffffff",
                    fontSize: "1rem",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {budget.category}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingBudget(budget);
                      form.setFieldsValue({
                        category: budget.category,
                        amount: budget.budgetAmount,
                        period: budget.period,
                      });
                      setShowModal(true);
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#525252",
                      cursor: "pointer",
                      padding: 4,
                    }}
                  >
                    <EditOutlined />
                  </button>
                  <button
                    onClick={() => handleDelete(budget._id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#525252",
                      cursor: "pointer",
                      padding: 4,
                    }}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <Progress
                  percent={budget.percentUsed}
                  strokeColor={getProgressColor(budget.status)}
                  trailColor="#1a1a1a"
                  showInfo={false}
                  size="small"
                />
              </div>

              {/* Amount details */}
              <div className="flex justify-between">
                <div>
                  <p
                    style={{
                      color: "#525252",
                      fontSize: "0.7rem",
                      margin: 0,
                      textTransform: "uppercase",
                    }}
                  >
                    Spent
                  </p>
                  <p
                    style={{
                      color: getProgressColor(budget.status),
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    ₹{budget.spent.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    style={{
                      color: "#525252",
                      fontSize: "0.7rem",
                      margin: 0,
                      textTransform: "uppercase",
                    }}
                  >
                    Budget
                  </p>
                  <p style={{ color: "#a3a3a3", fontWeight: 500, margin: 0 }}>
                    ₹{budget.budgetAmount.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Warning message */}
              {budget.message && (
                <div
                  className="mt-3 p-2 rounded-lg text-xs"
                  style={{
                    background:
                      budget.status === "exceeded"
                        ? "rgba(239, 68, 68, 0.1)"
                        : "rgba(234, 179, 8, 0.1)",
                    color: budget.status === "exceeded" ? "#ef4444" : "#eab308",
                  }}
                >
                  {budget.message}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        title={editingBudget ? "Edit Budget" : "Set Budget"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditingBudget(null);
          form.resetFields();
        }}
        footer={null}
        destroyOnHidden={true}
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Required" }]}
          >
            <Select
              placeholder="Select category"
              size="large"
              disabled={!!editingBudget}
            >
              {categories.map((cat) => (
                <Select.Option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Budget Amount"
            name="amount"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input
              type="number"
              prefix="₹"
              placeholder="Enter monthly budget"
              size="large"
            />
          </Form.Item>

          <Form.Item label="Period" name="period" initialValue="monthly">
            <Select size="large">
              <Select.Option value="weekly">Weekly</Select.Option>
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="yearly">Yearly</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingBudget(null);
                form.resetFields();
              }}
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
              {editingBudget ? "Update" : "Create"}
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default BudgetPage;
