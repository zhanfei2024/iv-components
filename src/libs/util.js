import Cookies from 'js-cookie'
import Main from '@/view/main'
import parentView from '@/components/parent-view'
import Moment from 'moment-timezone'
import i18n from '@/locale'
// cookie保存的天数
// import config from '@/config'
import { forEach, hasOneOf, objEqual } from '@/libs/tools'
import * as math from 'mathjs'
import { isEmpty } from '@/libs/validate'
import axios from 'axios'

export const TOKEN_KEY = 'token'

export const setToken = token => {
  Cookies.set(TOKEN_KEY, token)
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const hasChild = item => {
  return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if (
        (hasChild(item) || (item.meta && item.meta.showAlways)) &&
        showThisMenuEle(item, access)
      ) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}

/**
 * @param {Array} list 动态获取的菜单路由列表
 * @returns {Array} 格式化好的菜单路由
 */
export const formatMenuRouter = list => {
  if (list.length === 0) return
  let res = []
  list.filter(item => item.parentId === null).forEach(item => {
    if (!item.path) return
    const names = item.path.split('/')
    let obj = {
      name: names[names.length - 1] ? names[names.length - 1] : 'feature',
      path: item.path,
      component: Main,
      meta: {
        id: item.id,
        title: item.title,
        icon: item.icon || 'ios-apps',
        href: item.url,
        titleLang: item.titleLang,
        isHidden: item.isHidden
      }
    }
    const children = getMenuRouterChildren(
      list.filter(item => item.parentId !== null),
      obj.path,
      item.id
    )
    if (item.path === '/') {
      obj.redirect = '/home'
    }
    if (children.length > 0) {
      obj.children = children
    }
    res.push(obj)
  })
  return res
}
/**
 * @param {Array} list 动态获取的菜单路由列表
 * @param {String} path  父级path
 * @param {Number} id  父菜单id
 * @returns {Array} 指定id下菜单的子菜单
 */
export const getMenuRouterChildren = (list, path, id) => {
  const res = []
  list.forEach(item => {
    if (item.parentId === id) {
      // 功能单页指向/single-page目录下
      const parentPath = path === '/' ? '/single-page' : path
      // 根据路径名获取路由名称
      const name = getRouterNameByPath(item.path, path)
      // 当前路由所对应的文件目录名，添加 add 和 edit路由都指向 /add 文件目录
      const dirName = name.split('-').length === 2 ? name.split('-')[1] : name
      let obj = {
        name: name,
        path: item.path.slice(1),
        component: () => import(`@/view${parentPath}/${dirName}/index.vue`),
        meta: {
          id: item.id,
          parentId: item.parentId,
          title: item.title,
          icon: item.icon || 'ios-apps',
          href: item.url,
          titleLang: item.titleLang,
          isHidden: item.isHidden,
          isChanged: false
        },
        children: []
      }
      obj.children = getMenuRouterChildren(
        list,
        `${parentPath}/${dirName}`,
        item.id
      )
      if (obj.children.length > 0) {
        obj.meta.isGroup = false
        obj.children.forEach(subItem => {
          // 若父菜单路由下所有子路由均为隐藏路由，则该菜单为独立菜单
          if (subItem.meta.isHidden === 0) {
            obj.meta.isGroup = true
          }
          if (subItem.path === 'list') {
            obj.redirect = `${parentPath}/${obj.name}/list`
          }
        })
        obj.component = parentView
      }
      res.push(obj)
    }
  })
  return res
}
/**
 * 根据路由path为路由命名
 * @param {String} path 路由路径
 * @param {String} parentPath 父路由路径
 * @returns {String} 当前路由名称
 */
export const getRouterNameByPath = (path, parentPath) => {
  const parentPaths = parentPath.split('/')
  // 路由包含:id,即详情detail/:id和编辑edit/:id时，处理当前路由名称
  if (path.includes(':id')) {
    return `${parentPaths[parentPaths.length - 1]}-${path.slice(1, -4)}`
  }
  // 路由为列表list、添加add时，处理当前路由名称
  if (path.includes('list') || path.includes('add')) {
    return `${parentPaths[parentPaths.length - 1]}-${path.slice(1)}`
  }
  return path.slice(1)
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched, homeRoute) => {
  let res = routeMetched
    .filter(item => {
      return item.meta === undefined || !item.meta.hide
    })
    .map(item => {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      return obj
    })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [Object.assign(homeRoute, { to: homeRoute.path }), ...res]
}

/**
 * @description 获取当前语言环境下的字段
 * @param {Object} vm Vue的根实例
 * @param {Object} item 需要设置多语言的对象
 * @param {String} key 需要设置多语言的字段
 * @returns {Array} 当前语言对应显示的内容
 */
export const getLangVal = (item, key) => {
  // 需要设置多语言的对象中不存在 key 字段，抛出错误
  if (!item.hasOwnProperty(key)) {
    console.error(`需要设置多语言的对象中的"${key}"不存在`)
    // throw Error(`需要设置多语言的对象中的"${key}"不存在`)
    return ''
  }
  // const lang = JSON.parse(item[`${key}Lang`]) || {}

  let lang = {}
  try {
    lang = JSON.parse(item[`${key}Lang`]) || {}
  } catch (error) {
    lang = {}
  }

  // vm.app.common.locale => 当前语言
  return lang[localStorage.lang] || item[key]
}

/**
 *@description 接口请求成功后返，处理初对象中部分字段的多语言
 * @param {Object} vm Vue的根实例
 * @param {Object} item 接口返回数据
 * @returns 部分字段多语言处理后的数据
 */
export const getLangObj = item => {
  for (let i in item) {
    if (i.endsWith('Lang')) {
      const key = i.slice(0, -4)
      item[key] = getLangVal(item, key)
    }
    // 若对象中属性值为数组的属性，重新递归遍历
    if (
      Object.prototype.toString.call(item[i]) === '[object Array]' &&
      item[i].length > 0
    ) {
      getLangData(item[i])
    } else if (Object.prototype.toString.call(item[i]) === '[object Object]') {
      getLangObj(item[i])
    }
  }
  return item
}

/**
 *@description 接口请求成功后返，处理初数据中部分字段的多语言
 * @param {Object} vm Vue的根实例
 * @param {Array} data 接口返回数据
 * @param {Function} callback 数据操作回调， 参数：item, 当前循环的值
 * @returns 部分字段多语言处理后的数据
 */
export const getLangData = (data, callback) => {
  // _.uniqBy(data, 'id') 相同id去重
  return data
    ? _.uniqBy(data, 'id').map((item, index) => {
        // 处理数据中需要修改的多语言的字段
        item = getLangObj(item)
        callback && callback(item, index)
        return item
      })
    : []
}

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}
/**
 * 设置标签导航列表中当前路由的修改状态
 * @param {Object} vm Vue根实例
 * @param {String} routeName 当前路由名称
 * @param {Boolean} isChanged 要变更的最终状态
 */
