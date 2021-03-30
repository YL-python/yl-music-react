import axios from 'axios';
const development = process.env.NODE_ENV === 'development';

// const devBaseURL = 'http://123.207.32.32:9001';
const devBaseURL = 'http://coderyl.top/wyymusic';
const proBaseURL = 'http://coderyl.top/wyymusic';
const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});

instance.interceptors.request.use(
  (config) => {
    // 1.发送网络请求时, 在界面的中间位置显示Loading的组件
    // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面
    // 3.params/data序列化的操作
    return config;
  },
  (err) => {
    console.log(`error: ${err}`);
    return err;
  }
);

instance.interceptors.response.use(
  (response) => {
    if (development) {
      console.log(response.config.method, response.config.url, response.data);
    }

    return response.data;
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log('请求错误');
          break;
        case 401:
          console.log('未授权访问');
          break;
        default:
          console.log('其他错误信息');
      }
    }
    return err;
  }
);

export default instance;
