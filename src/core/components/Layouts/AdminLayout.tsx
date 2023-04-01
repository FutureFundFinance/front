import React, {useState} from 'react'
import SideBar from '../SideBar'
import Navbar from '../NavBar'
import Footer from '../Footer'
import { usePrivy } from '@privy-io/react-auth'
import Loading from '../Loading'
interface IAdminLayout{
    children: React.ReactNode
}
const AdminLayout = ({children}: IAdminLayout) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { authenticated, ready} = usePrivy()

  if (!ready) return <Loading />
  if (ready && !authenticated) {
    return <>{children}</>
  }
  return (
      // ready && !authenticated ? 
        
    <div className="flex h-screen w-full antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
     <SideBar isOpen={isMenuOpen} />
      <div className="flex-1 h-full overflow-x-hidden overflow-y-auto">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <main>
          {children}
        </main>
        <Footer />
      </div>

    </div>
  )
}
export default AdminLayout;
