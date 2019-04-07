import Axios from 'axios'
// import baseURL from '_conf/url'
import { Message } from 'iview'
import Cookies from 'js-cookie'
import { TOKEN_KEY, getLangObj } from '@/libs/util'
import i18n from '@/locale'

class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors (instance, url) {
    const currentPath = window.location.pathname // 当前路由的路径
    if (
      currentPath !== '/login' &&
      !url.includes('sysResource/getEmplResources')
    ) {
      let pageReq = localStorage.currentPageReq
        ? JSON.parse(localStorage.currentPageReq)
        : {}
      let urls = pageReq[currentPath] ? pageReq[currentPath] : []
      // 若localStorage中不存在当前路径，表示页面已跳转路由，应重新记录当前路由页面的请求
      if (!pageReq.hasOwnProperty(currentPath)) {
        pageReq = {}
        pageReq[currentPath] = []
      }
      // 若localStorage中不存在当前请求url，则添加
      if (urls.indexOf(url) === -1) {
        urls.push(url)
        localStorage.currentPageReq = JSON.stringify(pageReq)
      }
    }
    // 添加请求拦截器
    instance.interceptors.request.use(
      config => {
        if (!config.url.includes('/users')) {
          config.headers['x-access-token'] = Cookies.get(TOKEN_KEY)
        }
        // Spin.show()
        // 在发送请求之前做些什么
        return config
      },
      error => {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      res => {
        const data = getLangObj(res.data)
        const is = this.destroy(url)

        if (!is) {
          setTimeout(() => {
            // Spin.hide()
          }, 500)
        }
        if (data.status !== '110000') {
          // 后端服务在个别情况下回报201，待确认
          if (data.status === '230000' || data.status === '10001') {
            if (!Cookies.get(TOKEN_KEY)) return
            Cookies.remove(TOKEN_KEY)
            // 清空所有localStorage，重新将当前语言设置到localStorage.localeLanguage里
            const lang = localStorage.lang
            localStorage.clear()
            localStorage.lang = lang
            // 登录超时，退出到登录页并刷新页面
            window.location.reload()
            Message.error(i18n.t('message.loginExpired'))
          } else if (data.status === '110999') {
            Message.error(i18n.t('message.serverErr'))
          } else if (data.status === '230001' || data.status === '230004' || data.status === '230005') {
            return Promise.reject(data.status)
          } else if (data.status === '230003') {
            Message.error(i18n.t('message.usernameErr'))
          } else {
            if (data.msg) Message.error(data.msg)
          }
          return Promise.reject(data.msg)
        }
        if (
          window.location.pathname === '/login' ||
          window.location.pathname.includes('/static')
        ) {
          return data
        }
        if (!Cookies.get(TOKEN_KEY)) return
        return data
      },
      error => {
        if (error.message !== 'canceled') {
          Message.error('服务内部错误')
        }
        // 对响应错误做点什么
        return Promise.reject(error)
      }
    )
  }
  // 创建实例
  create () {
    let conf = {
      // #TODO: 待后期统一处理端口
      // baseURL: sysHost,
      // timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      timeout: 10000
    }
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }
  // 请求实例
  request (options) {
    const instance = this.create()
    const currentPath = window.location.pathname // 当前路由的路径
    options = Object.assign({}, options)
    if (
      currentPath !== '/login' &&
      !currentPath.includes('/static') &&
      !options.url.includes('sysResource/getEmplResources')
    ) {
      options.data = options.data || {}
      options.data.requestResourceId = this.getPageId(currentPath)
    }
    this.interceptors(instance, options.url)
    this.queue[options.url] = instance
    return instance(options)
  }
  // 获取当前页面id，通过该id判断权限
  getPageId (path) {
    // 根据已打开的标签列表，匹配当前打开的路径，获取id，路径包含list时取parentId，反之则取 id
    const tagNaveList = localStorage.tagNaveList
      ? JSON.parse(localStorage.tagNaveList)
      : []
    let pageId = null
    tagNaveList.forEach(item => {
      if (path === item.path) {
        pageId = item.meta.id
      }
    })
    return pageId
  }
}
export default httpRequest
