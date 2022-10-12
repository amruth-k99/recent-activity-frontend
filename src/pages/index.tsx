import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Home: NextPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        'https://xiuyf3nzxl.execute-api.ap-south-1.amazonaws.com/Prod/hello/'
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
    fetchData();
  }, []);

  const _renderTopFivePosts = () => {
    return (
      <div className="grid lg:grid-cols-5 sm:grid-cols-2 md:grid-col-3 my-4 gap-4">
        {blogs.map((blog: any, k) => (
          <Link key={k} href={`post/${blog.slug}`}>
            <div className="shadow-md rounded-lg cursor-pointer hover:shadow-xl transition">
              <Image
                src={blog.image}
                alt="Landscape picture"
                width={100}
                height={100}
                layout="responsive"
              />
              <div className="p-2 mt-2">
                <div className="text-lg font-semibold">{blog.title}</div>
                <div className="text-sm font-semibold">{blog.author}</div>
                <div className="text-sm font-normal">{blog.summary}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  const _renderActivity = () => {
    return <div>{/* Render Top 5 most visited posts */}</div>;
  };

  const _renderSubHeading = (subheading: String) => {
    return (
      <div>
        <h1 className="text-lg font-semibold mt-5 mb-4">{subheading}</h1>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Amruth&apos;s Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && <div>Loading...</div>}

      {!loading && (
        <main className={'my-3'}>
          {_renderSubHeading('Top 5 most visited posts')}

          {_renderTopFivePosts()}

          {_renderSubHeading('Activities')}

          {_renderActivity()}
        </main>
      )}
    </div>
  );
};

export default Home;
