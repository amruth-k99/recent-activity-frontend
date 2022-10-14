import React from 'react';

const SubHeading = (props: any): JSX.Element => {
  return (
    <div>
      <h1 className="text-xl font-bold mt-5 mb-4">{props.heading}</h1>
    </div>
  );
};
export default SubHeading;
