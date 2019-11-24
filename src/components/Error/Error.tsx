import React from 'react';

type Props = {
  message?: string
}

const Error: React.FC<Props> = ({message}) => {

  if (!message) return null;

  return (
      <div className="alert alert-danger">
        {message}
      </div>
  );
};

export default React.memo(Error);
