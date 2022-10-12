import React from 'react';
import Header from '../Header';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <div>
      {/* Header */}
      <Header />
      <div>{props.children}</div>
      {/* Footer */}
    </div>
  );
}

export default Layout;
