import React from 'react';
import { FaRegComment } from 'react-icons/fa';
import { VscReply } from 'react-icons/vsc';
import { TiPencil } from 'react-icons/ti';
import Skeleton from 'react-loading-skeleton';

interface Props {
  activity: any;
  loading: boolean;
}
const Activity = ({ activity, loading }: Props): JSX.Element => {
  const ICONS: any = {
    comment_created: <FaRegComment className="my-auto" size={16} />,
    reply_posted: <VscReply className="my-auto" size={16} />,
    post_created: <TiPencil className="my-auto" size={16} />,
  };

  if (loading) {
    return (
      <div className="w-full border-b py-4">
        <div className="my-1 flex gap-2 text-sm font-normal text-gray-500">
          <Skeleton circle height="40px" width="40px" />

          <span className="my-auto w-full align-middle">
            <Skeleton width={200} />
          </span>
        </div>

        <Skeleton width="100%" containerClassName="" />
      </div>
    );
  }

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
          {activity?.post[0]?.title}
        </a>
      </div>
    </div>
  );
};
export default Activity;
