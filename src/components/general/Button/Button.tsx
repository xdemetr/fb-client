import React from 'react';

import cn from 'classnames';

interface IProps {
  type?: 'reset' | 'button' | 'submit';
  mod?: 'primary' | 'outline-primary' | 'outline-info' | 'outline-danger';
  className?: string;
  href?: string;
  wide?: boolean;
  onClick?: () => void;
  title?: string;
  props?: any;
  disabled?: boolean;
}

const Button: React.FC<IProps> = (
  {
    type,
    mod,
    title,
    href,
    wide,
    className,
    onClick,
    disabled,
    ...props
  }) => {
  const TAG = href ? 'a' : 'button';

  return (
    <TAG
      href={href}
      type={type}
      onClick={onClick}
      title={title}
      className={cn('btn', mod && `btn-${mod}`, wide && 'w-100', className)}
      disabled={disabled}
    >
      {props.children}
    </TAG>
  );
};

Button.defaultProps = {
  mod: 'primary',
  type: 'button',
};

export default Button;
