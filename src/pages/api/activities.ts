// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: number;
  date: string;
  title: string;
  slug: string;
  activity: string;
};

const ACTIVITIES = [
  {
    activities: [
      {
        id: 1,
        title: '15 GitHub Repositories to Contribute for Hacktoberfest 2022',
        slug: 'blog-1',
        activity: 'Replied',
      },
      {
        id: 1,
        title: 'First Post',
        slug: 'blog-1',
        activity: 'Commented',
      },
      {
        id: 1,
        title: 'First Post',
        slug: 'blog-1',
        activity: 'Created',
      },
    ],
    date: 'Oct 11',
  },
  {
    activities: [
      {
        id: 1,
        title: '15 GitHub Repositories to Contribute for Hacktoberfest 2022',
        slug: 'blog-1',
        activity: 'Replied',
      },
      {
        id: 1,
        title: 'First Post',
        slug: 'blog-1',
        activity: 'Commented',
      },
      {
        id: 1,
        title: 'First Post',
        slug: 'blog-1',
        activity: 'Created',
      },
    ],
    date: 'Oct 11',
  },
  {
    activities: [
      {
        id: 1,
        title: '15 GitHub Repositories to Contribute for Hacktoberfest 2022',
        slug: 'blog-1',
        activity: 'Replied',
      },
      {
        id: 1,
        title: 'First Post',
        slug: 'blog-1',
        activity: 'Commented',
      },
      {
        id: 1,
        title: 'First Post',
        slug: 'blog-1',
        activity: 'Created',
      },
    ],
    date: 'Oct 11',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<any>>
) {
  res.status(200).json(ACTIVITIES);
}
