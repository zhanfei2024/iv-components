<template>
  <div ref="gbImage">
    <Modal
      v-model="currentValue"
      :fullscreen="true"
      :mask="false"
      :width='100'>
        <div v-if="currentValue" class="gb-image" :style="styles">
          <!-- 右上角内容 -->
          <div>
            <div class="gb-image__transferRight" v-if="$slots.transferRight">
              <slot name="transferRight" />
            </div>
            <Icon v-else type="ios-close" class="gb-image__icon" @click="closeMask"/>
            {{currViewValue}}
          </div>

          <div ref="imgContainer" v-if="data.length">
            <div
              v-for="(item, index) in data"
              :key="index">
                <img ref='gbImg' style="display:none" :src="item.url" :title="item.name" :alt="item.name"/>
            </div>
          </div>

          <!-- data无数据时 -->
          <div v-else-if="$slots.noDataSlot" class="gb-image__nodata">
            <slot name="noDataSlot" />
          </div>
          <div v-else class="gb-image__nodata">
            暂无数据
          </div>
        </div>
    </Modal>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
export default {
  name: 'IvViewImage',
  computed: {
    styles () {
      let style = {}
      style['background-color'] = this.maskBackground
      return style
    }
  },
  mounted () {
    if (this.transfer) {
      document.body.parentNode.appendChild(this.$refs.gbImage)
    }
    this.imgTitle = this.data.length ? this.data[this.currViewValue].name : ''
  },
  methods: {
    closeMask () {
      this.currentValue = false
      this.$emit('on-close', this)
    }
  },
  data () {
    return {
      currentValue: this.value,
      imgTitle: '',
      currViewValue: this.viewValue,
      viewer: '',
      index: 0
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      if (val) {
        this.$nextTick(()=> {
          const _this = this
          this.$refs.imgContainer.addEventListener('viewed', function () {
            _this.$emit('on-change', _this.viewer.index, this.viewer)
          })

          this.viewer = new Viewer(this.$refs.imgContainer, {
            inline: this.transfer,
            interval: this.interval,
            minZoomRatio: this.minZoomRatio,
            toolbar: this.toolbar,
            navbar: this.navbar,
            title: this.title
          })
          this.viewer.index = this.currViewValue
        })
      }
      this.$emit('input', val)
    },
    viewValue (val) {
      this.currViewValue = val
    }
  },
  props: {
    // https://github.com/fengyuanchen/viewerjs#options
    // 自动播放间隔时间
    interval: {
      type: Number,
      default: 3000
    },
    // 底部 工具栏显示
    toolbar: {
      type: [Boolean, Number],
      default: true
    },
    // 导航栏显示
    navbar: {
      type: [Boolean, Number],
      default: true
    },
    title: {
      type: [Boolean, Number],
      default: true
    },
    // 最小缩放比例
    minZoomRatio: {
      type: Number,
      default: 0.1
    },
    // ---
    viewValue: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    },
    transfer: {
      type: Boolean,
      default: true
    },
    maskBackground: {
      type: String,
      default: 'rgba(0, 0, 0, 0.8)'
    },
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
