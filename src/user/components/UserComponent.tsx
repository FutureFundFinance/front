import React from 'react';
import type { UserInterface } from '../api/types/types';
import { usePrivy } from '@privy-io/react-auth';

function UserComponent({user} : UserInterface) {
  const { linkWallet, unlinkWallet} = usePrivy()
  const numAccounts = user?.linkedAccounts?.length || 0;
  const canRemoveAccount = numAccounts > 1;
  
  return (
   <div className="py-12 h-screen bg-gray-300">
  <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
  <div className="md:flex">
      <div className="w-full p-2 py-10">
        
        <div className="flex justify-center">
          <div className="relative">

            <img src="https://i.imgur.com/z4YSzDD.jpg" className="rounded-full" width="80" /> 
          <span className="absolute border-white border-4 h-5 w-5 top-12 left-16 bg-green-700 rounded-full"></span>
          
            
          </div>
          
        </div>

        <div className="flex flex-col text-center mt-3 mb-4">

          <span className="text-2xl font-medium">Lindsey James</span>
          <span className="text-md text-gray-400">{user?.email?.address}</span>
          
        </div>

         <p className="px-16 text-center text-md text-gray-800">  </p>

            
         <div className="px-14 mt-5">

          <button className="h-12 bg-primary w-full text-white text-md rounded hover:shadow hover:bg-primary-100 hover:text-primary">Modificar</button>
          </div>
           <div className="px-14 mt-5">
           {user?.wallet ? (
                <button
                  onClick={() => {
                    unlinkWallet(user?.wallet.address);
                  }}
                  className="h-12 bg-primary w-full text-white text-md rounded hover:shadow hover:bg-primary-100 hover:text-primary"
                  disabled={!canRemoveAccount}
                >
                  Eliminar wallet
                </button>
              ) : (
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

