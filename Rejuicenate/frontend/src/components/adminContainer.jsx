import React from "react";
import { motion } from "framer-motion";

function AdminContainer({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="admin-content-container" 
    >
      {children}
    </motion.div>
  );
}

export default AdminContainer;
