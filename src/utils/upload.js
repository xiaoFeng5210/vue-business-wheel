// 上传文件的方法
// <input type="file" id="myFile" name="file"></input>
//
const xhr = new XMLHttpRequest();
const formData = new FormData();
const fileInput = document.getElementById("myFile");
const file = fileInput.files[0];
formdata.append('myFile', file);

xhr.open("POST", "/upload.php");

xhr.onload = function(){
    if(this.status === 200){
        //对请求成功的处理
    }
}

xhr.send(formData);
xhr = null;

// 多文件上传
const fileInput = document.getElementById("myFile");
const files = fileInput.files;
const formData = new FormData();

for(var i = 0; i < files.length; i++) {
    var file = files[i];
    formData.append('files[]', file, file.name);
}

// 图片预览
function handleImageFile(file) {
    var previewArea = document.getElementById('previewArea');
    var img = document.createElement('img');
    var fileInput = document.getElementById("myFile");
    var file = fileInput.files[0];
    img.file = file;
    previewArea.appendChild(img);

    var reader = new FileReader();
    reader.onload = (function(aImg) {
        return function(e) {
            aImg.src = e.target.result;
        }
    })(img);
    reader.readAsDataURL(file);
}

// 图片上传后执行翻转，需配合cube-ui上传文件的完成上传事件
filesSuccess(res){
    console.log('success',res);
    var that=this;
    console.log('ddd',res);

    var Orientation;
    EXIF.getData(res.file, function() {
        // alert(EXIF.pretty(this));
        EXIF.getAllTags(this);
        //alert(EXIF.getTag(this, 'Orientation'));
        Orientation = EXIF.getTag(this, 'Orientation');
        //return;

        var image = new Image();
        image.src = res.url;
        image.onload = function() {
            var expectWidth = this.naturalWidth;
            var expectHeight = this.naturalHeight;

            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = expectWidth;
            canvas.height = expectHeight;
            ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
            if(Orientation != "" && Orientation != 1){
                //alert('旋转处理');
                switch(Orientation){
                    case 6://需要顺时针（向左）90度旋转


                        canvas= rotateImg(this,'left',canvas);
                        break;
                    case 8://需要逆时针（向右）90度旋转

                        canvas=  rotateImg(this,'right',canvas);
                        break;
                    case 3://需要180度旋转

                        canvas= rotateImg(this,'right',canvas);//转两次
                        canvas= rotateImg(this,'right',canvas);
                        break;
                }
            }

            var base64 = canvas.toDataURL("image/jpeg", 0.8);

            // that.formData.files[0].url=base64;
        }
    });
    //DOWNLOAD_URL+formData.photo
    // this.formData.photo=res.response.data[0];
}
