import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

// Minimalist Black & White Theme
const minimalTheme = {
  token: {
    // Primary - Pure Black
    colorPrimary: "#000000",
    colorPrimaryHover: "#333333",
    colorPrimaryActive: "#1a1a1a",

    // Background colors - Pure shades
    colorBgContainer: "#141414",
    colorBgElevated: "#1a1a1a",
    colorBgLayout: "#0a0a0a",
    colorBgSpotlight: "#1f1f1f",

    // Text colors - White spectrum
    colorText: "#ffffff",
    colorTextSecondary: "#a3a3a3",
    colorTextTertiary: "#737373",
    colorTextQuaternary: "#525252",

    // Border colors
    colorBorder: "#2a2a2a",
    colorBorderSecondary: "#1f1f1f",

    // Semantic colors - muted
    colorSuccess: "#22c55e",
    colorWarning: "#eab308",
    colorError: "#ef4444",
    colorInfo: "#3b82f6",

    // Border radius - minimal
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,

    fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  components: {
    Input: {
      colorBgContainer: "#1a1a1a",
      colorBorder: "#2a2a2a",
      colorText: "#ffffff",
      colorTextPlaceholder: "#525252",
      activeBorderColor: "#ffffff",
      hoverBorderColor: "#404040",
      activeShadow: "0 0 0 2px rgba(255, 255, 255, 0.1)",
    },
    InputNumber: {
      colorBgContainer: "#1a1a1a",
      colorBorder: "#2a2a2a",
      colorText: "#ffffff",
      activeBorderColor: "#ffffff",
      hoverBorderColor: "#404040",
    },
    Select: {
      colorBgContainer: "#1a1a1a",
      colorBgElevated: "#1a1a1a",
      colorBorder: "#2a2a2a",
      colorText: "#ffffff",
      optionSelectedBg: "rgba(255, 255, 255, 0.1)",
      optionActiveBg: "rgba(255, 255, 255, 0.05)",
    },
    DatePicker: {
      colorBgContainer: "#1a1a1a",
      colorBgElevated: "#1a1a1a",
      colorBorder: "#2a2a2a",
      colorText: "#ffffff",
    },
    Modal: {
      contentBg: "#141414",
      headerBg: "#141414",
      titleColor: "#ffffff",
    },
    Table: {
      colorBgContainer: "transparent",
      headerBg: "rgba(26, 26, 26, 0.9)",
      headerColor: "#a3a3a3",
      rowHoverBg: "rgba(255, 255, 255, 0.03)",
      borderColor: "#2a2a2a",
    },
    Button: {
      primaryShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    },
    Form: {
      labelColor: "#a3a3a3",
    },
    Progress: {
      defaultColor: "#ffffff",
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={minimalTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
