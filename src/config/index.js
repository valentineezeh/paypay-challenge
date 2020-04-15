export default {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'http://127.0.0.1:4000' : 'http://127.0.0.1:4000',
};