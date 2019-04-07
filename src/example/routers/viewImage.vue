<template>
  <div>
    <Carousel auto loop>
      <CarouselItem v-for="(item, index) in option.previewImg" :key="index">
        <img :src="item.url" :alt="index" @click="preview(item, index)">
      </CarouselItem>
    </Carousel>
    <iv-view-image transfer :data="option.previewImg" :viewValue="option.viewValue" v-model="option.value"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      option: {
        previewImg: [
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554648098350&di=599345b6a9d0db1b7c4a42a1e3348736&imgtype=0&src=http%3A%2F%2Fpic144.nipic.com%2Ffile%2F20171025%2F20614752_181558394000_2.jpg",
            name: "风景1"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554648098349&di=eef3627bacc73baeca647ffbcb70acc3&imgtype=0&src=http%3A%2F%2Fbpic.ooopic.com%2F16%2F69%2F70%2F16697037-09853342cd50540b7a9262cf649e8659.jpg",
            name: "风景2"
          }
        ],
        viewValue: 0,
        value: false
      }
    };
  },
  methods: {
      preview(item, index) {
          console.log('hah')
          this.option.value = true
          this.option.viewValue = index
      }
  }
};
</script>

<style scoped>
</style>