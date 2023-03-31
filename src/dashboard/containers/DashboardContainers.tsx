import React from 'react';
import DashboardComponent from '../components/DashboardComponent';
import { useDashboard } from '../hooks/useDashboard';

function DashboardContainer() {
  const {data} = useDashboard()
  return (
    <DashboardComponent />
      
  );
}
export default DashboardContainer;

