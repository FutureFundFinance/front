import { useEffect} from 'react'
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {PrivyProvider, usePrivy} from '@privy-io/react-auth';
import {useRouter} from 'next/router';
import AdminLayout from '../src/common/components/Layouts/AdminLayout'

import { ApolloProvider } from "@apollo/client";
import client from "../src/common/utils/apollo-client";

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  const { authenticated, ready, user} = usePrivy()

  
  useEffect(() => {
    if (ready && !authenticated) {
      console.log('IS AUTH', authenticated, ready, user);
      
    }
    console.log('JUERS', authenticated, ready, user);
  }, [ready, authenticated, router]);

  return (
    <ApolloProvider client={client}>
    
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        onSuccess={() => router.push('/dashboard')}
      >
        {authenticated ? <Component {...pageProps} /> 
        :
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
         }
        
      </PrivyProvider>
    </ApolloProvider>
  );
}

export default MyApp;
