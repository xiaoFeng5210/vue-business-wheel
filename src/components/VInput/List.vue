<template>
    <div>
        <div style="margin-top: 10px; cursor: pointer" v-for="(item, index) in $attrs.listArr" :key="index"
             @click="handleDeleteClick(index)">
            {{item}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'input-list',
    methods: {
        handleDeleteClick(index) {
            this.$emit('handle-change', index)
            // 触发爷爷组件事件
            this.$emit('get-data')
        },
        // 不易维护
        handleParent(index) {
            this.$parent.handleDeleteItem(index)
        }
    }
}
</script>
