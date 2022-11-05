import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import Container from '../../components/Container';
import postAPI from '../../apis/posts';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import SEO from '../../components/SEO';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Home: NextPage = () => {
  const router = useRouter();
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    image: '',
    slug: '',
    tags: '',
  });

  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);

  const createPost = async () => {
    if (!blog.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!blog.content.trim()) {
      toast.error('Content is required');
      return;
    }

    try {
      setLoading(true);
      const body = {
        ...blog,
        title: blog.title.trim(),
        content: blog.content.trim(),
        tags: blog.tags.split(','),
        slug: encodeURI(
          blog.title.replace(/\s/g, '-').toLowerCase() +
            Math.floor(Math.random() * 1000)
        ),
      };

      console.log(body);
      const res = await postAPI.createPost(body);
      if (res.error) {
        toast.error(res.error);
      } else {
        console.log(res);
        toast.success('Post created successfully');
        router.push(`/post/${body.slug}`);
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong. Please try again later.');
    }
    setLoading(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  return (
    <div>
      <SEO title="Create New Post" description="Create a new post" />

      <div className="mx-auto sm:px-4 md:px-10 px-10">
        <main className={'my-3'}>
          <Container heading="">
            <div>
              <input
                placeholder="Article Title..."
                name="title"
                onChange={handleInputChange}
                className="bg-white text-4xl my-5 w-full placeholder-gray-500 font-extrabold border-none focus:backdrop-filter-none focus:outline-none"
              />

              <textarea
                placeholder="Blog Starts Here..."
                style={{
                  minHeight: '40vh',
                  overflow: 'auto',
                  height: 'auto',
                }}
                name="content"
                onChange={handleInputChange}
                ref={contentRef}
                className="bg-white w-full overflow-auto text-lg my-5 placeholder-gray-500 border-none focus:backdrop-filter-none focus:outline-none"
              ></textarea>

              <input
                name="tags"
                onChange={handleInputChange}
                placeholder="Tags separated with commas..."
                className="bg-white text-md my-10 w-full placeholder-gray-500 border-none focus:backdrop-filter-none focus:outline-none"
              />

              <button
                disabled={loading}
                onClick={createPost}
                id="create-post"
                className="mr-auto"
              >
                <div className="text-md whitespace-nowrap flex gap-2 text-white rounded-3xl bg-blue-600 px-5 py-2 cursor-pointer">
                  {loading ? (
                    <AiOutlineLoading3Quarters className="mx-3 duration-200 animate-spin text-lg text-white" />
                  ) : (
                    'Create'
                  )}
                </div>
              </button>
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Home;
