// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: number;
  title: string;
  content: string;
};

const BLOGS = [
  {
    id: 1,
    title: 'Blog 1',
    content: 'Blog 1 content',
    summary: 'Some catchy summary',
    author: 'John Doe',
    slug: 'blog-1',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: 2,
    title: 'Blog 2',
    content: 'Blog 2 content',
    summary: 'Some very catchy summary',
    slug: 'blog-2',
    author: 'John Doe',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: 3,
    title: 'Blog 3',
    content: 'Blog 3 content',
    summary: 'Some very catchy summary',
    author: 'John Doe',
    slug: 'blog-3',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: 4,
    title: 'Blog 4',
    content: 'Blog 4 content',
    summary: 'Some very catchy summary',
    author: 'John Doe',
    slug: 'blog-4',
    image: 'https://picsum.photos/200/200',
  },
  {
    id: 5,
    title: 'Blog 5',
    content: 'Blog 5 content',
    summary: 'Some very catchy summary',
    author: 'John Doe',
    slug: 'blog-5',
    image: 'https://picsum.photos/200/200',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Data>>
) {
  res.status(200).json(BLOGS);
}
