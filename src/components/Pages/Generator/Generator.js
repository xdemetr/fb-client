import React from 'react';
import withAuthRedirect from '../../../hoc/withAuthRedirect';

const Generator = () => {
  return (
      <div className="generate-page">
        <h1>Generator</h1>
      </div>
  );
};

export default withAuthRedirect(Generator);
