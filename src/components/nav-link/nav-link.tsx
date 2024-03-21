'use client';

import { ReactNode } from "react";
import Link from "next/link";

import styles from './nav-link.module.css';
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }: { href: string, children: ReactNode }) {
    const path = usePathname();
    return (
        <Link href={href} className={path.startsWith(href) ? 
            `${styles.active} ${styles.link}` : 
            styles.link}>{children}</Link>
    )
}