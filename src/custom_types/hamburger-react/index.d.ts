declare module 'hamburger-react' {
  import * as React from 'react';

  export interface HamburgerProps {
    color?: string;
    direction?: 'left' | 'right';
    duration?: number;
    hideOutline?: boolean;
    rounded?: boolean;
    size?: number;
    toggled?: boolean;
    toggle?: () => void;
    onToggle?: () => void;
  }
  export const Spin: React.ComponentClass<HamburgerProps>;
}
