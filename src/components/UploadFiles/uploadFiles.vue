<template>
<!--    上传文件组件-->
    <div>
        <a class="a-upload1 mr-5 mt-15" style="background:#2d8cf0; margin-top: 20px;">
            <input type="file" name="file" accept=".xls,.xlsx" @change="getFile($event)" style="width:200px" />选择文件
        </a>
        <span>{{fileName}}</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fileName: '',
                dataFile: null
            }
        },
        methods: {
            getFile (event) {
                this.dataFile = event.target.files[0]
                console.log(this.dataFile.name)
                this.fileName = event.target.files[0].name
                event.preventDefault()
                let formData = new FormData()
                formData.append('file', this.dataFile)
            //    然后就可以把这个formData作为参数传给后台了。
            },
        }
    }
</script>
