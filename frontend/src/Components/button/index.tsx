import { Link } from 'react-router-dom';
import type { ReactNode, ElementType } from 'react';

interface BUTTON {
  href?: string;
  to?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  ref?:React.Ref<HTMLButtonElement> | undefined;
  type?:string
}

const Button: React.FC<BUTTON> = ({ href, to, onClick, children, className = '', ...pre }) => {
  let Comp: ElementType = 'button';
  const props: Record<string, unknown> = { onClick, ...pre };
  if (href) {
    Comp = 'a';
    props.href = href;
  } else if (to) {
    Comp = Link;
    props.to = to;
  }
  return (
    <Comp className={className} {...props}>
      {children}
    </Comp>
  );
};

export default Button;