export const setTagNavListStatus = (vm, routeName, isChanged) => {
  vm.app.common.tagNavList.forEach(item => {
    if (item.name === routeName) {
      item.meta.isChanged = isChanged
    }
  })
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children)
      if (res.name) return res
    } else {
      if (item.name === 'home') {
        item.path = '/home'
        homeRoute = item
      }
    }
  }
  return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在，且路径名称则不再添加，若路由名一致路径不同，则更新为最新
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.path === path) >= 0) {
    // 路径完全一致，表示为同一个路由直接返回
    return newList
  } else if (
    newList.findIndex(item => item.name === name) >= 0 &&
    newList.findIndex(item => item.path === path) === -1
  ) {
    // 路由名称一致，但路径不同，表示为同一个路由，但参数不同,更新路名相同的路由
    newList.splice(newList.findIndex(item => item.name === name), 1, {
      name,
      path,
      meta
    })
  } else {
    newList.push({ name, path, meta })
  }
  return newList
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) {
    return hasOneOf(access, route.meta.access)
  } else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, routes) => {
  const routePermissionJudge = list => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return true
      }
    })
  }

  return routePermissionJudge(routes)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = file => {
  let nameSplit = file.name.split('.')
  let format = nameSplit[nameSplit.length - 1]
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file) // 以文本格式读取
    let arr = []
    reader.onload = function(evt) {
      let data = evt.target.result // 读到的数据
      let pasteData = data.trim()
      arr = pasteData
        .split(/[\n\u0085\u2028\u2029]|\r\n?/g)
        .map(row => {
          return row.split('\t')
        })
        .map(item => {
          return item[0].split(',')
        })
      if (format === 'csv') resolve(arr)
      else reject(new Error('[Format Error]:你上传的不是Csv文件'))
    }
  })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = array => {
  let columns = []
  let tableData = []
  if (array.length > 1) {
    let titles = array.shift()
    columns = titles.map(item => {
      return {
        title: item,
        key: item
      }
    })
    tableData = array.map(item => {
      let res = {}
      item.forEach((col, i) => {
        res[titles[i]] = col
      })
      return res
    })
  }
  return {
    columns,
    tableData
  }
}

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
}

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase()
  if (ele.childNodes.length) {
    let i = -1
    let len = ele.childNodes.length
    while (++i < len) {
      let child = ele.childNodes[i]
      if (child.tagName === tagName) return child
      else return findNodeDownward(child, tag)
    }
  }
}

