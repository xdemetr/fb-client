import React from 'react';
import withAuthRedirect from '../../../hoc/withAuthRedirect';

const Generator: React.FC<{}> = () => {
  return (
      <div className="generate-page">
        <h1>Generator</h1>
      </div>
  );
};

export default withAuthRedirect(Generator);
