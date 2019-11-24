import React from 'react';
import Spinner from '../components/Spinner/Spinner';

const withSuspense = (Component:any) => {

  return (props:any) => {
    return <React.Suspense fallback={<Spinner/>}>
      <Component {...props} />
    </React.Suspense>
  }
};

export default withSuspense;
