import { motion, AnimatePresence } from "framer-motion";
function EaseIn(props) {
  const { children } = props;
  return (
    <AnimatePresence>
      <motion.div
        className="form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
export default EaseIn;
