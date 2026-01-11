import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div
      className="flex flex-col min-h-screen relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Indian Mandala Pattern Background */}
      <div className="indian-pattern" />

      {/* Rangoli Corner Decorations */}
      <div className="rangoli-corner top-right" />
      <div className="rangoli-corner bottom-left" />

      {/* Subtle gradient overlays */}
      <div
        className="fixed top-0 right-0 w-[60%] h-[60%] rounded-full blur-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-[50%] h-[50%] rounded-full blur-[180px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.015) 0%, transparent 70%)",
        }}
      />

      <Header />
      <div className="flex-1 container mx-auto px-6 z-10 relative max-w-6xl">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
