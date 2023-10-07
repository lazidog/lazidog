import { motion, AnimatePresence } from 'framer-motion';

import styles from './me.module.css';

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 },
};

export default function Me() {
  return (
    <div className={styles.container}>
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.4, type: 'easeInOut' }}
          className={styles.container}
        >
          <h2>Nguyen Van Tien</h2>
          <p>( Developer / Artist )</p>
          <p className={styles.para}>
            I&apos;ve tried on backend and mobile app development. However, what
            i do best and spend lots of time on is backend development. I thrive
            on learning and adapt to new challenges to solve complex problems
            and create efficient, optimized and scalable server.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
