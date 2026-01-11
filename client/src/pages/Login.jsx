import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { ArrowRight } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("Welcome back");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Invalid credentials");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      className="flex flex-col min-h-screen relative overflow-hidden items-center justify-center"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Indian Pattern Background */}
      <div className="indian-pattern" />
      <div className="rangoli-corner top-right" />
      <div className="rangoli-corner bottom-left" />

      {/* Subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="glass-panel p-12 rounded-3xl w-full max-w-md z-10 mx-4">
        {/* Header */}
        <div className="mb-12">
          <h1
            style={{
              color: "#ffffff",
              fontSize: "2rem",
              fontWeight: 600,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Welcome back
          </h1>
          <p style={{ color: "#525252", marginTop: 8, fontSize: "0.875rem" }}>
            Enter your credentials to continue
          </p>
        </div>

        <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item
            label={
              <span
                style={{
                  color: "#737373",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Email
              </span>
            }
            name="email"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input type="email" placeholder="you@example.com" size="large" />
          </Form.Item>
          <Form.Item
            label={
              <span
                style={{
                  color: "#737373",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Password
              </span>
            }
            name="password"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-medium transition-all mt-6 flex items-center justify-center gap-2"
            style={{
              background: "#ffffff",
              color: "#000000",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Please wait...
              </span>
            ) : (
              <>
                Sign in
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </Form>

        <div className="dot-divider mt-10">
          <span></span>
        </div>

        <div className="text-center">
          <Link
            to="/register"
            style={{
              color: "#525252",
              textDecoration: "none",
              fontSize: "0.875rem",
            }}
          >
            New here? <span style={{ color: "#ffffff" }}>Create account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
