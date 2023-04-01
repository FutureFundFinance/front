import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {usePrivy} from '@privy-io/react-auth';

import DashboardContainer from '../src/dashboard/containers/DashboardContainers';
export default function DashboardPage() {
  const router = useRouter();
  const {
    ready,
    authenticated
  } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  return (
    <DashboardContainer />
  );
}
