import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Wallet, LayoutDashboard } from "lucide-react";
import { message } from "antd";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logged out successfully");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-panel sticky top-0 z-50 px-8 py-4 flex justify-between items-center mb-8">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight no-underline"
          style={{ color: "#ffffff", letterSpacing: "-0.02em" }}
        >
          FinTrack<span style={{ opacity: 0.3, fontWeight: 300 }}>.io</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all no-underline"
            style={{
              background: isActive("/")
                ? "rgba(255, 255, 255, 0.1)"
                : "transparent",
              color: isActive("/") ? "#ffffff" : "#525252",
            }}
          >
            <LayoutDashboard size={16} />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link
            to="/budget"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all no-underline"
            style={{
              background: isActive("/budget")
                ? "rgba(255, 255, 255, 0.1)"
                : "transparent",
              color: isActive("/budget") ? "#ffffff" : "#525252",
            }}
          >
            <Wallet size={16} />
            <span className="text-sm font-medium">Budget</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-full"
          style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
          >
            <User size={14} style={{ color: "#ffffff" }} />
          </div>
          <span style={{ color: "#a3a3a3", fontSize: "0.875rem" }}>
            {loginUser && loginUser.name}
          </span>
        </div>

        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all cursor-pointer"
          style={{
            background: "transparent",
            border: "none",
            color: "#525252",
          }}
          onClick={logoutHandler}
          onMouseOver={(e) => (e.currentTarget.style.color = "#ef4444")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#525252")}
        >
          <LogOut size={16} />
        </button>
      </div>
    </nav>
  );
};

export default Header;
