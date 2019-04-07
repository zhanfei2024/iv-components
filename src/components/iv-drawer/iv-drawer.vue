<template>
  <div>
    <Drawer
      ref="drawer"
      v-model="currentValue"
      :title="title"
      :width="currentWidth"
      :closable="false"
      :styles="styles"
      :mask="mask"
      :mask-closable="maskClosable"
      :mask-style="maskStyle"
      :scrollable="scrollable"
      :placement="placement"
      :transfer="false"
      class-name="drawer-page-wrap"
      :inner="true"
      @on-visible-change="changeVisible">
      <template slot="header">
        <slot name="header"></slot>
        <a v-if="expandable" class="switch-full-screen" @click="changeExpand">
          <Icon v-if="fullScreen" size="18" type="ios-contract" />
          <Icon v-else size="18" type="ios-expand" />
        </a>
        <a class="close-drawer" @click="close">
          <Icon size="31" type="ios-close" />
        </a>
      </template>
      <slot></slot>
      <footer v-if="$slots.footer" class="drawer-footer">
        <slot name="footer"></slot>
      </footer>
    </Drawer>
  </div>
</template>
<script>
export default {
  name: 'IvDrawer',
  props: {
    value: {
      type: Boolean,
      default: () => true
    },
    title: {
      type: String,
      default: () => ''
    },
    mask: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    maskStyle: {
      type: Object
    },
    width: {
      type: Number | String,
      default: () => 600
    },
    expandable: {
      type: Boolean,
      default: () => false
    },
    scrollable: {
      type: Boolean,
      default: () => false
    },
    placement: {
      type: String,
      default: () => 'right'
    }
  },
  data () {
    return {
      fullScreen: false,
      currentValue: false,
      currentWidth: 600,
      styles: {
        height: this.$slots.footer ? 'calc(100% - 106px)' : 'calc(100% - 51px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'static'
      }
    }
  },
  watch: {
    value (val, old) {
      if (val) {
        // 重新打开初始化参数
        this.fullScreen = false
        this.currentValue = this.value
        this.currentWidth = this.width
      } else {
        this.currentValue = false
      }
    }
  },
  methods: {
    close () {
      this.$emit('on-close', this.currentValue)
      this.$emit('on-visible-change', this.currentValue)
    },
    // 显示状态更改时触发
    changeVisible (status) {
      this.$emit('on-visible-change', status)
      this.$emit('input', status)
    },
    // 抽屉扩展状态更改时触发
    changeExpand () {
      this.fullScreen = !this.fullScreen
      this.currentWidth = this.fullScreen ? '100%' : this.width
      this.$emit('on-expand-change', this.fullScreen)
    }
  }
}
</script>

<style lang="less">
.drawer-page-wrap {
  left: 15px;
  top: 15px;
  .ivu-drawer-inner {
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    transition: width linear 0.3s;
    .ivu-drawer-header {
      height: 51px;
      line-height: 23px;
      font-size: 14px;
      font-weight: bold;
    }
    .ivu-drawer-body {
      .drawer-footer {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 100;
        width: 100%;
        padding: 8px 16px 10px;
        background-color: #fff;
        box-shadow: 0 -10px 30px rgba(255, 255, 255, 1);
      }
    }
  }
  .switch-full-screen {
    position: absolute;
    right: 40px;
    top: 8px;
    width: 31px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    color: #999;
    cursor: pointer;
    &:hover {
      color: #444;
    }
  }
  .close-drawer {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 31px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    color: #999;
    cursor: pointer;
    &:hover {
      color: #444;
    }
  }
  .ivu-drawer-content {
    background-color: rgb(255, 255, 255);
  }
}
</style>
