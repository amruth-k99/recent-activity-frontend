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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log('currentPage', currentPage);
    _fetchRecentActivity(currentPage);
  }, [currentPage]);

  const _fetchRecentActivity = async (page: number) => {
    try {
      console.log('fetching recent activity', page);

      if (lastPage) {
        console.log("We've reached the last page");
        setLastPage(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      let res = await userAPIs.getRecentActivities(page).catch((err) => {
        console.log(err);
        return [];
      });
      console.log('Got', res?.recent_activities);

      if (res?.recent_activities) {
        setLoading(false);

        if (res.recent_activities.length === 0) {
          setLastPage(true);
          window.removeEventListener('scroll', () => {
            'handle scroll removed';
          });
          return;
        }

        // if the dates match with the last date in the activities array, then we don't need to add the date
        if (currentPage > 1) {
          console.log('current page is greater than 1', activities);
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
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const debounceOnScroll = throttle(() => {
    console.log('last page', lastPage, 'currentPage', currentPage);

    if (lastPage) {
      console.log('Last page');
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  }, 1500);

  const incrementPage = () => {
    setCurrentPage((prev) => prev + 1);
    bottomRef.current.addEventListener('scroll', (e) => {
      console.log(
        'scrolling',
        lastPage,
        bottomRef.current?.scrollHeight,
        window.scrollY
      );

      if (
        bottomRef.current?.scrollHeight + 100 < window.scrollY &&
        !loading &&
        !lastPage
      ) {
        debounceOnScroll();
      } else {
        console.log('reached last page');
      }
    });
  };

  const scrollListener = () => {
    console.log(
      'scrolling',
      lastPage,
      bottomRef.current?.scrollHeight,
      window.scrollY
    );

    if (
      bottomRef.current?.scrollHeight + 100 < window.scrollY &&
      !loading &&
      !lastPage
    ) {
      debounceOnScroll();
    } else {
      console.log('reached last page');
    }
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
        {loading && (
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
        )}
        <div
          className="flex flex-row my-4"
          onScrollCapture={() => {
            console.log('touch end');
          }}
        >
          {/* Left branch */}
          <div className="w-24 flex flex-col text-center" id="left">
            <div className="flex-1 flex w-0.5 h-full border-l-2 border-dashed my-2 self-center border-blue-400"></div>
          </div>

          {/* Right branch */}
          {currentPage <= 1 && (
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
