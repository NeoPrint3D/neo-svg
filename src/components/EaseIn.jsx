import { motion, AnimatePresence } from "framer-motion";
function EaseIn(props) {
  const { children, clss } = props;

  return (
    <AnimatePresence>
      <motion.div
        className={`${clss}`}
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
