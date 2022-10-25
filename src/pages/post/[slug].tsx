import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { Fragment, useEffect, useState } from 'react';
import SEO from '../../components/SEO';
import postAPI from '../../apis/posts';
import { commonDate } from '../../utils/dates';
import { useRouter } from 'next/router';
import { FiSend } from 'react-icons/fi';
import { BsReply } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

export default function PostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return router.isFallback ? <div>Loading...</div> : <PostView blog={post} />;
}

const PostView = ({ blog }: any) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [allComments, setComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(1);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response: any = await postAPI.getCommentsBySlug(
        blog.slug,
        commentsPage
      );

      if (response) {
        if (response.length === 0) {
          console.log('Comments', response);
          setLoading(false);
          return;
        }

        let updatedComments: any = [...allComments, ...response];
        setComments(() => updatedComments);

        if (router.asPath.includes('#comment-')) {
          setTimeout(() => {
            let commentId = router.asPath.split('#comment-')[1];
            console.log('commentId', commentId);
            if (commentId) {
              let comment = document.getElementById(commentId);
              if (comment) {
                comment.scrollIntoView({
                  behavior: 'smooth',
                });
              } else {
                console.log('comment not found');
                setCommentsPage(commentsPage + 1);
              }
            }
          }, 300);
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (blog) {
      fetchComments();
    }
  }, [commentsPage]);

  const handleNewComment = (e: any) => {
    setNewComment(e.target.value);
  };

  const postComment = async (isReply: boolean, commentID: string | null) => {
    try {
      const response = await postAPI.addCommentToPost({
        comment: newComment,
        slug: blog.slug,
        isReply,
        repliedToComment: commentID,
      });
      console.log(response);
      // setComments([...allComments, { body: newComment }]);
      return response;
    } catch (error) {
      console.log(error);
      toast.success('Something went wrong');
      return false;
    }
  };

  const addComment = async () => {
    let response: any = await postComment(false, null);
    if (response.insertedId) {
      toast.success('Comment posted successfully');
      setNewComment('');
    }
  };

  return (
    <div>
      <SEO
        slug={blog?.slug}
        title={blog?.title}
        description={'Click here to read the blog'}
      />

      <div className="mx-auto sm:px-4 px-6 md:px-10">
        <main className={'my-3'}>
          <div className="container mx-auto">
            <div>
              <div
                placeholder="Article Title..."
                className="bg-white text-4xl my-5 w-full placeholder-gray-500 font-extrabold border-none focus:backdrop-filter-none focus:outline-none"
              >
                {blog?.title}
              </div>

              <div className="bg-white text-justify lg:text-start w-full overflow-auto text-lg my-5 placeholder-gray-500 border-none focus:backdrop-filter-none focus:outline-none">
                {blog?.content}
              </div>

              <div className="bg-white flex justify-start text-md my-10 w-full placeholder-gray-500 border-none focus:backdrop-filter-none focus:outline-none">
                {blog?.tags?.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="border m-auto bg-gray-200 rounded-md px-2 py-1 mx-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Comment Section */}
            <div className="my-10 text-3xl font-bold">Comments</div>
            {!loading ? (
              <Fragment>
                <div className="bg-white w-full overflow-auto text-lg my-5 placeholder-gray-500 border-none focus:backdrop-filter-none focus:outline-none">
                  <textarea
                    placeholder="Enter your comment here..."
                    required
                    value={newComment}
                    className="bg-white p-3 text-md rounded-md w-full border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                    onChange={handleNewComment}
                  ></textarea>
                  <div className="w-full m-auto text-right">
                    <button
                      // disabled={newComment.length === 0}
                      className="bg-blue-600 rounded-full my-4 text-white py-2 px-6"
                      onClick={addComment}
                    >
                      <span className="flex text-base items-center my-auto">
                        <FiSend className="mr-2" /> Submit
                      </span>
                    </button>
                  </div>
                </div>
                <div>
                  {allComments?.map((comment: any, k) => (
                    <Comment
                      comment={comment}
                      key={k}
                      onAddNewReply={(newReply: any) => {
                        setComments((prevComments: any) =>
                          prevComments.map((prevComment: any) => {
                            if (prevComment._id === comment._id) {
                              return {
                                ...prevComment,
                                replies: [...prevComment.replies, newReply],
                              };
                            } else {
                              return prevComment;
                            }
                          })
                        );
                      }}
                    />
                  ))}
                </div>
              </Fragment>
            ) : (
              <div>
                <div className="flex justify-start w-16">
                  <Skeleton circle width={60} height={60} />
                  <Skeleton />
                </div>
                <div>
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const Comment = ({ comment, onAddNewReply }: any) => {
  const [reply, setReply] = useState('');
  const [showReply, setShowReply] = useState(false);

  const showReplyBox = () => {
    setShowReply(true);
  };

  const hideReplyBox = () => {
    setShowReply(false);
  };

  const handleReply = (e: any) => {
    setReply(e.target.value);
  };

  const addReply = async (commentID: string) => {
    console.log(commentID);

    const response = await postAPI.addCommentToPost({
      comment: reply,
      slug: comment.post,
      isReply: true,
      repliedToComment: commentID,
    });
    console.log(response);
    if (response.insertedId) {
      onAddNewReply({
        comment: reply,
        repliedToComment: commentID,
        post: comment.post,
        _id: response.insertedId,
        createdAt: new Date(),
      });
      toast.success('Reply posted successfully');
      setReply('');
    } else {
      toast.success('Something went wrong');
    }
  };

  return (
    <div className="bg-white w-full border rounded-lg p-3 overflow-auto text-lg my-5 placeholder-gray-500">
      <div>
        <div className="flex justify-between flex-1 mb-5">
          <div className="flex">
            <img
              src={'https://picsum.photos/200/200'}
              className="rounded-full w-10 h-10"
              alt="user_pic"
            />
            <div className="text-md ml-4 align-middle items-center my-auto font-semibold">
              {comment.user[0].name}
            </div>
          </div>
          <div className="text-sm font-semibold my-auto text-gray-500">
            {commonDate(comment.createdAt)}
          </div>
        </div>
        <div id={comment._id} className="text-lg mx-2 mb-5">
          {comment.comment}
        </div>

        <button onClick={showReplyBox} className="text-sm mx-2 my-auto mb-5">
          <div className="flex gap-2 font-medium my-auto text-base">
            <BsReply className="text-xl my-auto" /> Reply
          </div>
        </button>
      </div>

      {/* Reply comments */}
      {comment.replies.map((reply: any, j: number) => (
        <div
          key={'comment_' + j}
          id={reply._id}
          className="bg-gray-50 w-full border rounded-lg p-3 overflow-auto text-lg my-5 placeholder-gray-500"
        >
          <div className="flex justify-between">
            <div>
              <div>
                <div className="flex mb-5">
                  <img
                    src={'https://picsum.photos/200/200'}
                    className="rounded-full w-10 h-10"
                    alt="user_pic"
                  />
                  <div className="text-md ml-4 align-middle items-center my-auto font-semibold">
                    {comment.user[0].name}
                  </div>
                </div>
              </div>
              <div className="text-lg mx-2 mb-5">{reply.comment}</div>

              <button onClick={showReplyBox} className="text-sm mx-2 mb-5">
                <div className="flex gap-2 font-medium text-base">
                  <BsReply className="text-xl my-auto" /> Reply
                </div>
              </button>
            </div>
            <div className="text-sm font-semibold text-gray-500">
              {commonDate(reply.createdAt)}
            </div>
          </div>
        </div>
      ))}
      {/* Reply box */}
      {showReply && (
        <div className="bg-white w-full overflow-auto text-lg my-5 placeholder-gray-500 border-none focus:backdrop-filter-none focus:outline-none">
          <textarea
            placeholder="Enter your comment here..."
            required
            value={reply}
            className="bg-white p-3 text-md rounded-md w-full border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
            onChange={handleReply}
          ></textarea>
          <div className="w-full m-auto text-right">
            <button
              // disabled={newComment.length === 0}
              className="rounded-full my-4 text-gray-700 py-2 mx-4 px-3"
              onClick={hideReplyBox}
            >
              <span className="flex text-base items-center my-auto">
                Cancel
              </span>
            </button>
            <button
              // disabled={newComment.length === 0}
              className="bg-blue-600 rounded-full my-4 text-white py-2 px-6"
              onClick={() => {
                addReply(comment._id);
              }}
            >
              <span className="flex text-base items-center my-auto">
                <FiSend className="mr-2" /> Submit
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  console.log('params', params);

  if (params) {
    console.log('@@@', params.slug);

    const post = await postAPI.getPostBySlug(params.slug || 'qwert');

    if (!post) {
      throw new Error(`Post with slug '${params.slug}' not found`);
    }
    return {
      props: {
        post,
      },
      revalidate: 200,
    };
  } else {
    return {
      props: {
        post: {},
      },
      revalidate: 200,
    };
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { posts } = await postAPI.getAllPosts({
    page: 1,
  });

  return {
    paths: posts.map((post: any) => `/post/${post.slug}`),
    fallback: 'blocking',
  };
}
