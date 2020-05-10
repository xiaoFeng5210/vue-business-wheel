<template>
  <div id="app">
    <v-input v-model="listArr" :listArr="listArr" @get-data="getData"/>
  </div>
</template>

<script>
import VInput from './components/VInput/VInput'

export default {
  name: 'App',
  data() {
    return {
      listArr: []
    }
  },
  methods: {
    getData() {
      console.log('我是list组件')
    }
  },
  components: {
    VInput
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
