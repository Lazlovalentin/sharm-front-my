import React from 'react';
import {cookies} from "next/headers";

import LogOut from "@/components/admin/LogOut/LogOut";
import profile from "./img/profile.svg"
import statistic from "./img/statistic.svg"
import categories from "./img/categories.svg"
import reviews from "./img/reviews.svg"
import menu from "./img/menu.svg"
import orders from "./img/orders.svg"
import pages from "./img/pages.svg"
import settings from "./img/settings.svg"
import users from "./img/users.svg"
import products from "./img/products.svg"

import styles from "./sidebar.module.scss"
import MenuLink from './menuLink/menulink';

const Sidebar = () => {
  const role = cookies().get('role')

  const menuItems = [
    {path: '', icon: statistic, title: 'Dashboard', visible: true},
    {path: '/profile', icon: profile, title: 'Profile', visible: false},
    {path: '/users', icon: users, title: 'Users', visible: role?.value === "admin"},
    {path: '/orders', icon: orders, title: 'Orders', visible: false},
    {path: '/menu', icon: menu, title: 'Menu', visible: true},
    {path: '/categories', icon: categories, title: 'Categories', visible: true},
    {path: '/products', icon: products, title: 'Products', visible: true},
    {path: '/pages', icon: pages, title: 'Pages', visible: false},
    {path: '/settings', icon: settings, title: 'Settings', visible: true},
    {path: '/reviews', icon: reviews, title: 'Reviews', visible: false},
  ]

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.userDetail}>
            <span className={styles.username}>John Dow</span>
            <span className={styles.userRole}>{role?.value}</span>
        </div>
        <div className={styles.userLogout}>
            <LogOut/>
        </div>
      </div>
      <ul className={styles.list}>

        {menuItems.map((item) => (
          <>
            { 
              item.visible && 
                <li key={item.title} className={styles.link}>
                  <MenuLink item={item}/>
                </li>
            }
          </>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;