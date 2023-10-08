import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 },
};

export default function AnimComponent({ children, styles, delay }) {
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.4, delay, type: 'easeInOut' }}
        className={styles}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
