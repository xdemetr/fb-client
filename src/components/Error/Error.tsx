import React from 'react';

interface IProps {
  message?: string;
}

const Error: React.FC<IProps> = ({ message }) => {

  if (!message) {
    return null;
  }

  return (
    <div className="alert alert-danger">
      {message}
    </div>
  );
};

export default React.memo(Error);
