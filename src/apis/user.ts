const userAPIs = {
  getRecentActivities: async () => {
    try {
      const res = await fetch(`/api/activity`);
      const data = await res.json();
      return data;
    } catch (error) {
      return [];
    }
  },
};

export default userAPIs;
