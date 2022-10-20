import React, { useEffect, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { VscReply } from 'react-icons/vsc';
import { TiPencil } from 'react-icons/ti';
import Container from '../Container';
import Activity from './Activity';
import userAPIs from '../../apis/user';
import { toast } from 'react-toastify';
import moment from 'moment';

const RecentActivity = (): JSX.Element => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    _fetchRecentActivity();
  }, []);

  const _fetchRecentActivity = async (page = 1) => {
    try {
      const res = await userAPIs.getRecentActivities(page).catch((err) => {
        console.log(err);
        return [];
      });
      console.log(res);

      if (res?.recent_activities) {
        setActivities(res.recent_activities);
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
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
                  {moment(activity._id, 'YYYY-MM-DD').format('MMM DD')}
                </div>
                <div className="flex-1 flex w-0.5 h-full border-l-2 border-dashed my-2 self-center border-blue-400"></div>
              </div>

              {/* Right branch */}
              <div className="flex-1" id="right">
                {activity.activities.map((act: any, j: any) => (
                  <Activity key={j} activity={act} />
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
