<template>
<iv-drawer title="编辑"
  v-model="closeWin"
  width="600"
  :mask-closable="false"
  :transfer="false"
  :closable="false"
  inner
  scrollable>
    <div>test Drawer</div>
</iv-drawer>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      closeWin: true
    }
  },
  methods: {
    onClose () {
      this.closeWin = false
    }
  },
  watch: {
    value (v) {
      this.closeWin = v
    }
  }
}
</script>
