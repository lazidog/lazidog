import Image from 'next/image';

import styles from './card.module.css';
import AnimComponent from '../animcomponent';

export default function Card({ delay, image, title, desc, href }) {
  return (
    <AnimComponent styles={styles.card} delay={delay}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Image
          className={styles.img}
          src={image}
          alt="lazilearning"
          loading="lazy"
          fill
        ></Image>
        <h2>
          {title} <span>-&gt;</span>
        </h2>
        <p>{desc}</p>
      </a>
    </AnimComponent>
  );
}
