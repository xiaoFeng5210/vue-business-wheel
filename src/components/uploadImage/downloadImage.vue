<template>
    <div>
        <input type="file" ref="uploadBtn"
               accept="image/*" multiple
               @change="handleUploadFile($event)"/>修改
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            handleUploadFile(event){
                let name = event.target.files[0].name;
                let file= event.target.files[0];
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                    this.$toast({
                        message: '上传图片不能过大',
                        duration: 3000
                    });
                    this.$refs.uploadBtn.value = null;
                    return ;
                }
                var dataAjax = new FormData();
                dataAjax.append('file', event.target.files[0]);
                this.showToast({txt:'上传中',type:'loading',time:0,mask:true})
                $.ajax({
                    url: UPLOAD_URL,
                    type: 'POST',
                    cache: false,
                    processData: false, // 不处理数据
                    contentType: false, // 不设置内容类型
                    data: dataAjax,
                    success: res => {
                        this.hideToast();
                        if (res.data) {
                            this.tabIndex =true;
                            this.formData.photo =res.data[0];
                            console.log(this.formData.photo);
                        } else {
                            this.$toast({
                                message: '上传失败 后台出错',
                                duration: 3000
                            });
                            this.$refs.uploadBtn.value = null;
                        }
                    }
                });

            },
        }
    }
</script>
