export default function clickExampleImg(imgUrl, index) {
    let that = this;
    this.activeExampleImgIndex = index;
    //处理多次点击图片，发送多个请求的情况
    if (this.loading) {
        return;
    }
    this.loading = true;
    this.imageUrl = imgUrl;
    let img = new Image();
    img.src = imgUrl;
    img.onload = function () {
        let c = document.getElementById('myCanvas');
        c.width = img.width;
        c.height = img.height;
        let ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        c.toBlob((blob) => {
            let formData = new FormData();
            formData.append('file', blob, 'test.jpg');
            that
                .$http({
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    url: that.uploadUrl,
                    data: formData,
                })
                .then((resp) => {
                    that.handleSuccess(resp.data);
                })
                .catch((res) => {
                    console.log(res);
                    this.loading = false;
                });
        }, 'image/jpeg');
    };
}