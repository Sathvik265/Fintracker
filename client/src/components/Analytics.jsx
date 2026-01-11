import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransection }) => {
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

  const totalTransaction = allTransection.length;
  const totalIncomeTransactions = allTransection.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransection.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100 || 0;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100 || 0;

  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransection
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransection
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100 || 0;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100 || 0;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income vs Expense - Count */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h4
              style={{
                color: "#ffffff",
                fontSize: "1rem",
                fontWeight: 500,
                margin: 0,
              }}
            >
              Transactions
            </h4>
            <span style={{ color: "#525252", fontSize: "0.75rem" }}>
              {totalTransaction} total
            </span>
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: "#a3a3a3" }}>Income</span>
                <span style={{ color: "#22c55e" }}>
                  {totalIncomeTransactions.length}
                </span>
              </div>
              <Progress
                percent={totalIncomePercent}
                strokeColor="#22c55e"
                showInfo={false}
                trailColor="#1a1a1a"
                size="small"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: "#a3a3a3" }}>Expense</span>
                <span style={{ color: "#ef4444" }}>
                  {totalExpenseTransactions.length}
                </span>
              </div>
              <Progress
                percent={totalExpensePercent}
                strokeColor="#ef4444"
                showInfo={false}
                trailColor="#1a1a1a"
                size="small"
              />
            </div>
          </div>
        </div>

        {/* Income vs Expense - Amount */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h4
              style={{
                color: "#ffffff",
                fontSize: "1rem",
                fontWeight: 500,
                margin: 0,
              }}
            >
              Amount
            </h4>
            <span style={{ color: "#525252", fontSize: "0.75rem" }}>
              ₹{totalTurnover.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: "#a3a3a3" }}>Income</span>
                <span style={{ color: "#22c55e" }}>
                  ₹{totalIncomeTurnover.toLocaleString("en-IN")}
                </span>
              </div>
              <Progress
                percent={totalIncomeTurnoverPercent}
                strokeColor="#22c55e"
                showInfo={false}
                trailColor="#1a1a1a"
                size="small"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: "#a3a3a3" }}>Expense</span>
                <span style={{ color: "#ef4444" }}>
                  ₹{totalExpenseTurnover.toLocaleString("en-IN")}
                </span>
              </div>
              <Progress
                percent={totalExpenseTurnoverPercent}
                strokeColor="#ef4444"
                showInfo={false}
                trailColor="#1a1a1a"
                size="small"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income Categories */}
        <div className="glass-panel p-6 rounded-2xl">
          <h4
            style={{
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 500,
              margin: 0,
              marginBottom: 20,
            }}
          >
            Income Sources
          </h4>
          <div className="space-y-2">
            {categories.map((category) => {
              const amount = allTransection
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div
                    key={category}
                    className="flex justify-between items-center py-3 px-4 rounded-xl"
                    style={{ background: "rgba(34, 197, 94, 0.05)" }}
                  >
                    <span
                      className="capitalize"
                      style={{ color: "#a3a3a3", fontSize: "0.875rem" }}
                    >
                      {category}
                    </span>
                    <span style={{ color: "#22c55e", fontWeight: 500 }}>
                      ₹{amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )
              );
            })}
            {totalIncomeTransactions.length === 0 && (
              <p style={{ color: "#525252", textAlign: "center", padding: 24 }}>
                No income yet
              </p>
            )}
          </div>
        </div>

        {/* Expense Categories */}
        <div className="glass-panel p-6 rounded-2xl">
          <h4
            style={{
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 500,
              margin: 0,
              marginBottom: 20,
            }}
          >
            Expense Categories
          </h4>
          <div className="space-y-2">
            {categories.map((category) => {
              const amount = allTransection
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div
                    key={category}
                    className="flex justify-between items-center py-3 px-4 rounded-xl"
                    style={{ background: "rgba(239, 68, 68, 0.05)" }}
                  >
                    <span
                      className="capitalize"
                      style={{ color: "#a3a3a3", fontSize: "0.875rem" }}
                    >
                      {category}
                    </span>
                    <span style={{ color: "#ef4444", fontWeight: 500 }}>
                      ₹{amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )
              );
            })}
            {totalExpenseTransactions.length === 0 && (
              <p style={{ color: "#525252", textAlign: "center", padding: 24 }}>
                No expenses yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
