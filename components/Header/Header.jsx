
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from '@/styles/header.module.css'; // Import your CSS module

function Header() {
  const router = useRouter();

  const isLinkActive = (href) => router.pathname === href;

  return (
    <>
      <div className={`flex justify-between items-center px-2 py-3 z-50 sm:font-sans ${styles.headerbar}`}>

        <div className='flex justify-center items-center gap-5 mx-auto'>
          <div className={isLinkActive('/') ? `${styles.menu}` : ''}>
            <Link href='/'>Home</Link>
          </div>
        <div className={isLinkActive('/page/pending') ? `${styles.menu}` : ''}>
            <Link href='/page/pending'>Pending</Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default Header