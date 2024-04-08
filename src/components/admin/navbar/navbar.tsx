"use client";
import React from 'react';

import styles from './navbar.module.scss';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split('/').pop()?.replace('-', ' ')}</div>
    </div>
  )
}

export default Navbar;
