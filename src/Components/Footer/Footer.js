import React from "react";

const Footer = () => {
  return (
      <div style={{top: "500px"}}>
    <footer className="bg-white text-black mt-5 p-4 text-center">
      Copyright &copy;{new Date().getFullYear()} User-Activity
    </footer>
    </div>
  );
};
export default Footer;