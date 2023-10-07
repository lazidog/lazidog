import { motion, isValidMotionProp } from 'framer-motion';
import Image from 'next/image';

import styles from './profileimage.module.css';
import { chakra, shouldForwardProp } from '@chakra-ui/react';

const ChakraImage = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function ProfileImage() {
  return (
    <ChakraImage
      animate={{
        scale: [0.2, 0.4, 0.6, 0.8, 1],
        rotate: [100, 80, 60, 40, 20, 0],
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
        objectFit="cover"
      />
    </ChakraImage>
  );
}
