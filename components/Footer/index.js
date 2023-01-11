import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 rounded-lg shadow md:px-2 md:py-4 flex justify-center items-center">
      <span className="block text-sm text-slate-500 sm:text-center">
        © {new Date().getFullYear()} PT Bank Mandiri (Persero) Tbk.
      </span>
    </footer>
  );
};

export default Footer;
