import React from 'react';
import Head from 'next/head';

const SEO = ({ description, keywords, title, slug = 'https://recent-activity-frontend.vercel.app/' }) => (
  <Head>
    <title>{title} </title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords?.join(', ')} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta property="og:site_name" content={description} />
    <meta property="og:url" content={slug} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="" />
    <meta name="twitter:creator" content={title} />
    <meta name="twitter:image" content="" />
    <meta property="og:image" content="" />
    <link rel="icon" type="image/png" href="/icons/icon-72x72.png" />
    <link
      rel="apple-touch-icon"
      type="image/png"
      href="/icons/icon-72x72.png"
    />
  </Head>
);

SEO.defaultProps = {
  description: 'Amruth&apos;s Blog',
  title: 'Amruth&apos;s Blog',
  keywords: ['blogs', "amruth's blog", 'tech'],
};

export default SEO;
