<template>
    <div>
        <a-button class="ml-15"
                  @click="bulkDownload"
                  :loading="exportLoading">导出二维码</a-button>
        <div class="qrc-list">
            <vue-qr
                    v-for="(item,index) in codeValues"
                    :key="index"
                    :callback="qrcOk"
                    :bind-element="false"
                    style="border-radius: 4px; border:solid 2px #333333;"
                    :color-dark="codeColor"
                    :text="codeValues[index]"
            />
        </div>
    </div>
</template>


<script>
    import JSZip from "jszip";
    import { saveAs } from "file-saver";

    export default {
        data() {
            return {
                exportLoading: false,
                codeColor: "#333333",
                codeValues: [],
                alllistData: [], // 导出数据
                dataCount: 0, // 数据总数
            }
        },
        methods: {
            qrcOk(url) {
                this.qrcValues.push(url);
                if (this.qrcValues.length >= this.dataCount) {
                    console.log(this.qrcValues);
                    var zip = new JSZip();
                    // zip.file('读我.txt', '请使用小勋小程序扫码激活 每个二维码只能使用一次')
                    var img = zip.folder("二维码");
                    this.qrcValues.forEach((ele, index) => {
                        var imgData = ele.replace(/^data:image\/(png|jpg);base64,/, "");
                        img.file(`qrc${index + 1}.png`, imgData, { base64: true });
                    });
                    zip.generateAsync({ type: "blob" }).then(content => {
                        // see FileSaver.js
                        console.log("生成完成");
                        saveAs(content, `二维码.zip`);
                        this.exportLoading = false;
                        this.codeValues = [];
                        this.qrcValues = [];
                    });
                } else {
                    console.log("生成中");
                }
            },
            bulkDownload() {
                this.exportLoading = true;
                let query = {
                    pageNo: 1,
                    pageSize: this.dataCount
                }
                this.$store
                    .dispatch("cpark/fggl/query",  query)
                    .then(res => {
                        this.allListData = res.data.records;
                        this.allListData.forEach((v, i) => {
                            let domUrl = window.location.host
                            let url =
                                "http://" +
                                domUrl +
                                STATIC_PATH +
                                "/storage/index.html" +
                                "?id=" +
                                v.id;
                            this.allCodeValues.push(url);
                        });
                        // 最关键的一步，把url数据
                        this.codeValues = this.allCodeValues;
                    }).catch(err => {
                    this.$message.error(err.msg)
                })
            },
        }
    }
</script>
