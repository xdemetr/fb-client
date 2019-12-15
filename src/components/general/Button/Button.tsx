import React from 'react';
import cn from 'classnames';

type Props = {
  type?: 'reset' | 'button' | 'submit'
  mod?: 'primary' | 'outline-primary' | 'outline-info' | 'outline-danger'
  className?: string
  href?: string
  wide?: boolean
  onClick?: () => void
  props?: any
}

const Button: React.FC<Props> = (
    {
      type,
      mod,
      href,
      wide,
      className,
      onClick,
      ...props
    }) => {

  const Tag = href ? "a" : "button";
  mod = mod ? mod : 'primary';
  type = (type || !href) ? type : 'button';

  return (
      <Tag
          href={href}
          type={type}
          onClick={onClick}
          className={cn(
              'btn',
              mod && `btn-${mod}`,
              wide && 'w-100',
              className
          )}
      >{props.children}</Tag>
  );
};

export default Button;
