import { BASE_URL } from '.';

const userAPIs = {
  getRecentActivities: async (page = 1) => {
    try {
      const res = await fetch(`${BASE_URL}/api/recent-activity?page=${page}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return [];
    }
  },
};

export default userAPIs;
