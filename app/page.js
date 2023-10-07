'use client';

import styles from './page.module.css';
import Card from '@/components/card';
import Me from '@/components/me';
import ProfileImage from '../components/profileimage';

export default function Home() {
  return (
    <main className={styles.main}>
      <ProfileImage />
      <Me />
      <div className={styles.grid}>
        <Card delay={0.1} title={'Docs'} desc={'This is desc'} href={''}></Card>
        <Card delay={0.2} title={'Docs'} desc={'This is desc'} href={''}></Card>
        <Card delay={0.3} title={'Docs'} desc={'This is desc'} href={''}></Card>
        <Card delay={0.4} title={'Docs'} desc={'This is desc'} href={''}></Card>
        <Card delay={0.5} title={'Docs'} desc={'This is desc'} href={''}></Card>
      </div>
    </main>
  );
}
