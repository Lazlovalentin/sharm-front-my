"use client"
import Link from "next/link";
import Image from "next/image";

import styles from "./menuLink.module.scss"
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

interface LinkItem {
  path: string;
  icon: string;
  title: string;
}

interface LinkItemProps {
  item: LinkItem;
}

const MenuLink: React.FC<LinkItemProps> = ({item}) => {
  const locale = useLocale();
  const pathName = usePathname();
  const path = `/${locale}/dashboard${item.path}`;

  return (
    <Link href={path} className={`${styles.container} ${pathName === path && styles.active}`}>
      <Image src={item.icon} alt={item.title}/>
      {item.title}
    </Link>
  )
}

export default MenuLink;