import { usePrivy } from '@privy-io/react-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface INavBar {
    isMenuOpen: boolean
    setIsMenuOpen: (isOpen:boolean) => void
}
const NavBar = ({setIsMenuOpen, isMenuOpen}: INavBar) => {
    const { logout} = usePrivy();
  return (
   
    <header className="relative bg-white dark:bg-darker">
        <div className="flex items-center justify-between p-2 border-b dark:border-primary-darker">
            <button
                className="p-1 transition-colors duration-200 rounded-md text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark md:hidden focus:outline-none focus:ring"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
            <span className="sr-only">Open main menu</span>
                <span aria-hidden="true">
                        <svg
                        className="w-8 h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                </span>
            </button>
            <Link href="/" className="inline-block text-2xl font-bold tracking-wider text-primary-dark dark:text-light">
              <Image src='/logos/Logo_BN.png' alt="" width={120} height={60}  />
            </Link>
            <button
                onClick={logout}
                className="text-sm bg-violet-200 hover:text-violet-900 py-2 px-4 rounded-md text-violet-700"
              >
                Logout
              </button>
        </div>
    </header>
  )
}

export default NavBar