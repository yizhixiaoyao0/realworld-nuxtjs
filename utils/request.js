import axios from "axios";

const request = axios.create({
  baseURL: "http://realworld.api.fed.lagounews.com",
  // https://realworld.api.fed.lagounews.com
  // http://realworld.api.fed.lagounews.com
  // https://conduit.productionready.io
});

// 请求拦截器
// 响应拦截器

export default request;
