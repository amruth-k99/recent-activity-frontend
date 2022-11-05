import React from 'react';
import Header from '../Header';
import Footer from '../Footer/index';

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
      <Footer />
    </div>
  );
}

export default Layout;