export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access)
}
/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  // 如果当前路由存在id，且两个路由名称一致，返回true
  if (params1.id && route1.name === route2.name) {
    return true
  }

  return (
    route1.name === route2.name &&
    objEqual(params1, params2) &&
    objEqual(query1, query2)
  )
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  doCustomTimes(len, index => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

/**
 * @description 跳转路由时，打开独一无二的标签导航，多用于编辑页
 * @param {Object} vm Vue根实例
 * @param {Array} tagNavList 标签导航列表
 * @param {Object} route 路由对象
 * @param {Boolean} showTips 是否需要直接显示提示
 */
export const jumpUniqueRouter = (vm, tagNavList, route, showTips) => {
  // 在标签导航是否存在
  let isExist = false
  tagNavList.forEach(item => {
    if (item.name === route.name) {
      // 在标签导航是存在
      isExist = true
      if (
        (item.path === route.path || item.meta.isChanged === false) &&
        !showTips
      ) {
        // 编辑同一个产品，直接跳转
        vm.$router.push(route.path)
        return
      }
      // 编辑不同产品，且其它产品的标签导航窗口已经打开
      // 存在修改未保存，弹出提示框
      vm.$Modal.confirm({
        title:
          '<p style="font-size: 15px">编辑页存在内容未保存，是否要跳转？</p>',
        content: '<p>如果不保存，更改将丢失</p>',
        width: 360,
        onOk: () => {
          vm.$router.push(route.path)
          // 重置修改状态
          setTagNavListStatus(vm, route.name, false)
        }
      })
    }
  })
  // 若改路由在标签导航不存在
  if (!isExist) {
    vm.$router.push(route.path)
  }
}
/**
 * @description 跳转路由时，打开独一无二的标签导航，多用于预览页
 * @param {Object} vm Vue根实例
 * @param {Object} route 路由对象
 */
export const jumpPreviewRouter = (vm, tagNavList, route) => {
  let isExist = false
  tagNavList.forEach(item => {
    if (item.name === route.name) {
      isExist = true
      if (item.path === route.path) {
        // 编辑同一个产品，直接跳转
        vm.$router.push(route.path)
        return
      }
      if (localStorage.noMorePreviewTips) {
        vm.$router.push(route.path)
      } else {
        vm.$Modal.confirm({
          title: '已打开其他预览页，是否打开新的预览？',
          render: h => {
            return h('div', [
              h(
                'p',
                {
                  style: {
                    marginLeft: '40px'
                  }
                },
                '打开新的预览页会关闭之前的预览页'
              ),
              h(
                'Checkbox',
                {
                  style: {
                    position: 'absolute',
                    left: '7px',
                    top: '45px'
                  },
                  ref: 'noTips',
                  on: {
                    'on-change': v => {
                      vm.noMorePreviewTips = v
                    }
                  }
                },
                '不再提示'
              )
            ])
          },
          width: 400,
          onOk: () => {
            if (vm.noMorePreviewTips) {
              localStorage.noMorePreviewTips = true
              vm.noMorePreviewTips = false
            }
            vm.$router.push(route.path)
          }
        })
      }
    }
  })
  if (!isExist) {
    vm.$router.push(route.path)
  }
}
/**
 * @description 手动关闭当前标签页
 * @param {Object} vm Vue根实例
 */
export const closeCurrentTag = vm => {
  // 获取tags虚拟DOM对象
  const tags =
    vm.$root.$children[0].$children[1].$refs.tagsNav.$children[3].$children
  tags.forEach(tag => {
    if (
      tag.$el.className.includes('warning') ||
      tag.$el.className.includes('primary')
    ) {
      tag.$children[0].$el.click()
    }
  })
}
/**
 * @description 标签产品颜色图标映射
 */
export const tagMap = (idx) => {
  const tapMap = {
    1: {
      name: i18n.t('product.hotel.self'), // 酒店
      color: '#c880e9',
      icon: 'iconfont icon-jiudian1',
      key: 'hotel'
    },
    2: {
      name: i18n.t('product.tour.scenicArea'), // 景区
      color: '#5cd973',
      icon: 'iconfont icon-jingqu',
      key: 'scenic'
    },
    3: {
      name: i18n.t('product.restaurant.self'), // 餐厅
      color: '#fbba53',
      icon: 'iconfont icon-canting2',
      key: 'restaurant'
    },
    4: {
      name: i18n.t('product.traffic.vehicle.self'), // 车队
      color: '#5bb6f0',
      icon: 'iconfont icon-chedui',
      key: 'vehicle'
    },
    5: { name: '票务', color: '#7391ff', icon: 'md-plane', key: 'tickets' },
    51: {
      name:  i18n.t('product.ticket.airTicket'), // '机票'
      color: '#7391ff',
      icon: 'iconfont icon-jipiao',
      key: 'airTickets'
    },
    52: {
      name: i18n.t('product.ticket.trainTicket'), // '火车票'
      color: '#7391ff',
      icon: 'iconfont icon-huochepiao',
      key: 'trainTickets'
    },
    53: {
      name: i18n.t('product.ticket.shipTicket'), // '船票'
      color: '#7391ff',
      icon: 'iconfont icon-chuanpiao1',
      key: 'shipTickets'
    },
    6: {
      name: '保险',
      color: '#c5cb6c',
      icon: 'ios-briefcase',
      key: 'Insurance'
    },
    7: { name: '地接', color: '#f76e98', icon: 'ios-home', key: 'dijie' },
    8: {
      name:  i18n.t('product.other.resource'), // '其它资源',
      color: '#64d1dc',
      icon: 'iconfont icon-qita',
      key: 'other'
    }
  }
  if (!idx && idx !== 0) {
    return tapMap
  } else if (tapMap[idx]) {
    return tapMap[idx]
  } else {
    return false
  }
}
/**
 * @description 金额转化为千分位，保留两位小数
 * @param {Number} 金额
 * @param {Number} 保留多少位
 */
export const fmtCount = (n, precision = 2) => {
  if (typeof n !== 'number') return n
  let symbol = ''
  if (n < 0) {
    symbol = '-'
    n = Math.abs(n)
  }
  let countStr = ''
  let p1 = ''
  let result = ''
  let p2 = ''
  if (precision === 0) {
    countStr = Math.round(n) + ''
    p1 = countStr
  } else {
    countStr = n.toFixed(precision)
    p1 = countStr.slice(0, countStr.length - 1 - precision)
    p2 = countStr.slice(countStr.length - 1 - precision, countStr.length)
  }
  while (p1.length > 3) {
    result = ',' + p1.slice(-3) + result
    p1 = p1.slice(0, p1.length - 3)
  }
  return symbol + p1 + result + p2
}

/**
 * @description 获取指定时区标准时间
 * @param {String} time 当前时间
 * @param {timezone} timezone 当前时区
 * @return 返回当前时区的时间
 */
export const formatTimeByTimezone = (time, timezone = Moment.tz.guess()) => {
  return Moment(time)
    .tz(timezone || Moment.tz.guess())
    .format()
}
/**
 * @description 获取指定语言的时间格式
 * @param {String} time 当前时间
 * @param {String} lang 当前语言
 * @param {String} format 自定义显示格式
 * @return 返回当前语言格式化后的时间
 */
export const formatTimeByLang = (time, lang, format) => {
  switch (lang) {
    case 'zh-CN':
      return Moment(time).format(format || 'YYYY-MM-DD HH:mm:ss')
    case 'zh-TW':
      return Moment(time).format(format || 'YYYY-MM-DD HH:mm:ss')
    case 'en-US':
      return Moment(time).format(format || 'MMMM Do,YYYY h:mm:ss a')
    default:
      return time
  }
}

/**
 * 加法运算
 * @param {*} number1
 * @param {*} number2
 */
export const add = (number1, number2) => {
  if (isEmpty(number1)) {
    number1 = 0
  }
  if (isEmpty(number2)) {
    number2 = 0
  }
  const result = math.add(number1, number2)
  return Number(math.format(result, 14))
}

/**
 * 减法运算
 * @param {*} number1
 * @param {*} number2
 */
export const subtract = (number1, number2) => {
  if (isEmpty(number1)) {
    number1 = 0
  }
  if (isEmpty(number2)) {
    number2 = 0
  }
  const result = math.subtract(number1, number2)
  return Number(math.format(result, 14))
}

/**
 * 乘法运算
 * @param {*} number1
 * @param {*} number2
 */
export const multiply = (number1, number2) => {
  if (isEmpty(number1)) {
    number1 = 0
  }
  if (isEmpty(number2)) {
    number2 = 0
  }
  const result = math.multiply(number1, number2)
  return Number(math.format(result, 14))
}

/**
 * 除法运算
 * @param {*} number1  除数
 * @param {*} number2  被除数
 */
export const divide = (number1, number2) => {
  if (isEmpty(number1)) {
    number1 = 0
  }
  if (isEmpty(number2)) {
    number2 = 0
  }
  if (number2 == 0) {
    return 0
  }
  const result = math.divide(number1, number2)
  return Number(math.format(result, 14))
}

/**
 * 保留小数点
 * @param {*} number 数字
 * @param {*} precision 保留几位
 */
export const round = (number, precision) => {
  if (isEmpty(number)) {
    return 0
  }
  if (isEmpty(precision)) {
    // 默认保留两位小数点
    return math.round(number * 100) / 100
  }
  const rate = math.pow(10, precision)
  return math.round(number * rate) / rate
}

/**
 * 通过后端下载文件
 * @param {*} fileUrl 文件路径
 * @param {*} fileName 下载后保存在本地的文件名称
 */
export const downFile = (fileUrl, fileName) => {
  try {
    axios.get(fileUrl, { responseType: 'arraybuffer' }).then(res => {
      var blob = new Blob([res.data], { type: 'application/octet-stream' })
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, fileName)
      } else {
        var blobURL = window.URL.createObjectURL(blob)
        var tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        tempLink.href = blobURL
        tempLink.setAttribute('download', fileName)
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank')
        }

        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
        window.URL.revokeObjectURL(blobURL)
      }
    })
  } catch (error) {
    this.$emit('downFileErr', this.file, error)
  }
}

// https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
/**
 * 本地下载文件
 * @param {*} url 文件路径
 * @param {*} name 文件名
 */
export function filedownload(url, filename, mime) {
  var blob = new Blob([url], { type: mime || 'application/octet-stream' })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, filename)
  } else {
    var blobURL = window.URL.createObjectURL(blob)
    var tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', filename)
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(blobURL)
  }
}
