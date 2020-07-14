// base64转blob   base64转图片
  base64ToBlob(base64Data) {
    const arr = base64Data.split(',');
    const fileType = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let l = bstr.length;
    const u8Arr = new Uint8Array(l);
    while (l--) {
      u8Arr[l] = bstr.charCodeAt(l);
    }
    const letaa = new Blob([u8Arr], {
      type: fileType
    });
    const bbb = this.blobToFile(letaa, 'dfdfd');
    return bbb;
  },
  // blob转file
  blobToFile(newBlob, fileName) {
    newBlob.lastModifiedDate = new Date();
    newBlob.name = fileName;
    return newBlob;
  }
