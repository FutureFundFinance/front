import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {usePrivy} from '@privy-io/react-auth';
import Head from 'next/head';
import Link from 'next/link';

export default function DashboardComponent() {
  const router = useRouter();
  const {
    ready,
    authenticated,
    user,
  } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  const wallet = user?.wallet;


  return (
    <>
      <Head>
        <title>Future Fund</title>
      </Head>

      <main className="flex flex-col min-h-screen px-4 sm:px-20 py-6 sm:py-10 bg-privy-light-blue">

        {!wallet ?
        <div className='flex flex-col justify-center items-center w-full h-screen'>
            <p className='p-4 text-primary font-medium'>
              Es necesario que crees una Wallet
            </p>
            <Link href='/user' className="flex justify-center items-center h-12 w-96 bg-primary text-white text-md rounded hover:shadow hover:bg-primary-100 hover:text-primary">
              Ir al perfil      
            </Link>
        </div> :
        
        <>Dahsboard</>}
       
      </main>
    </>
  );
}

