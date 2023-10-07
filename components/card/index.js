import { motion, AnimatePresence } from 'framer-motion';

import styles from './card.module.css';

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 },
};

export default function Card({ delay, title, desc, href }) {
  return (
    <AnimatePresence>
      <motion.a
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.4, delay, type: 'easeInOut' }}
        style={{ position: 'relative' }}
        href={href}
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
          {title} <span>-&gt;</span>
        </h2>
        <p>{desc}</p>
      </motion.a>
    </AnimatePresence>
  );
}
