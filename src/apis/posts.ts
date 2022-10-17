interface CommentBody {
  slug: string | string[] | undefined;
  comment: string;
  isReply: boolean;
  repliedToComment: string | null;
}

const postAPI = {
  createPost: async (body: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return [];
    }
  },

  getAllPosts: async ({ page = 1, type = 'regular' }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/all?type=initial&page=${page}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(`` + error);
    }
  },

  getPosts: async ({ page = 1, type = 'regular' }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/all?type=initial&page=${page}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(`` + error);
    }
  },

  getPostBySlug: async (slug: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${slug}`
      );
      if (res.status === 404) {
        return null;
      } else {
        const data = await res.json();
        return data;
      }
    } catch (error) {
      throw new Error(`` + error);
    }
  },

  addCommentToPost: async (body: CommentBody) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/comment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(`` + error);
    }
  },
};

export default postAPI;
