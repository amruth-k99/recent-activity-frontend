import React from 'react';
import { FiSend } from 'react-icons/fi';

const SubmitButton = (props: any): JSX.Element => {
  return (
    <button
      // disabled={newComment.length === 0}
      className="bg-blue-600 rounded-full my-4 text-white py-2 px-6"
      onClick={props.onClick}
    >
      <span className="flex text-base items-center my-auto">
        <FiSend className="mr-2" /> Submit
      </span>
    </button>
  );
};
export default SubmitButton;
