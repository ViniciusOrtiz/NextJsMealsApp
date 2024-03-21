'use client';

import Link from "next/link";
import Image from "next/image";

import logoImg from '@/assets/logo.png';

import styles from './header.module.css';
import { usePathname } from "next/navigation";
import NavLink from "../nav-link/nav-link";

export default function Header() {

  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        <Image src={logoImg} alt="A plate with food on it" priority/>
        NextLevel Food
      </Link>

      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink href="/meals">Browse Meals</NavLink>
          </li>
          <li>
            <NavLink href="/community">Foodies Community</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}