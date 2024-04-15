"use client";
import React from 'react';
import LocalSwitch from "@/components/admin/LocalSwitch/LocalSwitch";
import ThemeSwitcher from "@/components/general/ThemeSwitcher/ThemeSwitcher";

import { usePathname } from 'next/navigation';

import styles from './navbar.module.scss';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split('/').pop()?.replace('-', ' ')}</div>
      <div className={styles.switchers}>
        <LocalSwitch/>
        <ThemeSwitcher/>
      </div>
    </div>
  )
}

export default Navbar;
