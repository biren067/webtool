import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/logo.png'

function Navbar() {
  return (
    <>
      <Link to='/' >
        <Image src={logo} alt='logo' />
      </Link>
      <ul>
        <li className=''><a href="index.html">Home</a></li>
        <li className=''><a href="index.html">Blog</a></li>
        <li className=''><a href="index.html">Finance</a></li>
        <li className=''><a href="index.html">Math</a></li>
        <li className=''><a href="index.html">Medical</a></li>

      </ul>
    </>
  )
}

export default Navbar
