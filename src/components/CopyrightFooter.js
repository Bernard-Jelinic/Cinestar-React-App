import React from "react";

export default function CopyrightFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="copyright-footer">
      © Copyright {currentYear} Bernard Jelinić
    </footer>
  );
}
