import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import styles from './profileimage.module.css';

export default function ProfileImage() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          scale: [0.2, 0.4, 0.6, 0.8, 1],
          rotate: [50, 40, 30, 20, 10, 0],
          opacity: [1],
        }}
        transition={{
          duration: 0.4,
        }}
        padding="2"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="170px"
        height="170px"
        position="relative"
      >
        <Image
          className={styles.logo}
          src="/lazidog.jpg"
          alt="Logo"
          width={120}
          height={120}
          priority
        />
      </motion.div>
    </AnimatePresence>
  );
}
