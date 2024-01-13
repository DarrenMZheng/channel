import axios from 'axios'
import { Message } from 'element-ui'
// , MessageBox
// import store from '@/store';
// TODO: wwr
import { getToken } from '@/utils/auth'
// 引入uuid插件
import { v4 as uuidv4 } from 'uuid'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_SERVER, // api 的 base_url
  timeout: 20000 // request timeout
})

service.defaults.withCredentials = true

// request interceptor
service.interceptors.request.use(
  (config) => {
    // TODO: wwr
    config.headers['Content-Type'] = 'application/json;'
    config.headers.Authorization = 'Arch6WithCloud ' + getToken()
    config.headers.requestId = uuidv4()
    return config
  },
  (error) => {
    // Do something with request error
    Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  (response) => {
    const res = response.data
    // 灰度接口
    const { code, data } = response.data
    if (code === '0' && data) {
      return data
    }
    if (res.status !== 0) {
      return Promise.reject(res)
    }
    if (res.data) {
      return res
    } else {
      return response.data
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
