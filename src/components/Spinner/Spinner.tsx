import React from 'react';
import s from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={s.spinner}>
      <div className={s.ldsCss}>
        <div className={s.ldsDualRing}>
          <div>&nbsp;</div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
