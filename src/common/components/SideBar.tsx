import Link from 'next/link'
import React from 'react'

interface ISideBar {
    isOpen: boolean
}
export default function SideBar({ isOpen } : ISideBar) {
  return (
    <aside className={`flex-shrink-0 w-64 bg-white border-r ${isOpen ? 'visible' : 'hidden'}  md:visible dark:border-primary-darker dark:bg-darker md:block`}>
        <div className="flex justify-center items-center  mt-4 mb-4">
            <Link href='/dashboard' >Logo here</Link >
        </div>
        <div className="flex flex-col h-full">
            <nav aria-label="Main" className="flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto">
                <div x-data="{ isActive: true, open: true}">
                {/* :class="{'bg-primary-100 dark:bg-primary': isActive || open}" */}
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary"
                  
                  role="button"
                  aria-haspopup="true"
                >
                  <span aria-hidden="true">
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </span>
                  <span className="ml-2 text-sm"> Dashboards </span>
                  <span className="ml-auto" aria-hidden="true">
                    <svg
                      className="w-4 h-4 transition-transform transform"
                    //   :class="{ 'rotate-180': open }"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </a>
            </div>
            </nav>
        </div>
    </aside>
  )
}
