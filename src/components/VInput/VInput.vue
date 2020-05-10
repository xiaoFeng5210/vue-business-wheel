<template>
    <div>
        <div class="m-box-input">
            <input type="text" v-model="inputVal"/>
            <button @click="handleAddItem" style="margin-left: 20px">add</button>
        </div>
        <div class="m-box-list">
            <input-list v-bind="$attrs" v-on="$listeners" @handle-change="handleDeleteItem"/>
        </div>
    </div>
</template>

<script>
import inputList from './List'
    export default {
        name: 'v-input',
        props: {
            inputArr: {
                type: Array
            },
            isWatch: {
                type: Boolean,
                default: true
            }
        },
        model: {
            prop: 'inputArr'
        },
        data() {
            return {
                inputVal: '',
                timer: ''
            }
        },
        watch: {
          'inputVal': function () {
              if (this.timer) {
                  clearTimeout(this.timer);
              }
              if (this.isWatch) {
                  this.timer = setTimeout(() => {
                      this.handleAddItem()
                  }, 1000)
              }
          }
        },
        methods: {
            handleAddItem() {
                if (this.inputVal) {
                    this.inputArr.push(this.inputVal);
                    this.inputVal = ''
                }
            },
        //    删除item
            handleDeleteItem(index) {
                this.inputArr.splice(index, 1)
            }
        },
        components: {
            inputList
        }
    }

</script>

<style lang="scss" scoped>

</style>
