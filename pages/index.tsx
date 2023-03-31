import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router'

import Portal from '../components/graphics/portal';
import {usePrivy} from '@privy-io/react-auth';
import Head from 'next/head';



export default function LoginPage() {
  const {login, authenticated} = usePrivy();
    const router = useRouter()

  useLayoutEffect(()=> {
    if(authenticated){
      router.push('dashboard')
    }
  }, [authenticated])
  
  return (
    <>
      <Head>
        <title>Login · Future Fund</title>
      </Head>

      <main className="flex min-h-screen min-w-full">
        <div className="flex bg-privy-light-blue flex-1 p-6 justify-center items-center">
          <div>
            <div>
              <Portal style={{maxWidth: '100%', height: 'auto'}} />
            </div>
            <div className="mt-6 flex justify-center text-center">
              <button
                className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
                onClick={login}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
