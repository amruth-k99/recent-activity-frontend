import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Container from '../components/Container';
import RecentActivity from '../components/RecentActivity';
import postAPI from '../apis/posts';
import Skeleton from 'react-loading-skeleton';
import SEO from '../components/SEO';

/**
 *
 * TODO:
 * 1. Make this static site using static props and Initial Activities should come from Page props
 * 2. Add a new page for creating a new post
 * 3. More should come from the API
 *
 */

const Home: NextPage = () => {
  const [blogs, setBlogs] = useState(new Array(4).fill(null));
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const blogs = await postAPI.getPosts({
        page: 1,
      });

      console.log(blogs);

      setBlogs(blogs.posts);
    } catch (err) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const _renderTopFivePosts = () => {
    return (
      <div className="grid lg:grid-cols-3 sm:grid-cols-3 md:grid-col-3 gap-x-10 gap-y-5 px-4">
        {blogs.map((blog: any, k) =>
          blog ? (
            <Link key={k} href={`post/${blog.slug}`}>
              <a className="shadow-md rounded-lg cursor-pointer hover:shadow-xl transition">
                <div className="p-2 mt-2">
                  <div className="text-lg font-semibold">{blog.title}</div>
                  <div className="text-sm font-semibold">{blog.author}</div>
                  <div className="text-sm font-normal">{blog.summary}</div>
                </div>
              </a>
            </Link>
          ) : (
            <div>
              <Skeleton width={'70%'} />
              <Skeleton />
              <Skeleton width={'80%'} />
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="px-3">
      <SEO />

      <main className="my-3">
        <Container heading="Top 5 most visited posts">
          {_renderTopFivePosts()}
        </Container>

        <RecentActivity />
      </main>
    </div>
  );
};

export default Home;
