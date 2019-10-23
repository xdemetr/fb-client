import React from 'react';
import Spinner from '../components/Spinner';

const withSuspense = (Component) => {

  return (props) => {
    return <React.Suspense fallback={<Spinner/>}>
      <Component {...props} />
    </React.Suspense>
  }
};

export default withSuspense;
