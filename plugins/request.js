import axios from "axios";

export const request = axios.create({
  baseURL: "http://realworld.api.fed.lagounews.com",
  // https://realworld.api.fed.lagounews.com
});

// 通过插件机制获取上下文对象（query, params, req, res, app, store）
// 插件导出函数必须作为default 成员
export default ({ store }) => {
  // 请求拦截器
  // add a request interceptor
  // 任何请求都要经过拦截器
  // 我们可以在请求拦截器中做一些公共的业务处理， 例如统一设置 token
  request.interceptors.request.use(
    function(config) {
      const { user } = store.state;
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`;
      }

      return config;
    },
    function(error) {
      // 请求失败（此时请求还未发出去）
      return Promise.reject(error);
    }
  );
};
