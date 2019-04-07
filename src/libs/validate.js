/**
 * 常用验证规则正则表达式
 *
 */
export function isEmpty (val) {
  return [undefined, NaN, null, '', false].includes(val)
}

/*
* 过滤前后空格
*
*/
export function trim (val) {
  if (val && typeof val === 'string') {
    return val.trim()
  }
  return val
}

/*
* 判断原始类型
*/
export function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Function]': 'function',
    '[object Undefined]': 'undefined',
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Symbol]': 'symbol'
  }
  return map[toString.call(obj)]
}
