<template>
    <div>
        <a-modal v-model="visible" :width="500" :footer="null">
            <div style="margin-left: 80px; margin-top: 20px; margin-bottom: 20px;">
                <vue-qr :text="url"
                        :size="300"
                        :margin="0"
                        ref="Qrcode"
                        class="vue-qr-img"></vue-qr>
            </div>

            <div style="text-align: center; width: 100%;">
                <a :href="exportLink" @click="downloadImg()" :download="downloadFilename">下载二维码</a>
            </div>
        </a-modal>
    </div>
</template>

<script>
    import vueQr from 'vue-qr'

    export default {
        name: 'QrUrl',
        data () {
            return {
                url: '',
                visible: false,
                exportLink: '',
                downloadFilename: ''
            }
        },
        methods: {
            show (item) {
                this.url = item
                this.visible = true
            },
            downloadImg () {
                let Qrcode = this.$refs.Qrcode
                this.exportLink = Qrcode.$el.currentSrc
                this.downloadFilename = '二维码'
                console.log(this.url)
            }
        },
        components: {
            vueQr
        }
    }
</script>
