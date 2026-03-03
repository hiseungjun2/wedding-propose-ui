import { motion } from 'framer-motion';

const MotionButton = ({ children, className = '', ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`btn rounded-pill shadow-sm fw-bold ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MotionButton;
