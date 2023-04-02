import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {PrivyProvider} from '@privy-io/react-auth';
import {useRouter} from 'next/router';
import AdminLayout from '../src/core/components/Layouts/AdminLayout'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'


import { useUser } from '../src/user/hooks/useUser';

function MyApp({Component, pageProps}: AppProps) {

  const { cedalioUserToken} = useUser()
  const router = useRouter();


  // useEffect(() => {
  //   if(uri){
  //     setApolloUri(uri)
  //   }
  //   if(cedalioUserToken){
  //     setCedalioJWToken(cedalioUserToken)
  //   } else {
  //     console.log('AJU', user?.wallet?.address);
  //      if(user?.wallet?.address !== undefined){} {
  //       try {
  //         getAuthToken(String(user?.wallet?.address))
  //       } catch (error) {
  //         console.log(error);
          
  //       }
  //     }
  //   }
    

  //   console.log('cedalioUserToken', cedalioUserToken);
    
  // }, [uri, cedalioUserToken])

  const getCurrentSession = async () => {
    const token =  cedalioUserToken
    return token?.replace(/\s/g, '')
  }

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_BASE_URL,
  });

  const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getCurrentSession()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : ''
    }
  }
})  

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
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
