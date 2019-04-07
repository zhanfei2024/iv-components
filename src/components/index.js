// 用于挂载全局组件

import { ChartPie, ChartBar } from './charts'
import IvDrawer from './iv-drawer'
import IvEditor from './iv-editor'
import IvViewImage from './iv-view-image'

const components = {
  IvViewImage,
    ChartPie,
    ChartBar,
    IvDrawer,
    IvEditor
}

export default {
  install: Vue => {
    Object.keys(components).forEach((key) => {
      Vue.component(components[key].name, components[key])
    })
  }
}

