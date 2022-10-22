import React, { Fragment, useEffect, useRef, useState } from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';
import Container from '../Container';
import Activity from './Activity';
import userAPIs from '../../apis/user';
import { toast } from 'react-toastify';
import throttle from 'lodash.throttle';
import moment from 'moment';

type Activity = {
  _id: Date;
  activities: Array<{}>;
};

const RecentActivity = (): JSX.Element => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentPageRef = useRef(1);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(10);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    _fetchRecentActivity(1);
  }, []);

  const _fetchRecentActivity = async (page: number) => {
    try {
      if (page > lastPage) {
        console.log("We've reached the last page");
        setLoading(false);
        return;
      }

      console.log('fetching recent activity', page, lastPage);
      setLoading(true);
      let res = await userAPIs.getRecentActivities(page).catch((err) => {
        console.log(err);
        return [];
      });

      if (res?.recent_activities) {
        setLoading(false);
        setLastPage(res.last_page);
        currentPageRef.current = page;
        console.log(res);
        if (res.recent_activities.length === 0) {
          window.removeEventListener('scroll', () => {
            'handle scroll removed';
          });
          return;
        }

        // if the dates match with the last date in the activities array, then we don't need to add the date
        if (currentPageRef.current > 1) {
          let prevActivities: Array<Activity> = activities;

          const lastDateActivity = prevActivities[activities.length - 1]._id;
          const firstDateActivity = res.recent_activities.shift();

          if (lastDateActivity === firstDateActivity._id) {
            prevActivities[activities.length - 1].activities.push(
              ...firstDateActivity.activities
            );

            console.log([...prevActivities, ...res.recent_activities]);

            setActivities((): any => [
              ...prevActivities,
              ...res.recent_activities,
            ]);
            return;
          }
        }

        setActivities((): any => [...activities, ...res.recent_activities]);
      } else {
        console.log('--------');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const debounceOnScroll = throttle(() => {
    let nextPage = currentPageRef.current + 1;
    setLoading(true);
    _fetchRecentActivity(nextPage);

    if (nextPage === lastPage) {
      window.removeEventListener('scroll', scrollListener);
    }
  }, 200);

  const incrementPage = () => {
    if (currentPageRef.current === 1) {
      _fetchRecentActivity(2);

      window.addEventListener('scroll', scrollListener);
    }
  };

  const scrollListener = () => {
    if (currentPageRef.current !== lastPage) {
    }

    if (bottomRef.current?.scrollHeight < window.scrollY + 100) {
      console.log('bottom reached');
      debounceOnScroll();
    }
  };

  const _renderLoading = () => {
    return (
      <Fragment>
        <div className="flex flex-row my-4">
          {/* Left branch */}
          <div className="w-24 flex flex-col text-center" id="left">
            <div className="text-sm text-gray-500 my-1"></div>
            <div className="flex-1 flex w-0.5 h-full border-l-2 border-dashed my-2 self-center border-blue-400"></div>
          </div>

          {/* Right branch */}
          <div className="flex-1" id="right">
            {[0, 0, 0, 0, 0, 0, 0].map((act: any, j: any) => (
              <Activity key={j} activity={{}} loading={loading} />
            ))}
          </div>
        </div>
      </Fragment>
    );
  };

  const _renderActivity = () => {
    /* Render activities */

    return (
      <div ref={bottomRef}>
        {activities.map((activity: any, k) => (
          <Fragment key={k}>
            <div className="flex flex-row my-4">
              {/* Left branch */}
              <div className="w-24 flex flex-col text-center" id="left">
                <div className="text-sm text-gray-500 my-1">
                  {activity._id &&
                    moment(activity._id, 'YYYY-MM-DD').format('MMM DD')}
                </div>
                <div className="flex-1 flex w-0.5 h-full border-l-2 border-dashed my-2 self-center border-blue-400"></div>
              </div>

              {/* Right branch */}
              <div className="flex-1" id="right">
                {activity.activities.map((act: any, j: any) => (
                  <Activity key={j} activity={act} loading={false} />
                ))}
              </div>
            </div>
          </Fragment>
        ))}

        {loading && _renderLoading()}

        <div className="flex flex-row my-4">
          {/* Left branch */}
          <div className="w-24 flex flex-col text-center" id="left">
            <div className="flex-1 flex w-0.5 h-full border-l-2 border-dashed my-2 self-center border-blue-400"></div>
          </div>
          {/* Right branch */}
          {currentPageRef.current == 1 && !loading && (
            <div className="flex-1" id="right">
              <div
                onClick={incrementPage}
                className="text-center py-1 cursor-pointer hover:bg-gray-200"
              >
                <div className="flex gap-2 text-blue-500 font-semibold text-sm rounded-md p-2 my-auto align-middle">
                  <BiChevronDownCircle className="text-lg align-middle my-auto" />
                  Show More
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return <Container heading="Recent Activities">{_renderActivity()}</Container>;
};

export default RecentActivity;
