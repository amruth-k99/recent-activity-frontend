const userAPIs = require('./user');
const postAPI = require('./posts');

const BASE_URL = process.env.NEXT_PUBLIC_ENV_URL || 'https://k4l3ajies4.execute-api.ap-south-1.amazonaws.com/Prod';

export { BASE_URL, userAPIs, postAPI };