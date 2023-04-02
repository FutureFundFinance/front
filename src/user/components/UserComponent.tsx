import React from 'react';
import type { UserInterface } from '../api/types/types';
import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';

function UserComponent({user, cedalioUser} : UserInterface) {
  const { linkWallet} = usePrivy()
  
  
  return (
   <div className="py-12 h-screen bg-gray-300">
  <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
  <div className="md:flex">
      <div className="w-full p-2 py-10">
        
        <div className="flex justify-center">
          <div className="relative">

            <img src={cedalioUser?.profilePicture} className="rounded-full" width="80" /> 
          <span className="absolute border-white border-4 h-5 w-5 top-12 left-16 bg-green-700 rounded-full"></span>
          
            
          </div>
          
        </div>

        <div className="flex flex-col text-center mt-3 mb-4">

          <span className="text-2xl font-medium">{cedalioUser?.firstName}</span>
          <span className="text-md text-gray-400">{user?.email?.address}</span>
          
        </div>

         <p className="px-16 text-center text-md text-gray-800">  </p>

            
         <div className="px-14 mt-5">

          <button className="h-12 bg-primary w-full text-white text-md rounded hover:shadow hover:bg-primary-100 hover:text-primary">
            <Link href='/user/edit-profile'>Modificar</Link></button>
          </div>
           <div className="px-14 mt-5">
           {!user?.wallet && (
                <button
                  onClick={linkWallet}
                  className="h-12 bg-primary w-full text-white text-md rounded hover:shadow hover:bg-primary-100 hover:text-primary"
                >
                  Agregar o crear una Wallet
                </button>
              )}
         </div>
        


        
      </div>
   
  </div>
</div>
  
</div>
  );
}

export default UserComponent;

