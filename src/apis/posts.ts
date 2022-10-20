import { BASE_URL } from '.';

interface CommentBody {
  slug: string | string[] | undefined;
  comment: string;
  isReply: boolean;
  repliedToComment: string | null;
}

const postAPI = {
  createPost: async (body: any) => {
    try {
      const res = await fetch(`${BASE_URL}/api/post/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return [];
    }
  },

  getAllPosts: async ({ page = 1 }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/posts?page=${page}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return { posts: [] };
    }
  },

  getPosts: async ({ page = 1 }) => {
    try {
      console.log(`${BASE_URL}/api/posts?page=${page}`);
      const res = await fetch(`${BASE_URL}/api/posts?page=${page}`);
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(`` + error);
    }
  },

  getPostBySlug: async (slug: string) => {
    try {
      console.log(slug);

      const res = await fetch(`${BASE_URL}/api/post/${slug}`);
      if (res.status === 404) {
        return null;
      } else {
        const data = await res.json();
        return data;
      }
    } catch (error) {
      console.log(error);
      return {};
    }
  },

  addCommentToPost: async (body: CommentBody) => {
    try {
      const res = await fetch(`${BASE_URL}/api/posts/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(`` + error);
    }
  },

  getCommentsBySlug: async (slug: string, page: number) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/comments?post_slug=${slug}&page=${page}`
      );
      if (res.status === 404) {
        return [];
      } else {
        const data = await res.json();
        return data;
      }
    } catch (error) {
      return [];
    }
  },
};

export default postAPI;
