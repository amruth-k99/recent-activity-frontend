import React from 'react';
import { SubHeading } from '../Headings';

interface ContainerProps {
  children: JSX.Element | JSX.Element[];
  heading: string;
}
const Container = ({ children, heading }: ContainerProps): JSX.Element => (
  <div className="rounded-lg border container mx-auto border-gray-200 sm:px-3 md:px-10 py-3 pb-10 mb-10">
    <SubHeading heading={heading} />
    {/*  */}
    {children}
  </div>
);

export default Container;
