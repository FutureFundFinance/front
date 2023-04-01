import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {PrivyProvider} from '@privy-io/react-auth';
import {useRouter} from 'next/router';
import AdminLayout from '../src/core/components/Layouts/AdminLayout'

import { ApolloProvider } from "@apollo/client";
import client from "../src/core/utils/apollo-client";

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  return (
    <ApolloProvider client={client}>
    
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        onSuccess={() => router.push('/user')}
      >
      
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
         
        
      </PrivyProvider>
    </ApolloProvider>
  );
}

export default MyApp;
