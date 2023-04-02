import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ISideBar {
    isOpen: boolean
}
export default function SideBar({ isOpen } : ISideBar) {
  return (
    <aside className={`flex-shrink-0 w-64 bg-white border-r ${isOpen ? 'visible' : 'hidden'}  md:visible dark:border-primary-darker dark:bg-darker md:block`}>
        <div className="flex justify-center items-center  mt-4 mb-4 bg-gray-50">
            <Link href='/dashboard' >
              <Image src='/logos/Logo_BN.png' alt="" width={120} height={60}  />
            </Link >
        </div>
        <div className="flex flex-col h-full">
            <nav aria-label="Main" className="flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto">
                <div x-data="{ isActive: true, open: true}">
                {/* :class="{'bg-primary-100 dark:bg-primary': isActive || open}" */}
                <Link 
                  href="/dashboard"
                  className="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary" 
                  role="button"
                  aria-haspopup="true"
                >
                  <span className="ml-2 text-sm"> Dashboards </span>
                </Link>
                <Link href='/user' className="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary" 
                  role="button"
                  aria-haspopup="true">
                  <span className="ml-2 text-sm"> Perfil </span>
                </Link>
                <Link href='/user/found-account' className="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary" 
                  role="button"
                  aria-haspopup="true">
                  <span className="ml-2 text-sm"> Add funds </span>
                </Link>
            </div>
            </nav>
        </div>
    </aside>
  )
}
