import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto py-6 text-center z-10 relative">
      {/* Dot divider */}
      <div className="dot-divider">
        <span></span>
      </div>
      <p style={{ color: "#525252", fontSize: "0.75rem", margin: 0 }}>
        © {new Date().getFullYear()} FinTrack — Simple. Minimal. Yours.
      </p>
    </footer>
  );
};

export default Footer;
