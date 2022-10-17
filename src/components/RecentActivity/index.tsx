import React, { useEffect, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { VscReply } from 'react-icons/vsc';
import { TiPencil } from 'react-icons/ti';
import Container from '../Container';

const RecentActivity = (): JSX.Element => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    _fetchRecentActivity();
  }, []);

  const _fetchRecentActivity = async () => {
    try {
      const res = await fetch('/api/activities');
      const data = await res.json();
      setActivities(data);
    } catch (err) {}
  };

  const _renderActivity = () => {
    /* Render activities */

    return (
      <div>
        {activities.map((activity: any, k) => (
          <div key={k}>
            <div className="flex flex-row my-4">
              {/* Left branch */}
              <div className="w-24 flex flex-col text-center" id="left">
                <div className="text-sm text-gray-500 my-1">
                  {activity.date}
                </div>
                <div className="flex-1 flex w-0.5 h-full border-l-2 border-dashed my-2 self-center border-red-400"></div>
              </div>

              {/* Right branch */}
              <div className="flex-1" id="right">
                {activity.activities.map((act: any, j: any) => (
                  <div key={j} className="flex w-full flex-row border-b py-4">
                    <div className="flex flex-col">
                      <div className="my-1 flex gap-2 text-sm font-normal text-gray-500">
                        <FaRegComment className="my-auto" size={16} />
                        <VscReply className="my-auto" size={16} />
                        <TiPencil className="my-auto" size={16} />

                        <span className="my-auto align-middle">
                          {act.activity}
                        </span>
                      </div>
                      <a
                        href={`/post/${act.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-md font-bold"
                      >
                        {act.title}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return <Container heading="Recent Activities">{_renderActivity()}</Container>;
};

export default RecentActivity;
