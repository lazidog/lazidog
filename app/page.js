'use client';

import {
  IoLogoInstagram,
  IoLogoGithub,
  IoLogoFacebook,
  IoLogoLinkedin,
} from 'react-icons/io5';

import styles from './page.module.css';
import Card from '@/components/card';
import Me from '@/components/me';
import ProfileImage from '@/components/profileimage';
import AnimComponent from '@/components/animcomponent';

export default function Home() {
  return (
    <main className={styles.main}>
      <ProfileImage />
      <Me />
      <div className={styles.content}>
        <h3 className={styles.section}>Works</h3>
        <AnimComponent styles={styles.box}>
          <h5>02 - 2023</h5>{' '}
          <span>
            Fresher Backend Developer at{' '}
            <a className={styles.link2} href="https://itrvn.com/">
              ITR-VN
            </a>
          </span>
        </AnimComponent>
        <AnimComponent styles={styles.box} delay={0.1}>
          <h5>10 - 2022</h5>{' '}
          <span>
            Intern Backend Developer at{' '}
            <a className={styles.link2} href="https://itrvn.com/">
              ITR-VN
            </a>
          </span>
        </AnimComponent>
        <AnimComponent styles={styles.box} delay={0.2}>
          <h5>06 - 2022</h5>
          <span>
            Fresher Mobile Developer at{' '}
            <a className={styles.link2} href="https://mwg.vn/">
              MWG - thegioididong.com
            </a>
          </span>{' '}
        </AnimComponent>

        <h3 className={styles.section}>I ♥</h3>
        <AnimComponent styles={styles.row}>
          <p>
            <a className={styles.link2} href="">
              Art
            </a>
            <span style={{ margin: (0, '1em') }}>-</span>
            <a className={styles.link3} href="">
              Detective Novel
            </a>
          </p>
        </AnimComponent>

        <h3 className={styles.section}>Contacts</h3>
        <AnimComponent styles={styles.row}>
          <a
            href="https://www.github.com/lazidog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            <IoLogoGithub></IoLogoGithub>
            <span style={{ marginLeft: '1em' }}>@lazidog</span>
          </a>
        </AnimComponent>
        <AnimComponent styles={styles.row}>
          <a
            href="https://www.instagram.com/lazidog_24.7"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            <IoLogoInstagram></IoLogoInstagram>
            <span style={{ marginLeft: '1em' }}>@lazidog_24.7</span>
          </a>
        </AnimComponent>
        <AnimComponent styles={styles.row}>
          <a
            href="https://www.facebook.com/profile.php?id=100011192553023"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            <IoLogoFacebook></IoLogoFacebook>
            <span style={{ marginLeft: '1em' }}>@Nguyễn Văn Tiến</span>
          </a>
        </AnimComponent>
        <AnimComponent styles={styles.row}>
          <a
            href="https://www.linkedin.com/in/nvtien247/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            <IoLogoLinkedin></IoLogoLinkedin>
            <span style={{ marginLeft: '1em' }}>
              @Nguyễn Văn Tiến (nvtien247)
            </span>
          </a>
        </AnimComponent>

        <h3 className={styles.section}>Projects</h3>
        <div className={styles.grid}>
          <Card
            delay={0.1}
            image={'/projects/lazilearning-screenshot.png'}
            title={'Lazilearning'}
            desc={'Simple markdown blog to save my learning process'}
            href={'https://lazilearning.vercel.app/'}
          ></Card>
          <Card
            delay={0.2}
            image={'/projects/source-screenshot.png'}
            title={'Source'}
            desc={'Github source'}
            href={'https://github.com/lazidog/lazidog'}
          ></Card>
        </div>
      </div>
    </main>
  );
}
