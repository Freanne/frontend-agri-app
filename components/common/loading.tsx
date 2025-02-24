import { motion } from "framer-motion";
import { ClipLoader } from 'react-spinners';

const LoadingAgriculture = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
      >
      <ClipLoader color="#4CAF50" size={50} />
      </motion.div>
    </div>
  );
};

export default LoadingAgriculture;
