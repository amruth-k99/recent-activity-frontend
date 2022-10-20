import React from 'react';
import { FaRegComment } from 'react-icons/fa';
import { VscReply } from 'react-icons/vsc';
import { TiPencil } from 'react-icons/ti';

const Activity = ({ activity }: any): JSX.Element => {
  const ICONS = {
    comment_created: <FaRegComment className="my-auto" size={16} />,
    reply_created: <VscReply className="my-auto" size={16} />,
    post_created: <TiPencil className="my-auto" size={16} />,
  };

  const onClick = () => {
    console.log('clicked');
  };

  return (
    <div className="flex w-full flex-row border-b py-4">
      <div className="flex flex-col">
        <div className="my-1 flex gap-2 text-sm font-normal text-gray-500">
          {ICONS[activity.activityType]}

          <span className="my-auto align-middle">
            {activity.activityDescription}
          </span>
        </div>
        <a
          href={`${activity.meta.url}`}
          target="_blank"
          rel="noreferrer"
          className="text-md font-bold"
        >
          {console.log(activity)}
          {activity?.post[0]?.title}
        </a>
      </div>
    </div>
  );
};
export default Activity;
